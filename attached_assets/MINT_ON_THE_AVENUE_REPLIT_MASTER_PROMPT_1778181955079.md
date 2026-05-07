# Mint on the Avenue V2 Website Master Prompt for Replit

## Role and Mission

Act as an elite luxury digital creative director, futurist brand strategist, high-fashion UI/UX architect, cinematic motion designer, premium beauty brand consultant, and senior React frontend engineer.

Build a production-grade redesign for **Mint on the Avenue**, an Aveda lifestyle salon in Winter Park, Florida. The website must feel like a **futuristic eco-luxury salon sanctuary from 2028**, not a generic salon template.

The finished experience should feel like:

> A naturally lit, futuristic eco-luxury salon flagship with editorial beauty aesthetics, calming architectural minimalism, premium wellness energy, and subtle beauty-tech intelligence.

It must preserve the local trust, warmth, service clarity, booking intent, Aveda connection, environmental values, and guest-first tone of the current website, while evolving the visual world into a globally premium digital flagship.

## Research Foundation

Use these source truths:

- Existing site: `https://mintontheavenue.com/`
- Current home themes: “Welcome to MINT.”, “Everyone needs a little REFRESH”, “Refresh Yourself”, new guest offer, appointment request, team matching, reviews, Instagram, Aveda connection, location.
- Existing service categories: Hair Design, Hair Condition, Mint Men, Texture, Hair Color, Specialty, New Guest Special, Referrals.
- Existing About theme: “A Breath of Fresh Air”, welcoming, grateful, family-like, inclusive, emotionally human.
- Existing brand values: Environmental Leadership, Community Outreach, Inclusivity, Excellence without Ego.
- Existing brand tone: Welcoming, Compassionate, Professional, Refreshing.
- Existing brand aesthetic: Organic Elegance, Earthly Sophistication, Sustainable Beauty, Minimalist Calm, High-End Wellness.
- Existing business context: Premier Aveda lifestyle salon in Winter Park, FL offering expert hair design, color, texture, wellness-inspired services, and community-minded environmental responsibility.

## Uploaded Asset Analysis

Analyze all uploaded graphics before designing. Derive the final visual language from the assets, not from generic salon references.

Observed local asset direction:

- Logo system uses a highly geometric, architectural MINT wordmark with wide spacing and a premium minimalist structure.
- Campaign graphics use oversized typographic MINT layers, botanical hair movement, editorial model imagery, soft sage atmospheres, and wellness language.
- Visual world combines Aveda, botanical beauty, hair ritual, environmental salon care, and luxury wellness.
- The strongest assets point toward pale sage, ivory, eucalyptus, warm stone, botanical shadow, soft editorial light, and sculptural typography.
- Some older assets are overly cyan/blue or too saturated. Use them only as historical references, not as dominant V2 color direction.

## Color System

Do not let the website feel blue, cyan, neon, cyberpunk, or tech-startup.

Current colors to reinterpret:

- `#5bbbc9`: remove as dominant cyan/blue.
- `#319387`: keep only as historical green foundation.
- `#ffffff`: make this the primary atmospheric base.
- `#000000`: use minimally for typography contrast only.

Sampled asset colors to guide V2:

- Deep botanical ink: `#1c1a0f`, `#25200e`, `#020a07`
- Dark forest green: `#04261b`, `#0b2e27`, `#0b2722`
- Olive mineral: `#50563d`, `#444428`, `#576b48`
- Eucalyptus grey-green: `#647962`, `#8da48d`, `#87957d`
- Soft sage: `#a1ad8f`, `#b5bda5`, `#ccd0ba`
- Warm ivory: `#e5e4ce`, `#e3d5c2`, `#eadecc`
- Warm stone/taupe: `#c4b8a0`, `#887653`

Recommended working palette:

- Atmospheric white: `#fbfbf6`
- Warm ivory: `#f1ecdf`
- Soft botanical mist: `#e5e8d6`
- Pale sage: `#ccd6c0`
- Eucalyptus: `#8da48d`
- Mineral sage: `#647962`
- Olive shadow: `#50563d`
- Deep botanical: `#0b2e27`
- Botanical ink: `#1c1a0f`
- Brushed titanium: `#c9c8bd`
- Warm taupe accent: `#c4b8a0`

Color usage:

- 65 percent white/ivory negative space.
- 20 percent pale sage/eucalyptus atmosphere.
- 10 percent mineral/titanium structure.
- 5 percent deep botanical contrast.
- Use black-green instead of pure black for most text.
- Use warm taupe only for tiny luxury accents, borders, lines, active states, and atmospheric highlights.

## Visual DNA

The design must balance:

- Nature x Future
- Softness x Precision
- Editorial x Technology
- Minimalism x Immersion
- Wellness x Fashion
- Local warmth x Global luxury

The interface should feel:

- Bright
- Airy
- Naturally lit
- Calm
- Premium
- Spa-like
- Architectural
- Editorial
- Softly futuristic
- Tactile
- Sensory
- Immersive

Avoid:

- Generic salon layouts
- Pink feminine cliches
- Cheap luxury gold overload
- Cyberpunk or neon tech
- Heavy dark mode
- Loud gradients
- Overcrowded cards
- Stock-image feeling
- Template sections
- Harsh animation
- Excessive glassmorphism
- Excessive neumorphism
- Corporate SaaS styling

