(() => {
  function enhanceFigures() {
    document.querySelectorAll('.md-typeset img[src*="assets/fig-"]').forEach((img) => {
      if (img.closest('a')) return;
      const link = document.createElement('a');
      link.className = 'note-figure';
      link.href = img.src;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', `查看原图：${img.alt}`);
      link.title = '在新标签页查看原图';
      const width = img.getAttribute('width');
      if (width) link.style.width = `${Number(width)}px`;
      img.parentNode.insertBefore(link, img);
      link.appendChild(img);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhanceFigures);
  else enhanceFigures();
})();
