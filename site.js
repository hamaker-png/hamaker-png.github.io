// ============================================================
// 1. YOUR PERSONAL INFO (shown in the fixed header on every page)
// Links starting with "http" are used as-is.
// Anything else (like "images/resume.pdf") is treated as a local file.
// ============================================================
const SITE = {
  name: "Elijah Hamaker",
  title: "Mechanical Engineering and Physics Double Major",
  email: "elihamaker@gmail.com",
  links: [
    { label: "GitHub",   url: "https://github.com/yourname" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourname" },
    { label: "Resume",   url: "images/resume.pdf" }
  ]
};

// ============================================================
// 2. YOUR PROJECTS
// To add a project:
//   a) add a new { ... } line below
//   b) copy projects/robot-arm.html to projects/<id>.html
// "id" MUST match the file name (without .html)
// "category" groups projects on the home page and in the sidebar
// "image" is optional. Example: "images/robot-arm.jpg". Leave "" for a placeholder.
// ============================================================
const PROJECTS = [
  { id: "robot-arm",    title: "Robot Arm",         category: "Mechanical",  summary: "6-DOF arm with servo control.",  image: "" },
  { id: "gearbox",      title: "Planetary Gearbox", category: "Mechanical",  summary: "3D-printed 5:1 reduction.",      image: "" },
  { id: "weather-app",  title: "Weather App",       category: "Software",    summary: "Python dashboard using an API.", image: "" },
  { id: "sensor-board", title: "Sensor Board",      category: "Electronics", summary: "Custom PCB with I2C sensors.",   image: "" }
];

// ============================================================
// 3. CODE THAT BUILDS THE PAGE (you shouldn't need to edit below)
// ============================================================
const root    = document.body.dataset.root || "";   // "" for top-level pages, "../" for project pages
const current = document.body.dataset.page || "";   // used to highlight the current link

// Get a list of unique categories, in the order they appear above
const categories = [...new Set(PROJECTS.map(p => p.category))];

// --- Header ---
document.getElementById("header").innerHTML = `
  <div class="header-left">
    <a class="site-name" href="${root}index.html">${SITE.name}</a>
    <span class="site-title">${SITE.title}</span>
  </div>
  <div class="header-right">
    <a href="mailto:${SITE.email}">${SITE.email}</a>
    ${SITE.links.map(l => `<a href="${l.url.startsWith("http") ? l.url : root + l.url}">${l.label}</a>`).join("")}
  </div>`;

// --- Sidebar ---
let sidebar = `
  <a class="side-top ${current === "home" ? "active" : ""}"  href="${root}index.html">Home</a>
  <a class="side-top ${current === "about" ? "active" : ""}" href="${root}about.html">About</a>`;

for (const cat of categories) {
  sidebar += `<div class="side-heading">${cat}</div>`;
  for (const p of PROJECTS.filter(p => p.category === cat)) {
    sidebar += `<a class="side-link ${current === p.id ? "active" : ""}" href="${root}projects/${p.id}.html">${p.title}</a>`;
  }
}
document.getElementById("sidebar").innerHTML = sidebar;

// --- Home page project grid (only runs if the page has <div id="project-grid">) ---
const grid = document.getElementById("project-grid");
if (grid) {
  let html = "";
  for (const cat of categories) {
    html += `<h2>${cat}</h2><div class="grid">`;
    for (const p of PROJECTS.filter(p => p.category === cat)) {
      const thumb = p.image
        ? `<img src="${root}${p.image}" alt="${p.title}">`
        : `<div class="thumb-placeholder">image</div>`;
      html += `
        <a class="card" href="${root}projects/${p.id}.html">
          ${thumb}
          <div class="card-title">${p.title}</div>
          <div class="card-text">${p.summary}</div>
        </a>`;
    }
    html += `</div>`;
  }
  grid.innerHTML = html;
}