## Technology Direction for Replit

Build as a modern React app suitable for Replit.

Recommended stack:

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion for page and component motion
- GSAP + ScrollTrigger only if needed for advanced scroll choreography
- React Router for pages
- Lucide React for interface icons
- Optional: Lenis for smooth scrolling if performance remains strong
- Optional: Radix UI primitives for accessible dialogs, tabs, accordions, popovers, and forms

Performance rules:

- Keep the experience premium but fast.
- Use optimized images and responsive `srcset` or imported assets.
- Lazy-load gallery images, team portraits, and heavy immersive sections.
- Respect `prefers-reduced-motion`.
- Keep scroll effects subtle on mobile.
- Do not block booking interactions behind heavy animation.
- Every click must have clear feedback.

Accessibility rules:

- Keyboard navigation must work for all menus, modals, tabs, accordions, forms, and booking steps.
- All interactive elements need visible focus states.
- Use semantic HTML.
- Use accessible dialog behavior for gallery modals and booking overlays.
- Contrast must remain readable over imagery.
- Never place essential text over visually busy areas without a controlled scrim or light diffusion layer.

## Information Architecture

Primary navigation:

1. Home
2. Services
3. New Guests
4. Artists
5. Lookbook
6. Philosophy
7. Reviews
8. Visit
9. Book

Secondary/footer navigation:

- Gift Cards
- Aveda
- Community
- Careers
- Blog / Journal
- Policies
- Privacy
- Instagram
- Phone

Core routes:

- `/`
- `/services`
- `/new-guests`
- `/artists`
- `/lookbook`
- `/philosophy`
- `/reviews`
- `/visit`
- `/book`
- `/gift-cards`
- `/aveda`
- `/community`
- `/careers`
- `/journal`
- `/policies`

If time is limited, build at minimum:

- Home
- Services
- New Guests
- Artists
- Lookbook
- Philosophy
- Reviews
- Visit
- Book

## Global Layout

### Header

Desktop header:

- Fixed or sticky top navigation with transparent hero state.
- On scroll, transform into frosted ivory bar with subtle sage shadow.
- Left: Mint wordmark.
- Center: primary navigation.
- Right: phone icon, gift card icon, “Book” CTA.
- Header height: elegant, not bulky.
- Use generous horizontal padding.
- Use refined uppercase micro-labels with letter spacing.

Header interactions:

- Hover nav item: soft underline grows from center, text color deepens to botanical ink, subtle upward movement of 1px.
- Active page: persistent thin sage underline.
- Book hover: button receives soft inner glow, border shifts from mineral sage to deep botanical, arrow moves 4px right.
- Phone click: `tel:4076452264`.
- Gift card click: route to `/gift-cards`.
- Logo click: route to `/`.

Mobile header:

- Left logo, right menu button and compact Book button.
- Menu button opens full-screen ivory/sage navigation overlay.
- Overlay uses large editorial nav links, phone, location, gift cards, Instagram, and Book CTA.
- Menu open animation: soft blur backdrop, nav items reveal one by one with 60ms stagger.
- Menu close: reverse fade and slide.
- Escape key and outside close must work.

### Footer

Footer should feel like a quiet closing room.

Structure:

- Top: “Everyone needs a little REFRESH.” large editorial line.
- Middle columns: Book, Visit, Services, Brand.
- Address: 228 Park Ave North, Winter Park, FL 32789.
- Phone: 407.645.2264.
- Aveda lifestyle salon note.
- Social/Instagram.
- Bottom: copyright, privacy, terms.

Footer interactions:

- Footer links use soft underline reveal.
- Address click opens map.
- Phone click calls.
- Instagram opens external.
- Book button routes to `/book`.

## Global Motion System

Motion philosophy:

- Premium motion should feel like breath, not spectacle.
- Animations should be slow, smooth, intentional, and organic.
- Use consistent easing: `cubic-bezier(0.22, 1, 0.36, 1)` for luxury ease-out.
- Avoid bouncing unless used in tiny tactile confirmation states.

Page transitions:

- Route enter: opacity 0 to 1, y 18px to 0, blur 8px to 0.
- Route exit: opacity 1 to 0, y 0 to -10px.
- Duration: 650-900ms desktop, 350-500ms mobile.

Scroll reveals:

- Text: fade + 16px upward drift.
- Images: fade + 1.04 to 1 scale down into place.
- Cards: stagger 70-110ms.
- Section background gradients: slow parallax, max 12px vertical movement.

Hover:

- CTAs: magnetic pull within 24px radius on desktop.
- Cards: lift 4px, shadow diffuses, border color warms, image scale 1.03.
- Service rows: background shifts to pale sage, price fades in or sharpens.

Click:

- Buttons compress to scale 0.985 for 120ms.
- Step selections show soft ring pulse.
- Form field focus creates subtle frosted glow.

Reduced motion:

- Disable parallax, cursor trails, magnetic motion, and long reveal choreography.
- Keep simple fades under 200ms.

## Global Component System

### Buttons

Primary CTA:

