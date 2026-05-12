# Mint on the Avenue — WordPress Theme
## Installation Guide for WP Engine

### 1. Upload the Theme

1. Log in to your WP Engine dashboard
2. Go to **Sites → [your site] → WP Admin**
3. In WordPress Admin: **Appearance → Themes → Add New → Upload Theme**
4. Upload `mint-on-the-avenue.zip`
5. Click **Activate**

---

### 2. Add Your Images

Replace the placeholder image files in `assets/images/` with your real photos:

| Filename | Used for |
|---|---|
| `hero.jpg` | Hero left panel (hair styling) |
| `atmosphere.jpg` | Hero right panel (botanical/spa) |
| `lookbook-1.jpg` through `lookbook-8.jpg` | Lookbook gallery |
| `artist-1.jpg` | Sonia |
| `artist-2.jpg` | Marisa |
| `artist-3.jpg` | Ashley |
| `artist-4.jpg` | Maribel |
| `og-default.jpg` | Social sharing fallback (1200×630) |
| `logo.png` | Schema / structured data logo |

---

### 3. Set Up Menus

1. Go to **Appearance → Menus**
2. Create a menu named **"Primary"** — assign to the **Primary Navigation** location
3. Create a menu named **"Footer"** — assign to the **Footer Navigation** location
4. Recommended primary menu items:
   - Services → `/services`
   - Artists → `/artists`
   - Lookbook → `/lookbook`
   - New Guests → `/new-guests`
   - Reviews → `/reviews`
   - Visit → `/visit`

---

### 4. Create Pages with Page Templates

Create the following pages and assign the matching template under **Page Attributes → Template**:

| Page Title | Slug | Template |
|---|---|---|
| Home | *(set as front page)* | *(default, no template)* |
| Services | `services` | Services Page |
| Artists | `artists` | Artists Page |
| Lookbook | `lookbook` | Lookbook Page |
| New Guests | `new-guests` | New Guests Page |
| Reviews | `reviews` | Reviews Page |
| Visit | `visit` | Visit Page |
| Gift Cards | `gift-cards` | Gift Cards Page |
| Philosophy | `philosophy` | Philosophy Page |

Then go to **Settings → Reading** and set **"A static page"** → select **Home** as the front page.

---

### 5. Set Your Booking URL

1. Go to **Appearance → Customize → Mint Theme Options**
2. Paste your Fresha, Booksy, or Vagaro booking link
3. All "Book Appointment" buttons update automatically

---

### 6. Set Hero Images via Customizer (optional)

In **Appearance → Customize → Mint Theme Options** you can swap the hero left/right images and edit the eyebrow text without touching any files.

---

### 7. Yoast SEO (Recommended)

Install the **Yoast SEO** plugin. The theme:
- Automatically disables its own Open Graph meta if Yoast is active
- Outputs `LocalBusiness` JSON-LD schema on the front page (independent of Yoast)
- Uses `title-tag` theme support so Yoast can control `<title>`

---

### 8. SEO Preservation Checklist

- [ ] Confirm all existing page slugs match the ones in the menu table above
- [ ] If any old slugs differ, add redirects via **WP Engine → Redirect Rules** or the **Redirection** plugin
- [ ] Submit updated sitemap to Google Search Console after activation
- [ ] Verify canonical URLs in Yoast after setup
- [ ] Check Google Search Console for any coverage errors 48 hrs after launch

---

### WP Engine–Specific Notes

- No object caching conflicts — theme uses no transients or custom caching
- Compatible with WP Engine's EverCache
- No server-side rendering dependencies; all assets are static HTML/CSS/JS
- GSAP loaded from Cloudflare CDN (no self-hosting required)
- Google Fonts loaded via `wp_enqueue_style` with `null` version to prevent cache-busting conflicts
