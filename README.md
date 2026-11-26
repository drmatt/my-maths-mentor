# My Maths Mentor website

The marketing site for **My Maths Mentor**, Emma Ryan's maths mentoring service in Stockport. It's built from the
website brief in wattl (`briefs/website-specification.md`, still a draft), with [Astro](https://astro.build) as a
fast static site, and hosted on **GitHub Pages**.

The site is in **draft mode** until the launch checklist below is done.

## Run it locally

You need Node 24 (Astro 7 needs Node 22.23.4 or newer; `.nvmrc` pins 24).

```bash
nvm use
npm install
npm run dev
```

Then open <http://localhost:4321>. `npm run build` writes the finished site to `dist/`.

## Where things are

| What | Where |
| --- | --- |
| Business details, email, Formspree ID, draft switch | `src/site.config.ts` |
| Home page sections (copy lives here) | `src/components/sections/` |
| FAQs (also used for search-engine structured data) | `src/data/faqs.ts` |
| Annotated Stockport sketches | `src/components/sketches/` |
| Real photos (picked up automatically) | `src/assets/photos/` (see the README there) |
| Privacy and safeguarding pages | `src/pages/privacy.astro`, `src/pages/safeguarding.astro` |
| Colours, fonts, layout | `src/styles/global.css` |
| Social share image | `public/og-image.png` (regenerate with `npm run og`, needs Chrome) |
| Deploy workflow | `.github/workflows/deploy.yml` |

## Draft mode and “To confirm” notes

While `draft: true` in `src/site.config.ts`:

- every page has `noindex`, so search engines won't list a preview;
- a banner says it's a draft preview;
- anything unverified shows as a dashed **To confirm** note (email, form, safeguarding details, privacy details, photos).

Setting `draft: false` makes the build **fail** while any To confirm note remains, so nothing unverified can go live
by accident. Resolve each note (fill in the real detail and delete the `<ToConfirm>` block, or add the photo) first.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this folder to its `main` branch.
2. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` builds and deploys the site. Until a custom domain is set it's at
   `https://<username>.github.io/<repository>/`; the workflow handles that sub-path automatically.
4. **Custom domain.** In **Settings → Pages → Custom domain**, enter `mymathsmentor.co.uk`. At the domain registrar, add:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` records for `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - a `CNAME` record for `www` pointing to `<username>.github.io`

   When GitHub has issued the certificate, tick **Enforce HTTPS**. It's also worth verifying the domain in your GitHub
   account settings (Pages → Verified domains) so nobody else can claim it.
5. **mymathsmentor.com.** GitHub Pages serves one custom domain per site, so set up a permanent (301) redirect from
   the `.com` to `https://mymathsmentor.co.uk` using the `.com` registrar's domain forwarding.

GitHub Pages has no server, which is fine for this site: the only dynamic part is the enquiry form, and Formspree
handles that.

## Connect the enquiry form

1. Create a form at [formspree.io](https://formspree.io) that delivers to Emma's email address.
2. Copy the form ID (the last part of `https://formspree.io/f/<id>`) into `formspreeId` in `src/site.config.ts`.
3. Send a test enquiry from the live site and check it arrives.

The form validates fields, shows clear error and success messages, includes a spam honeypot, and still works without
JavaScript. It deliberately doesn't ask for a child's name, date of birth or medical details.

## Launch checklist

Confirmed on 25 November 2026: the wording, design (palette, fonts, strapline “Confidence counts.”) and the lowercase
text wordmark are approved; the landmark illustrations stay; parents can stay or drop off; concerns go to Emma, who
has safeguarding training through the FE lecturing role; enquiries that don't lead to sessions are deleted after 6 months.

Still to do before setting `draft: false` (each one is a “To confirm” note on the site):

- [ ] Set up `emma@mymathsmentor.co.uk`, then set `emailConfirmed: true` in `src/site.config.ts`
- [ ] Create the Formspree form and add its ID to `src/site.config.ts`, then send a test enquiry
- [x] Portrait of Emma added as `src/assets/photos/emma.jpg` (26 November 2026)
- [ ] Privacy notice: check the ICO data protection fee (ICO self-assessment) and add the registration number if needed
- [ ] Privacy notice: name the email provider once chosen
- [ ] Privacy notice: add the date it takes effect
- [ ] Connect `mymathsmentor.co.uk` (see “Deploy to GitHub Pages”) and forward the `.com`
- [ ] Set `draft: false`, build, push, then check on a phone, the form, the share preview, and submit
      `https://mymathsmentor.co.uk/sitemap.xml` in Google Search Console

Left off the site for now, by choice. Add them when they're in place:

- DBS check (none yet). Only publish it once the certificate is through.
- Insurance (not arranged yet)
- Cancellation policy (agreed with each family directly)

## Notes

- No cookies, analytics or third-party trackers. Fonts are self-hosted.
- Search: page titles and descriptions, canonical URLs, Open Graph tags, `sitemap.xml`, `robots.txt`, and
  `LocalBusiness` and `FAQPage` structured data. Sessions are described as mentoring, with "tutor" used naturally for search.
- Motion is gentle and switches off when a visitor's device asks for reduced motion.
- Emma's home address is never published.