- Text: “Book Your Refresh”, “Request Appointment”, or “Begin Booking”.
- Shape: rectangular or very softly rounded, not pill-shaped unless brand assets demand it.
- Background: deep botanical or mineral sage.
- Text: warm ivory.
- Icon: arrow-right.
- Hover: arrow moves, background deepens, subtle light sweep.

Secondary CTA:

- Transparent/ivory background.
- Thin mineral border.
- Botanical ink text.
- Hover: pale sage fill.

Text link:

- Small uppercase label.
- Animated underline.
- Arrow icon appears on hover.

### Cards

Cards must not feel generic.

- Use cards only for service items, artists, review moments, booking steps, and modals.
- Avoid cards inside cards.
- Border radius: 8px or less unless image treatment requires editorial softness.
- Use soft border `rgba(100,121,98,0.18)`.
- Use shadow sparingly.
- Hover must feel tactile but restrained.

### Forms

Form style:

- Large calm fields.
- Thin bottom borders or soft frosted fields.
- Labels always visible.
- Error states are calm and clear, not red-aggressive.
- Confirmation states use sage checkmark, soft fade, and short thank-you copy.

### Icons

Use Lucide icons for:

- ArrowRight
- Menu
- X
- Phone
- MapPin
- Calendar
- Gift
- Leaf
- Sparkles
- Droplet
- Scissors
- UserRound
- Instagram
- ChevronDown
- Search
- Filter
- Heart
- Check

## Page 1: Home

Emotional purpose:

- Introduce Mint as a refreshing, premium, naturally luxurious salon sanctuary.
- Make visitors feel calm, inspired, welcomed, and ready to book.

Hero section:

- Full first viewport, but show 8-12 percent of the next section at bottom.
- Use the strongest campaign asset as inspiration: editorial model, botanical hair movement, oversized MINT layer, soft sage/ivory atmosphere.
- Layout: asymmetric editorial composition.
- Left or lower-left copy block, not boxed.
- Background: white/ivory with sage atmospheric wash.
- Add a huge faint “MINT” typographic layer behind imagery.
- Use subtle botanical/hair-flow abstract forms.

Hero copy:

- Eyebrow: “An Aveda lifestyle salon in Winter Park”
- H1: “A breath of fresh air for modern hair.”
- Supporting copy: “Plant-powered rituals, expert color, and calm luxury care designed to leave you refreshed.”
- Primary CTA: “Book Your Refresh”
- Secondary CTA: “Explore Services”

Hero motion:

- On load: logo/header fades in first.
- Background image slowly scales from 1.04 to 1 over 1600ms.
- H1 reveals line by line with soft blur removal.
- CTA fades after headline.
- Botanical particles/leaves drift very subtly, max 8px.
- No fast hero carousel.

Hero clicks:

- Click Book Your Refresh -> `/book`.
- Click Explore Services -> `/services`.
- Click phone in header -> `tel:4076452264`.
- Click logo -> top of home.

Section 2: Signature promise

- Full-width ivory band.
- Large editorial statement: “Everyone needs a little REFRESH.”
- Three quiet value pillars: Plant-Powered Beauty, Botanical Hair Rituals, Luxury Wellness.
- Each pillar has icon, 1-line text, hover glow.

Clicks:

- Pillar hover shows one-sentence detail.
- Pillar click scrolls to related section or routes to `/philosophy`.

Section 3: Services preview

- Title: “Care, color, texture, ritual.”
- Use four large editorial service tiles: Hair Design, Hair Color, Botanical Treatments, Texture.
- Each tile has image/texture, brief copy, starting price cue, “View” link.

Interactions:

- Hover tile: image subtly zooms, service title slides up, short description appears.
- Click tile -> `/services` with category preselected.

Section 4: New guest ritual

- Purpose: convert first-time guests.
- Copy: “New to Mint? Start with a guided refresh.”
- Include $50 new client gift if still valid; phrase carefully as “New guest offer available with select artists.”
- CTA: “Start New Guest Journey”.
- Include small trust line: consultation, wellness moment, stylist matching.

Click:

- CTA -> `/new-guests`.

Section 5: Find your artist

- Editorial split layout: portrait grid or abstract stylist cards.
- Copy: “Meet the people who make Mint feel like home.”
- CTA: “Find Your Match”.

Interactions:

- Hover artist preview: specialty tags appear.
- Click Find Your Match -> `/artists` or opens quiz overlay.

Section 6: Lookbook preview

- Luxury editorial image strip.
- Use horizontal scroll on desktop, vertical stack on mobile.
- CTA: “Enter the Lookbook”.

Interactions:

- Hover image: cursor label “View”.
- Click image -> lookbook modal.
- Click CTA -> `/lookbook`.

Section 7: Reviews

- Avoid slider.
- Use three cinematic quote blocks.
- Background pale sage/ivory.
- Large quote typography.
- CTA: “Read Guest Stories”.

Click:

- CTA -> `/reviews`.

Section 8: Aveda and ecology

- Purpose: reinforce sustainable beauty.
- Use calm botanical texture.
- Copy around Aveda lifestyle salon, environmental care, plant-powered rituals.
- CTA: “Why Aveda”.

Click:

- CTA -> `/aveda`.

Section 9: Visit / book close

- Minimal location panel with map preview.
- Address, phone, “Book Your Refresh”.
- CTA -> `/book`.
- Address -> external map.

Mobile home:

