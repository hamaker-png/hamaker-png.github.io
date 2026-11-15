// ============================================================
// 1. YOUR PERSONAL INFO (shown in the fixed header on every page)
// Links starting with "http" are used as-is.
// Anything else is treated as a local file.
// ============================================================
const SITE = {
  name: "Elijah Hamaker",
  title: "Mechanical Engineering and Physics Double Major",
  email: "elihamaker@gmail.com",
  links: [
    { label: "GitHub",   url: "https://github.com/hamaker-png" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/eli-hamaker-17a14625b/" }
  ]
};

// ============================================================
// 2. YOUR PROJECTS
// To add a project:
//   a) add a new { ... } line below
//   b) copy an existing file in projects/ to projects/<id>.html
// "id" MUST match the file name (without .html)
// "category" groups projects on the projects page and in the sidebar
// "image" is optional. Example: "images/projects/tank.jpg". Leave "" for a placeholder.
// ============================================================
const PROJECTS = [
  { id: "automated-exfoliator", title: "Automated 2D-Material Exfoliator", category: "Research Automation", summary: "Automated production of monolayer flakes for 2D-device research.", image: "images/projects/automated-exfoliator/overview.jpg" },
  { id: "glovebox-transfer-robot", title: "Glovebox Transfer Robot", category: "Research Automation", summary: "Gantry system for moving silicon chips between glovebox equipment.", image: "images/projects/glovebox-transfer-robot/metal-3d-printed-grippers.jpg" },
  { id: "vacuum-suitcase", title: "Vacuum Suitcase", category: "Research Automation", summary: "Air-sensitive material transfer between an evaporator and glovebox.", image: "images/projects/vacuum-suitcase/photo-1.jpg" },
  { id: "lab-tooling", title: "Research Lab Tooling", category: "Research Automation", summary: "CNC equipment, electronics, enclosures, and UHV components.", image: "images/projects/lab-tooling/cnc-router.jpg" },

  { id: "string-art-robot", title: "String Art Robot", category: "Personal Projects", summary: "Robot for automatically producing circular string-art images.", image: "images/projects/string-art-robot/skull-initial-test.jpg" },
  { id: "tank", title: "Tracked Vehicle", category: "Personal Projects", summary: "Design and fabrication of a gasoline-powered tracked vehicle.", image: "images/projects/tracked-vehicle/cad-render.jpg" },
  { id: "3d-printer", title: "RatRig V-Core 3D Printer", category: "Personal Projects", summary: "Built and commissioned a large-format DIY 3D printer.", image: "images/projects/3d-printer/printer.jpg" },
  { id: "metal-tables", title: "Fabricated Metal Tables", category: "Personal Projects", summary: "Welded decorative steel tables for a robotics-team fundraiser.", image: "images/projects/metal-tables/finished-tables.jpg" },
  { id: "model-rockets", title: "Model Rockets", category: "Personal Projects", summary: "Four years of TARC rocket design and fabrication.", image: "images/projects/model-rockets/rocket.jpg" },
  { id: "model-trains", title: "Model Train Restoration", category: "Personal Projects", summary: "Restored locomotives, track, wiring, and a transformer.", image: "images/projects/model-train-restoration/transformer.jpg" },

  { id: "frc-2025", title: "FRC 2025", category: "Competition Robotics", summary: "Robot design, machining, and assembly for the 2025 season.", image: "images/projects/frc-2025/robot-lineup.jpg" },
  { id: "frc-2024", title: "FRC 2024", category: "Competition Robotics", summary: "Robot and swerve-drivetrain development for the 2024 season.", image: "images/projects/frc-2024/robot-render.jpg" },
  { id: "frc-2023", title: "FRC 2023", category: "Competition Robotics", summary: "Robot design, machining, assembly, and team development.", image: "images/projects/frc-2023/robot-render.jpg" },
  { id: "ftc-2023-2024", title: "FTC 2023-2024", category: "Competition Robotics", summary: "Two robot iterations built for the CENTERSTAGE season.", image: "images/projects/ftc-2023-2024/robot-scoring-pixels.jpg" },
  { id: "vrc-competition-robots", title: "VRC Competition Robots", category: "Competition Robotics", summary: "Competition robots built and programmed across four VRC seasons.", image: "images/projects/vrc-competition-robots/2022-2023/competition-robot.jpg" },
  { id: "vex-differential-mecanum", title: "Differential Mecanum Drive", category: "Competition Robotics", summary: "Custom planetary transmission for balanced mecanum-wheel power.", image: "images/projects/vex-differential-mecanum/render.jpg" },

  { id: "contour-vision", title: "Contour Vision", category: "Software", summary: "CPU-only computer-vision workbench built for HackMIT 2026.", image: "images/projects/contour-vision/logo.svg" },
  { id: "swerve-traction-control", title: "Swerve Traction Control", category: "Software", summary: "Wheel-slip detection and control for an FRC swerve drivetrain.", image: "images/projects/frc-2024/swerve-drivetrain.jpg" }
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
  <a class="side-top ${current === "about" ? "active" : ""}" href="${root}index.html">About</a>
  <a class="side-top ${current === "projects" ? "active" : ""}" href="${root}projects.html">Projects</a>`;

for (const cat of categories) {
  sidebar += `<div class="side-heading">${cat}</div>`;
  for (const p of PROJECTS.filter(p => p.category === cat)) {
    sidebar += `<a class="side-link ${current === p.id ? "active" : ""}" href="${root}projects/${p.id}.html">${p.title}</a>`;
  }
}
document.getElementById("sidebar").innerHTML = sidebar;

// --- Projects page grid (only runs if the page has <div id="project-grid">) ---
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
