window.addEventListener("scroll", function () {
  const navbar = document.getElementById("nav");
  if (window.scrollY > 10) {
    navbar.style.backgroundColor = "white";
    navbar.style.zIndex = "100";
    navbar.style.marginTop = "-5%";
  } else {
    navbar.style.backgroundColor = "";
    navbar.style.zIndex = "100";
    navbar.style.marginTop = "0%";
  }
});

function toggleMenu1() {
  document.getElementById("responsiveMenu").classList.toggle("hidden");
}
/*********************************************************************
 *                      counter
 **********************************************************************/

const counters = document.querySelectorAll(".counter");

const animateCounter = (el) => {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || "";
  const duration = 1500;
  const startTime = performance.now();

  const update = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      if (el.dataset.done) return;

      el.dataset.done = "true";
      el.textContent = "0";
      animateCounter(el);
      obs.unobserve(el);
    });
  },
  { threshold: 0.4 },
);

counters.forEach((counter) => observer.observe(counter));
/******************************************************************
                      brand slider
 ******************************************************************/

(() => {
  const slider = document.getElementById("slider");
  const track = document.getElementById("track");

  const originals = Array.from(track.children);
  const n = originals.length;

  originals.forEach((el) => track.appendChild(el.cloneNode(true)));
  originals.forEach((el) => track.appendChild(el.cloneNode(true)));

  const logos = Array.from(track.children);

  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap || "0");

  const itemW = originals[0].getBoundingClientRect().width + gap;

  let index = n;

  const moveDuration = 900;
  const pauseDuration = 2000;

  function setActive(i) {
    logos.forEach((x) => x.classList.remove("active"));
    logos[i]?.classList.add("active");
  }

  function translateTo(i, withAnim = true) {
    const centerOffset = slider.clientWidth / 2 - (itemW - gap) / 2;
    track.style.transition = withAnim
      ? `transform ${moveDuration}ms ease`
      : "none";
    track.style.transform = `translateX(${centerOffset - i * itemW}px)`;
  }

  translateTo(index, false);
  setActive(index);

  function step() {
    index++;
    translateTo(index, true);
    setActive(index);

    if (index >= 2 * n) {
      setTimeout(() => {
        index -= n;
        translateTo(index, false);
        setActive(index);
      }, moveDuration);
    }

    setTimeout(step, pauseDuration + moveDuration);
  }

  setTimeout(step, pauseDuration);
})();
