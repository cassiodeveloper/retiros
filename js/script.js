let currentLang = "pl";

const translations = {
  pl: {
    hero_title: "Ćwiczenia Duchowne (3 dni)",
    hero_subtitle: "Rekolekcje w ciszy prowadzone przez księży IVE w Polsce.",
    hero_cta: "Zobacz terminy",
    about_title: "Czym są Ćwiczenia Duchowne?",
    about_text: "Trzydniowe rekolekcje w milczeniu według metody św. Ignacego Loyoli. Czas modlitwy, konferencji i sakramentów.",
    for_whom_title: "Dla kogo?",
    for_whom_1: "Dla osób szukających rozeznania życiowego.",
    for_whom_2: "Dla tych, którzy chcą pogłębić relację z Bogiem.",
    for_whom_3: "Dla każdego, kto chce zatrzymać się i uporządkować życie.",
    how_title: "Jak to wygląda?",
    how_text: "Konferencje, modlitwa osobista, Msza Święta, spowiedź i cisza.",
    events_title: "Terminy w bieżącym roku"
  },
  en: {
    hero_title: "Spiritual Exercises (3 days)",
    hero_subtitle: "Silent retreat led by IVE priests in Poland.",
    hero_cta: "See dates",
    about_title: "What are the Spiritual Exercises?",
    about_text: "A three-day silent retreat following the method of St. Ignatius of Loyola.",
    for_whom_title: "Who is it for?",
    for_whom_1: "For those discerning important life decisions.",
    for_whom_2: "For those who want to deepen their relationship with God.",
    for_whom_3: "For anyone who needs silence and spiritual clarity.",
    how_title: "How does it work?",
    how_text: "Talks, personal prayer, Holy Mass, confession and silence.",
    events_title: "Retreat dates this year"
  }
};

function updateTexts() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerText = translations[currentLang][key];
  });
}

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "pl" ? "en" : "pl";
  document.documentElement.lang = currentLang;
  document.getElementById("langToggle").innerText = currentLang === "pl" ? "EN" : "PL";
  updateTexts();
  loadEvents();
});

async function loadEvents() {
  const response = await fetch("data/events.json");
  const events = await response.json();
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";

  const currentYear = new Date().getFullYear();
  const now = new Date();

  const upcoming = events
    .map(e => ({ ...e, startDate: new Date(e.start) }))
    .filter(e => e.startDate > now)
    .sort((a, b) => a.startDate - b.startDate)[0];

  events
    .filter(e => new Date(e.start).getFullYear() === currentYear)
    .forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";

      if (event.id === upcoming?.id) {
        card.classList.add("highlight-next");
      }

      const badgeText = {
        pl: {
          men: "Mężczyźni",
          women: "Kobiety",
          mixed: "Mieszane"
        },
        en: {
          men: "Men",
          women: "Women",
          mixed: "Mixed"
        }
      };

      card.innerHTML = `
        <div class="event-header">
          ${currentLang === "pl" ? event.title_pl : event.title_en}
        </div>
        <div class="event-body">

          <span class="event-badge badge-${event.type}">
            ${badgeText[currentLang][event.type]}
          </span>

          <div class="event-date">
            ${event.start} – ${event.end}
          </div>

          <div class="event-location">
            ${event.location}
          </div>

          <div class="event-actions">
            <a href="retreat.html?id=${event.id}" class="btn-primary">
              ${currentLang === "pl" ? "Szczegóły" : "Details"}
            </a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    injectStructuredData(events);
    startCountdown(events);
}

function injectStructuredData(events) {
  const currentYear = new Date().getFullYear();

  const structured = events
    .filter(e => new Date(e.start).getFullYear() === currentYear)
    .map(e => ({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": currentLang === "pl" ? e.title_pl : e.title_en,
      "startDate": e.start,
      "endDate": e.end,
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": e.location,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": e.location,
          "addressCountry": "PL"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Instituto del Verbo Encarnado (IVE)",
        "url": "https://ive.org"
      },
      "offers": {
        "@type": "Offer",
        "url": e.signup,
        "availability": "https://schema.org/InStock"
      }
    }));

  const scriptTag = document.createElement("script");
  scriptTag.type = "application/ld+json";
  scriptTag.textContent = JSON.stringify(structured);
  document.head.appendChild(scriptTag);
}

function startCountdown(events) {
  const now = new Date();

  const upcoming = events
    .map(e => ({ ...e, startDate: new Date(e.start) }))
    .filter(e => e.startDate > now)
    .sort((a, b) => a.startDate - b.startDate)[0];

  if (!upcoming) return;

  const countdownEl = document.getElementById("countdown");

  function update() {
    const diff = upcoming.startDate - new Date();
    if (diff <= 0) {
      countdownEl.innerHTML = currentLang === "pl"
        ? "Rekolekcje już trwają"
        : "Retreat has started";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    countdownEl.innerHTML =
      currentLang === "pl"
        ? `Najbliższe rekolekcje za ${days} dni i ${hours} godz.`
        : `Next retreat in ${days} days and ${hours} hours`;
  }

  update();
  setInterval(update, 3600000);
}

updateTexts();
loadEvents();