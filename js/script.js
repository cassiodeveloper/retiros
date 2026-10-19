let currentLang = localStorage.getItem("siteLang") || "pl";
let countdownTimer = null;
let eventCountdownTimer = null;

const translations = {
  pl: {
    brand: "Ćwiczenia Duchowne",
    nav_about: "Czym są?",
    nav_for_whom: "Dla kogo?",
    nav_popes: "Papieże",
    nav_dates: "Terminy",
    hero_eyebrow: "Rekolekcje w ciszy w Polsce",
    hero_title: "Rekolekcje w ciszy",
    hero_subtitle: "W duchu Ćwiczeń Duchowych Sw. Ignacego",
    hero_lead: "Czas Łaski, Spotkania z Bogiem i Rozeznawania Jego Woli.",
    hero_cta: "Zobacz terminy",
    hero_secondary: "Dowiedz się więcej",
    about_kicker: "Czym są?",
    about_title: "Czym są Rekolekcje Ignacjańskie?",
    about_p1: "Rekolekcje Ignacjańskie są czasem zatrzymania i wytchnienia pośród codziennego hałasu i zamętu.",
    about_p2: "To szczególny czas łaski, w którym w ciszy i osobistej kontemplacji, z dala od rozproszeń i zmartwień, wsłuchujemy się w głos Boga:",
    about_quote: "„Mów, Panie, bo sługa Twój słucha”",
    about_quote_ref: "(1 Sm 3,9–10)",
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
    author_summary: "Św. Ignacy Loyola (1491–1556), założyciel Towarzystwa Jezusowego i autor Ćwiczeń Duchowych, po swoim nawróceniu odkrył drogę modlitwy i rozeznawania, która pomaga człowiekowi rozpoznawać poruszenia serca, odkrywać wolę Bożą i wybierać dobro. Jego duchowość do dziś prowadzi niezliczone dusze do głębszego spotkania z Bogiem.",
    popes_kicker: "Co mówią Papieże?",
    popes_title: "Papieże i Ćwiczenia Duchowne",
    testimonials_kicker: "Świadectwa",
    testimonials_title: "Owoce rekolekcji",
    events_kicker: "Najbliższe terminy",
    events_title: "Najbliższe rekolekcje w Polsce",
    events_hint: "Daty są ładowane z pliku data/events.json, aby można było łatwo aktualizować kalendarz.",
    learn_more: "Dowiedz się więcej",
    placeholder_chapel: "Kaplica",
    placeholder_silence: "Retiro w ciszy",
    placeholder_ignatius: "Święty Ignacy",
    no_dates: "Nowe terminy zostaną opublikowane po potwierdzeniu miejsca i dat.",
    started: "Najbliższe rekolekcje już się rozpoczęły.",
    next_retreat: "Najbliższe rekolekcje",
    starts_in: "Do rozpoczęcia",
    days: "dni",
    hours: "godz.",
    seconds: "sek.",
    date_soon: "Termin zostanie podany wkrótce",
    no_published_dates: "Brak aktualnie opublikowanych terminów.",
    no_published_dates_text: "Gdy daty rekolekcji zostaną potwierdzone, pojawią się tutaj razem z miejscem i linkiem do zapisów.",
    details: "Szczegóły",
    retreat_language_label: "JĘZYK REKOLEKCJI",
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
    hero_title: "Silent Retreats",
    hero_subtitle: "In the spirit of the Spiritual Exercises of St. Ignatius",
    hero_lead: "A time of grace, encounter with God, and discernment of His will.",
    hero_cta: "See dates",
    hero_secondary: "Learn more",
    about_kicker: "What are they?",
    about_title: "What are Ignatian Retreats?",
    about_p1: "Ignatian Retreats are a time to pause and breathe amid the noise and confusion of everyday life.",
    about_p2: "They are a special time of grace in which, in silence and personal contemplation, away from distractions and worries, we listen to the voice of God:",
    about_quote: "\"Speak, Lord, for your servant is listening\"",
    about_quote_ref: "(1 Sam 3:9-10).",
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
    author_summary: "St. Ignatius of Loyola (1491-1556), founder of the Society of Jesus and author of the Spiritual Exercises, after his conversion discovered a path of prayer and discernment that helps the human person recognize the movements of the heart, discover God's will, and choose the good. His spirituality continues to lead countless souls to a deeper encounter with God.",
    popes_kicker: "What do Popes say?",
    popes_title: "Popes and the Spiritual Exercises",
    testimonials_kicker: "Testimonials",
    testimonials_title: "Fruits of the retreat",
    events_kicker: "Upcoming dates",
    events_title: "Upcoming retreats in Poland",
    events_hint: "Dates are loaded from data/events.json so the calendar can be updated easily.",
    learn_more: "Learn more",
    placeholder_chapel: "Chapel",
    placeholder_silence: "Retreat in silence",
    placeholder_ignatius: "St. Ignatius",
    no_dates: "New dates will be published after the place and schedule are confirmed.",
    started: "The next retreat has already started.",
    next_retreat: "Next retreat",
    starts_in: "Starts in",
    days: "days",
    hours: "hours",
    seconds: "sec.",
    date_soon: "Date to be announced soon",
    no_published_dates: "No dates are currently published.",
    no_published_dates_text: "When retreat dates are confirmed, they will appear here with location and registration link.",
    details: "Details",
    retreat_language_label: "LANGUAGE RETREAT",
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
  {
    name_pl: "Święty Jan Paweł II",
    name_en: "Saint John Paul II",
    image: "../retiros/images/popes/joao-paulo-ii.jpg",
    source_pl: "Katedra św. Marcina w Bratysławie, 11 kwietnia 1995 r.",
    source_en: "St. Martin's Cathedral in Bratislava, April 11, 1995.",
    text_pl: "„Bardzo pożyteczne i skuteczne są również Ćwiczenia duchowe. Zachęcam was, abyście na stałe wpisali je do swojego programu każdego roku. Zachęcam was i proszę, abyście nie tylko sami je odprawiali, lecz także z przekonania stawali się apostołami tych chwil refleksji i modlitwy, które są pożyteczne nie tylko dla osób konsekrowanych, ale także dla wiernych świeckich.”",
    text_en: "\"The Spiritual Exercises are also very useful and effective. I encourage you to include them permanently in your program every year. I encourage and ask you not only to make them yourselves, but also to become, with conviction, apostles of these moments of reflection and prayer, which are useful not only for consecrated persons, but also for the lay faithful.\""
  },
  {
    name_pl: "Święty Jan Paweł II",
    name_en: "Saint John Paul II",
    image: "../retiros/images/popes/joao-paulo-ii.jpg",
    source_pl: "",
    source_en: "",
    text_pl: "„Ćwiczenia duchowe są połączeniem rozważań i modlitwy w atmosferze skupienia i ciszy, a przede wszystkim szczególnym wewnętrznym poruszeniem wzbudzanym przez Ducha Świętego, otwierającym szerokie przestrzenie duszy na działanie łaski. Chrześcijanin, wchodząc w głęboką dynamikę Ćwiczeń duchowych, wkracza w sferę Bożych myśli i zamysłów, aby zawierzyć siebie Temu, który jest Prawdą i Miłością, i w ten sposób podjąć wymagające kroki naśladowania Chrystusa, jasno rozeznając swoje dary i własną odpowiedzialność.”",
    text_en: "\"The Spiritual Exercises are a combination of meditation and prayer in an atmosphere of recollection and silence, and above all a special inner movement awakened by the Holy Spirit, opening wide spaces of the soul to the action of grace. The Christian, entering into the deep dynamic of the Spiritual Exercises, enters the sphere of God's thoughts and designs, in order to entrust himself to the One who is Truth and Love, and thus take up the demanding steps of following Christ, clearly discerning his gifts and his own responsibility.\""
  },
  {
    name_pl: "Benedykt XVI",
    name_en: "Benedict XVI",
    image: "../retiros/images/popes/pope_benedict_sitting.jpg",
    source_pl: "Watykan, 9 II 2008.",
    source_en: "Vatican, February 9, 2008.",
    text_pl: "„Ćwiczenia duchowe stanowią szczególnie cenną drogę i metodę szukania oraz odnajdywania Boga — w nas, wokół nas i we wszystkim — aby poznać Jego wolę i ją wypełniać.”",
    text_en: "\"The Spiritual Exercises are a particularly precious path and method for seeking and finding God — in us, around us, and in everything — in order to know His will and fulfill it.\""
  },
  {
    name_pl: "Franciszek",
    name_en: "Francis",
    image: "../retiros/images/popes/francisco.jpg",
    source_pl: "Watykan, 7 II 2014.",
    source_en: "Vatican, February 7, 2014.",
    text_pl: "„Proponować Ćwiczenia duchowe oznacza zapraszać do doświadczenia Boga, Jego miłości i Jego piękna. Kto przeżywa Ćwiczenia duchowe w sposób autentyczny, doświadcza pociągającej siły i piękna Boga, a potem wraca odnowiony i przemieniony do codziennego życia, do służby i do zwyczajnych relacji, niosąc ze sobą woń Chrystusa.”",
    text_en: "\"To propose the Spiritual Exercises means inviting people to experience God, His love, and His beauty. Whoever lives the Spiritual Exercises authentically experiences the attractive power and beauty of God, and then returns renewed and transformed to daily life, to service, and to ordinary relationships, carrying with him the fragrance of Christ.\""
  },
  {
    name_pl: "Czcigodny Pius XII",
    name_en: "Venerable Pius XII",
    image: "../retiros/images/popes/pio_xii.jpg",
    source_pl: "",
    source_en: "",
    text_pl: "„Dzisiaj w Kościele odczuwa się szczególne tchnienie Ducha Świętego, które wzywa do heroizmu i do całkowitego daru z siebie. Pośród cierni świata, który powraca do pogaństwa, wyrasta coraz więcej nieskalanych kwiatów, które swoją świeżością dodają odwagi i zachwycają swoim zapachem… Pragnąłbym, aby kapłani umieli ze świętą odwagą i bez lęku ukazywać ludziom najwyższe szczyty świętości.”",
    text_en: "\"Today in the Church one senses a special breath of the Holy Spirit, calling to heroism and to the complete gift of oneself. Amid the thorns of a world returning to paganism, more and more spotless flowers are growing, which by their freshness give courage and by their fragrance delight... I would like priests to know how, with holy courage and without fear, to show people the highest summits of holiness.\""
  },
  {
    name_pl: "Pius XI",
    name_en: "Pius XI",
    image: "../retiros/images/popes/PioXI-600x330.jpg",
    source_pl: "Mens Nostra o ćwiczeniach duchowych i ich coraz szerszym stosowaniu, 20 XII 1929, Acta Apostolicae Sedis 22 (1930), s. 5–20.",
    source_en: "Mens Nostra on the Spiritual Exercises and their wider use, December 20, 1929, Acta Apostolicae Sedis 22 (1930), pp. 5-20.",
    text_pl: "„Ćwiczenia duchowe św. Ignacego Loyoli, które zostały najwyżej pochwalone przez świętych i mistrzów życia duchowego oraz które przez cztery stulecia przyniosły niezliczone owoce świętości, zawierają to przedziwne dzieło, niewielkie wprawdzie pod względem rozmiaru, ale wielkie i cenne pod względem nauki.”",
    text_en: "\"The Spiritual Exercises of St. Ignatius of Loyola, which have been most highly praised by saints and masters of the spiritual life and which for four centuries have brought forth countless fruits of holiness, contain this wonderful work, small indeed in size, but great and precious in doctrine.\""
  }
];

const testimonials = [
  {
    location_pl: "Józefów, Szensztat",
    location_en: "Józefów, Szensztat",
    year: "2026",
    text_pl: "Miałem przyjemność być na rekolekcjach Ignacianskich już drugi raz. Za każdym razem był to czas głębokiego doświadczenie Bożej obecności, Jego miłości i mądrości.",
    text_en: "I had the pleasure of attending the Ignatian retreat for the second time. Each time it was a time of deep experience of God's presence, His love, and His wisdom."
  },
  {
    location_pl: "Józefów, Franciszkanie",
    location_en: "Józefów, Franciscans",
    year: "2025",
    text_pl: "Dla mnie rekolekcje ignacjańskie były czas zatrzymania, uporządkowania swojego życia duchowego oraz umocnienie relacji z Bogiem. Był to czas w 100% dla Jezusa, pełen owoców duchowych.",
    text_en: "For me, the Ignatian retreat was a time to stop, order my spiritual life, and strengthen my relationship with God. It was a time 100% for Jesus, full of spiritual fruits."
  },
  {
    location_pl: "Józefów, Franciszkanie",
    location_en: "Józefów, Franciscans",
    year: "2025",
    text_pl: "Pomaga lepiej zrozumieć wiarę i poukładać co jest naprawdę w życiu ważne. Sądzę że każdy powinien choć raz w życiu uczestniczyć w takich relacjach.",
    text_en: "It helps to better understand the faith and put in order what is truly important in life. I think everyone should participate in such retreats at least once in their life."
  }
];

const labels = {
  pl: { men: "Mężczyźni", women: "Kobiety", mixed: "Wszyscy" },
  en: { men: "Men", women: "Women", mixed: "All" }
};

function renderBadges(type, language) {
  const typeLabel = labels[currentLang][type] || labels[currentLang].mixed;
  const languageText = language ? `${t("retreat_language_label")}: ${language}` : "";

  return `
    <div class="event-badges">
      ${type ? `<span class="event-badge">${typeLabel}</span>` : ""}
      ${languageText ? `<span class="event-badge event-badge-language">${languageText}</span>` : ""}
    </div>
  `;
}

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

function parseEventDate(dateText, fallbackHour = 12) {
  if (!dateText) return null;

  const text = String(dateText).trim();
  const dateWithTime = /^\d{4}-\d{2}-\d{2}T/.test(text);
  const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(text);

  if (dateWithTime) {
    const parsed = new Date(text);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  if (isoDateOnly) {
    const parsed = new Date(`${text}T${String(fallbackHour).padStart(2, "0")}:00:00`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const europeanDate = text.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})(.*)$/);
  if (europeanDate) {
    const [, day, month, year, note] = europeanDate;
    const lowerNote = note.toLowerCase();
    let hour = fallbackHour;

    if (lowerNote.includes("noite") || lowerNote.includes("wiecz") || lowerNote.includes("evening")) hour = 18;
    if (lowerNote.includes("meio dia") || lowerNote.includes("połud") || lowerNote.includes("polud") || lowerNote.includes("noon")) hour = 12;
    if (lowerNote.includes("manh") || lowerNote.includes("rano") || lowerNote.includes("morning")) hour = 9;

    const parsed = new Date(Number(year), Number(month) - 1, Number(day), hour, 0, 0);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(dateText) {
  const parsed = parseEventDate(dateText);
  if (!parsed) return t("date_soon");

  return new Intl.DateTimeFormat(currentLang === "pl" ? "pl-PL" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(parsed);
}

function formatDateRange(start, end, startLabel = "", endLabel = "") {
  if (!start || !end) {
    return t("date_soon");
  }

  if (startLabel && endLabel) {
    return `${startLabel} - ${endLabel}`;
  }

  if (start === end) {
    return formatDate(start);
  }

  return `${formatDate(start)} - ${formatDate(end)}`;
}

function renderLocation(event) {
  const location = `${getLocalized(event, "venue") ? `${getLocalized(event, "venue")}, ` : ""}${getLocalized(event, "location")}`;

  if (!event.mapsUrl) {
    return location;
  }

  return `<a href="${event.mapsUrl}" target="_blank" rel="noopener">${location}</a>`;
}

function renderEventImage(event) {
  if (!event.image) {
    return "";
  }

  const alt = getLocalized(event, "imageAlt") || getLocalized(event, "title");
  return `<img class="event-image" src="${event.image}" alt="${alt}" loading="lazy">`;
}

function formatCountdown(diff) {
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${days} ${t("days")} ${t("countdown_joiner")} ${hours} ${t("hours")} ${minutes} min ${seconds} ${t("seconds")}`;
}

function getUpcomingEvent(events) {
  const now = new Date();

  return events
    .filter(event => event.published !== false && event.start)
    .map(event => ({ ...event, startDate: parseEventDate(event.start, 18) }))
    .filter(event => event.startDate && event.startDate >= now)
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

    countdown.textContent = `${t("next_retreat")}: ${getLocalized(upcoming, "location")}, ${t("countdown_in")} ${formatCountdown(diff)}`;
  }

  update();
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
  countdownTimer = setInterval(update, 1000);
}

function renderEventCountdowns() {
  const countdowns = document.querySelectorAll("[data-event-countdown]");

  function update() {
    countdowns.forEach(element => {
      const startDate = parseEventDate(element.getAttribute("data-event-countdown"), 18);

      if (!startDate) {
        element.textContent = "";
        return;
      }

      const diff = startDate - new Date();
      element.textContent = diff > 0
        ? `${t("starts_in")}: ${formatCountdown(diff)}`
        : t("started");
    });
  }

  update();
  if (eventCountdownTimer) {
    clearInterval(eventCountdownTimer);
  }
  eventCountdownTimer = setInterval(update, 1000);
}

function renderEvents(events) {
  const container = document.getElementById("eventsContainer");
  const now = new Date();
  const upcoming = getUpcomingEvent(events);

  if (!container) return;

  const visibleEvents = events
    .filter(event => event.published !== false)
    .filter(event => !event.start || parseEventDate(event.end || event.start) >= now)
    .sort((a, b) => {
      if (!a.start) return 1;
      if (!b.start) return -1;
      return parseEventDate(a.start) - parseEventDate(b.start);
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
    const detailsUrl = `retreat.html?id=${encodeURIComponent(event.id)}&lang=${currentLang}`;
    const signup = event.signup && event.signup !== "#" ? event.signup : "";

    return `
      <article class="event-card${isNext ? " highlight-next" : ""}">
        <div class="event-header">
          <h3>${getLocalized(event, "title")}</h3>
          ${renderBadges(event.type, event.language)}
        </div>
        <div class="event-body">
          <div class="event-summary">
            ${renderEventImage(event)}
            <div class="event-summary-content">
              <p class="event-date">${formatDateRange(event.start, event.end, getLocalized(event, "startLabel"), getLocalized(event, "endLabel"))}</p>
              ${event.start ? `<p class="event-countdown" data-event-countdown="${event.start}"></p>` : ""}
              <p class="event-location">${renderLocation(event)}</p>
              ${getLocalized(event, "shortDescription") ? `<p class="event-note">${getLocalized(event, "shortDescription")}</p>` : ""}
            </div>
          </div>
          <div class="event-actions">
            <a class="btn-primary" href="${detailsUrl}">${t("details")}</a>
            ${signup ? `<a class="btn-secondary btn-register" href="${signup}" target="_blank" rel="noopener">${t("register")}</a>` : ""}
          </div>
        </div>
      </article>
    `;
  }).join("");

  renderEventCountdowns();
}

function renderQuotes() {
  const container = document.getElementById("popeQuotes");
  if (!container) return;

  container.innerHTML = popeQuotes.map(quote => `
    <article class="quote-card">
      <h3 class="pope-name">${quote[`name_${currentLang}`]}</h3>
      <div class="pope-card-header">
        ${quote.image
          ? `<img class="pope-avatar" src="${quote.image}" alt="${quote[`name_${currentLang}`]}">`
          : `<div class="pope-avatar pope-avatar-placeholder" aria-hidden="true">${quote[`name_${currentLang}`].split(" ").map(part => part[0]).join("").slice(0, 2)}</div>`}
      </div>
      <blockquote class="${quote[`text_${currentLang}`] ? "" : "pending-note"}">${quote[`text_${currentLang}`] || t("quote_pending")}</blockquote>
      <footer>
        ${quote[`source_${currentLang}`] ? `<span>${quote[`source_${currentLang}`]}</span>` : ""}
      </footer>
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
