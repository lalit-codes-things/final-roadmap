// script.js - Scroll progress, animated counters, staggered reveals
// Maintains existing functionality with improved maintainability

document.addEventListener('DOMContentLoaded', () => {
  // Scroll Progress Bar
  // Updates progress bar width as user scrolls down page
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      try {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
      } catch (error) {
        console.error('Progress bar error:', error);
      }
    });
  }

  // Animated Counters
  // Counts up numbers with smooth animation when element comes into view
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        try {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 80;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
              } else {
                el.textContent = Math.floor(current);
              }
            }, 20);
            
            counterObserver.unobserve(el);
          }
        } catch (error) {
          console.error('Counter animation error:', error);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(c => counterObserver.observe(c));
  }

  // Staggered Reveal Animation
  // Fades in and slides up cards/items as they come into view
  if ('IntersectionObserver' in window) {
    const items = document.querySelectorAll(
      '.card, .bento-item, .timeline-item, .project-card, .role-card, .what-card, .moat-card, .progression-card, .philosophy-card'
    );
    
    if (items.length > 0) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          try {
            if (entry.isIntersecting) {
              // Stagger animation: each item appears 60ms after previous
              setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
              }, index * 60);
              
              revealObserver.unobserve(entry.target);
            }
          } catch (error) {
            console.error('Reveal animation error:', error);
          }
        });
      }, { threshold: 0.1 });

      items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(item);
      });
    }
  }
});
