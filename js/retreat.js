let currentLang = new URLSearchParams(window.location.search).get("lang") || localStorage.getItem("siteLang") || "pl";
let currentEvent = null;
let countdownTimer = null;

const translations = {
  pl: {
    brand: "Ćwiczenia Duchowne",
    nav_dates: "Terminy",
    nav_about: "Czym są?",
    nav_for_whom: "Dla kogo?",
    nav_popes: "Papieże",
    home: "Strona główna",
    details: "Szczegóły",
    date: "Data",
    place: "Miejsce",
    language: "Język",
    retreat_language_label: "JĘZYK REKOLEKCJI",
    register: "Zapisz się",
    back: "Wróć do terminów",
    share: "Udostępnij",
    share_options: "Udostępnij rekolekcje",
    whatsapp: "WhatsApp",
    sms: "SMS",
    facebook: "Facebook",
    copy: "Kopiuj link",
    copied: "Link skopiowany",
    poster: "Plakat rekolekcji",
    open_poster: "Powiększ plakat",
    date_soon: "Termin zostanie podany wkrótce",
    countdown_soon: "Termin zostanie podany po potwierdzeniu organizacyjnym.",
    started: "Te rekolekcje już się rozpoczęły lub odbyły.",
    starts_in: "Do rozpoczęcia",
    days: "dni",
    hours: "godz.",
    seconds: "sek.",
    countdown_joiner: "i",
    not_found: "Nie znaleziono terminu.",
    not_found_text: "Wróć do listy rekolekcji i wybierz aktualny termin.",
    load_error: "Nie udało się załadować szczegółów.",
    load_error_hint: "Sprawdź plik data/events.json.",
    fallback_description: "Szczegóły zostaną uzupełnione wkrótce."
  },
  en: {
    brand: "Spiritual Exercises",
    nav_dates: "Dates",
    nav_about: "What are they?",
    nav_for_whom: "For whom?",
    nav_popes: "Popes",
    home: "Home",
    details: "Details",
    date: "Date",
    place: "Place",
    language: "Language",
    retreat_language_label: "LANGUAGE RETREAT",
    register: "Register",
    back: "Back to dates",
    share: "Share",
    share_options: "Share this retreat",
    whatsapp: "WhatsApp",
    sms: "SMS",
    facebook: "Facebook",
    copy: "Copy link",
    copied: "Link copied",
    poster: "Retreat poster",
    open_poster: "Open poster",
    date_soon: "Date to be announced soon",
    countdown_soon: "Date will be announced after organizational confirmation.",
    started: "This retreat has already started or taken place.",
    starts_in: "Starts in",
    days: "days",
    hours: "hours",
    seconds: "sec.",
    countdown_joiner: "and",
    not_found: "Retreat date not found.",
    not_found_text: "Return to the retreat list and choose a current date.",
    load_error: "Could not load retreat details.",
    load_error_hint: "Check data/events.json.",
    fallback_description: "Details will be added soon."
  }
};

const typeLabels = {
  pl: { men: "Mężczyźni", women: "Kobiety", mixed: "Wszyscy" },
  en: { men: "Men", women: "Women", mixed: "All" }
};

function renderBadges(type, language) {
  const typeLabel = typeLabels[currentLang][type] || typeLabels[currentLang].mixed;
  const languageText = language ? `${t("retreat_language_label")}: ${language}` : "";

  return `
    <div class="event-badges">
      <span class="event-badge">${typeLabel}</span>
      ${languageText ? `<span class="event-badge event-badge-language">${languageText}</span>` : ""}
    </div>
  `;
}

function t(key) {
  return translations[currentLang][key] || translations.pl[key] || key;
}

function getLocalized(event, field) {
  return event[`${field}_${currentLang}`] || event[`${field}_pl`] || event[field] || "";
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
  if (!start || !end) return t("date_soon");
  if (startLabel && endLabel) return `${startLabel} - ${endLabel}`;
  if (start === end) return formatDate(start);
  return `${formatDate(start)} - ${formatDate(end)}`;
}

