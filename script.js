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

  function startOfLocalDay(date){
    var copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    return copy;
  }

  function formatDateKey(date){
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function getActivityLevel(count){
    if (count <= 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    return 4;
  }

  function createActivityGrid(days, counts, options){
    var loading = options && options.loading;
    var grid = document.createElement("div");
    grid.className = "activity-grid" + (loading ? " is-loading" : "");
    grid.setAttribute("data-activity-grid", "");
    grid.setAttribute("aria-label", loading ? "Loading GitHub activity" : "Live GitHub public activity map");

    days.forEach(function(day){
      var key = formatDateKey(day);
      var count = counts ? counts[key] || 0 : 0;
      var cell = document.createElement("span");
      cell.className = "activity-cell level-" + getActivityLevel(count);
      if (loading) {
        cell.setAttribute("aria-hidden", "true");
      } else {
        cell.setAttribute("role", "img");
        cell.setAttribute("aria-label", key + ": " + count + " public GitHub events");
        cell.title = key + " · " + count + " public events";
      }
      grid.appendChild(cell);
    });

    return grid;
  }

  function getLastActivityDays(){
    var days = [];
    var today = startOfLocalDay(new Date());
    var start = new Date(today);
    start.setDate(today.getDate() - 363);

    for (var index = 0; index < 364; index += 1) {
      var day = new Date(start);
      day.setDate(start.getDate() + index);
      days.push(day);
    }

    return days;
  }

  function renderActivityFallback(container){
    var message = document.createElement("p");
    message.className = "activity-message";
    message.textContent = "GitHub activity could not be loaded right now.";
    container.replaceChildren(message);
  }

  function initGitHubActivity(){
    var container = document.querySelector(".activity-grid-wrap");
    if (!container) return;
    if (!window.fetch) {
      renderActivityFallback(container);
      return;
    }

    var days = getLastActivityDays();
    container.replaceChildren(createActivityGrid(days, null, { loading: true }));

    fetch("https://api.github.com/users/Duvi-M/events/public?per_page=100", {
      headers: { Accept: "application/vnd.github+json" }
    })
      .then(function(response){
        if (!response.ok) throw new Error("GitHub API request failed");
        return response.json();
      })
      .then(function(events){
        var counts = {};
        var earliest = days[0].getTime();
        var latest = days[days.length - 1].getTime();

        events.forEach(function(event){
          if (!event.created_at) return;
          var eventDay = startOfLocalDay(new Date(event.created_at));
          var time = eventDay.getTime();
          if (time < earliest || time > latest) return;

          var key = formatDateKey(eventDay);
          counts[key] = (counts[key] || 0) + 1;
        });

        container.replaceChildren(createActivityGrid(days, counts));
      })
      .catch(function(){
        renderActivityFallback(container);
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
  initGitHubActivity();
})();
