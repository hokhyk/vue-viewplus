export const ease = {
  swipe: { // easeOutQuint
    style: 'cubic-bezier(0.23, 1, 0.32, 1)',
    fn: function (t) {
      return 1 + (--t * t * t * t * t)
    }
  },
  swipeBounce: { // easeOutQuard
    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fn: function (t) {
      return t * (2 - t)
    }
  },
  bounce: { // easeOutQuart
    style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    fn: function (t) {
      return 1 - (--t * t * t * t)
    }
  }
}