function renderLocation(event) {
  const location = `${getLocalized(event, "venue") ? `${getLocalized(event, "venue")}, ` : ""}${getLocalized(event, "location")}`;

  if (!event.mapsUrl) {
    return location;
  }

  return `<a href="${event.mapsUrl}" target="_blank" rel="noopener">${location}</a>`;
}

function shareUrl() {
  return window.location.href;
}

function shareText() {
  return currentEvent ? `${getLocalized(currentEvent, "title")} - ${shareUrl()}` : shareUrl();
}

async function nativeShare() {
  if (navigator.share && currentEvent) {
    await navigator.share({
      title: getLocalized(currentEvent, "title"),
      text: getLocalized(currentEvent, "shortDescription") || getLocalized(currentEvent, "description"),
      url: shareUrl()
    });
  } else {
    await copyLink();
  }
}

async function copyLink() {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(shareUrl());
  } else {
    window.prompt(t("copy"), shareUrl());
  }
  const button = document.querySelector("[data-copy-link]");
  if (button) {
    button.textContent = t("copied");
    setTimeout(() => {
      button.textContent = t("copy");
    }, 1800);
  }
}

function updateMetaTags(event) {
  const title = getLocalized(event, "title");
  const description = getLocalized(event, "shortDescription") || getLocalized(event, "description") || t("fallback_description");

  document.title = `${title} | Ćwiczenia Duchowne`;
  document.querySelector('meta[name="description"]').setAttribute("content", description);
  document.querySelector('meta[property="og:title"]').setAttribute("content", title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", description);
  document.querySelector('meta[property="og:url"]').setAttribute("content", shareUrl());
  document.querySelector('meta[name="twitter:title"]').setAttribute("content", title);
  document.querySelector('meta[name="twitter:description"]').setAttribute("content", description);

  const socialImage = event.image || event.poster;
  if (socialImage) {
    const imageUrl = new URL(socialImage, window.location.origin).href;
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement("meta");
      ogImage.setAttribute("property", "og:image");
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute("content", imageUrl);
  }
}

function renderCountdown(event) {
  const element = document.getElementById("detailCountdown");
  if (!element) return;

  if (!event.start) {
    element.textContent = t("countdown_soon");
    return;
  }

  const startDate = parseEventDate(event.start, 18);

  if (!startDate) {
    element.textContent = t("countdown_soon");
    return;
  }

  function update() {
    const diff = startDate - new Date();

    if (diff <= 0) {
      element.textContent = t("started");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    element.textContent = `${t("starts_in")}: ${days} ${t("days")} ${t("countdown_joiner")} ${hours} ${t("hours")} ${minutes} min ${seconds} ${t("seconds")}`;
  }

  update();
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
  countdownTimer = setInterval(update, 1000);
}

function injectStructuredData(event) {
  const items = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": t("home"), "item": "https://ivepolska.github.io/retiros/" },
        { "@type": "ListItem", "position": 2, "name": getLocalized(event, "title"), "item": shareUrl() }
      ]
    }
  ];

  if (event.start) {
    items.push({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": getLocalized(event, "title"),
      "startDate": event.start,
      "endDate": event.end,
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "image": event.image || event.poster ? [new URL(event.image || event.poster, window.location.origin).href] : undefined,
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
    });
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(items);
  document.head.appendChild(script);
}

function renderPoster(event) {
  if (!event.poster) return "";

  return `
    <div class="poster-panel">
      <a href="${event.poster}" target="_blank" rel="noopener" aria-label="${t("open_poster")}">
        <img src="${event.poster}" alt="${t("poster")}: ${getLocalized(event, "title")}" />
      </a>
    </div>
  `;
}

function renderEventImage(event) {
  if (!event.image) return "";
  if (event.poster && event.image === event.poster) return "";

  const alt = getLocalized(event, "imageAlt") || getLocalized(event, "title");
  return `<img class="event-detail-image" src="${event.image}" alt="${alt}">`;
}