- Hero text must sit above or below image, never over the face.
- CTA sticky bottom can appear after 40 percent scroll.
- Disable heavy cursor effects.
- Convert service tiles to swipeable cards or vertical accordion.

## Page 2: Services

Emotional purpose:

- Make a complex service menu feel premium, easy, and organized.

Page hero:

- H1: “Services as rituals.”
- Copy: “Every visit begins with consultation and a moment of wellness.”
- Background: ivory, faint sage gradient, minimal hairline typography.

Service navigation:

- Sticky category tabs:
  - Hair Design
  - Hair Color
  - Hair Condition
  - Texture
  - Mint Men
  - Specialty
  - New Guest
  - Referrals

Interactions:

- Click category tab -> smooth scroll to section and updates active state.
- On mobile, category selector becomes horizontal scroll chips or dropdown.

Service section layout:

- Each section includes:
  - Category title
  - 1-2 sentence explanation
  - Included ritual line
  - Service list
  - Starting price
  - Notes
  - “Book this service” button

Service row behavior:

- Default: title, short description, starting price.
- Hover desktop: row expands slightly, pale sage background, arrow appears.
- Click row: opens detail drawer or accordion.
- Drawer includes duration estimate placeholder, what to expect, best for, prep notes, and booking CTA.

Booking clicks:

- Click “Book this service” -> `/book?service=hair-color` or store selected service in state.
- Click “Ask before booking” -> contact mini-form or `/visit`.

Important content:

- Hair Design: dry cuts, haircut and blow dry, shampoo blow-dry, special occasion hair, children, styling.
- Hair Condition: Nutriplenish, Botanical Repair, Scalp Solutions.
- Mint Men: cuts, beard/neck trim, grey blending.
- Texture: perms, Brazilian Blowout, Yuko Japanese Straightening.
- Hair Color: single process, color balance, color cleanse, highlights, balayage, ombre, creative/corrective, vibrants.
- Specialty: brow wax, lip wax, chin wax, brow tinting.
- New Guest: offer and introductory flow.
- Referrals: referral offer.

Pricing design:

- Never bury prices in paragraph text.
- Use clean tabular alignment.
- Add note: “Prices are starting rates and vary by length, texture, and artist level.”

Mobile:

- Use accordion categories.
- Sticky “Book” bottom CTA.
- Keep price alignment readable.

## Page 3: New Guests

Emotional purpose:

- Remove anxiety and make first-time booking feel guided, warm, premium.

Hero:

- H1: “Your first refresh, beautifully guided.”
- Copy: “Tell us what you are hoping for. We will help pair you with the right service and artist.”
- CTA: “Begin New Guest Journey”.

Sections:

1. Welcome note
2. What to expect
3. New guest offer
4. Stylist matching
5. Booking CTA
6. FAQ

What to expect cards:

- Consultation
- Aveda Moment of Wellness
- Service plan
- Finish and care guidance

Interactions:

- Click Begin New Guest Journey -> `/book?guest=new`.
- Click offer download -> open modal with offer details and email capture if needed.
- FAQ accordions expand with smooth height animation.

Offer rules:

- Include “valid with select artists” if preserving current offer.
- Do not overpromise.

Mobile:

- Use stepper timeline.
- CTA sticky after hero.

## Page 4: Artists / Team

Emotional purpose:

- Make the team feel premium, human, skilled, and welcoming.

Hero:

- H1: “Find your perfect match.”
- Copy: “Each artist brings a distinct eye, a calm chairside presence, and a love for making guests feel seen.”

Artist grid:

- Editorial portrait cards.
- Fields:
  - Name
  - Level or title
  - Specialties
  - Best for
  - Personality note
  - Book with artist

Interactions:

- Hover card: portrait shifts scale 1.03, name rises, specialties reveal.
- Click card: opens artist detail page or modal.
- Click “Book with artist” -> `/book?artist=name`.
- Click filters: filter by Color, Cut, Texture, Curly Hair, Blonding, New Guest Friendly, Men’s Cuts.

Find match quiz:

- Button: “Find My Artist”.
- Opens overlay quiz:
  1. What brings you in?
  2. Hair length/texture
  3. Desired energy: quiet, collaborative, bold transformation, maintenance
  4. Availability preference
  5. Result: recommended artists

Motion:

- Quiz steps slide horizontally with soft fade.
- Result appears with gentle confirmation pulse.

Mobile:

- One artist card per row.
- Filters become drawer.

## Page 5: Lookbook / Gallery

Emotional purpose:

- Make the salon’s work feel like a luxury editorial archive.

Hero:

- H1: “The lookbook.”
- Copy: “Color, cut, movement, and ritual in editorial form.”

Filters:

- All
- Color
- Blonding
- Brunette
- Texture
- Cut
- Event Hair
- Transformations

Grid:

- Masonry-inspired but controlled.
- Large feature image every 6-8 items.
- Use generous gutters.
- Captions minimal.

Interactions:

- Hover image: subtle zoom, soft sage overlay, “View” cursor label.
- Click image: fullscreen modal.
- Modal:
  - Large image
  - Category
  - Short description
  - Artist if known
  - Book similar look CTA
  - Previous/Next
  - Close
- Keyboard: escape closes, arrows navigate.

Click behavior:

