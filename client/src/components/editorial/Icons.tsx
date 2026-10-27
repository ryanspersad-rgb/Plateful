// One stroke icon set (1.8 px, round caps), as in the reference build. No emoji anywhere in the app.
import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const, 'aria-hidden': true, ...p,
});

export const I = {
  home: (p: P = {}) => <svg {...base(p)}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>,
  tag: (p: P = {}) => <svg {...base(p)}><path d="M20.6 13.4L13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.2" /></svg>,
  list: (p: P = {}) => <svg {...base(p)}><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" strokeWidth={2.6} /></svg>,
  pin: (p: P = {}) => <svg {...base(p)}><path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>,
  user: (p: P = {}) => <svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>,
  search: (p: P = {}) => <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>,
  bookmark: (p: P = {}) => <svg {...base(p)}><path d="M6 3h12v18l-6-4-6 4z" /></svg>,
  bookmarkFill: (p: P = {}) => <svg {...base(p)}><path d="M6 3h12v18l-6-4-6 4z" fill="currentColor" /></svg>,
  chevR: (p: P = {}) => <svg {...base(p)}><path d="M9 6l6 6-6 6" /></svg>,
  chevL: (p: P = {}) => <svg {...base(p)}><path d="M15 6l-6 6 6 6" /></svg>,
  arrowR: (p: P = {}) => <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  check: (p: P = {}) => <svg {...base({ strokeWidth: 2.4, ...p })}><path d="M5 12l4 4L19 7" /></svg>,
  plus: (p: P = {}) => <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>,
  x: (p: P = {}) => <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>,
  camera: (p: P = {}) => <svg {...base(p)}><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>,
  leaf: (p: P = {}) => <svg {...base(p)}><path d="M12 3l2 4 4-1-1 4 4 2-4 2 1 4-4-1-2 4-2-4-4 1 1-4-4-2 4-2-1-4 4 1z" /><path d="M12 13v8" /></svg>,
  share: (p: P = {}) => <svg {...base(p)}><path d="M12 3v12M8 7l4-4 4 4" /><path d="M5 13v7h14v-7" /></svg>,
  map: (p: P = {}) => <svg {...base(p)}><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v14M15 6v14" /></svg>,
  barcode: (p: P = {}) => <svg {...base(p)}><path d="M4 6v12M8 6v12M11 6v12M14 6v12M17 6v12M20 6v12" /></svg>,
  flyer: (p: P = {}) => <svg {...base(p)}><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4M9 12h6M9 16h6" /></svg>,
  bell: (p: P = {}) => <svg {...base(p)}><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" /><path d="M10 21h4" /></svg>,
  link: (p: P = {}) => <svg {...base(p)}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5" /></svg>,
};

/** The Plateful mark: a cart with steam, ink stroke. */
export const CartMark = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 5h2.2l2.3 10.5h10.6L20 8H6" />
    <circle cx="9.2" cy="19.5" r="1.3" />
    <circle cx="16.3" cy="19.5" r="1.3" />
    <path d="M10.5 1.8c-.9 1-.1 1.6-.8 2.7M13.6 1.8c-.9 1-.1 1.6-.8 2.7M16.7 2.6c-.9 1-.1 1.6-.8 2.7" strokeWidth={1.2} />
  </svg>
);
