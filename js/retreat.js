async function loadRetreat() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const response = await fetch("data/events.json");
    const events = await response.json();

    const event = events.find(e => e.id === id);

    if (!event) {
        document.getElementById("retreatContent").innerHTML = "Not found";
        return;
    }

    document.getElementById("breadcrumbTitle").innerText = event.title_en;
    document.title = event.title_en;

    const badgeText = {
        pl: { men: "Mężczyźni", women: "Kobiety", mixed: "Mieszane" },
        en: { men: "Men", women: "Women", mixed: "Mixed" }
    };

    const lang = document.documentElement.lang.startsWith("pl") ? "pl" : "en";

    document.getElementById("retreatContent").innerHTML = `
    <h1 class="detail-title">
        ${lang === "pl" ? event.title_pl : event.title_en}
    </h1>

    <span class="event-badge badge-${event.type}">
        ${badgeText[lang][event.type]}
    </span>

    <div class="detail-meta">

        <div class="meta-item">
        <strong>${lang === "pl" ? "Data" : "Date"}:</strong>
        ${event.start} – ${event.end}
        </div>

        <div class="meta-item">
        <strong>${lang === "pl" ? "Miejsce" : "Location"}:</strong>
        ${event.venue}, ${event.location}
        </div>

        <div class="meta-item">
        <strong>${lang === "pl" ? "Język" : "Language"}:</strong>
        ${event.language}
        </div>

    </div>

    <div class="detail-description">
        ${lang === "pl" ? event.description_pl : event.description_en}
    </div>

    <div class="detail-actions">
        <a href="${event.signup}" target="_blank" class="btn-primary">
        ${lang === "pl" ? "Zapisz się na rekolekcje →" : "Register for Retreat →"}
        </a>
    </div>
    `;

    injectStructuredData(event);
    updateMetaTags(event);
    startDetailCountdown(event);

    history.replaceState(null, "", `/retreat/${event.id}`);
}

function updateMetaTags(event) {
  const title = event.title_en;
  const description = `Spiritual retreat in ${event.location}, ${event.start} – ${event.end}`;

  document.querySelector('meta[property="og:title"]').setAttribute("content", title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", description);
  document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);

  document.title = title;
}

function startDetailCountdown(event) {
  const el = document.getElementById("detailCountdown");
  const startDate = new Date(event.start);

  function update() {
    const diff = startDate - new Date();
    if (diff <= 0) {
      el.innerText = "Retreat has started";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    el.innerText = `Starts in ${days} days and ${hours} hours`;
  }

  update();
  setInterval(update, 3600000);
}

function injectStructuredData(event) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title_en,
    "startDate": event.start,
    "endDate": event.end,
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.location,
        "addressCountry": "PL"
      }
    }
  });
  document.head.appendChild(script);
}

loadRetreat();