- “Book similar look” -> `/book?inspiration=image-id`.
- Filter click animates grid reorder.

Mobile:

- Two-column grid or one-column editorial feed.
- Modal uses full-screen swipe.

## Page 6: Philosophy / About

Emotional purpose:

- Communicate why Mint exists and why it feels different.

Hero:

- H1: “A breath of fresh air.”
- Copy should preserve current sentiment: Mint is welcoming, grateful, family-like, inclusive, and rooted in making guests feel good long after they leave.

Sections:

1. Brand story
2. Beauty without ego
3. Aveda lifestyle salon
4. Environmental leadership
5. Community outreach
6. Inclusivity
7. Closing invitation

Layout:

- Editorial magazine composition.
- Large pull quotes.
- Portrait or interior imagery.
- Quiet botanical textures.

Motion:

- Long-form copy reveals in slow paragraphs.
- Pull quote fades in with subtle character spacing expansion.
- Images parallax gently.

Clicks:

- Environmental leadership -> `/community`.
- Aveda -> `/aveda`.
- Careers -> `/careers`.
- Book -> `/book`.

Mobile:

- Single-column narrative.
- Pull quotes full-width.

## Page 7: Reviews

Emotional purpose:

- Build trust without generic testimonial sliders.

Hero:

- H1: “Guest stories.”
- Copy: “It is never just hair. It is trust, care, and the way you feel when you leave.”

Review design:

- Cinematic quote cards arranged like editorial spreads.
- Feature 1 large quote at top.
- Smaller quote clusters below.
- Optional filters:
  - Color
  - Cut
  - New Guest
  - Longtime Guest
  - Wellness

Interactions:

- Hover quote: background warms subtly, attribution sharpens.
- Click “Read more” expands full quote.
- Click “Book your visit” -> `/book`.

Avoid:

- Auto-rotating carousel.
- Tiny unreadable review cards.
- Loud star graphics.

Mobile:

- Vertical quote story feed.

## Page 8: Visit / Contact

Emotional purpose:

- Make practical information feel calm and premium.

Hero:

- H1: “Visit Mint.”
- Copy: “A calming salon experience in the heart of Winter Park.”

Contact details:

- Mint on the Avenue
- 228 Park Ave North
- Winter Park, FL 32789
- 407.645.2264

Sections:

1. Map preview
2. Contact methods
3. Hours
4. Arrival / parking guidance
5. Contact form
6. Social

Interactions:

- Click address -> Google Maps.
- Click phone -> call.
- Click email/form submit -> confirmation.
- Click Instagram -> external link.
- Click Book -> `/book`.

Map:

- Use styled static map or embedded map.
- Make map soft, desaturated, sage-toned if possible.
- Do not let the map dominate the page.

Form fields:

- Name
- Email
- Phone
- Message
- Interest dropdown

Form behavior:

- Focus: soft sage glow.
- Submit disabled until required fields valid.
- Error: calm inline text.
- Success: “Thank you. We will be in touch soon.”

Mobile:

- Address and phone become large tap targets.
- Contact form below primary booking CTA.

## Page 9: Booking

Emotional purpose:

- Make booking feel guided, effortless, personal, and luxurious.

Do not make a boring generic form.

Booking flow:

Step 1: Choose intent

- Options:
  - New Guest Refresh
  - Haircut / Design
  - Color
  - Treatment / Scalp Ritual
  - Texture
  - Special Occasion
  - Not sure yet

Click behavior:

- Selecting a tile stores intent, tile receives sage ring, Continue activates.

Step 2: Tell us your goal

- Options:
  - Maintain my look
  - Big change
  - Healthier hair
  - Color refresh
  - Smoother texture
  - Event styling
  - Consultation first
- Optional text field: “Anything you want us to know?”

Step 3: Choose artist preference

- Options:
  - Match me with the best fit
  - I have an artist in mind
  - First available
- If artist in mind: dropdown/list.

Step 4: Select timing

- Date preference
- Time preference
- Flexibility options

Step 5: Guest details

- Name
- Email
- Phone
- New or returning guest

Step 6: Review and request

- Summary panel.
- Edit links for each step.
- Submit button: “Request My Appointment”.

Confirmation:

- Soft full-screen confirmation panel.
- Message: “Your refresh request has been received.”
- Show next steps: team will confirm, call if urgent, location.
- CTAs:
  - Add to calendar placeholder
  - Explore lookbook
  - Call salon

Motion:

- Step changes: horizontal slide 24px + fade.
- Progress bar: thin sage line.
- Selected options: soft ring pulse.
- Submit: gentle loading shimmer.
- Success: checkmark draw animation.

Failure/error:

- Show calm error message.
- Keep user’s entered data.

Mobile:

- One step per screen.
- Bottom sticky Continue button.
- Progress at top.

## Page 10: Gift Cards

Purpose:

- Provide a premium purchase path for gifts.

Hero:

- H1: “Give a little refresh.”
- Copy: “A thoughtful salon gift for care, confidence, and calm.”

Sections:

- Gift card visual
- Amount options
- How to purchase
- CTA to buy or contact

Clicks:

- Amount click selects.
- Buy click opens current external gift card purchase system if available, or routes to contact/booking.

## Page 11: Aveda

Purpose:

