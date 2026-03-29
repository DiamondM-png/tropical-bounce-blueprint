

# Create Viewable Guide Pages

## Overview
Create two new pages that display the full content of both guides so you can preview the information included in each tier.

## What Will Be Created

### 1. Blueprint Access Guide Page (`/blueprint-guide`)
The $9.99 PDF guide covering the core 25 pages of bounce house business content:

- **Introduction** - Why bounce houses are a great side hustle, industry overview, earning potential
- **Chapter 1: Market Research** - Identifying your target market, analyzing local competition, demand assessment
- **Chapter 2: Business Registration** - LLC vs sole proprietorship, licenses, permits, EIN setup
- **Chapter 3: Insurance** - Types of insurance needed, liability coverage, recommended providers
- **Chapter 4: Equipment Sourcing** - Where to buy/rent bounce houses, what to look for, costs breakdown
- **Chapter 5: Pricing Strategies** - How to price rentals, packages, seasonal pricing, deposit policies
- **Chapter 6: Marketing Basics** - Social media setup, local advertising, word-of-mouth strategies
- **Chapter 7: Operations** - Booking systems, delivery logistics, setup/teardown procedures, safety guidelines
- **Chapter 8: Getting Your First Customers** - Launch strategies, introductory offers, building reviews
- **Interactive Checklists** - Business registration checklist, equipment procurement checklist, marketing setup checklist
- **Basic Business Plan Template** - Fill-in-the-blank business plan outline
- **Curated Resource Links** - Insurance providers, equipment suppliers, marketing tools

### 2. Pro Blueprint Guide Page (`/pro-guide`)
The $49.99 in-depth physical guide with everything above PLUS:

- All Blueprint Access content (expanded with deeper detail)
- **Advanced Financial Projections** - Revenue forecasting, expense tracking, break-even analysis, ROI calculator, cash flow templates
- **Detailed Marketing Plan** - Brand identity guide, social media content calendar, paid advertising strategies, SEO for local business, partnership opportunities
- **Premium Supplier Directory** - Vetted supplier contacts with negotiated pricing, equipment comparison charts, maintenance supplier list
- **Scaling Your Business** - Adding inventory, hiring staff, expanding service areas, adding complementary services (tables, chairs, generators)
- **Legal Templates** - Rental agreement template, liability waiver template, terms of service
- **Seasonal Business Planning** - Peak season preparation, off-season revenue strategies, holiday-themed packages
- **Customer Management** - CRM recommendations, follow-up strategies, loyalty programs, handling complaints
- **Highlighted Notes and Annotations** - Pro tips, insider advice, and expert annotations throughout

## Technical Details

| Item | Detail |
|------|--------|
| New files | `src/pages/BlueprintGuide.tsx`, `src/pages/ProGuide.tsx` |
| Modified files | `src/App.tsx` (add routes) |
| Styling | Uses existing Tailwind theme, card components, and typography styles |
| Navigation | Each page will have a back-to-home link and a CTA to purchase |
| Layout | Clean, readable chapter-based layout with sections, icons, and checklists rendered visually |

Each guide page will display the content in a well-formatted, scrollable layout with chapter headings, bullet points, sample checklists, and placeholder template sections -- giving you a full preview of what customers will receive.