function fitDetailTitle() {
  const title = document.querySelector(".detail-title");
  if (!title) return;

  const maxSize = 51.2;
  const minSize = 18;
  title.style.fontSize = `${maxSize}px`;

  while (title.scrollWidth > title.clientWidth && parseFloat(title.style.fontSize) > minSize) {
    const nextSize = parseFloat(title.style.fontSize) - 1;
    title.style.fontSize = `${nextSize}px`;
  }
}

function renderRetreat(event) {
  const content = document.getElementById("retreatContent");
  const breadcrumb = document.getElementById("breadcrumbTitle");
  const signup = event.signup && event.signup !== "#" ? event.signup : "";
  const url = encodeURIComponent(shareUrl());
  const text = encodeURIComponent(shareText());

  breadcrumb.textContent = getLocalized(event, "title");

  content.innerHTML = `
    <h1 class="detail-title">${getLocalized(event, "title")}</h1>
    ${renderBadges(event.type, event.language)}

    <div class="detail-meta">
      <p><strong>${t("date")}:</strong> ${formatDateRange(event.start, event.end, getLocalized(event, "startLabel"), getLocalized(event, "endLabel"))}</p>
      <p><strong>${t("place")}:</strong> ${renderLocation(event)}</p>
      <p><strong>${t("language")}:</strong> ${event.language || "PL"}</p>
    </div>

    ${renderEventImage(event)}

    ${renderPoster(event)}

    <div class="detail-description">
      <p>${getLocalized(event, "description") || getLocalized(event, "shortDescription") || t("fallback_description")}</p>
    </div>

    <div class="detail-actions">
      ${signup ? `<a class="btn-primary" href="${signup}" target="_blank" rel="noopener">${t("register")}</a>` : ""}
      <a class="btn-secondary" href="index.html#terminy">${t("back")}</a>
    </div>

    <div class="share-panel" aria-label="${t("share")}">
      <div class="share-panel-title">${t("share_options")}</div>
      <div class="share-actions">
        <button class="btn-share btn-share-primary" type="button" data-native-share>${t("share")}</button>
        <a class="btn-share btn-share-whatsapp" href="https://wa.me/?text=${text}" target="_blank" rel="noopener">${t("whatsapp")}</a>
        <a class="btn-share btn-share-sms" href="sms:?&body=${text}">${t("sms")}</a>
        <a class="btn-share btn-share-facebook" href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener">${t("facebook")}</a>
        <button class="btn-share btn-share-copy" type="button" data-copy-link>${t("copy")}</button>
      </div>
    </div>
  `;

  fitDetailTitle();
  document.querySelector("[data-native-share]").addEventListener("click", nativeShare);
  document.querySelector("[data-copy-link]").addEventListener("click", copyLink);
}

async function loadRetreat() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const content = document.getElementById("retreatContent");

  try {
    const response = await fetch("data/events.json");
    const events = await response.json();
    const event = events.find(item => item.id === id);

    if (!event) {
      content.innerHTML = `
        <div class="empty-state">
          <strong>${t("not_found")}</strong>
          <p>${t("not_found_text")}</p>
          <div class="detail-actions">
            <a class="btn-primary" href="index.html#terminy">${t("nav_dates")}</a>
          </div>
        </div>
      `;
      return;
    }

    currentEvent = event;
    renderRetreat(event);
    renderCountdown(event);
    updateMetaTags(event);
    injectStructuredData(event);
  } catch (error) {
    content.innerHTML = `
      <div class="empty-state">
        <strong>${t("load_error")}</strong>
        <p>${t("load_error_hint")}</p>
      </div>
    `;
  }
}

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "pl" ? "en" : "pl";
  localStorage.setItem("siteLang", currentLang);
  updateTexts();
  if (currentEvent) {
    renderRetreat(currentEvent);
    renderCountdown(currentEvent);
    updateMetaTags(currentEvent);
  }
});

updateTexts();
loadRetreat();
window.addEventListener("resize", fitDetailTitle);
