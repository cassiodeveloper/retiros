const labels = {
  men: "Mężczyźni",
  women: "Kobiety",
  mixed: "Wszyscy"
};

function formatDate(dateText) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${dateText}T12:00:00`));
}

function formatDateRange(start, end) {
  if (!start || !end) {
    return "Termin zostanie podany wkrótce";
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

  if (!countdown) {
    return;
  }

  if (!upcoming) {
    countdown.textContent = "Nowe terminy zostaną opublikowane po potwierdzeniu miejsca i dat.";
    return;
  }

  function update() {
    const diff = upcoming.startDate - new Date();

    if (diff <= 0) {
      countdown.textContent = "Najbliższe rekolekcje już się rozpoczęły.";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    countdown.textContent = `Najbliższe rekolekcje: ${upcoming.location}, za ${days} dni i ${hours} godz.`;
  }

  update();
  setInterval(update, 3600000);
}

function renderEvents(events) {
  const container = document.getElementById("eventsContainer");
  const currentYear = new Date().getFullYear();
  const upcoming = getUpcomingEvent(events);

  if (!container) {
    return;
  }

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
        <strong>Brak aktualnie opublikowanych terminów.</strong>
        <p>Gdy daty rekolekcji zostaną potwierdzone, pojawią się tutaj razem z miejscem i linkiem do zapisów.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = visibleEvents.map(event => {
    const isNext = event.id === upcoming?.id;
    const type = labels[event.type] || "Rekolekcje";
    const detailsUrl = `retreat.html?id=${encodeURIComponent(event.id)}`;
    const signup = event.signup && event.signup !== "#" ? event.signup : "";

    return `
      <article class="event-card${isNext ? " highlight-next" : ""}">
        <div class="event-header">
          <h3>${event.title}</h3>
          <span class="event-badge">${type}</span>
        </div>
        <div class="event-body">
          <p class="event-date">${formatDateRange(event.start, event.end)}</p>
          <p class="event-location">${event.venue ? `${event.venue}, ` : ""}${event.location}</p>
          ${event.shortDescription ? `<p class="event-note">${event.shortDescription}</p>` : ""}
          <div class="event-actions">
            <a class="btn-primary" href="${detailsUrl}">Szczegóły</a>
            ${signup ? `<a class="btn-secondary" href="${signup}" target="_blank" rel="noopener">Zapisy</a>` : ""}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function injectStructuredData(events) {
  const structuredEvents = events
    .filter(event => event.published !== false && event.start)
    .map(event => ({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": event.title,
      "startDate": event.start,
      "endDate": event.end,
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": event.venue || event.location,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": event.location,
          "addressCountry": "PL"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "IVE Polska",
        "url": "https://ive.org"
      }
    }));

  if (!structuredEvents.length) {
    return;
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredEvents);
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
          <strong>Nie udało się załadować terminów.</strong>
          <p>Sprawdź plik data/events.json.</p>
        </div>
      `;
    }
  }
}

loadEvents();
