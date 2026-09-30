/**
 * Whether the user has asked the operating system to reduce motion.
 *
 * @returns `true` if `prefers-reduced-motion: reduce` matches.
 */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scroll behavior that respects the user's reduced motion setting.
 *
 * @returns `'auto'` (instant) if reduced motion is preferred, otherwise `'smooth'`.
 */
export function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth';
}
