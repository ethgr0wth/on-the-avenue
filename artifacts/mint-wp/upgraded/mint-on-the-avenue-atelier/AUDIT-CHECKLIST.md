# Mint on the Avenue — Audit Remediation Status

This file tracks what the v2.5.0 theme update fixed automatically, and what still
requires action in WP-Admin or with a content/legal/marketing decision.

---

## ✅ FIXED IN v2.5.0 (no action needed once theme is uploaded)

| # | Audit ID | Fix |
|---|----------|------|
| 1 | CRIT-01 | REST API namespace lockdown (`wordfence`, `wpe`, `seopress`, `wp/v2/users`, `duplicate-post`) for unauthenticated users |
| 2 | CRIT-01 | REST API index `/wp-json/` no longer lists all routes publicly |
| 3 | CRIT-01 | Author enumeration via `?author=N` blocked |
| 4 | CRIT-04 | Security headers sent: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS |
| 5 | CRIT-05 | `/our-artists`, `/artists` → 301 to `/about/meet-the-team/` |
| 5b | MED | `/services/mens` → `/services/mint-men/`, `/services/color` → `/services/hair-color/`, `/specials/new-guests` → `/services/new-guest-special/` |
| 6 | CRIT-06 | Plaintext emails in content auto-obfuscated with `antispambot()` |
| 7 | MED-01 | Default meta description fallback when SEOPress is empty |
| 8 | MED-09 | Schema.org `HairSalon` (homepage) + `Organization` (inner pages) JSON-LD |
| 9 | MED-10 | Open Graph + Twitter Card meta with branded cover image |
| 10 | 12.2   | Mixed-content `http://imaginalhosting.com` and `http://mintontheavenue.com` rewritten to `https://` |
| 11 | MIN-05 | All external links auto-tagged `target="_blank" rel="noopener noreferrer"` |
| 12 | Perf   | All content `<img>` tags auto-tagged `loading="lazy" decoding="async"` |
| 13 | A11Y-01 | Default alt text fallback when missing (uses image title or site name) |
| 14 | A11Y-05 | All nav/footer/CTA elements meet 44×44 minimum touch target |
| 15 | A11Y    | Visible `:focus-visible` keyboard outline on every interactive element |
| 16 | A11Y-03 | Honeypot anti-spam fields hidden properly (off-screen, not `display:none`) |
| 17 | CRO P1 | Sticky mobile "Book Appointment" CTA at bottom of screen |
| 18 | MIN-01 | Footer copyright year already dynamic (`date('Y')`) |
| 19 | Info disclosure | `<meta name="generator">` WordPress version tag removed |
| 20 | MED-05 | Footer Artists link now points to `/about/meet-the-team/` (was broken `/our-artists`) |

---

## ⚠️ REQUIRES WORDPRESS ADMIN ACTION

### CRIT-02: Meet the Team page is empty
**The `/about/meet-the-team/` page returns "Sorry, none of our team members…"**
This is data, not a theme bug. Likely cause: ACF "Team Member" CPT entries are
unpublished, missing taxonomy assignment, or filtered to a category that has no
posts.

**To fix:**
1. WP-Admin → Team Members (or whatever the CPT label is)
2. Verify each stylist post is **Published** (not Draft)
3. If a category/taxonomy filter exists on the page template, make sure stylists
   are assigned to the displayed category
4. If using ACF flexible content, make sure the team grid block is added to the page

### CRIT-03: Conflicting new guest offers
Three different offers across three pages:
- Home: "20% OFF NEW CLIENT GIFT" (select artists)
- Services: "$50 off" (Marisa, Erin, Alexus, Caleb)
- New Guests special: "20% off service charges" (Marisa, Sonia, Maribel, Ashley)

**To fix:** Pick ONE offer + ONE artist list, then update all three pages in
WP-Admin → Pages.

### MED-03: No prices on services page
Add "Starting at $XX" to each service tile in WP-Admin → Pages → Services.

### MED-04: Stale blog (last post June 2022)
Either resume monthly blogging OR remove the "Notes from the Salon" section
from the homepage and the Blog item from main nav.

### MED-06: Hours inconsistency
Footer says "Tuesday — Friday · 9 — 8, Saturday · 9 — 6" but Contact page says
"Tue 10–6, Wed 10–6, Thu 10–8, Fri 10–8, Sat 9–5". Pick the correct hours and
update both the Contact page AND the footer (footer hours are hardcoded in the
theme — tell us which set is correct and we'll align them).

### MED-08: Privacy policy outdated (last updated July 2020)
Have legal counsel update for current state privacy laws.

### CRIT-06 (cont.): Move off `mintontheavenue@gmail.com`
Set up `contact@mintontheavenue.com` (Google Workspace or WP Engine email) and
swap it everywhere it's referenced in WP-Admin → Pages → Contact.

### Robots.txt sitemap mismatch
robots.txt points to `/sitemaps.xml` but the actual sitemap is at `/sitemap.xml`.
Fix in WP Engine → Domains/SSL → robots.txt editor, or via SEOPress robots
settings.

### Fix Shop Aveda menu item attribute
WP-Admin → Appearance → Menus → click "Shop Aveda" → clear the **Title
Attribute** field (this kills an unwanted popup that's been hiding our menu).

---

## 📋 NICE-TO-HAVE / FUTURE

- [ ] Embed Phorest booking widget on-site (currently external redirect)
- [ ] Add real Google review aggregate to reviews page (review schema)
- [ ] Build FAQ page with FAQPage schema
- [ ] Image optimization pipeline (WebP, srcset) — WP Engine has built-in tooling
- [ ] Custom branded 404 page (theme already has `404.php`, can be styled further)
- [ ] Update old blog posts referencing "Bangz Park Avenue Salon" (rebrand history)

---

## How to verify after upload

1. Activate theme → WP Engine → Caches → **Purge All Caches**
2. View source on homepage → confirm `mint-v2.css?ver=2.5.0-audit-...`
3. Visit `https://mintontheavenue.com/wp-json/wordfence/v1/` → should see `401`
4. Visit `https://mintontheavenue.com/our-artists` → should 301 to `/about/meet-the-team/`
5. Run [securityheaders.com](https://securityheaders.com) on your domain → expect A grade
