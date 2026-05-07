export const BRAND = {
  name: "Mint on the Avenue",
  tagline: "A breath of fresh air for modern hair.",
  refresh: "Everyone needs a little REFRESH.",
  address: "228 N Park Ave",
  city: "Winter Park, FL 32789",
  phone: "407.645.2264",
  phoneTel: "tel:4076452264",
  hoursLines: [
    "Tuesday — Friday  ·  9:00 — 8:00",
    "Saturday  ·  9:00 — 6:00",
    "Sunday — Monday  ·  Closed",
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=228+N+Park+Ave+Winter+Park+FL+32789",
  instagram: "https://www.instagram.com/mintontheavenue/",
};

export const NAV = [
  { label: "Services", href: "/services" },
  { label: "New Guests", href: "/new-guests" },
  { label: "Artists", href: "/artists" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Reviews", href: "/reviews" },
  { label: "Visit", href: "/visit" },
];

export type ServiceItem = { name: string; price: string; note?: string };
export type ServiceCategory = {
  id: string;
  title: string;
  blurb: string;
  groups: { heading?: string; subnote?: string; items: ServiceItem[] }[];
  footnote?: string;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "design",
    title: "Hair Design",
    blurb:
      "Each service includes a consultation, a relaxing neck and shoulder massage (Aveda Moment of Wellness), and basic styling. Prices listed are starting rates and may vary by length, texture, and stylist level.",
    groups: [
      {
        heading: "Dry Cuts",
        subnote: "Includes Moment of Wellness and basic style.",
        items: [
          { name: "Bang Trim", price: "$15 — 35+" },
          { name: "Beard & Neck Trim", price: "$25 — 50+" },
          { name: "Cut · Short", price: "$30 — 55+" },
          { name: "Cut · Medium", price: "$35 — 60+" },
          { name: "Cut · Long", price: "$40 — 65+" },
          { name: "Cut · Extra Long", price: "$45 — 70+" },
        ],
      },
      {
        heading: "Haircut & Blow-Dry",
        subnote: "Includes shampoo, Moment of Wellness, blow-dry, and basic style.",
        items: [
          { name: "Cut · Short", price: "$40 — 105+" },
          { name: "Cut · Medium", price: "$45 — 105+" },
          { name: "Cut · Long", price: "$50 — 110+" },
          { name: "Cut · Extra Long", price: "$55 — 115+" },
        ],
      },
      {
        heading: "Shampoo & Blow-Dry",
        items: [
          { name: "Short", price: "$30 — 70+" },
          { name: "Medium", price: "$30 — 70+" },
          { name: "Long", price: "$40 — 80+" },
          { name: "Extra Long", price: "$40 — 80+" },
        ],
      },
      {
        heading: "Special Occasion Hair",
        subnote: "Includes Moment of Wellness and blowout. Price varies by time taken.",
        items: [
          { name: "Upstyle · Short to Medium", price: "$80 — 200+" },
          { name: "Upstyle · Long to Extra Long", price: "$100 — 220+" },
        ],
      },
      {
        heading: "Children (Under 10)",
        items: [
          { name: "Cut", price: "$30 — 50+", note: "Includes consultation and basic style." },
          { name: "Cut with Shampoo", price: "$40 — 70+", note: "Includes shampoo, blow-dry, and basic style." },
        ],
      },
      {
        heading: "Styling Add-Ons",
        items: [
          { name: "Blowout with Hair Extensions", price: "$50 — 70+" },
          { name: "Iron Work · Short", price: "$30 — 50+" },
          { name: "Iron Work · Medium", price: "$35 — 55+" },
          { name: "Iron Work · Long", price: "$40 — 60+" },
          { name: "Iron Work · Extra Long", price: "$45 — 65+" },
          { name: "Roller Set", price: "$60+" },
        ],
      },
    ],
    footnote: "Pricing scales from our Level 1 artists up to Level 8 master artists.",
  },
  {
    id: "color",
    title: "Hair Color",
    blurb:
      "Each color service includes consultation, neck and shoulder massage, shampoo and conditioning, a relaxing hand massage, and a blow-dry with basic styling.",
    groups: [
      {
        heading: "Color",
        items: [
          { name: "Single Process", price: "$65 — 90+", note: "For new growth only." },
          { name: "Color Balance · Short (60g)", price: "$80 — 110+" },
          { name: "Color Balance · Medium (80g)", price: "$90 — 120+" },
          { name: "Color Balance · Long (120g)", price: "$100 — 130+" },
          { name: "Color Balance · Extra Long", price: "$120 — 200+" },
          { name: "Color Cleanse Enlightener", price: "$100 — 140+" },
          { name: "Enlightener Retouch", price: "$100 — 140+" },
          { name: "Extended Enlightener Retouch", price: "$150 — 190+", note: "For retouches 6 weeks or longer." },
        ],
      },
      {
        heading: "Highlights",
        items: [
          { name: "Add-On Accent Highlight", price: "$60 — 100+" },
          { name: "Partial Highlight", price: "$100 — 150+" },
          { name: "Half Highlight", price: "$130 — 180+" },
          { name: "Full Highlight", price: "$160 — 210+" },
        ],
      },
      {
        heading: "Specialty Color",
        items: [
          { name: "Creative or Corrective Color", price: "$70 — 150+ / hr" },
          { name: "Partial Balayage", price: "$140 — 220+" },
          { name: "Full Balayage", price: "$180 — 260+" },
          { name: "Partial Ombré", price: "$240 — 320+" },
          { name: "Full Ombré", price: "$280 — 360+" },
          { name: "Vibrants Refresh · Short", price: "$80 — 110+" },
          { name: "Vibrants Refresh · Medium", price: "$90 — 120+" },
          { name: "Vibrants Refresh · Long", price: "$100 — 130+" },
          { name: "Vibrants Refresh · Extra Long", price: "$120 — 200+" },
        ],
      },
    ],
    footnote: "Pricing scales from Level 1 to Level 8 artists.",
  },
  {
    id: "condition",
    title: "Hair Condition",
    blurb:
      "Add-on treatments. Includes consultation and a relaxing neck and shoulder massage. Treatments do not include a blow-dry.",
    groups: [
      {
        items: [
          {
            name: "Nutriplenish Treatment Masque",
            price: "$25+",
            note: "Deep conditioning with essential nutrients for natural hydrated shine, never greasy.",
          },
          {
            name: "Botanical Repair Treatment",
            price: "$40+",
            note: "Repairs damage and rebuilds bonds — hair is 5× stronger after one service.",
          },
          {
            name: "Scalp Solutions Treatment",
            price: "$35+",
            note: "Exfoliates, moisturizes, and revitalizes the scalp.",
          },
        ],
      },
    ],
    footnote: "Complimentary Aveda Moment of Wellness with any service.",
  },
  {
    id: "men",
    title: "Mint Men",
    blurb:
      "Each cut includes consultation, neck and shoulder massage, and basic styling. Prices listed are starting rates.",
    groups: [
      {
        heading: "Dry Cuts",
        items: [
          { name: "Cut · Short to Clipper Length", price: "$30 — 55+" },
          { name: "Cut · Medium", price: "$35 — 60+" },
          { name: "Cut · Long", price: "$40 — 65+" },
          { name: "Cut · Extra Long", price: "$45 — 70+" },
        ],
      },
      {
        heading: "Haircut & Blow-Dry",
        items: [
          { name: "Cut · Short to Clipper Length", price: "$40 — 105+" },
          { name: "Cut · Medium", price: "$35 — 105+" },
          { name: "Cut · Long", price: "$50 — 110+" },
          { name: "Cut · Extra Long", price: "$55 — 115+" },
        ],
      },
      {
        heading: "Beard & Color",
        items: [
          { name: "Beard & Neck Trim", price: "$25 — 50+", note: "With consultation, hot towel, and basic style." },
          { name: "Grey Blending", price: "$40 — 65+", note: "Color with shampoo, hand massage, and basic style." },
        ],
      },
      {
        heading: "Children (Under 10)",
        items: [
          { name: "Cut", price: "$30 — 50+" },
          { name: "Cut with Shampoo", price: "$40 — 70+" },
        ],
      },
    ],
    footnote: "Complimentary Aveda Moment of Wellness with any cut or color service.",
  },
  {
    id: "texture",
    title: "Texture",
    blurb:
      "Smoothing and texture services tailored to your hair's natural rhythm. Pricing varies by length and stylist level.",
    groups: [
      {
        items: [
          { name: "Botanical Texture Smoothing", price: "Consultation required", note: "A frizz-reducing, shine-enhancing treatment for unruly hair." },
          { name: "Curl Definition Ritual", price: "Consultation required", note: "Hydration and definition for natural waves, curls, and coils." },
          { name: "Texture Reset", price: "Consultation required", note: "A custom blend of repair and texture re-shaping for over-processed hair." },
        ],
      },
    ],
    footnote: "We pair every texture service with a complimentary consultation to ensure the right approach for your hair.",
  },
  {
    id: "specialty",
    title: "Specialty",
    blurb: "Quiet finishing touches before you walk out the door.",
    groups: [
      {
        items: [
          { name: "Brow Wax", price: "$22+" },
          { name: "Lip Wax", price: "$15+" },
          { name: "Chin Wax", price: "$20+" },
          { name: "Brow Tinting", price: "$20+" },
        ],
      },
    ],
  },
  {
    id: "new-guest",
    title: "New Guest",
    blurb:
      "$50 toward your first service at Mint, valid with select artists. A small welcome to make trying something new feel easy.",
    groups: [
      {
        items: [
          {
            name: "$50 New Client Gift",
            price: "Welcome offer",
            note: "Mention this when booking. Valid with select artists.",
          },
          {
            name: "New Guest Consultation",
            price: "Complimentary",
            note: "Twenty unhurried minutes with one of our master artists before your first service.",
          },
        ],
      },
    ],
  },
  {
    id: "referrals",
    title: "Referrals",
    blurb:
      "For the love of hair artistry. Refer a friend and you'll both receive $50 toward your next service.",
    groups: [{ items: [{ name: "Referral Credit", price: "$50 each", note: "Applied to your next visit." }] }],
  },
];

export type Artist = {
  id: string;
  name: string;
  role: string;
  level: string;
  specialties: string[];
  bestFor: string;
  note: string;
  image: string;
};

export const ARTISTS: Artist[] = [
  {
    id: "sonia",
    name: "Sonia",
    role: "Master Stylist",
    level: "Level 8",
    specialties: ["Precision Cutting", "Modern Layering", "Editorial Blowouts"],
    bestFor: "Loyal guests who want their best haircut, every visit, for fifteen years and counting.",
    note: "Quietly precise. Sonia reads a head of hair like a sculptor reads stone — she'll find the cut you didn't know you wanted.",
    image: "/images/artist-1.png",
  },
  {
    id: "marisa",
    name: "Marisa",
    role: "Master Colorist",
    level: "Level 8",
    specialties: ["Dimensional Color", "Balayage", "Color Correction"],
    bestFor: "Guests in pursuit of color that looks like it grew there. Specialty: rich, lived-in dimension.",
    note: "Marisa designs color the way a painter mixes pigment — never matching a swatch, always matching you.",
    image: "/images/artist-2.png",
  },
  {
    id: "ashley",
    name: "Ashley",
    role: "Senior Stylist",
    level: "Level 6",
    specialties: ["Blowouts", "Special Occasion", "Soft Layered Cuts"],
    bestFor: "First impressions, weddings, anniversaries — and the everyday days that just need to feel like one.",
    note: "Ashley turns a blowout into the entire experience. Equal parts conversation and craft.",
    image: "/images/artist-3.png",
  },
  {
    id: "maribel",
    name: "Maribel",
    role: "Senior Colorist",
    level: "Level 6",
    specialties: ["Highlights", "Blonding", "Sleek Finishing"],
    bestFor: "Anyone considering their first set of highlights, or a fresh blonde direction.",
    note: "Maribel asks all the right questions before lifting a single foil. Her blonding work is luminous and patient.",
    image: "/images/artist-4.png",
  },
];

export type Review = { name: string; date: string; text: string };

export const REVIEWS: Review[] = [
  { name: "Eva W.", date: "May 2026", text: "Best salon in the United States. No one can do color like Marisa. So much talent in all of the Master Stylists there!" },
  { name: "Barbara W.", date: "May 2026", text: "Maribel was so friendly and made me feel at home. She did an EXCELLENT job coloring, cutting and blow-drying my hair." },
  {
    name: "Jean L.",
    date: "May 2026",
    text: "I've been loyal to the Mint location on Park Avenue for 15 years. I always walk out feeling like my head looks the best it could be. Sonia is my master stylist, and she does whatever she thinks looks best on me — I'm pleased every time. Clean, beautiful, newly renovated. Can't say enough good things.",
  },
  { name: "Jim H.", date: "May 2026", text: "Good haircut. Good conversation." },
  {
    name: "Glen S.",
    date: "May 2026",
    text: "Ashley is the best. I met her at a restaurant bar and we started talking — I said I needed a haircut and she said that's what she does and she introduced me to Mint. Best place I've found.",
  },
  { name: "Anna R.", date: "April 2026", text: "Love my hair — all very good!! Thank you." },
  { name: "Frank D.", date: "April 2026", text: "Superb haircut in pleasant surroundings. I might have to fly back from Milwaukee just to get your special touch!" },
  { name: "Emily Q.", date: "April 2026", text: "Always leave feeling refreshed and ready to show off my hair!" },
  { name: "Rhonda C.", date: "April 2026", text: "Sonia is always spot on and wonderful. Thank you!" },
  { name: "Nancy L.", date: "April 2026", text: "Wonderful as always, and all the employees at Mint are just the greatest." },
  { name: "Renee W.", date: "April 2026", text: "Sonia is great!" },
  { name: "Lisa H.", date: "April 2026", text: "Friendly, professional, welcoming." },
  {
    name: "Erika V.",
    date: "April 2026",
    text: "Today was my first time with Maribel — she didn't disappoint. Her skill and years of experience were apparent in the observations and questions she asked. She gave me beautiful blonde highlights, a great cut, and a smooth, sleek blowout. Thank you.",
  },
  { name: "Jennifer M.", date: "April 2026", text: "Excellent blowout by Ashley." },
  { name: "Ramona T.", date: "April 2026", text: "I am a total Sonia fan! No one else touches my hair and I drive 45 minutes to get to her!" },
  {
    name: "Corbin S.",
    date: "April 2026",
    text: "The best place to get anything hair-related done in Orlando. The service is phenomenal from the moment you walk in to the moment you leave. The staff is so kind and easy to talk to. I've been a customer for two years and can't wait for my next visit.",
  },
];

export type LookbookItem = { id: string; image: string; tag: string; title: string };

export const LOOKBOOK: LookbookItem[] = [
  { id: "l1", image: "/images/lookbook-1.png", tag: "Color", title: "Sun-stroked dimensional brunette" },
  { id: "l2", image: "/images/lookbook-2.png", tag: "Texture", title: "Soft natural waves, defined" },
  { id: "l3", image: "/images/lookbook-3.png", tag: "Blonding", title: "Modern face-framing balayage" },
  { id: "l4", image: "/images/lookbook-4.png", tag: "Cut", title: "Effortless modern bob" },
  { id: "l5", image: "/images/lookbook-5.png", tag: "Texture", title: "Voluminous coils, hydrated" },
  { id: "l6", image: "/images/lookbook-6.png", tag: "Event Hair", title: "Sleek bridal chignon" },
  { id: "l7", image: "/images/service-design.png", tag: "Cut", title: "Architectural long layers" },
  { id: "l8", image: "/images/service-color.png", tag: "Color", title: "Editorial copper transformation" },
  { id: "l9", image: "/images/philosophy.png", tag: "Transformations", title: "Refresh, head to ends" },
  { id: "l10", image: "/images/hero.png", tag: "Color", title: "Lived-in honey blonde" },
];

export const LOOKBOOK_FILTERS = ["All", "Color", "Blonding", "Texture", "Cut", "Event Hair", "Transformations"];

export const VALUES = [
  {
    title: "Environmental Leadership",
    body: "We measure water, energy, and waste like we measure a perfect cut — by hand and with intention. Every product we use is plant-powered, every backbar choice considered.",
  },
  {
    title: "Community Outreach",
    body: "Mint has been part of Park Avenue for decades. We believe a salon belongs to the neighborhood it sits in — through fundraisers, education days, and quiet acts that don't need a press release.",
  },
  {
    title: "Inclusivity",
    body: "Every hair type, every life stage, every story walks through our door. Our chairs are not curated — they are open.",
  },
  {
    title: "Excellence Without Ego",
    body: "Master craft, none of the attitude. We're proud of our work and even prouder of how guests feel when they leave.",
  },
];

export const BOOKING_INTENTS = [
  { id: "new-guest", title: "New Guest Refresh", note: "Your first visit, beautifully guided." },
  { id: "haircut", title: "Haircut & Design", note: "A precision cut tailored to you." },
  { id: "color", title: "Color", note: "Single process, highlights, balayage, and beyond." },
  { id: "treatment", title: "Treatment & Scalp Ritual", note: "Botanical repair and Aveda wellness." },
  { id: "texture", title: "Texture", note: "Smoothing, definition, and curl care." },
  { id: "occasion", title: "Special Occasion", note: "Upstyles, weddings, gatherings." },
  { id: "unsure", title: "Not Sure Yet", note: "We'll help you find the right place to begin." },
];
