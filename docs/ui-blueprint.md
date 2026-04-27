# Showroom SaaS UI Blueprint

## 1. Product Direction

Mobile-first SaaS ecommerce builder for Indian SMBs. The product should feel credible, fast, and conversion-focused, with the operational clarity of Shopify and the calm density of Razorpay dashboards.

### Experience principles

- Lead with trust: clean white surfaces, disciplined use of `#05369b`, strong data legibility.
- Optimize for small screens first: every critical task completes one-handed with sticky bottom actions.
- Keep workflows short: guided setup, visible progress, low cognitive load.
- Use reusable patterns: one shell, one form language, one card system, one status system.
- Support Indian commerce behavior: WhatsApp-first actions, COD/payment clarity, lightweight domain and shipping setup.

## 2. Design System

### Brand and color

- Primary brand: `#05369b`
- Primary usage: primary CTAs, active nav, focus rings, selected states, chart highlights
- Accent: `#f97316` for conversion cues such as discounts, urgency chips, promo callouts
- Surface: white cards on `#f5f7fb` canvas
- Text: `#0f172a`, muted text `#64748b`
- Semantic tones:
  - Success: `#15803d`
  - Warning: `#d97706`
  - Danger: `#dc2626`
  - Info: `#0ea5e9`

### Typography

- Font family: `Inter, Segoe UI, sans-serif`
- Heading scale:
  - H1: `36/44`, `700`
  - H2: `30/38`, `700`
  - H3: `24/32`, `600`
  - H4: `20/28`, `600`
- Body scale:
  - Body LG: `18/28`, `400`
  - Body MD: `16/24`, `400`
  - Body SM: `14/22`, `400`
  - Caption: `12/18`, `500`
- Numeric KPI text: `30/38`, `700`, tabular nums

### Spacing and sizing

- Base unit: `4px`
- Standard paddings:
  - Screen gutter mobile: `16px`
  - Screen gutter tablet: `24px`
  - Screen gutter desktop: `32px`
  - Card padding: `20px`
- Vertical rhythm:
  - Section gap mobile: `32px`
  - Section gap desktop: `48px`
  - Form row gap: `16px`
  - Inline control gap: `12px`

### Shape and elevation

- Input/button radius: `14px`
- Card radius: `18px`
- Modal/drawer radius: `24px`
- Shadows:
  - Base card: `0 10px 30px rgba(15, 23, 42, 0.08)`
  - Floating/sticky surfaces: `0 20px 50px rgba(15, 23, 42, 0.12)`

### Grid and responsiveness

- Mobile: single column, stacked actions, sticky footer CTA
- Tablet: two-column where comparison helps
- Desktop: sidebar + header + content shell
- Breakpoints:
  - `360+` small mobile
  - `480+` large mobile
  - `768+` tablet
  - `1024+` desktop
  - `1280+` wide

### Interaction rules

- Minimum touch target: `44x44`
- Sticky primary action on mobile for checkout, wizard steps, save/update flows
- Drawer over modal on mobile for complex forms
- Inline validation below fields, never hidden in toast only
- Loading states use skeletons that preserve layout

## 3. App Shell

### Desktop shell

- Left sidebar: logo, workspace/store switcher, primary navigation, upgrade card, help link
- Top header: page title, contextual actions, search where needed, notifications, profile menu
- Content area: max width `1280px`, cards grouped with generous white space

### Mobile shell

- Collapsible sidebar becomes slide-over drawer
- Top bar: hamburger, page title, notifications/profile
- Bottom navigation: `Dashboard`, `Orders`, `Products`, `Marketing`, `Settings`
- Persistent bottom CTA area for key task pages

### Core shell components

- `AppShell`
- `SidebarNav`
- `TopHeader`
- `MobileBottomNav`
- `PageSection`
- `StatCard`
- `FilterBar`
- `EmptyState`

## 4. Reusable Component System

### Buttons

- `PrimaryButton`: filled `#05369b`, white text, strong emphasis
- `SecondaryButton`: soft blue tint background for secondary importance
- `OutlineButton`: white fill, border, neutral text
- `DangerButton`: destructive confirmations only
- Sizes:
  - `sm` for dense tables
  - `md` default
  - `lg` hero CTAs and sticky mobile CTA
