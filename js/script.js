let currentLang = localStorage.getItem("siteLang") || "pl";

const translations = {
  pl: {
    brand: "Ćwiczenia Duchowne",
    nav_about: "Czym są?",
    nav_for_whom: "Dla kogo?",
    nav_popes: "Papieże",
    nav_dates: "Terminy",
    hero_eyebrow: "Rekolekcje w ciszy w Polsce",
    hero_title: "Ćwiczenia Duchowne według św. Ignacego Loyoli",
    hero_lead: "Czas Łaski, Spotkania z Bogiem i Rozeznawania Jego Woli.",
    hero_cta: "Zobacz terminy",
    hero_secondary: "Dowiedz się więcej",
    about_kicker: "Czym są?",
    about_title: "Czym są Rekolekcje Ignacjańskie?",
    about_p1: "Rekolekcje Ignacjańskie są czasem zatrzymania i wytchnienia pośród codziennego hałasu i zamętu.",
    about_p2: "To szczególny czas łaski, w którym w ciszy i osobistej kontemplacji, z dala od rozproszeń i zmartwień, wsłuchujemy się w głos Boga:",
    about_quote: "„Mów, Panie, bo sługa Twój słucha”\n(1 Sm 3,9–10).",
    for_whom_kicker: "Dla kogo?",
    for_whom_title: "Dla każdej duszy poszukującej Boga.",
    for_whom_1_title: "Rozeznanie",
    for_whom_1_text: "Dla tych, którzy pragną rozpoznać wolę Bożą i podjąć decyzje w świetle wiary.",
    for_whom_2_title: "Modlitwa",
    for_whom_2_text: "Dla osób, które chcą wejść głębiej w ciszę, Słowo Boże i osobistą relację z Chrystusem.",
    for_whom_3_title: "Odnowa",
    for_whom_3_text: "Dla każdego, kto potrzebuje zatrzymania, sakramentów i duchowego uporządkowania życia.",
    how_kicker: "Jak to wygląda?",
    how_title: "Rytm modlitwy, sakramentów i milczenia",
    how_summary: "Na stronie głównej zostawiamy tylko krótki zarys. Pełniejszy opis przebiegu rekolekcji znajduje się na osobnej stronie.",
    author_kicker: "Kto napisał Ćwiczenia?",
    author_title: "Św. Ignacy Loyola",
    author_summary: "Św. Ignacy Loyola (1491–1556), założyciel Towarzystwa Jezusowego, pozostawił Kościołowi Ćwiczenia Duchowne jako drogę modlitwy, rozeznania i głębszego naśladowania Chrystusa.",
    popes_kicker: "Co mówią Papieże?",
    popes_title: "Papieże i Ćwiczenia Duchowne",
    testimonials_kicker: "Świadectwa",
    testimonials_title: "Owoce rekolekcji",
    events_kicker: "Terminy w bieżącym roku",
    events_title: "Najbliższe rekolekcje w Polsce",
    events_hint: "Daty są ładowane z pliku data/events.json, aby można było łatwo aktualizować kalendarz.",
    learn_more: "Dowiedz się więcej",
    placeholder_chapel: "Kaplica",
    placeholder_silence: "Retiro w ciszy",
    placeholder_ignatius: "Święty Ignacy",
    no_dates: "Nowe terminy zostaną opublikowane po potwierdzeniu miejsca i dat.",
    started: "Najbliższe rekolekcje już się rozpoczęły.",
    next_retreat: "Najbliższe rekolekcje",
    days: "dni",
    hours: "godz.",
    date_soon: "Termin zostanie podany wkrótce",
    no_published_dates: "Brak aktualnie opublikowanych terminów.",
    no_published_dates_text: "Gdy daty rekolekcji zostaną potwierdzone, pojawią się tutaj razem z miejscem i linkiem do zapisów.",
    details: "Szczegóły",
    register: "Zapisy",
    loading_error: "Nie udało się załadować terminów.",
    loading_error_hint: "Sprawdź plik data/events.json.",
    quote_pending: "Tekst do wstawienia po otrzymaniu dokładnej wersji zatwierdzonej przez ojca.",
    testimony_pending: "Świadectwo do wstawienia po otrzymaniu pełnego tekstu zatwierdzonego do publikacji.",
    countdown_in: "za",
    countdown_joiner: "i"
  },
  en: {
    brand: "Spiritual Exercises",
    nav_about: "What are they?",
    nav_for_whom: "For whom?",
    nav_popes: "Popes",
    nav_dates: "Dates",
    hero_eyebrow: "Silent retreats in Poland",
    hero_title: "Spiritual Exercises according to St. Ignatius of Loyola",
    hero_lead: "A time of grace, encounter with God, and discernment of His will.",
    hero_cta: "See dates",
    hero_secondary: "Learn more",
    about_kicker: "What are they?",
    about_title: "What are Ignatian Retreats?",
    about_p1: "Ignatian Retreats are a time to pause and breathe amid the noise and confusion of everyday life.",
    about_p2: "They are a special time of grace in which, in silence and personal contemplation, away from distractions and worries, we listen to the voice of God:",
    about_quote: "\"Speak, Lord, for your servant is listening\"\n(1 Sam 3:9-10).",
    for_whom_kicker: "For whom?",
    for_whom_title: "For every soul seeking God.",
    for_whom_1_title: "Discernment",
    for_whom_1_text: "For those who wish to recognize God's will and make decisions in the light of faith.",
    for_whom_2_title: "Prayer",
    for_whom_2_text: "For people who want to enter more deeply into silence, Scripture, and a personal relationship with Christ.",
    for_whom_3_title: "Renewal",
    for_whom_3_text: "For anyone who needs to stop, receive the sacraments, and order their spiritual life.",
    how_kicker: "How does it work?",
    how_title: "A rhythm of prayer, sacraments, and silence",
    how_summary: "The home page keeps only a short summary. A fuller description of the retreat is available on a separate page.",
    author_kicker: "Who wrote the Exercises?",
    author_title: "St. Ignatius of Loyola",
    author_summary: "St. Ignatius of Loyola (1491-1556), founder of the Society of Jesus, left the Church the Spiritual Exercises as a path of prayer, discernment, and deeper imitation of Christ.",
    popes_kicker: "What do Popes say?",
    popes_title: "Popes and the Spiritual Exercises",
    testimonials_kicker: "Testimonials",
    testimonials_title: "Fruits of the retreat",
    events_kicker: "Dates this year",
    events_title: "Upcoming retreats in Poland",
    events_hint: "Dates are loaded from data/events.json so the calendar can be updated easily.",
    learn_more: "Learn more",
    placeholder_chapel: "Chapel",
    placeholder_silence: "Retreat in silence",
    placeholder_ignatius: "St. Ignatius",
    no_dates: "New dates will be published after the place and schedule are confirmed.",
    started: "The next retreat has already started.",
    next_retreat: "Next retreat",
    days: "days",
    hours: "hours",
    date_soon: "Date to be announced soon",
    no_published_dates: "No dates are currently published.",
    no_published_dates_text: "When retreat dates are confirmed, they will appear here with location and registration link.",
    details: "Details",
    register: "Register",
    loading_error: "Could not load retreat dates.",
    loading_error_hint: "Check data/events.json.",
    quote_pending: "Text to be inserted after receiving the exact version approved by the priest.",
    testimony_pending: "Testimonial to be inserted after receiving the full text approved for publication.",
    countdown_in: "in",
    countdown_joiner: "and"
  }
};

