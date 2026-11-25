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

From the brief's outstanding decisions. Tick these off before setting `draft: false`.

- [ ] Approve the wording, colours, fonts and strapline (all still draft in the brief)
- [ ] DBS check details, verified, for the safeguarding page
- [ ] Safeguarding arrangements: who stays during sessions, drop-off and collection, raising a concern
- [ ] Insurance
- [ ] Cancellation policy (not on the site yet; add to Sessions or the FAQs once decided)
- [ ] Session availability
- [ ] Privacy notice reviewed: ICO fee, email provider, how long enquiries are kept, date it takes effect
- [ ] Email address set up; then set `emailConfirmed: true`
- [ ] Formspree connected and tested end to end
- [ ] Photos: a relaxed portrait of Emma, and landmark photos with the rights to use them (or decide to keep the
      illustrations and remove their `todo` tags)
- [ ] If the viaduct becomes a photo, check the real arch shape before showing the circle equation on it
- [ ] Logo: the lowercase wordmark and the favicon are placeholders, as no logo is on record yet
- [ ] Set `draft: false`, build, deploy
- [ ] Check on a phone, keyboard-only navigation, form success and error states, the `.com` redirect, the share
      preview, then submit `https://mymathsmentor.co.uk/sitemap.xml` in Google Search Console

## Notes

- No cookies, analytics or third-party trackers. Fonts are self-hosted.
- Search: page titles and descriptions, canonical URLs, Open Graph tags, `sitemap.xml`, `robots.txt`, and
  `LocalBusiness` and `FAQPage` structured data. Sessions are described as mentoring, with "tutor" used naturally for search.
- Motion is gentle and switches off when a visitor's device asks for reduced motion.
- Emma's home address is never published.