- Explain Aveda connection, plant-powered beauty, rituals, products, and environmental alignment.

Sections:

- Why Aveda
- Plant-powered care
- Moment of Wellness
- Product rituals
- Shop Aveda

Clicks:

- Shop Aveda -> external Aveda link.
- Book treatment -> `/book?service=treatment`.

## Page 12: Community

Purpose:

- Showcase environmental leadership, community outreach, and inclusivity.

Sections:

- Environmental commitments
- Local outreach
- Inclusion statement
- Events or campaigns
- CTA to visit/join

Motion:

- Use calm timeline reveals.

## Page 13: Careers

Purpose:

- Attract aligned artists.

Hero:

- H1: “Grow beautifully here.”
- Copy: “A salon culture built on care, craft, education, and excellence without ego.”

Sections:

- Culture
- Education
- Open roles
- Application form

Clicks:

- Role click expands details.
- Apply click opens form.

## Page 14: Journal / Blog

Purpose:

- Editorial content for hair care, wellness, Aveda, seasonal rituals, and salon culture.

Layout:

- Featured article.
- Filtered article grid.
- Categories:
  - Hair Care
  - Color
  - Wellness
  - Aveda
  - Community

Click:

- Article card -> article detail.
- Tag -> filter.

## Page 15: Policies

Purpose:

- Practical rules presented clearly and elegantly.

Layout:

- Simple readable typography.
- Accordion sections for cancellations, appointments, pricing, guests, offers.

Interactions:

- Accordion click expands.
- Contact CTA at bottom.

## Page 16: 404 / Error Page

Purpose:

- Turn a broken route into a calm, branded recovery moment.

Layout:

- White/ivory background with faint oversized MINT typography.
- Small botanical line icon or subtle sage atmospheric shape.
- H1: “This page needs a refresh.”
- Copy: “The page you are looking for may have moved, but your next visit is close.”
- CTAs:
  - “Return Home” -> `/`
  - “Book Your Refresh” -> `/book`
  - “Explore Services” -> `/services`

Interactions:

- Primary CTA hover uses the same arrow glide as global buttons.
- Secondary links use underline reveal.
- No loud error styling.

## Page 17: Search / Site Assist

Purpose:

- Help users quickly find services, pricing, artists, policies, or booking paths.

Desktop behavior:

- Search icon in header opens a soft command-palette overlay.
- Overlay background: frosted ivory with subtle blur.
- Input placeholder: “Search services, artists, policies...”
- Results grouped by:
  - Services
  - Artists
  - Pages
  - Journal

Mobile behavior:

- Search appears inside the full-screen menu.
- Tapping a result closes the menu and routes to the selected page.

Interactions:

- Click search icon -> open overlay.
- Type -> live filter results.
- Arrow keys -> move through results.
- Enter -> open highlighted result.
- Escape/outside click -> close.
- Empty state: “Try ‘color’, ‘new guest’, or ‘parking’.”

## Asset Integration Rules

Use uploaded brand assets as the creative source of truth.

Asset handling:

- Create an `/assets` or `/src/assets` structure with clear names:
  - `logo-mint-black.png`
  - `logo-mint-white.png`
  - `campaign-hero-breath-of-nature.png`
  - `campaign-rooted-in-nature.png`
  - `texture-botanical-dark.png`
  - `texture-sage-mineral.png`
  - `lookbook-placeholder-01.png`
- Optimize images before use where possible.
- Use hero/campaign graphics as inspiration for layouts, but crop responsibly so faces, logo marks, and key copy are never awkwardly cut off.
- Avoid stretching assets.
- Use CSS `object-fit: cover` with intentional focal-position values.
- Create alt text that describes content clearly without keyword stuffing.

Asset click/interaction rules:

- Campaign hero images are not clickable unless paired with a visible CTA.
- Gallery images are clickable and must open the lookbook modal.
- Logo images click home.
- Decorative textures must be ignored by screen readers.

## SEO and Local Search Requirements

The website must be beautiful and discoverable.

Global SEO:

- Unique title tag for every route.
- Unique meta description for every major route.
- Open Graph image and social preview for homepage.
- Semantic heading hierarchy: one H1 per page.
- Use schema markup where appropriate.

Recommended title patterns:

- Home: “Mint on the Avenue | Aveda Lifestyle Salon in Winter Park”
- Services: “Salon Services | Hair Color, Cuts, Texture & Aveda Treatments”
- New Guests: “New Guest Salon Experience | Mint on the Avenue”
- Artists: “Meet the Artists | Mint on the Avenue”
- Lookbook: “Salon Lookbook | Hair Color, Cuts & Styling Inspiration”
- Visit: “Visit Mint on the Avenue | Winter Park Salon”

Local SEO:

- Include NAP consistency:
  - Name: Mint on the Avenue
  - Address: 228 Park Ave North, Winter Park, FL 32789
  - Phone: 407.645.2264
- Add LocalBusiness / HairSalon schema.
- Add opening hours when confirmed.
- Add map link and service area context.
- Add review schema only if reviews are real and compliant.

SEO content rules:

- Do not keyword-stuff.
- Use natural phrases like Aveda salon Winter Park, hair color Winter Park, balayage Winter Park, botanical hair treatments, luxury salon Winter Park.
- Keep the tone premium and human.