const popeQuotes = [
  { name_pl: "Św. Jan Paweł II", name_en: "St. John Paul II", text_pl: "", text_en: "" },
  { name_pl: "Benedykt XVI", name_en: "Benedict XVI", text_pl: "", text_en: "" },
  { name_pl: "Franciszek", name_en: "Francis", text_pl: "", text_en: "" },
  { name_pl: "Pio XII", name_en: "Pius XII", text_pl: "", text_en: "" },
  { name_pl: "Pio XI", name_en: "Pius XI", text_pl: "", text_en: "" }
];

const testimonials = [
  {
    location_pl: "Józefów, Szensztat",
    location_en: "Józefów, Szensztat",
    year: "2026",
    text_pl: "Miałem przyjemność być na rekolekcjach Ignacianskich już drugi raz...",
    text_en: "I had the pleasure of attending the Ignatian retreat for the second time..."
  },
  { location_pl: "Miejsce do uzupełnienia", location_en: "Location to be added", year: "2026", text_pl: "", text_en: "" },
  { location_pl: "Miejsce do uzupełnienia", location_en: "Location to be added", year: "2026", text_pl: "", text_en: "" }
];

const labels = {
  pl: { men: "Mężczyźni", women: "Kobiety", mixed: "Wszyscy" },
  en: { men: "Men", women: "Women", mixed: "All" }
};

function t(key) {
  return translations[currentLang][key] || translations.pl[key] || key;
}

function getLocalized(event, field) {
  const direct = event[`${field}_${currentLang}`];
  const fallback = event[`${field}_pl`] || event[field];
  return direct || fallback || "";
}

function updateTexts() {
  document.documentElement.lang = currentLang;
  document.getElementById("langToggle").textContent = currentLang === "pl" ? "EN" : "PL";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    element.textContent = t(key);
  });
}

