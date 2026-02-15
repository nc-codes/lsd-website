import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import Lenis from "lenis";

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
});

// Initialize a new Lenis instance for smooth scrolling

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical", // or 'horizontal'
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  autoRaf: false, // set to true if you don't want to use gsap.ticker
});

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 1024px)",
    isTablet: "(min-width: 768px) and (max-width: 1023px)",
    isMobile: "(max-width: 767px)",
    isPortrait: "(orientation: portrait)",
    prefersReducedMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    let { isDesktop, isTablet, isMobile, prefersReducedMotion } =
      context.conditions;
    let heroTL;
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      return; // Exit early
    }

    // Desktop-only animation
    if (isDesktop) {
      gsap.to(".desktop-element", {
        x: 500,
        duration: 2,
      });
    }

    // Tablet-only animation
    if (isTablet) {
    }

    // Mobile-only animation
    if (isMobile) {
    }

    heroTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "+2000",
        pin: true,
        scrub: 1,
        // markers: true,
        pinSpacing: true,
      },
    });

    heroTL.to(".t1", {
      opacity: 0,
      duration: 1,
    });

    heroTL.to(".reveal-time", {
      opacity: 1,
      duration: 1,
    });

    heroTL.to(".reveal-time", {
      opacity: 0,
      duration: 1,
    });

    heroTL.to(".reveal-grid", {
      opacity: 1,
      duration: 1,
    });

    heroTL.to(
      ".item",
      {
        opacity: 1,
        stagger: {
          amount: 1,
          from: "center",
        },
      },
      "<",
    );

    // Animation for all screen sizes (but with different values)
    gsap.to(".universal-element", {
      x: isDesktop ? 300 : isMobile ? 100 : 200,
      duration: isDesktop ? 2 : 1,
      scrollTrigger: {
        trigger: ".section",
        start: "top center",
        end: isDesktop ? "+=1000" : "+=500",
      },
    });

    return () => {
      heroTL.kill();
    };
  },
);

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
