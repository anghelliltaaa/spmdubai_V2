import type { Variants } from 'framer-motion';

// Shared easing curves
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export const slideUp: Variants = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
};

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -52, filter: 'blur(3px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
};

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 52,  filter: 'blur(3px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
};

export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.88, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export const cardHover = {
  rest:  { y: 0,  boxShadow: '0 4px 20px rgba(0,0,0,0.10)' },
  hover: { y: -8, boxShadow: '0 20px 48px rgba(201,168,76,0.16)', transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
};

// Stagger children with a slight upward drift
export const listItem: Variants = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

export const staggerList: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
