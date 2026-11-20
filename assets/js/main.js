function global() {
  return {
    isMobileMenuOpen: false,
    isDarkMode: false,
    themeInit() {
      this.isDarkMode = document.documentElement.classList.contains('dark');
    },
    themeSwitch() {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle('dark', this.isDarkMode);
      try {
        sessionStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
      } catch (e) {}
    },
  };
}

// past deadlines (AoE)
document.querySelectorAll('tr[data-deadline]').forEach((row) => {
  const [y, m, d] = row.dataset.deadline.split('-').map(Number);
  if (Date.now() > Date.UTC(y, m - 1, d + 1, 12)) row.classList.add('past');
});

// slideshow
function slideshow(count, interval = 5000) {
  return {
    count: count,
    current: 0,
    timer: null,
    touchX: null,
    init() {
      this.play();
    },
    play() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.stop();
      this.timer = setInterval(() => this.next(), interval);
    },
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    },
    next() {
      this.current = (this.current + 1) % this.count;
    },
    prev() {
      this.current = (this.current - 1 + this.count) % this.count;
    },
    go(i) {
      this.current = i;
    },
    touchStart(e) {
      this.touchX = e.touches[0].clientX;
      this.stop();
    },
    touchEnd(e) {
      if (this.touchX === null) return;
      const dx = e.changedTouches[0].clientX - this.touchX;
      if (Math.abs(dx) > 40) dx < 0 ? this.next() : this.prev();
      this.touchX = null;
      this.play();
    },
  };
}
