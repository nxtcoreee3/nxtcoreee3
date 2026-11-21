/**
 * nxtcoreee3 × nitera · Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  const referralUrl = 'https://nitera.cc/r/nxtcoreee3';

  // 1. Copy Referral Link Functionality
  const copyBtn = document.getElementById('copy-btn');
  const copyText = document.getElementById('copy-text');

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(referralUrl);
        copyText.textContent = 'Copied! ✓';
        copyBtn.style.background = '#10b981';
        copyBtn.style.color = '#ffffff';

        setTimeout(() => {
          copyText.textContent = 'Copy';
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    });
  }

  // 2. Check for ?redirect=true query param (optional auto-redirect behavior)
  const urlParams = new URLSearchParams(window.location.search);
  const toast = document.getElementById('redirect-toast');
  const countdownEl = document.getElementById('countdown');
  const cancelBtn = document.getElementById('cancel-redirect');

  if (urlParams.get('redirect') === 'true' && toast && countdownEl) {
    toast.classList.remove('hidden');
    let timeLeft = 3;
    let timer = setInterval(() => {
      timeLeft--;
      if (countdownEl) countdownEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        window.location.href = referralUrl;
      }
    }, 1000);

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        clearInterval(timer);
        toast.classList.add('hidden');
      });
    }
  }

  // 3. Smooth scrolling for hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 4. Subtle interactive card tilt effect on desktop
  const cards = document.querySelectorAll('.card, .pricing-card');
  if (window.matchMedia('(pointer: fine)').matches) {
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }
});
