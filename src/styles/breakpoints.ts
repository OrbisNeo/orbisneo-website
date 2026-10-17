export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const mediaBelow = (bp: Breakpoint): string =>
  `(max-width: ${breakpoints[bp] - 0.02}px)`;

export const mediaFrom = (bp: Breakpoint): string =>
  `(min-width: ${breakpoints[bp]}px)`;
