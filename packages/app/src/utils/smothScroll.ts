export const smoothScroll = <T extends HTMLElement>(ref: T | null): void =>
  ref?.scrollIntoView({
    behavior: 'smooth',
  });
