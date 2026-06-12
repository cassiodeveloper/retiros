let currentLang = new URLSearchParams(window.location.search).get("lang") || localStorage.getItem("siteLang") || "pl";

const translations = {
  pl: {
    brand: "Ćwiczenia Duchowne",
    nav_about: "Czym są?",
    nav_for_whom: "Dla kogo?",
    nav_popes: "Papieże",
    nav_dates: "Terminy",
    home: "Strona główna",
    see_dates: "Zobacz terminy",
    back: "Wróć",
    ignatius_breadcrumb: "Św. Ignacy Loyola",
    ignatius_kicker: "Kto napisał Ćwiczenia Duchowe?",
    ignatius_title: "Św. Ignacy Loyola",
    ignatius_image: "Miejsce na zdjęcie lub ilustrację św. Ignacego",
    ignatius_p1: "Pełny tekst zatytułowany „Kto napisał Ćwiczenia Duchowe?” powinien zostać wstawiony tutaj po otrzymaniu dokładnej wersji zatwierdzonej przez ojca.",
    ignatius_p2: "Obecny układ jest przygotowany pod dłuższy tekst: wprowadzenie, rozwinięcie, podpisy pod ilustracją oraz link powrotny do terminów rekolekcji.",
    timeline_1491: "Narodziny Ignacego Loyoli w Kraju Basków.",
    timeline_1521: "Rana pod Pampeluną i początek drogi nawrócenia.",
    timeline_1540: "Zatwierdzenie Towarzystwa Jezusowego.",
    timeline_1556: "Śmierć św. Ignacego w Rzymie.",
    how_page_breadcrumb: "Jak funkcjonują Ćwiczenia Duchowne?",
    how_page_kicker: "Jak to wygląda?",
    how_page_title: "Jak funkcjonują Ćwiczenia Duchowne?",
    placeholder_chapel: "Kaplica",
    placeholder_sacrament: "Najświętszy Sakrament",
    placeholder_nature: "Natura",
    placeholder_monastery: "Klasztor",
    placeholder_silence: "Retiro w ciszy",
    placeholder_ignatius: "Święty Ignacy",
    prayer_points_title: "Punkty do modlitwy",
    sacraments_title: "Sakramenty",
    adoration_title: "Adoracja Najświętszego Sakramentu",
    direction_title: "Kierownictwo duchowe",
    silence_title: "Milczenie",
    approved_text_placeholder: "Tekst zatwierdzony przez ojca powinien zostać wstawiony tutaj.",
    title_saintIgnatius: "Kto napisał Ćwiczenia Duchowe? | Św. Ignacy Loyola",
    description_saintIgnatius: "Strona o św. Ignacym Loyoli, autorze Ćwiczeń Duchownych.",
    title_howItWorks: "Jak funkcjonują Ćwiczenia Duchowne?",
    description_howItWorks: "Opis elementów Ćwiczeń Duchownych: punkty do modlitwy, sakramenty, adoracja, kierownictwo duchowe i milczenie."
  },
  en: {
    brand: "Spiritual Exercises",
    nav_about: "What are they?",
    nav_for_whom: "For whom?",
    nav_popes: "Popes",
    nav_dates: "Dates",
    home: "Home",
    see_dates: "See dates",
    back: "Back",
    ignatius_breadcrumb: "St. Ignatius of Loyola",
    ignatius_kicker: "Who wrote the Spiritual Exercises?",
    ignatius_title: "St. Ignatius of Loyola",
    ignatius_image: "Place for a photo or illustration of St. Ignatius",
    ignatius_p1: "The full text titled “Who wrote the Spiritual Exercises?” should be inserted here after receiving the exact version approved by the priest.",
    ignatius_p2: "This layout is prepared for a longer text: introduction, body content, image captions, and a return link to the retreat dates.",
    timeline_1491: "Birth of Ignatius of Loyola in the Basque Country.",
    timeline_1521: "Wound at Pamplona and the beginning of his conversion.",
    timeline_1540: "Approval of the Society of Jesus.",
    timeline_1556: "Death of St. Ignatius in Rome.",
    how_page_breadcrumb: "How do the Spiritual Exercises work?",
    how_page_kicker: "How does it work?",
    how_page_title: "How do the Spiritual Exercises work?",
    placeholder_chapel: "Chapel",
    placeholder_sacrament: "Blessed Sacrament",
    placeholder_nature: "Nature",
    placeholder_monastery: "Monastery",
    placeholder_silence: "Silent retreat",
    placeholder_ignatius: "St. Ignatius",
    prayer_points_title: "Points for prayer",
    sacraments_title: "Sacraments",
    adoration_title: "Adoration of the Blessed Sacrament",
    direction_title: "Spiritual direction",
    silence_title: "Silence",
    approved_text_placeholder: "The text approved by the priest should be inserted here.",
    title_saintIgnatius: "Who wrote the Spiritual Exercises? | St. Ignatius of Loyola",
    description_saintIgnatius: "A page about St. Ignatius of Loyola, author of the Spiritual Exercises.",
    title_howItWorks: "How do the Spiritual Exercises work?",
    description_howItWorks: "A description of the elements of the Spiritual Exercises: points for prayer, sacraments, adoration, spiritual direction, and silence."
  }
};

function t(key) {
  return translations[currentLang][key] || translations.pl[key] || key;
}

function updatePageMeta() {
  const page = document.body.getAttribute("data-page");
  const title = t(`title_${page}`);
  const description = t(`description_${page}`);

  if (title) {
    document.title = title;
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
  }

  if (description) {
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
  }
}

function updateTexts() {
  document.documentElement.lang = currentLang;
  document.getElementById("langToggle").textContent = currentLang === "pl" ? "EN" : "PL";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.getAttribute("data-i18n"));
  });

  updatePageMeta();
}

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "pl" ? "en" : "pl";
  localStorage.setItem("siteLang", currentLang);
  updateTexts();
});

updateTexts();
