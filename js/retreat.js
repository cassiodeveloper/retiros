const typeLabels = {
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

function updateMetaTags(event) {
  const description = event.shortDescription || event.description || "Szczegóły terminu Ćwiczeń Duchownych.";

  document.title = `${event.title} | Ćwiczenia Duchowne`;
  document.querySelector('meta[name="description"]').setAttribute("content", description);
  document.querySelector('meta[property="og:title"]').setAttribute("content", event.title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", description);
}

function renderCountdown(event) {
  const element = document.getElementById("detailCountdown");

  if (!element) {
    return;
  }

  if (!event.start) {
    element.textContent = "Termin zostanie podany po potwierdzeniu organizacyjnym.";
    return;
  }

  const startDate = new Date(`${event.start}T12:00:00`);

  function update() {
    const diff = startDate - new Date();

    if (diff <= 0) {
      element.textContent = "Te rekolekcje już się rozpoczęły lub odbyły.";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    element.textContent = `Do rozpoczęcia: ${days} dni i ${hours} godz.`;
  }

  update();
  setInterval(update, 3600000);
}

function injectStructuredData(event) {
  if (!event.start) {
    return;
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "startDate": event.start,
    "endDate": event.end,
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
  });
  document.head.appendChild(script);
}

function renderRetreat(event) {
  const content = document.getElementById("retreatContent");
  const breadcrumb = document.getElementById("breadcrumbTitle");
  const signup = event.signup && event.signup !== "#" ? event.signup : "";

  breadcrumb.textContent = event.title;

  content.innerHTML = `
    <h1 class="detail-title">${event.title}</h1>
    <span class="event-badge">${typeLabels[event.type] || "Rekolekcje"}</span>

    <div class="detail-meta">
      <p><strong>Data:</strong> ${formatDateRange(event.start, event.end)}</p>
      <p><strong>Miejsce:</strong> ${event.venue ? `${event.venue}, ` : ""}${event.location}</p>
      <p><strong>Język:</strong> ${event.language || "PL"}</p>
    </div>

    <div class="detail-description">
      <p>${event.description || event.shortDescription || "Szczegóły zostaną uzupełnione wkrótce."}</p>
    </div>

    <div class="detail-actions">
      ${signup ? `<a class="btn-primary" href="${signup}" target="_blank" rel="noopener">Zapisz się</a>` : ""}
      <a class="btn-secondary" href="index.html#terminy">Wróć do terminów</a>
    </div>
  `;
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
          <strong>Nie znaleziono terminu.</strong>
          <p>Wróć do listy rekolekcji i wybierz aktualny termin.</p>
          <div class="detail-actions">
            <a class="btn-primary" href="index.html#terminy">Zobacz terminy</a>
          </div>
        </div>
      `;
      return;
    }

    renderRetreat(event);
    renderCountdown(event);
    updateMetaTags(event);
    injectStructuredData(event);
  } catch (error) {
    content.innerHTML = `
      <div class="empty-state">
        <strong>Nie udało się załadować szczegółów.</strong>
        <p>Sprawdź plik data/events.json.</p>
      </div>
    `;
  }
}

loadRetreat();
