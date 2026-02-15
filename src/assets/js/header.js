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

// const page = document.body.dataset.page;
// initHeaderAnimations(page);

// function initHeaderAnimations(page) {
//   gsap.killTweensOf("header");

//   switch (page) {
//     case "home":
//       // gsap.to(".scroll-btn", {
//       //   yoyo: true,
//       //   y: 10,
//       //   repeat: -1,
//       //   duration: 2.5,
//       // });

//       const mm = gsap.matchMedia();

//       mm.add("(min-width: 768px)", () => {
//         gsap.set(".logo", { x: 30 });

//         gsap.to(".logo", {
//           x: 0,
//           ease: "circ.out",
//           scrollTrigger: {
//             trigger: "#hero",
//             start: "90% top",
//             end: "bottom+=20 top",
//             scrub: true,
//           },
//         });

//         ScrollTrigger.create({
//           trigger: "#hero",
//           start: "92% top",
//           ease: "power2.in",
//           onEnter: () => {
//             document
//               .querySelector(".nav-bar")
//               .classList.add("is-outside-image");
//           },
//           onLeaveBack: () => {
//             document
//               .querySelector(".nav-bar")
//               .classList.remove("is-outside-image");
//           },
//         });

//         const tlIntr = gsap.timeline({
//           scrollTrigger: {
//             trigger: ".hero-section",
//             start: "0%",
//             end: "100%",
//             pin: true,
//             pinSpacing: false,
//           },
//         });

//         // cleanup automático al salir del breakpoint
//         return () => {
//           ScrollTrigger.getAll().forEach((st) => st.kill());
//         };
//       });

//       /*