## Analytics and Conversion Tracking

Track important user intent without making the site feel mechanical.

Events to track:

- Header Book click
- Sticky Book click
- Service category selected
- Service detail expanded
- Book this service click
- New guest journey started
- Artist quiz started
- Artist quiz completed
- Artist booking click
- Lookbook image opened
- Book similar look click
- Phone click
- Address/map click
- Contact form submitted
- Booking flow submitted
- Gift card click
- External Aveda shop click

Implementation:

- Create a small analytics helper such as `trackEvent(name, payload)`.
- Keep analytics provider optional so Replit prototype works without secrets.
- Never block UI if analytics fails.

## Content Management and Replacement Notes

Build the site so content is easy to replace.

Data files:

- `services.ts`: category, service name, description, price, duration, booking slug.
- `artists.ts`: name, role, image, specialties, personality note, booking slug.
- `reviews.ts`: quote, guest name/initials, service category, source if available.
- `lookbook.ts`: image, alt, category, artist, service link, caption.
- `faq.ts`: page, question, answer.
- `navigation.ts`: label, path, type, external flag.

Rules:

- Do not hard-code large repeated lists directly inside page components.
- Keep route slugs stable.
- Make placeholder data obvious and easy to update.
- Add comments only where replacement instructions are helpful.

## Loading, Empty, and Failure States

Every interactive feature needs a premium state system.

Loading states:

- Use soft skeleton shimmer in pale sage/ivory.
- Avoid spinner-heavy UI.
- Booking submit uses calm progress text: “Sending your request...”

Empty states:

- Lookbook no filter results: “No looks found for this filter yet.”
- Search empty: “Try ‘color’, ‘new guest’, or ‘parking’.”
- Artist filter empty: “No exact match yet. Let us help pair you.”

Failure states:

- Booking submit fail: “Something did not send. Your details are still here. Please try again or call us.”
- Contact form fail: “We could not send this message yet. Please try again or call 407.645.2264.”
- Image load fail: use soft sage placeholder with text hidden from decorative contexts.

Error style:

- Calm inline text.
- No harsh red except tiny accessible error indicator if required.
- Preserve user-entered form data.

## Privacy, Trust, and Compliance Notes

Booking/contact forms:

- Ask only for information needed to respond.
- Do not request sensitive medical information.
- Add a small note: “We use your details only to respond to your appointment request.”
- Make external booking, gift card, map, Instagram, or Aveda links clear when leaving the site.

Accessibility:

- Respect reduced motion.
- Use visible focus styles.
- All modals trap focus and close with Escape.
- All accordions expose correct expanded/collapsed states.
- All form errors are announced or clearly associated with fields.

## Replit Build Phases

Phase 1: Foundation

- Create Vite + React + TypeScript project.
- Add Tailwind CSS.
- Add React Router.
- Add Framer Motion.
- Add Lucide React.
- Set global color tokens, typography, spacing, motion tokens.
- Add routes and layout shell.

Phase 2: Core Brand Experience

- Build Header, MobileMenu, Footer, AnimatedButton, SectionReveal.
- Build Home hero using uploaded campaign imagery.
- Build global page transitions.
- Add sticky mobile booking CTA.

Phase 3: Conversion Pages

- Build Services with tabs, accordions, service detail drawers, and booking links.
- Build Booking stepper with state persistence.
- Build New Guests journey.

Phase 4: Trust and Editorial Pages

- Build Artists, Artist Quiz, Lookbook, Reviews, Philosophy, Visit.
- Add modals, filters, and form states.

Phase 5: Practical Pages and Polish

- Build Gift Cards, Aveda, Community, Careers, Journal, Policies, 404, Search overlay.
- Add SEO metadata.
- Add analytics event helper.
- Add loading/error/empty states.

Phase 6: QA

- Test desktop, tablet, and mobile.
- Test keyboard navigation.
- Test reduced motion.
- Test every CTA route.
- Test forms and failure states.
- Verify no cyan/blue dominance.
- Verify no text overlap.
- Verify booking remains obvious.

## Global Click Map

Navigation:

- Logo -> `/`
- Home -> `/`
- Services -> `/services`
- New Guests -> `/new-guests`
- Artists -> `/artists`
- Lookbook -> `/lookbook`
- Philosophy -> `/philosophy`
- Reviews -> `/reviews`
- Visit -> `/visit`
- Book -> `/book`
- Phone -> `tel:4076452264`
- Address -> Google Maps external
- Instagram -> external
- Aveda shop -> external Aveda site
- Gift Cards -> `/gift-cards`

Home CTAs:

- Book Your Refresh -> `/book`
- Explore Services -> `/services`
- Start New Guest Journey -> `/new-guests`
- Find Your Match -> `/artists`
- Enter the Lookbook -> `/lookbook`
- Read Guest Stories -> `/reviews`
- Why Aveda -> `/aveda`

Service clicks:

- Category tab -> scroll to category
- Service row -> expand details
- Book this service -> `/book` with selected service
- Not sure -> `/book?service=consultation`

Booking clicks:

- Option tile -> select
- Continue -> next step
- Back -> previous step
- Edit -> return to selected step
- Submit -> confirmation
- Call salon -> phone link

Gallery clicks:

