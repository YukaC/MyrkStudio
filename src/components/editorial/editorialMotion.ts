/** Shared Motion tokens for editorial scroll reveals (Bunkr-style agency). */
export const EDITORIAL_EASE = [0.23, 1, 0.32, 1] as const;

export const EDITORIAL_VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -10% 0px",
} as const;

export function editorialContainerVariants(staggerChildren = 0.08) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren: 0.05 },
    },
  };
}

export const editorialItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EDITORIAL_EASE },
  },
};

export const editorialRevealTransition = (delay = 0) => ({
  duration: 0.7,
  delay,
  ease: EDITORIAL_EASE,
});