- States: default, hover, pressed, disabled, loading with spinner-left

### Cards

- `MetricCard`
- `ContentCard`
- `PreviewCard`
- `PlanCard`
- `OrderSummaryCard`
- Shared structure: title row, optional badge/action, body area, footer meta

### Forms

- `TextInput`, `PhoneInput`, `PasswordInput`
- `Select`, `MultiSelect`, `Combobox`
- `TextArea`
- `SegmentedControl`
- `Switch`
- `Checkbox`
- `RadioCard`
- `FileUploader`
- `ColorPickerSwatch`
- `PriceInputGroup`

### Data display

- `DataTable` with sticky header and row actions
- `StatusBadge`
- `Avatar`
- `Timeline`
- `ChartCard`
- `EmptyIllustrationState`

### Overlays and feedback

- `Modal`
- `Drawer`
- `ConfirmDialog`
- `Toast`
- `InlineBanner`
- `SkeletonBlock`

## 5. Public Screens

## Landing Page

### Layout structure

- Sticky top nav with logo, product links, pricing, sign in, primary CTA
- Hero block with two columns on desktop, stacked on mobile
- Feature grid
- Demo store preview
- Pricing
- Testimonials
- CTA footer

### UI hierarchy

- Hero:
  - Left: headline, supporting text, trust chips, primary CTA `Create Your Store`, secondary CTA `See Demo`
  - Right: layered product mockup showing mobile storefront + admin dashboard cards
- Feature grid:
  - Six cards max, each with icon, title, one-sentence benefit
  - Focus areas: instant catalog, WhatsApp selling, mobile dashboard, payments, shipping, analytics
- Demo store preview:
  - Carousel or segmented preview of fashion, electronics, beauty store templates
  - Device frame on mobile first, desktop browser frame secondary
- Pricing:
  - Three plans with monthly/yearly switch
  - Recommended middle plan highlighted with blue outline and soft glow
  - Include India-relevant reassurance: no-code setup, UPI/Razorpay ready
- Testimonials:
  - Founder avatar, quote, business type, city
  - Surface metrics like order increase, setup time, repeat customer lift
- CTA footer:
  - Strong final copy, email field optional, primary CTA

### React composition

- `PublicNavbar`
- `HeroSection`
- `FeatureGrid`
- `StorePreviewCarousel`
- `PricingSection`
- `TestimonialGrid`
- `PublicFooterCTA`

## 6. Authentication Screens

## Login

### Layout structure

- Centered auth card over soft gradient background
- Logo top, title, supporting copy, form, alternate login options

### UI hierarchy

- Toggle between `Email + OTP` and `Password`
- Email input always first
- OTP flow: send OTP button integrated inline or as next step
- Password flow: password input + `Forgot password`
- Sticky submit on mobile within card footer
- Bottom text: `New here? Create account`

## Signup

### Layout structure

- Same auth shell for continuity
- Slightly taller card, trust copy on privacy and trial

### UI hierarchy

- Name
- Business email
- Mobile number
- Password
- Consent checkbox
- Primary CTA `Create free store`

## Forgot Password

### Layout structure

- Minimal centered card

### UI hierarchy

- Email or mobile input
- Recovery method chips
- Primary CTA `Send reset link / OTP`
- Back to login link

## 7. Store Creation Wizard

Shared pattern: top stepper, content left, live preview right on tablet/desktop, sticky step actions bottom on mobile.

## Step 1: Business Info

- Fields: store name, category, subcategory, business phone, city
- Helper modules: AI naming suggestions, availability hint for domain placeholder
- Preview panel: header logo placeholder + store name + category badge

## Step 2: Theme Selection

- Template cards in 2-up mobile horizontal scroll, 3-up desktop grid
- Each card shows hero, category fit, style tags
- Filters: minimal, premium, bold, catalog-first
- Preview panel updates selected theme

## Step 3: Branding

- Logo upload drag-drop
- Brand color swatches with primary locked to blue family by default but editable
- Font pairing preview
- Preview panel shows homepage banner, buttons, product cards

## Step 4: Add First Product

- Product title
- Price and compare-at price
- Category
- Description
- Image upload
- Optional size/color variants accordion
- Preview panel shows PDP card and collection tile

