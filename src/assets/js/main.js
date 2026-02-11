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
