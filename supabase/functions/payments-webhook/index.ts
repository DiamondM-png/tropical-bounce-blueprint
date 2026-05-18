import { createClient } from 'npm:@supabase/supabase-js@2';
import { verifyWebhook, EventName, type PaddleEnv } from '../_shared/paddle.ts';

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
  }
  return _supabase;
}

async function handleSubscriptionCreated(data: any, env: PaddleEnv) {
  const { id, customerId, items, status, currentBillingPeriod, customData } = data;
  const userId = customData?.userId;
  if (!userId) return console.error('No userId in customData');

  const item = items[0];
  const priceId = item.price.importMeta?.externalId;
  const productId = item.product.importMeta?.externalId;
  if (!priceId || !productId) {
    return console.warn('missing importMeta.externalId', { rawPriceId: item.price.id });
  }

  await getSupabase().from('subscriptions').upsert({
    user_id: userId,
    paddle_subscription_id: id,
    paddle_customer_id: customerId,
    product_id: productId,
    price_id: priceId,
    status,
    current_period_start: currentBillingPeriod?.startsAt,
    current_period_end: currentBillingPeriod?.endsAt,
    environment: env,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'paddle_subscription_id' });
}

async function handleSubscriptionUpdated(data: any, env: PaddleEnv) {
  const { id, status, currentBillingPeriod, scheduledChange } = data;
  await getSupabase().from('subscriptions')
    .update({
      status,
      current_period_start: currentBillingPeriod?.startsAt,
      current_period_end: currentBillingPeriod?.endsAt,
      cancel_at_period_end: scheduledChange?.action === 'cancel',
      updated_at: new Date().toISOString(),
    })
    .eq('paddle_subscription_id', id)
    .eq('environment', env);
}

async function handleSubscriptionCanceled(data: any, env: PaddleEnv) {
  // Immediate revocation: status=canceled AND period_end=now so has_active_subscription returns false
  await getSupabase().from('subscriptions')
    .update({
      status: 'canceled',
      current_period_end: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('paddle_subscription_id', data.id)
    .eq('environment', env);
}

async function handleTransactionCompleted(data: any, env: PaddleEnv) {
  const { id, items, customData, currencyCode, details } = data;
  const userId = customData?.userId;
  if (!userId) return console.error('No userId in transaction customData');

  // Only record one-time purchases (subscription transactions have a subscriptionId)
  if (data.subscriptionId) return;

  const item = items[0];
  const priceId = item.price.importMeta?.externalId;
  if (!priceId) return console.warn('missing price externalId on transaction');

  // For one-time txns, item.price has product_id (Paddle internal) — derive productId from external_id lookup if possible
  // Simpler: store the price.productId reference; for our app the price_id is enough to know it's pro_blueprint
  const productId = priceId === 'pro_blueprint_onetime' ? 'pro_blueprint' : (item.price.productId || 'unknown');

  await getSupabase().from('purchases').upsert({
    user_id: userId,
    paddle_transaction_id: id,
    product_id: productId,
    price_id: priceId,
    amount: parseInt(details?.totals?.total || item.price.unitPrice.amount || '0', 10),
    currency: currencyCode || item.price.unitPrice.currencyCode,
    environment: env,
  }, { onConflict: 'paddle_transaction_id' });
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const url = new URL(req.url);
  const env = (url.searchParams.get('env') || 'sandbox') as PaddleEnv;

  try {
    const event = await verifyWebhook(req, env);
    switch (event.eventType) {
      case EventName.SubscriptionCreated:
        await handleSubscriptionCreated(event.data, env);
        break;
      case EventName.SubscriptionUpdated:
        await handleSubscriptionUpdated(event.data, env);
        break;
      case EventName.SubscriptionCanceled:
        await handleSubscriptionCanceled(event.data, env);
        break;
      case EventName.TransactionCompleted:
        await handleTransactionCompleted(event.data, env);
        break;
      default:
        console.log('Unhandled event:', event.eventType);
    }
    return new Response(JSON.stringify({ received: true }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Webhook error:', e);
    return new Response('Webhook error', { status: 400 });
  }
});