## Step 5: Preview & Publish

- Checklist: theme, logo, first product, payment setup placeholder, domain placeholder
- Preview in mobile/desktop tabs
- Publish summary card
- Primary CTA `Publish Store`

### React composition

- `SetupWizardLayout`
- `WizardStepper`
- `WizardFormPanel`
- `LivePreviewPanel`
- `StickyStepActions`

## 8. Main Dashboard

### Layout structure

- `AppShell`
- KPI row
- Sales chart + channel split
- Recent orders
- Quick actions and tasks

### UI hierarchy

- Header left: selected store and date range
- Header right: search, notifications, profile
- KPI cards:
  - Revenue
  - Orders
  - Customers
  - Conversion rate
- Sales chart card:
  - 7D/30D/90D switch
  - revenue/order toggle
- Right rail or lower row:
  - setup checklist
  - traffic sources
  - top products
- Recent orders table:
  - order id, customer, amount, payment status, fulfillment status, date

### Mobile adaptation

- KPI cards become swipeable carousel or 2x2 compact grid
- Chart full width
- Recent orders condensed to cards with status badges
- Floating `Add product` CTA

## 9. Product Management

## Product Listing

### Layout structure

- Header with search, add product CTA
- Filter bar
- Table on desktop, card list on mobile

### UI hierarchy

- Filters: category, stock status, collection, price range
- Bulk actions: publish, archive, delete, add tags
- Product row/card:
  - thumbnail
  - title
  - SKU
  - price
  - inventory
  - status
  - updated at
- Empty state: illustration + `Add your first product`

## Add/Edit Product

### Layout structure

- Two-column desktop editor
- Main form left, publishing/sidebar modules right
- Full-width stacked mobile form with sticky save bar

### UI hierarchy

- Main:
  - Product name
  - Description editor
  - Media uploader
  - Pricing card with price, discount, tax toggle
  - Variants builder for size/color
  - Inventory and SKU
  - SEO preview optional collapsed
- Right side:
  - Status card
  - Collections/categories
  - Sales channels
  - Product preview

## Category Management

- Category tree/list with icons and product counts
- Create/edit drawer
- Reorder categories using drag handles on desktop, priority list on mobile

## 10. Order Management

## Orders List

### Layout structure

- Header with filters and export
- Status tabs: pending, shipped, delivered
- Data table desktop, order cards mobile

### UI hierarchy

- Filters: payment status, fulfillment, date, shipping method
- Order card:
  - order id and time
  - customer name
  - amount
  - payment chip
  - fulfillment chip

## Order Details

### Layout structure

- Summary header
- Two-column details on desktop
- Stacked sections on mobile

### UI hierarchy

- Summary strip: order id, amount, current status, quick actions
- Left:
  - products ordered
  - shipping address
  - payment summary
- Right:
  - customer info card
  - status timeline
  - notes/activity
- Actions:
  - mark packed
  - mark shipped
  - mark delivered
  - contact customer on WhatsApp

## 11. Customer Screens

## Customer List

- Search first
- Filters: repeat buyers, high spenders, inactive
- Table/card view with total orders, lifetime value, last order date

## Customer Detail

### UI hierarchy

- Header: customer name, tier badge, actions
- Profile card: phone, email, city, source
- Order history table/cards
- Activity timeline: sign-up, placed orders, coupon used, support note
- Personalization card: preferred categories, average order value

## 12. Marketing Tools

## Coupons Management

- List page with active/inactive tabs
- Coupon card or table row: code, type, value, usage, expiry, status
- Create/edit drawer:
  - code
  - fixed/percentage
  - minimum order value
  - usage limit
  - expiry date
  - audience segment

## Popup/Banner Editor

- Visual editor split view
- Left: content fields, timing rules, display targets
- Right: mobile preview canvas
- Presets: welcome offer, festive banner, free shipping strip

## Basic Campaign UI

- Placeholder-ready module for WhatsApp broadcasts and ads
- Campaign cards with status, budget placeholder, CTA target, audience size
- Quick action buttons: `Create WhatsApp campaign`, `Create ad campaign`

## 13. Storefront Screens

Shared storefront behavior: fast image-first browsing, clear pricing, trust banners, sticky add-to-cart on mobile.

