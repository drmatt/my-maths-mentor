/**
 * One place for the site's settings and business details.
 * Everything here comes from the website brief in wattl (briefs/website-specification.md).
 */
export const site = {
  name: 'My Maths Mentor',

  /**
   * Draft mode adds `noindex`, shows the draft banner and allows "To confirm" notes on pages.
   * Set to false only when every launch check in README.md is done: the build fails while
   * any "To confirm" note remains, so nothing unverified goes live by accident.
   */
  draft: true,

  title: 'My Maths Mentor | Maths Confidence & KS3 Support in Stockport',
  description:
    'Patient, personal maths mentoring in Stockport with Emma Ryan. Building maths confidence and strong foundations for Years 7–9 and home-educated children. £40 per hour.',
  strapline: 'Confidence counts.',

  owner: 'Emma Ryan',
  price: 40,
  locality: 'Stockport',
  region: 'Greater Manchester',

  /** Proposed in the brief but not yet set up. Set emailConfirmed to true once it receives mail. */
  email: 'emma@mymathsmentor.co.uk',
  emailConfirmed: false,

  /** Formspree form ID: the last part of https://formspree.io/f/<id>. Empty means the form isn't connected. */
  formspreeId: '',
} as const;

export const formEndpoint = site.formspreeId ? `https://formspree.io/f/${site.formspreeId}` : '';
