/*
======================================================
NAVBAR — Link animations
======================================================
*/

const menuBtn = document.querySelector(".menu-btn");

let tl = gsap.timeline({
  paused: true,
  reversed: true,
  duration: 0.2,
  ease: "power2.inOut",
  // onReverseComplete: () => {
  //   menu.classList.add("hidden");
  // },
});

/* Menu Icon Animation */
tl.to(
  "#line-top",
  {
    rotation: -45,
    transformOrigin: "100% 50%",
    scaleX: 0.8,
    x: -2,
  },
  0,
);

tl.to(
  "#line-bottom",
  {
    rotation: -45,
    scaleX: 0.8,
    transformOrigin: "0% 0%",
    x: 2,
  },
  0,
);

tl.to(
  "#line-middle",
  {
    rotation: 45,
    transformOrigin: "50% 50%",
  },
  0,
);

/* Menu Section Animation */
tl.to(
  "#menu-section",
  {
    opacity: 1,
    visibility: "visible",
    pointerEvents: "visible",
    ease: "power2.inOut",
  },
  0,
);

tl.to(
  ".menu-link",
  {
    opacity: 1,
    stagger: 0.05,
    ease: "power2.inOut",
  },
  0.05,
);

let scrollY = 0;
const smoothWrapper = document.getElementById("smooth-wrapper");

function openMenu() {
  smoothWrapper.classList.add("scroll-locked");
  scrollY = window.scrollY;
  document.body.style.top = `-${scrollY}px`;

  ScrollSmoother.get().paused(true);
}

function closeMenu() {
  smoothWrapper.classList.remove("scroll-locked");
  document.body.style.top = "";
  window.scrollTo(0, scrollY);
  ScrollSmoother.get().paused(false);
}

menuBtn.addEventListener("click", () => {
  if (tl.reversed()) {
    tl.play();
    openMenu();
  } else {
    tl.reverse();
    closeMenu();
  }
});