## Homepage

### Layout structure

- Announcement strip
- Search
- Hero banner
- Horizontal categories
- Featured products
- Promo banner
- Testimonials or trust row

### UI hierarchy

- Categories use pill cards with icon/image
- Featured products in 2-column mobile grid, 4-column desktop grid
- Sticky bottom mini-cart appears after first add

## Product Listing Page

- Top: category title, result count, sort
- Mobile filters in bottom sheet
- Desktop filters in left sidebar
- Product cards:
  - image
  - title
  - rating optional
  - price + strike-through discount
  - quick add

## Product Detail Page

- Gallery first
- Title, price, discount, variants, quantity stepper, delivery promise, CTA stack
- Sticky bottom bar on mobile:
  - price
  - `Add to cart`
  - `Buy now`
- Secondary modules:
  - product description
  - shipping info
  - reviews placeholder
  - related products

## Cart Page

- Items list/cards
- Quantity controls
- Coupon apply accordion
- Price summary
- Sticky checkout CTA on mobile

## Checkout Page

### Layout structure

- Multi-section form with clear progress
- Address section
- Delivery method
- Payment selection
- Order summary

### UI hierarchy

- Address form supports Indian address pattern: house/building, area, landmark, city, state, PIN
- Payment options:
  - UPI
  - Card
  - Net banking
  - Cash on delivery
- Summary card includes shipping line, discount line, payable total

## Order Success Page

- Success illustration/check
- Order number
- Delivery estimate
- CTA to track order
- Secondary CTA to continue shopping

## 14. Settings Panel

## Store Settings

- Store name
- Logo
- Support contact
- Domain placeholder
- Theme defaults
- Social links

## Payment Settings

- Razorpay integration card
- Connection status
- API key placeholders
- Accepted payment methods chips
- Test mode toggle

## Shipping Settings

- Shipping zones
- Rate cards
- Free shipping threshold
- COD availability
- Estimated delivery windows

## Notification Settings

- Customer notifications: order confirmed, shipped, delivered
- Admin notifications: new order, low stock, payment failed
- Channel toggles: email, SMS placeholder, WhatsApp placeholder

## 15. Mobile UX Enhancements

- Sticky bottom CTA on:
  - auth submit
  - wizard next/publish
  - save product
  - checkout
  - add to cart
- Mobile filters use drawers/bottom sheets, not cramped inline chips
- Use bottom navigation instead of persistent sidebar
- Replace wide tables with content cards and progressive disclosure
- Keep the primary action visible after keyboard open where possible

## 16. Recommended Route Map

```txt
/
/pricing
/login
/signup
/forgot-password
/setup/business
/setup/theme
/setup/branding
/setup/product
/setup/publish
/app/dashboard
/app/products
/app/products/new
/app/products/:id
/app/categories
/app/orders
/app/orders/:id
/app/customers
/app/customers/:id
/app/marketing/coupons
/app/marketing/banners
/app/marketing/campaigns
/app/settings/store
/app/settings/payments
/app/settings/shipping
/app/settings/notifications
/store/:slug
/store/:slug/products
/store/:slug/products/:id
/store/:slug/cart
/store/:slug/checkout
/store/:slug/success
```

## 17. Suggested React Folder Shape

```txt
src/
  app/
  components/
    shell/
    navigation/
    buttons/
    cards/
    forms/
    tables/
    feedback/
    charts/
    commerce/
  features/
    public/
    auth/
    onboarding/
    dashboard/
    products/
    orders/
    customers/
    marketing/
    settings/
    storefront/
  design-system/
    theme.ts
    tokens.ts
    icons/
```

## 18. Implementation Notes

- Use one source of truth for tokens from [theme.ts](/C:/Users/pixel/Desktop/Digital-showroom-webapp/design-system/theme.ts).
- Build `AppShell`, `PageHeader`, `FilterBar`, `StickyActionBar`, and `StatusBadge` first. Most screens depend on them.
- Favor card-based responsive transforms over forcing desktop tables onto mobile.
- Keep copy short and direct. Indian SMB users typically scan for speed, trust, and setup simplicity.
- Use soft blue highlights sparingly. White space should do most of the work.