- Filter -> update grid
- Image -> modal
- Modal close -> close
- Previous/next -> image navigation
- Book similar look -> `/book`

Artist clicks:

- Filter -> update artist grid
- Artist card -> detail modal/page
- Book with artist -> `/book`
- Find My Artist -> quiz overlay

Form clicks:

- Submit valid form -> success state
- Submit invalid form -> inline errors
- Dropdown -> options
- Checkbox/toggle -> visible selected state

Search clicks:

- Header search icon -> open search overlay
- Search result -> route to result
- Escape -> close overlay
- Empty state suggestion -> populate search input

Error page clicks:

- Return Home -> `/`
- Book Your Refresh -> `/book`
- Explore Services -> `/services`

## Copy Tone

Voice:

- Calm
- Welcoming
- Refined
- Professional
- Compassionate
- Refreshing
- Editorial but clear

Avoid:

- Overly poetic copy that hides practical information.
- Generic beauty phrases.
- Aggressive luxury claims.
- Tech jargon.

Use phrases like:

- “A breath of fresh air.”
- “Book your refresh.”
- “Plant-powered hair rituals.”
- “Calm, expert care.”
- “Beauty rooted in nature.”
- “Designed to leave you feeling renewed.”
- “Excellence without ego.”

## Animation Timing Specification

Use these defaults:

- Header transition: 300ms
- Button hover: 180ms
- Card hover: 240ms
- Text reveal: 700ms
- Image reveal: 900ms
- Section reveal: 900-1200ms
- Page transition: 650ms
- Modal open: 420ms
- Modal close: 260ms
- Booking step transition: 450ms
- Accordion open: 320ms

Easing:

- Primary: `cubic-bezier(0.22, 1, 0.36, 1)`
- Gentle in-out: `cubic-bezier(0.65, 0, 0.35, 1)`
- Micro press: `cubic-bezier(0.2, 0.8, 0.2, 1)`

## Responsive Rules

Desktop:

- Use wide editorial grids.
- Preserve huge whitespace.
- Allow large typography.
- Use hover, magnetic interactions, and subtle parallax.

Tablet:

- Reduce parallax.
- Convert wide grids to 2-column.
- Keep sticky booking CTA.

Mobile:

- Design as native vertical storytelling.
- Use one-column layouts.
- Avoid text over complex images.
- Sticky bottom Book CTA after hero.
- Full-screen menu.
- Full-screen booking steps.
- Gallery swipe gestures.
- Disable cursor effects.
- Keep all tap targets at least 44px.

## Implementation Requirements

Create reusable components:

- `Header`
- `MobileMenu`
- `Footer`
- `PageTransition`
- `Hero`
- `EditorialStatement`
- `ServiceTabs`
- `ServiceAccordion`
- `ServiceCard`
- `ArtistCard`
- `ArtistQuiz`
- `LookbookGrid`
- `ImageModal`
- `ReviewQuote`
- `BookingStepper`
- `BookingOptionTile`
- `ContactForm`
- `AnimatedButton`
- `SectionReveal`
- `StickyBookCTA`
- `SearchOverlay`
- `SEO`
- `ErrorPage`
- `LoadingSkeleton`
- `EmptyState`
- `ExternalLinkNotice`

Create data files:

- `services.ts`
- `artists.ts`
- `reviews.ts`
- `lookbook.ts`
- `navigation.ts`
- `faq.ts`
- `seo.ts`
- `analytics.ts`

Build with real-looking placeholder data if final content is not supplied, but keep it easy to replace.

Use local uploaded assets from the project folder when possible. Name them semantically in the code or import map:

- Logo variants
- Hero campaign image
- Botanical textures
- Editorial campaign images
- Dark leaf texture

## Acceptance Checklist

The build is not complete until all of the following are true:

- Every route in the information architecture opens without errors.
- Every header, footer, CTA, service, gallery, artist, booking, phone, map, and form click works.
- The booking path can be completed from Home, Services, New Guests, Artists, Lookbook, Reviews, Visit, and the sticky mobile CTA.
- Services are readable, organized by category, and include starting price notes.
- New guests have a dedicated guided path.
- Artist matching exists as either a quiz overlay or a clear filter system.
- Lookbook images open in an accessible modal with previous, next, close, and booking actions.
- Contact details are consistent everywhere.
- Mobile navigation is full-screen, elegant, and thumb-friendly.
- Text never overlaps imagery, buttons, cards, or other text at mobile, tablet, or desktop sizes.
- Motion respects `prefers-reduced-motion`.
- Page load remains fast enough for a local salon visitor on mobile.
- The palette reads ivory, sage, eucalyptus, mineral, botanical, and warm, not cyan, blue, neon, or cyber.
- The site feels like a premium wellness flagship while still making practical salon information easy to find.

## Final Quality Bar

The final site must:

- Feel premium in the first 2 seconds.
- Make booking obvious without making the site feel salesy.
- Preserve practical service clarity.
- Feel calm, white-dominant, sage, botanical, and airy.
- Use motion as atmosphere, not decoration.
- Work beautifully on mobile.
- Avoid generic salon patterns.
- Avoid blue/cyan dominance.
- Respect accessibility and performance.

If a design decision conflicts with usability, choose usability but execute it with luxury restraint.