function formatDate(dateText) {
  return new Intl.DateTimeFormat(currentLang === "pl" ? "pl-PL" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${dateText}T12:00:00`));
}

function formatDateRange(start, end) {
  if (!start || !end) {
    return t("date_soon");
  }

  if (start === end) {
    return formatDate(start);
  }

  return `${formatDate(start)} - ${formatDate(end)}`;
}

function getUpcomingEvent(events) {
  const now = new Date();

  return events
    .filter(event => event.published !== false && event.start)
    .map(event => ({ ...event, startDate: new Date(`${event.start}T12:00:00`) }))
    .filter(event => event.startDate >= now)
    .sort((a, b) => a.startDate - b.startDate)[0];
}

function renderCountdown(events) {
  const countdown = document.getElementById("countdown");
  const upcoming = getUpcomingEvent(events);

  if (!countdown) return;

  if (!upcoming) {
    countdown.textContent = t("no_dates");
    return;
  }

  function update() {
    const diff = upcoming.startDate - new Date();

    if (diff <= 0) {
      countdown.textContent = t("started");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    countdown.textContent = `${t("next_retreat")}: ${getLocalized(upcoming, "location")}, ${t("countdown_in")} ${days} ${t("days")} ${t("countdown_joiner")} ${hours} ${t("hours")}`;
  }

  update();
  setInterval(update, 3600000);
}

function renderEvents(events) {
  const container = document.getElementById("eventsContainer");
  const currentYear = new Date().getFullYear();
  const upcoming = getUpcomingEvent(events);

  if (!container) return;

  const visibleEvents = events
    .filter(event => event.published !== false)
    .filter(event => !event.start || new Date(`${event.start}T12:00:00`).getFullYear() === currentYear)
    .sort((a, b) => {
      if (!a.start) return 1;
      if (!b.start) return -1;
      return new Date(a.start) - new Date(b.start);
    });

  if (!visibleEvents.length) {
    container.innerHTML = `
      <div class="empty-state">
        <strong>${t("no_published_dates")}</strong>
        <p>${t("no_published_dates_text")}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = visibleEvents.map(event => {
    const isNext = event.id === upcoming?.id;
    const type = labels[currentLang][event.type] || labels[currentLang].mixed;
    const detailsUrl = `retreat.html?id=${encodeURIComponent(event.id)}&lang=${currentLang}`;
    const signup = event.signup && event.signup !== "#" ? event.signup : "";

    return `
      <article class="event-card${isNext ? " highlight-next" : ""}">
        <div class="event-header">
          <h3>${getLocalized(event, "title")}</h3>
          <span class="event-badge">${type}</span>
        </div>
        <div class="event-body">
          <p class="event-date">${formatDateRange(event.start, event.end)}</p>
          <p class="event-location">${getLocalized(event, "venue") ? `${getLocalized(event, "venue")}, ` : ""}${getLocalized(event, "location")}</p>
          ${getLocalized(event, "shortDescription") ? `<p class="event-note">${getLocalized(event, "shortDescription")}</p>` : ""}
          <div class="event-actions">
            <a class="btn-primary" href="${detailsUrl}">${t("details")}</a>
            ${signup ? `<a class="btn-secondary" href="${signup}" target="_blank" rel="noopener">${t("register")}</a>` : ""}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderQuotes() {
  const container = document.getElementById("popeQuotes");
  if (!container) return;

  container.innerHTML = popeQuotes.map(quote => `
    <article class="quote-card">
      <blockquote class="${quote[`text_${currentLang}`] ? "" : "pending-note"}">${quote[`text_${currentLang}`] || t("quote_pending")}</blockquote>
      <footer>${quote[`name_${currentLang}`]}</footer>
    </article>
  `).join("");
}

function renderTestimonials() {
  const container = document.getElementById("testimonials");
  if (!container) return;

  container.innerHTML = testimonials.map(item => `
    <article class="testimonial-card">
      <blockquote class="${item[`text_${currentLang}`] ? "" : "pending-note"}">${item[`text_${currentLang}`] || t("testimony_pending")}</blockquote>
      <footer>(${item[`location_${currentLang}`]}, ${item.year})</footer>
    </article>
  `).join("");
}

function injectStructuredData(events) {
  const structuredEvents = events
    .filter(event => event.published !== false && event.start)
    .map(event => ({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": getLocalized(event, "title"),
      "startDate": event.start,
      "endDate": event.end,
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": getLocalized(event, "venue") || getLocalized(event, "location"),
        "address": {
          "@type": "PostalAddress",
          "addressLocality": getLocalized(event, "location"),
          "addressCountry": "PL"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "IVE Polska",
        "url": "https://ive.org"
      }
    }));

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ivepolska.github.io/retiros/"
      }
    ]
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify([breadcrumbs, ...structuredEvents]);
  document.head.appendChild(script);
}

async function loadEvents() {
  try {
    const response = await fetch("data/events.json");
    const events = await response.json();
    renderCountdown(events);
    renderEvents(events);
    injectStructuredData(events);
  } catch (error) {
    const container = document.getElementById("eventsContainer");
    if (container) {
      container.innerHTML = `
        <div class="empty-state">
          <strong>${t("loading_error")}</strong>
          <p>${t("loading_error_hint")}</p>
        </div>
      `;
    }
  }
}

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "pl" ? "en" : "pl";
  localStorage.setItem("siteLang", currentLang);
  updateTexts();
  renderQuotes();
  renderTestimonials();
  loadEvents();
});

updateTexts();
renderQuotes();
renderTestimonials();
loadEvents();
