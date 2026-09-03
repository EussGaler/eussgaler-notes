(() => {
  const phrases = [
    "我们的头脑比天空更辽阔。",
    "在大海中生存的鱼，不知晓陆上的世界。",
    "如若它们拥有智慧，也终将因此灭亡。",
    "拥有智慧之人才是最为愚蠢者。",
    "那是一个什么都没有，同时什么也不缺的世界。",
    "祈祷就是思考人生的意义。",
    "如果命运是一张蛛网，独立与自由就像蛛网上的蛛丝那般有迹可循。",
    "我们就像蝴蝶，翩翩起舞一天，却以为白昼即永恒。",
    "丰沛真诚的爱是一种粘稠的毒药。"
  ];

  function initHome() {
    const shell = document.querySelector(".home-shell");
    if (!shell) return;

    document.body.classList.add("home-page");

    const backdrop = document.querySelector(".home-backdrop");
    const canvas = document.querySelector(".home-rain");
    const rotatingText = document.querySelector(".home-rotating-text");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrowScreen = window.matchMedia("(max-width: 720px)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    let phraseIndex = 0;
    let phraseTimer = 0;
    let drops = [];
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    function motionEnabled() {
      return !reduceMotion.matches && !narrowScreen.matches;
    }

    function setPointerTarget(event) {
      if (!motionEnabled() || !finePointer.matches) return;
      const horizontal = event.clientX / window.innerWidth - 0.5;
      const vertical = event.clientY / window.innerHeight - 0.5;
      targetX = horizontal * -52;
      targetY = vertical * -34;
    }

    function resetPointerTarget() {
      targetX = 0;
      targetY = 0;
    }

    function makeDrop(initial = false) {
      const length = 40 + Math.random() * 54;
      return {
        x: Math.random() * (viewportWidth + 120) - 60,
        y: initial ? Math.random() * viewportHeight : -length - Math.random() * 120,
        length,
        speed: 440 + Math.random() * 360,
        alpha: 0.15 + Math.random() * 0.17,
        width: 1.05 + Math.random() * 1.05
      };
    }

    function resizeRain() {
      if (!canvas) return;
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(viewportWidth * ratio);
      canvas.height = Math.round(viewportHeight * ratio);
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
      const context = canvas.getContext("2d");
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = motionEnabled()
        ? Math.max(28, Math.min(64, Math.round(viewportWidth / 34)))
        : 0;
      drops = Array.from({ length: count }, () => makeDrop(true));
    }

    let lastTime = performance.now();

    function render(time) {
      const delta = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;

      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;

      if (backdrop && motionEnabled()) {
        backdrop.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) scale(1.05)`;
      }

      if (canvas && drops.length) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, viewportWidth, viewportHeight);
        context.lineCap = "round";

        for (let index = 0; index < drops.length; index += 1) {
          const drop = drops[index];
          drop.y += drop.speed * delta;
          drop.x -= drop.speed * delta * 0.11;

          if (drop.y - drop.length > viewportHeight || drop.x < -80) {
            drops[index] = makeDrop(false);
            continue;
          }

          const gradient = context.createLinearGradient(
            drop.x,
            drop.y - drop.length,
            drop.x - drop.length * 0.11,
            drop.y
          );
          gradient.addColorStop(0, "rgba(245, 250, 249, 0)");
          gradient.addColorStop(0.4, `rgba(248, 252, 251, ${drop.alpha * 0.78})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${drop.alpha})`);
          context.strokeStyle = gradient;
          context.lineWidth = drop.width;
          context.beginPath();
          context.moveTo(drop.x, drop.y - drop.length);
          context.lineTo(drop.x - drop.length * 0.11, drop.y);
          context.stroke();
        }
      }

      frame = window.requestAnimationFrame(render);
    }

    function restartAnimation() {
      window.cancelAnimationFrame(frame);
      if (document.hidden) return;
      lastTime = performance.now();
      frame = window.requestAnimationFrame(render);
    }

    function rotatePhrase() {
      if (!rotatingText || reduceMotion.matches) return;
      rotatingText.classList.add("is-changing");
      window.setTimeout(() => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        rotatingText.textContent = phrases[phraseIndex];
        rotatingText.classList.remove("is-changing");
      }, 220);
    }

    function handleMotionPreference() {
      if (!motionEnabled()) {
        resetPointerTarget();
        currentX = 0;
        currentY = 0;
        if (backdrop) backdrop.style.transform = "scale(1.02)";
      }
      resizeRain();
    }

    window.addEventListener("pointermove", setPointerTarget, { passive: true });
    document.documentElement.addEventListener("mouseleave", resetPointerTarget);
    window.addEventListener("resize", resizeRain, { passive: true });
    document.addEventListener("visibilitychange", restartAnimation);
    reduceMotion.addEventListener("change", handleMotionPreference);
    narrowScreen.addEventListener("change", handleMotionPreference);

    resizeRain();
    phraseTimer = window.setInterval(rotatePhrase, 5200);
    restartAnimation();

    window.addEventListener("pagehide", () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(phraseTimer);
    }, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHome, { once: true });
  } else {
    initHome();
  }
})();
