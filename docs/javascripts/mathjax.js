window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
    tags: "none"
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  },
  chtml: { scale: 1.0 },
  startup: {
    pageReady: () => MathJax.startup.defaultPageReady().then(() => {
      document.documentElement.dataset.mathReady = "true";
    })
  }
};
