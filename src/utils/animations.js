import { animate, stagger } from 'animejs'

/**
 * Animate elements with a staggered slide-up and fade-in effect
 */
export function staggerFadeIn(targets, { delay = 0, staggerDelay = 80, duration = 700 } = {}) {
  if (!targets) return null
  return animate(targets, {
    opacity: [0, 1],
    translateY: [28, 0],
    duration,
    delay: stagger(staggerDelay, { start: delay }),
    ease: 'outQuad',
  })
}

/**
 * Animate hero section elements in sequence
 */
export function animateHeroEntrance(scopeSelector = '.hero-content') {
  const elements = [
    `${scopeSelector} .hero-badge`,
    `${scopeSelector} .hero-greeting`,
    `${scopeSelector} .hero-name`,
    `${scopeSelector} .hero-role`,
    `${scopeSelector} .hero-description`,
    `${scopeSelector} .hero-actions`,
    `${scopeSelector} .hero-stats`,
  ]

  const validElements = elements
    .map((sel) => document.querySelector(sel))
    .filter(Boolean)

  if (validElements.length === 0) return null

  return animate(validElements, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 650,
    delay: stagger(100, { start: 150 }),
    ease: 'outCubic',
  })
}

/**
 * Animate numerical count-up on a counter element
 */
export function animateCounter(element, targetValue, duration = 1600) {
  if (!element) return
  const isFloat = String(targetValue).includes('.')
  const numValue = parseFloat(targetValue) || 0

  const counterObj = { count: 0 }
  return animate(counterObj, {
    count: numValue,
    duration,
    ease: 'outExpo',
    onUpdate: () => {
      element.innerText = isFloat
        ? counterObj.count.toFixed(1)
        : Math.round(counterObj.count)
    },
  })
}

/**
 * Animate cards when a category filter tab changes
 */
export function animateFilterCards(cardsSelector = '.project-card') {
  const cards = document.querySelectorAll(cardsSelector)
  if (!cards.length) return null

  return animate(cards, {
    opacity: [0, 1],
    scale: [0.94, 1],
    translateY: [16, 0],
    duration: 450,
    delay: stagger(60),
    ease: 'outQuad',
  })
}

/**
 * Soft pulse effect for interactive accents
 */
export function animatePulse(target) {
  if (!target) return null
  return animate(target, {
    scale: [1, 1.05, 1],
    duration: 400,
    ease: 'easeInOutQuad',
  })
}

