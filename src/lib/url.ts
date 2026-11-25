/** Prefix a site path with the configured base (needed for github.io project previews). */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path = '/') => `${base}${path.startsWith('/') ? path : `/${path}`}`;
