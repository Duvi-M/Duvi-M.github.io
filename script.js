(function(){
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var sections = navLinks
    .map(function(link){
      var target = document.querySelector(link.getAttribute("href"));
      return target ? { link: link, target: target } : null;
    })
    .filter(Boolean);

  function setHeaderState(){
    if (!header) return;
    header.dataset.elevated = window.scrollY > 12 ? "true" : "false";
  }

  function closeNav(){
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function updateActiveLink(){
    var current = sections[0];
    sections.forEach(function(item){
      var rect = item.target.getBoundingClientRect();
      if (rect.top <= 150) current = item;
    });

    navLinks.forEach(function(link){
      link.classList.toggle("active", current && link === current.link);
    });
  }

  if (toggle) {
    toggle.addEventListener("click", function(){
      var isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach(function(link){
    link.addEventListener("click", closeNav);
  });

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    revealItems.forEach(function(item){
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function(item){
      item.classList.add("visible");
    });
  }

  window.addEventListener("scroll", function(){
    setHeaderState();
    updateActiveLink();
  }, { passive: true });

  window.addEventListener("resize", function(){
    if (window.innerWidth > 760) closeNav();
  });

  setHeaderState();
  updateActiveLink();
})();
