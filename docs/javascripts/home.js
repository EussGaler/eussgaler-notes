(() => {
  const phrases = [
    "我们的头脑比天空更辽阔。",
    "在大海中生存的鱼，不知晓陆上的世界。如若它们拥有智慧，也终将因此灭亡。拥有智慧之人才是最为愚蠢者。",
    "复仇是一场愚蠢的游戏。",
    "那是一个什么都没有，同时什么也不缺的世界。",
    "祈祷就是思考人生的意义。",
    "如果命运是一张蛛网，独立与自由就像蛛网上的蛛丝那般有迹可循。",
    "我们就像蝴蝶，翩翩起舞一天，却以为白昼即永恒。",
    "停止的时间又再次流动，我们会在绝无交汇的路上走下去。",
    "“把这些都统统忘掉，去过和别人一样的生活，但也不要被埋没了，坚强地活下去吧。”",
    "“‘自己和其他人不一样’虽然经常会有人这么说，但几乎都是错觉。大家是连这件事都察觉不到的情弱。”",
    "踏上舞台吧。",
    "小时候，我以为世界更加单纯一点。没有赢不了的游戏，努力就会有回报。",
    "我们总会在今天的十字路口上陷入迷茫，无法径直去往明天。",
    "半吊子的诗篇或许会令人感到不快，但没人会嘲笑作者想要表达些什么的愿望。",
    "丰沛真诚的爱是一种粘稠的毒药。",
    "当一个灵魂深陷在虔信中，它逐渐就失去对现实的意义、趣味、需要与爱好。",
    "每一殷勤，每一矫饰，都期许着一条皱纹。",
    "生命进程等于记忆进程，多多记录能让自己更加长寿。",
    "只要能够活着，那就活下去吧。不要把活下去这件事想成是辛苦、可耻的。只要能活下去，就一定会遇到好事的。",
    "连抛下故乡的理由都搞不清，却爱上旅行的目的地，这并非正经人士能做到的事。",
    "有人全盘接受一切，实际上却什么都没得到；有人看似放弃了一切，实际上却没失去任何东西。",
    "后悔不是因为觉得而存在，而是为了消除而存在的。",
    "如果只属于今天的景色，能在回忆中永远美丽下去。留存至今的几处悔恨，与如群星般闪耀的日子，今后还会有吗？",
    "丢掉的感情如何不是消失着的秋色？",
    "思考人生或许没意义，但不思考连人生都没有。",
    "信而不见的人是有福的。",
    "我们的情人不过是随便借个名字，用幻想吹出来的肥皂泡。",
    "通往地狱的道路是由善意铺满的。通往地狱的道路是由希望构成的。",
    "绝望是给予沉溺在幸福之中的人类的特权。",
    "旷野和干旱之地必然欢喜，沙漠也必快乐，又像玫瑰盛开。",
    "有祈祷的话，也会有诅咒。",
    "故事与梦想，其本身一定就是意义所在。",
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
    let phraseIndex = -1;
    let phraseQueue = [];
    let phraseTransition = 0;
    let remaining = 0;
    let deadline = 0;
    let hovered = false;
    let paused = false;
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
        backdrop.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) scale(1.025)`;
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

    function refillPhrases() {
      phraseQueue = phrases.map((_, i) => i);
      for (let i = phraseQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [phraseQueue[i], phraseQueue[j]] = [phraseQueue[j], phraseQueue[i]];
      }
      if (phraseQueue.length > 1 && phraseQueue[0] === phraseIndex) {
        [phraseQueue[0], phraseQueue[1]] = [phraseQueue[1], phraseQueue[0]];
      }
    }

    function stopPhraseTimer() {
      if (phraseTimer) remaining = Math.max(0, deadline - performance.now());
      window.clearTimeout(phraseTimer);
      phraseTimer = 0;
    }

    function schedulePhrase() {
      stopPhraseTimer();
      if (document.hidden || paused || hovered || phraseTransition || !rotatingText || phrases.length < 2) return;
      deadline = performance.now() + remaining;
      phraseTimer = window.setTimeout(() => { phraseTimer = 0; rotatePhrase(); }, remaining);
    }

    function rotatePhrase(initial = false) {
      if (!rotatingText || !phrases.length) return;
      stopPhraseTimer();
      window.clearTimeout(phraseTransition);
      phraseTransition = 0;
      if (!phraseQueue.length) refillPhrases();
      phraseIndex = phraseQueue.shift();
      const display = () => {
        phraseTransition = 0;
        rotatingText.textContent = phrases[phraseIndex];
        rotatingText.classList.remove("is-changing");
        remaining = 2500 + Array.from(phrases[phraseIndex]).length * 70;
        schedulePhrase();
      };
      if (initial || reduceMotion.matches) display();
      else {
        rotatingText.classList.add("is-changing");
        phraseTransition = window.setTimeout(display, 220);
      }
    }

    function togglePhrasePause() {
      paused = !paused;
      rotatingText.setAttribute("aria-pressed", String(paused));
      schedulePhrase();
    }

    rotatingText?.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;
      hovered = true;
      schedulePhrase();
    });
    rotatingText?.addEventListener("pointerleave", () => { hovered = false; schedulePhrase(); });
    rotatingText?.addEventListener("click", togglePhrasePause);
    rotatingText?.addEventListener("keydown", (event) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        togglePhrasePause();
      }
    });
    document.querySelector(".home-phrase-next")?.addEventListener("click", () => rotatePhrase());
    document.addEventListener("visibilitychange", schedulePhrase);

    function handleMotionPreference() {
      if (!motionEnabled()) {
        resetPointerTarget();
        currentX = 0;
        currentY = 0;
        if (backdrop) backdrop.style.transform = narrowScreen.matches ? "scale(1)" : "scale(1.01)";
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
    rotatePhrase(true);
    restartAnimation();

    window.addEventListener("pageshow", (event) => {
      if (event.persisted) { rotatingText.textContent = phrases[phraseIndex]; rotatingText.classList.remove("is-changing"); schedulePhrase(); restartAnimation(); }
    });

    window.addEventListener("pagehide", () => {
      window.cancelAnimationFrame(frame);
      stopPhraseTimer();
      window.clearTimeout(phraseTransition);
      phraseTransition = 0;
    }, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHome, { once: true });
  } else {
    initHome();
  }
})();
