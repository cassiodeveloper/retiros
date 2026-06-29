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
    ignatius_p1: "Autorem Ćwiczeń Duchowych jest św. Ignacy Loyola (1491–1556) — założyciel Towarzystwa Jezusowego, jednego z największych i najbardziej wpływowych zakonów w historii Kościoła. Duchowość ignacjańska przyniosła Kościołowi niezliczone owoce świętości i apostolstwa. Wystarczy wspomnieć wielkich świętych Towarzystwa Jezusowego, takich jak św. Franciszek Ksawery, św. Piotr Faber, św. Robert Bellarmin, św. Alojzy Gonzaga, św. Stanisław Kostka czy św. Piotr Klawer — wszystkich uformowanych w duchu Ćwiczeń św. Ignacego.",
    ignatius_p2: "Niegdyś znany jako Íñigo de Loyola, Ignacy był dworzaninem i żołnierzem w służbie króla Hiszpanii. W 1521 roku, podczas bitwy pod Pampeluną, został ciężko ranny. W czasie długiej rekonwalescencji przeszedł głębokie nawrócenie. Czytając żywoty świętych i rozważając poruszenia własnego serca, zaczął odkrywać, jak różne myśli prowadzą człowieka albo ku Bogu, albo od Niego oddalają.",
    ignatius_p3: "Porzuciwszy dawne życie, udał się do Manresy, gdzie poświęcił się modlitwie i pokucie. Tam — jeszcze jako świecki — zaczął spisywać to, czego uczył go Bóg w modlitwie i wewnętrznym rozeznawaniu. Z tych doświadczeń narodziła się Księga Ćwiczeń Duchowych: krótka, lecz niezwykle głęboka metoda modlitwy i rozeznawania, pomagająca człowiekowi „uporządkować swoje życie i odnaleźć wolę Bożą”.",
    ignatius_p4: "Ojciec Juan Alfonso de Polanco pisał, że w Manresie sam Bóg „uczył” Ignacego Ćwiczeń. Sam św. Ignacy wspominał później w swojej Autobiografii: „Bóg obchodził się ze mną jak nauczyciel ze swoim uczniem.”",
    ignatius_p5: "Na fundamencie tej duchowości św. Ignacy założył w 1540 roku Towarzystwo Jezusowe. W ciągu następnych stuleci zakon rozwinął się na wszystkich kontynentach: w czasach swojej największej ekspansji obejmował tysiące jezuitów pracujących w Europie, obu Amerykach, Azji i Afryce, prowadząc misje, szkoły i dzieła apostolskie w dziesiątkach krajów. U podstaw tej formacji zawsze pozostawały Ćwiczenia Duchowe — szkoła modlitwy, rozeznania i całkowitego oddania się Bogu.",
    timeline_1491: "Narodziny Ignacego Loyoli w Kraju Basków.",
    timeline_1521: "Rana pod Pampeluną i początek drogi nawrócenia.",
    timeline_1540: "Zatwierdzenie Towarzystwa Jezusowego.",
    timeline_1556: "Śmierć św. Ignacego w Rzymie.",
    how_page_breadcrumb: "Jak przebiegają Ćwiczenia Duchowe?",
    how_page_kicker: "Jak to wygląda?",
    how_page_title: "Jak przebiegają Ćwiczenia Duchowe?",
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
    how_intro: "Struktura Ćwiczeń Duchowych opiera się na planie dnia przedstawionym na początku rekolekcji przez kapłana prowadzącego. Harmonogram jest zawsze dostępny dla wszystkich uczestników i może nieco się różnić w zależności od charakteru rekolekcji oraz osoby prowadzącej. Niezależnie jednak od szczegółowego układu dnia, Ćwiczenia Duchowe mają kilka stałych i istotnych elementów, które pomagają wejść w głębokie spotkanie z Bogiem i owocnie przeżyć czas rekolekcji.",
    prayer_points_p1: "Jednym z najważniejszych elementów dnia są tzw. punkty. Są to krótkie konferencje, zwykle trwające około trzydziestu minut, podczas których kapłan prowadzący przedstawia treść medytacji lub kontemplacji przewidzianych w Księdze Ćwiczeń Duchowych św. Ignacego Loyoli.",
    prayer_points_p2: "Kapłan wiernie wprowadza uczestników w historię kontemplacji albo w temat medytacji proponowany przez św. Ignacego. Celem tych konferencji jest przygotowanie rekolektanta do osobistej modlitwy. Następnie, podczas medytacji, każdy może sam rozważać otrzymane treści przed Bogiem, zatrzymać się nad nimi i pozwolić, aby prowadziły go do głębszego poznania prawdy.",
    prayer_points_p3: "Jak pisze św. Ignacy w Ćwiczeniach Duchowych, chodzi o to, aby rekolektant mógł „rozważać i zastanawiać się sam nad sobą”, odkrywając prawdy zarówno przez własne rozumowanie, jak i przez światło rozumu oświeconego Bożą łaską (por. Ćwiczenia Duchowe, nr 2).",
    sacraments_p1: "Podczas Ćwiczeń Duchowych rekolektanci mają codzienny dostęp do sakramentów.",
    sacraments_p2: "Każdego dnia sprawowana jest Msza Święta przeznaczona dla uczestników rekolekcji. Eucharystia stanowi centrum dnia i szczególne miejsce spotkania z Chrystusem obecnym w Ofierze Krzyża. To właśnie przez tajemnicę Eucharystii wiele treści rozważanych podczas modlitwy staje się głębiej zrozumiałych i bardziej żywych dla serca.",
    sacraments_p3: "W planie rekolekcji przewidziany jest również konkretny czas na sakrament pokuty i pojednania. Spowiedź staje się wówczas szczególnym momentem odnowienia pragnienia nawrócenia i otwarcia się na łaskę Boga. Jednocześnie uczestnik może w każdej chwili poprosić kapłana o spowiedź również poza wyznaczonym czasem — prowadzący pozostaje dostępny przez cały czas rekolekcji.",
    adoration_p1: "Każdego dnia jedna z medytacji odbywa się w kaplicy podczas adoracji Najświętszego Sakramentu.",
    adoration_p2: "Jest to szczególny czas trwania przed Chrystusem prawdziwie obecnym w Eucharystii. Cisza adoracji pozwala jeszcze głębiej wejść w modlitwę i powierzyć Panu wszystko, co porusza się w sercu. Przed Najświętszym Sakramentem łatwiej zatrzymać się, wsłuchać i pozwolić Bogu działać w duszy z większą prostotą i pokojem.",
    adoration_p3: "Adoracja jest czasem szczególnej łaski — czasem spojrzenia na Jezusa i pozwolenia, aby On spojrzał na nas.",
    direction_p1: "W czasie Ćwiczeń Duchowych każdy uczestnik może zwrócić się do kapłana prowadzącego z prośbą o rozmowę, radę lub kierownictwo duchowe.",
    direction_p2: "Takie rozmowy są bardzo ważną częścią rekolekcji. Ćwiczenia Duchowe są czasem zewnętrznego milczenia, ale jednocześnie bardzo intensywnego działania Bożej łaski w duszy. Pojawiają się różne pytania, poruszenia serca, światła, trudności czy decyzje.",
    direction_p3: "Kapłan pomaga wtedy spokojnie spojrzeć na to wszystko, rozeznawać wewnętrzne poruszenia i lepiej rozumieć drogę, którą Bóg prowadzi duszę.",
    silence_p1: "Jedną z najbardziej charakterystycznych cech Ćwiczeń Duchowych jest milczenie.",
    silence_p2: "Żyjemy w świecie pełnym hałasu, pośpiechu i nieustannego napięcia. Współczesny rytm życia często nie pozwala człowiekowi zatrzymać się i wsłuchać w to, co dzieje się w jego sercu. Łatwo wtedy zagubić wewnętrzny pokój i stracić z oczu to, co najważniejsze.",
    silence_p3: "Dlatego podczas rekolekcji uczestnicy zachowują milczenie zewnętrzne i starają się również wejść w milczenie wewnętrzne. Nie chodzi jedynie o brak rozmów, lecz o stworzenie przestrzeni, w której serce może wyciszyć się przed Bogiem.",
    silence_p4: "W ciszy człowiek zaczyna wyraźniej słyszeć głos Ducha Świętego, rozpoznawać Jego natchnienia i odnajdywać pokój, którego świat nie może dać.",
    silence_p5: "Właśnie dlatego czas Ćwiczeń Duchowych staje się dla wielu osób momentem głębokiej łaski, duchowego odnowienia i prawdziwego spotkania z Bogiem.",
    approved_text_placeholder: "Tekst zatwierdzony przez ojca powinien zostać wstawiony tutaj.",
    title_saintIgnatius: "Kto napisał Ćwiczenia Duchowe? | Św. Ignacy Loyola",
    description_saintIgnatius: "Strona o św. Ignacym Loyoli, autorze Ćwiczeń Duchownych.",
    title_howItWorks: "Jak przebiegają Ćwiczenia Duchowe?",
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
    ignatius_p1: "The author of the Spiritual Exercises is St. Ignatius of Loyola (1491-1556), founder of the Society of Jesus, one of the largest and most influential religious orders in the history of the Church. Ignatian spirituality has brought the Church countless fruits of holiness and apostolate. It is enough to recall the great saints of the Society of Jesus, such as St. Francis Xavier, St. Peter Faber, St. Robert Bellarmine, St. Aloysius Gonzaga, St. Stanislaus Kostka, and St. Peter Claver, all formed in the spirit of the Exercises of St. Ignatius.",
    ignatius_p2: "Once known as Inigo de Loyola, Ignatius was a courtier and soldier in the service of the King of Spain. In 1521, during the Battle of Pamplona, he was seriously wounded. During a long convalescence, he underwent a deep conversion. Reading the lives of the saints and reflecting on the movements of his own heart, he began to discover how different thoughts lead a person either toward God or away from Him.",
    ignatius_p3: "Having left his former life behind, he went to Manresa, where he devoted himself to prayer and penance. There, still as a layman, he began to write down what God was teaching him in prayer and interior discernment. From these experiences was born the Book of the Spiritual Exercises: a short but extraordinarily profound method of prayer and discernment, helping a person to “order his life and find the will of God.”",
    ignatius_p4: "Father Juan Alfonso de Polanco wrote that in Manresa God Himself “taught” Ignatius the Exercises. St. Ignatius himself later recalled in his Autobiography: “God treated me as a teacher treats his pupil.”",
    ignatius_p5: "On the foundation of this spirituality, St. Ignatius founded the Society of Jesus in 1540. In the following centuries the order spread across every continent: at the time of its greatest expansion it included thousands of Jesuits working in Europe, the Americas, Asia, and Africa, carrying out missions, schools, and apostolic works in dozens of countries. At the heart of this formation always remained the Spiritual Exercises: a school of prayer, discernment, and complete self-giving to God.",
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
    how_intro: "The structure of the Spiritual Exercises is based on the daily schedule presented at the beginning of the retreat by the priest leading it. The schedule is always available to all participants and may vary slightly depending on the character of the retreat and the person leading it. Regardless of the exact order of the day, the Spiritual Exercises have several constant and essential elements that help participants enter into a deep encounter with God and fruitfully live the time of retreat.",
    prayer_points_p1: "One of the most important elements of the day are the so-called points. These are short conferences, usually lasting about thirty minutes, during which the priest presents the content of the meditation or contemplation provided in the Book of the Spiritual Exercises of St. Ignatius of Loyola.",
    prayer_points_p2: "The priest faithfully introduces participants to the history of the contemplation or to the theme of the meditation proposed by St. Ignatius. The purpose of these conferences is to prepare the retreatant for personal prayer. Then, during meditation, each person can personally consider the received content before God, pause over it, and allow it to lead them to a deeper knowledge of the truth.",
    prayer_points_p3: "As St. Ignatius writes in the Spiritual Exercises, the point is that the retreatant may “consider and reflect by himself,” discovering truths both through his own reasoning and through the light of reason enlightened by God's grace (cf. Spiritual Exercises, no. 2).",
    sacraments_p1: "During the Spiritual Exercises, retreatants have daily access to the sacraments.",
    sacraments_p2: "Each day Holy Mass is celebrated for the participants of the retreat. The Eucharist is the center of the day and a privileged place of encounter with Christ present in the Sacrifice of the Cross. Through the mystery of the Eucharist, much of what is considered in prayer becomes more deeply understood and more alive in the heart.",
    sacraments_p3: "The retreat schedule also includes a specific time for the sacrament of penance and reconciliation. Confession then becomes a special moment of renewing the desire for conversion and opening oneself to God's grace. At the same time, a participant may ask the priest for confession at any time outside the designated period, since the priest remains available throughout the retreat.",
    adoration_p1: "Each day one of the meditations takes place in the chapel during adoration of the Blessed Sacrament.",
    adoration_p2: "This is a special time of remaining before Christ truly present in the Eucharist. The silence of adoration allows one to enter more deeply into prayer and entrust to the Lord everything that is moving in the heart. Before the Blessed Sacrament it becomes easier to stop, listen, and allow God to act in the soul with greater simplicity and peace.",
    adoration_p3: "Adoration is a time of special grace, a time to look at Jesus and allow Him to look at us.",
    direction_p1: "During the Spiritual Exercises, each participant may turn to the priest leading the retreat to ask for a conversation, advice, or spiritual direction.",
    direction_p2: "Such conversations are a very important part of the retreat. The Spiritual Exercises are a time of external silence, but also of very intense action of God's grace in the soul. Various questions, movements of the heart, lights, difficulties, or decisions may arise.",
    direction_p3: "The priest then helps the participant look calmly at all of this, discern interior movements, and better understand the path by which God is leading the soul.",
    silence_p1: "One of the most characteristic features of the Spiritual Exercises is silence.",
    silence_p2: "We live in a world full of noise, haste, and constant tension. The modern rhythm of life often does not allow a person to stop and listen to what is happening in the heart. It is easy then to lose interior peace and lose sight of what matters most.",
    silence_p3: "For this reason, during the retreat participants keep external silence and also try to enter into interior silence. It is not merely a lack of conversation, but the creation of a space in which the heart can become quiet before God.",
    silence_p4: "In silence, a person begins to hear more clearly the voice of the Holy Spirit, recognize His inspirations, and find the peace that the world cannot give.",
    silence_p5: "That is why the time of the Spiritual Exercises becomes for many people a moment of deep grace, spiritual renewal, and true encounter with God.",
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
