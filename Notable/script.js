
// hamburger 
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  
  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
      // Open menu
      mobileMenu.classList.add('mobile-menu-open');
      menuIcon.classList.add('active');
    } else {
      // Close menu
      mobileMenu.classList.remove('mobile-menu-open');
      menuIcon.classList.remove('active');
    }
  }

  // Add click event listener to mobile menu button
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Close menu when clicking on a mobile menu link
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMobileMenuOpen) {
        toggleMobileMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnMenuButton = mobileMenuBtn.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnMenuButton && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  });

});


//  Third Section(Goal and Vision) 

function throttle(fn, wait = 60) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const steps = {
    goal: document.getElementById("step-goal"),
    vision: document.getElementById("step-vision"),
  };

  const triggers = Array.from(document.querySelectorAll(".step-trigger"));
  const video = document.getElementById("leftVideo");
  const soundToggle = document.getElementById("soundToggle");

  let triggerTops = [];
  const MID_RATIO = 0.45;

function showStep(step) {
  for (const key in steps) {
    if (!steps[key]) continue;
    if (key === step) {
      steps[key].classList.add('active');
    } else {
      steps[key].classList.remove('active');
    }
  }
}


  function updateTriggerTops() {
    triggerTops = triggers.map((t) => {
      const r = t.getBoundingClientRect();
      const topDoc = r.top + window.scrollY;
      return { step: t.dataset.step, top: topDoc };
    });
  }

  function getMidpointY() {
    return window.scrollY + window.innerHeight * MID_RATIO;
  }

  function updateActiveOnScroll() {
    const mid = getMidpointY();
    let active = "goal";
    for (let i = 0; i < triggerTops.length; i++) {
      if (mid >= triggerTops[i].top) active = triggerTops[i].step;
    }
    showStep(active);
  }

  const onScroll = throttle(updateActiveOnScroll, 50);
  const onResize = throttle(() => {
    updateTriggerTops();
    updateActiveOnScroll();
  }, 120);

  // init
  updateTriggerTops();
  showStep("goal");
  updateActiveOnScroll();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  // Video loop fallback
  if (video) {
    video.addEventListener("ended", () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    });
  }

  // Sound toggle
  if (soundToggle && video) {
    soundToggle.addEventListener("click", () => {
      video.muted = !video.muted;
      soundToggle.textContent = video.muted ? "Enable sound" : "Mute sound";
      video.play().catch(() => {});
    });
  }
});


// hide only the Vision panel on mobile when the Meet section enters viewport
(function() {
  const stepVision = document.getElementById('step-vision');
  const meet = document.getElementById('meet-products') || document.getElementById('scrolly-end');

  if (!stepVision || !meet) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // mobile-only behavior
      if (window.innerWidth <= 768) {
        if (entry.isIntersecting) {
          // Meet section is coming into view -> hide vision to avoid overlap
          stepVision.classList.add('scrolly-hidden');
        } else {
          // Meet is out of view -> restore vision
          stepVision.classList.remove('scrolly-hidden');
        }
      } else {
        // on desktop always ensure vision is visible
        stepVision.classList.remove('scrolly-hidden');
      }
    });
  }, {
    root: null,
    threshold: 0.01
  });

  observer.observe(meet);

  // Also handle resize so classes stay correct when rotating/resizing
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) stepVision.classList.remove('scrolly-hidden');
  });
})();

// Animation logic of hero-section and next section

 document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          } else {
            entry.target.classList.remove("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".hero-text, .hero-img, .next-text").forEach((el) => {
      observer.observe(el);
    });
  });

  // navbar hidden logic for goal and vision section

  document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector("header"); // your full navbar wrapper
    const outerSection = document.getElementById("outer");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Hide navbar smoothly
            navbar.classList.add("opacity-0", "-translate-y-full", "pointer-events-none");
          } else {
            // Show navbar back
            navbar.classList.remove("opacity-0", "-translate-y-full", "pointer-events-none");
          }
        });
      },
      { threshold: 0.3 } // triggers when 30% of section is visible
    );

    observer.observe(outerSection);
  });


  // we are looking for

  const line = document.getElementById('line');

const lineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // animate in
      line.classList.add('scale-y-100');
      line.classList.remove('scale-y-0'); // reset start state
    } else {
      // reset when leaving viewport
      line.classList.remove('scale-y-100');
      line.classList.add('scale-y-0');
    }
  });
}, { threshold: 0.4 });

lineObserver.observe(line);


// Meet our product section
window.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.animate-on-scroll');

  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // animate in
        entry.target.classList.remove('opacity-0', 'translate-y-10');
        entry.target.classList.add('opacity-100', 'translate-y-0');
      } else {
        // reset when leaving viewport
        entry.target.classList.remove('opacity-100', 'translate-y-0');
        entry.target.classList.add('opacity-0', 'translate-y-10');
      }
    });
  }, { threshold: 0.2 });

  boxes.forEach(box => observer2.observe(box));
});


// Goal and vision

 // Desktop sound toggle
  const videoDesktop = document.querySelector('#soundToggleDesktop')?.previousElementSibling;
  const btnDesktop = document.querySelector('#soundToggleDesktop');
  btnDesktop?.addEventListener('click', () => {
    videoDesktop.muted = !videoDesktop.muted;
    btnDesktop.textContent = videoDesktop.muted ? 'Enable sound' : 'Disable sound';
  });

  // Mobile sound toggle
  const videoMobile = document.querySelector('#leftVideoMobile');
  const btnMobile = document.querySelector('#soundToggleMobile');
  btnMobile?.addEventListener('click', () => {
    videoMobile.muted = !videoMobile.muted;
    btnMobile.textContent = videoMobile.muted ? 'Enable sound' : 'Disable sound';
  });

  document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step-trigger");
  const panels = document.querySelectorAll(".step-panel");

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const step = entry.target.dataset.step;
        panels.forEach(panel => {
          panel.classList.remove("active");
        });
        document.getElementById(`step-${step}`).classList.add("active");
      }
    });
  }, { threshold: 0.6 });

  steps.forEach(step => io.observe(step));
});
