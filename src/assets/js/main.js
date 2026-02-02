import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (prefersReducedMotion) {
  ScrollSmoother.get()?.kill();
}

window.addEventListener("load", async () => {
  // espera fuentes explícitamente
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    effects: true,
    smooth: 1.2,
    normalizeScroll: true,
  });

  ScrollTrigger.refresh();
});

/*
======================================================
NAVBAR — Link animations
======================================================
*/

const menuBtn = document.querySelector(".menu-btn");
let open = false;

let tl = gsap.timeline({
  paused: true,
  reversed: true,
  duration: 0.2,
  ease: "power2.inOut",
  onReverseComplete: () => {
    menu.classList.add("hidden");
  },
});

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

menuBtn.addEventListener("click", () => {
  if (tl.reversed()) {
    tl.play();
  } else {
    tl.reverse();
  }
});

/*
====================================================== 
Animations for text of hero section
====================================================== 
*/

gsap.to(".scroll-btn", {
  yoyo: true,
  y: 10,
  repeat: -1,
  duration: 2.5,
});

// const tl2 = gsap.timeline({ delay: 0.4 });

// tl2
//   .fromTo(
//     ".container-hero-img",
//     {
//       clipPath: "inset(50% 50% 50% 50%)",
//     },
//     {
//       clipPath: "inset(0% 0% 0% 0%)",
//       duration: 1.2,
//       ease: "power3.out",
//     },
//   )
//   .from(
//     ".hero-text",
//     {
//       opacity: 0,
//       y: 20,
//       duration: 0.6,
//     },
//     "-=0.4",
//   );

/*
====================================================== 
Animations for text of company section
====================================================== 
*/

gsap.fromTo(
  ".reveal-type",
  {
    y: 60,
  },
  {
    y: 0,
    ease: "none", // CLAVE
    scrollTrigger: {
      trigger: ".company-section",
      start: "top bottom", // cuando entra
      end: "center center", // cuando llega a su lugar
      scrub: true, // 🔥 scroll controla la animación
    },
  },
);

/*
====================================================== 
Animations for images of galery section
====================================================== 
*/

// gsap.to(".row-top", {
//   x: "-20%",
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".split-section",
//     start: "top bottom",
//     end: "45% center",
//     scrub: true,
//   },
// });

// gsap.to(".row-bottom", {
//   x: "20%",
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".split-section",
//     start: "top bottom",
//     end: "45% center",
//     scrub: true,
//   },
// });
