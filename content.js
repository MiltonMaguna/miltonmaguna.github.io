/*
  ============================================================
  PORTFOLIO CONTENT — this is the only file you need to edit.
  YouTube links can be any format (watch?v=, youtu.be/, shorts/).
  ============================================================
*/

const CONTENT = {
  name: "Milton Maguna",
  role: "Senior Digital Compositor",
  location: "Buenos Aires, Argentina",
  experience: "18+", // years of experience
  careerStart: 2007,

  reel: {
    title: "Demo Reel 2025",
    link: "https://www.youtube.com/watch?v=LZsVX038G90",
  },

  // ---- Game Cinematics (YouTube) ----
  // The ORDER of this list is the order on the website: move a line up or down to reorder.
  // Optional custom thumbnail: add  thumb: "assets/thumbs/name.jpg"  to any line (16:9 image).
  // Without it, the video's YouTube thumbnail is used.
  cinematicsNote: "A selection of personal favorites from a much larger body of game cinematic work.",
  cinematics: [
    { title: "Viking Season", game: "Clash Royale", link: "https://www.youtube.com/watch?v=_ipfG1lwgQ8" },
    { title: "The Evolution of Furnace", game: "Clash Royale", link: "https://www.youtube.com/watch?v=5FXOdOySfsI" },
    { title: "Halftime Show ft. Lil Wayne", game: "Clash Royale", link: "https://www.youtube.com/watch?v=9RX5VoXu120" },
    { title: "Official Reveal Trailer", game: "Vaultbreakers", link: "https://www.youtube.com/watch?v=8x1KTh2Rsms" },
    { title: "Cinematic Story Trailer", game: "Heroes of Might and Magic: Olden Era", link: "https://www.youtube.com/watch?v=Mvm6yCL7vZk" },
    { title: "CGI Trailer", game: "Disney Speedstorm", link: "https://www.youtube.com/watch?v=f0-7YTl6Sg8" },
    { title: "They’ll Be Coming For You ft. Neymar Jr.", game: "Mech Arena", link: "https://www.youtube.com/watch?v=nXc17b7YAXg" },
    { title: "Replanted — Pre-order Trailer", game: "Plants vs. Zombies", link: "https://www.youtube.com/watch?v=Zv1Q0_x93ZM" },
    { title: "Campfire — Always More", game: "Final Fantasy XIV", link: "https://www.youtube.com/watch?v=4ei3OSTHZVM" },
    { title: "Princess’s Journey", game: "Clash Royale", link: "https://www.youtube.com/watch?v=AJodpEDZF6g" },
    { title: "Deathwing", game: "Hearthstone", link: "https://www.youtube.com/watch?v=0mA1kOZ2n50" },
    { title: "Grommash", game: "Hearthstone", link: "https://www.youtube.com/watch?v=rTz0yUd_RrE" },
  ],

  // ---- Movies & series (from IMDb). type: "Film" | "Series" | "Short" ----
  // Same here: the order of the list is the order on the website.
  movies: [
    { title: "Moria", year: 2026, type: "Series", role: "Digital Compositor", imdb: "tt41559147" },
    { title: "La Máquina", year: 2024, type: "Series", role: "Digital Compositor", imdb: "tt21382958" },
    { title: "Superman & Lois", year: 2022, type: "Series", role: "Digital Compositor", imdb: "tt11192306" },
    { title: "Tú eres mi problema", year: 2021, type: "Film", role: "Digital Compositor", imdb: "tt13804586" },
    { title: "Run Coyote Run", year: 2020, type: "Series", role: "Digital Compositor", imdb: "tt6064764" },
    { title: "Strike Back", year: 2020, type: "Series", role: "Digital Compositor", imdb: "tt1492179" },
    { title: "A Christmas Carol", year: 2019, type: "Series", role: "Digital Compositor", imdb: "tt7686464" },
    { title: "Pinocchio", year: 2019, type: "Film", role: "Digital Compositor", imdb: "tt8333746" },
    { title: "Sitiados: México", year: 2019, type: "Series", role: "Digital Compositor", imdb: "tt9681636" },
    { title: "Unidad XV", year: 2018, type: "Film", role: "VFX Artist", imdb: "tt7917826" },
    { title: "Sitiados", year: 2018, type: "Series", role: "Digital Compositor", imdb: "tt4198192" },
    { title: "Queen of Fear", year: 2018, type: "Film", role: "VFX Artist", imdb: "tt7689928" },
    { title: "Los que aman odian", year: 2017, type: "Film", role: "Digital Artist", imdb: "tt3864934" },
    { title: "Dragon Ball: The Legendary Warrior", year: 2017, type: "Short", role: "Digital Compositor", imdb: "tt7012066" },
    { title: "2091", year: 2016, type: "Series", role: "Digital Compositor", imdb: "tt5610542" },
    { title: "On the Milky Road", year: 2016, type: "Film", role: "Digital Compositor", imdb: "tt2800340" },
    { title: "The Long Night of Francisco Sanctis", year: 2016, type: "Film", role: "Digital Compositor", imdb: "tt5623224" },
    { title: "How Most Things Work", year: 2015, type: "Film", role: "Digital Compositor", imdb: "tt3529010" },
    { title: "Lion Heart", year: 2015, type: "Film", role: "Digital Compositor", imdb: "tt4596248" },
    { title: "A la mala", year: 2015, type: "Film", role: "Visual Effects", imdb: "tt4357170" },
    { title: "The Games Maker", year: 2014, type: "Film", role: "3D Animation", imdb: "tt2766268" },
    { title: "Death in Buenos Aires", year: 2014, type: "Film", role: "Digital Compositor", imdb: "tt3621802" },
    { title: "Underdogs", year: 2013, type: "Film", role: "Digital Compositor", imdb: "tt1634003" },
  ],
  // Poster images live in assets/movies/<imdb id>.jpg

  about: {
    statement: "Every detail matters.",
    paragraphs: [
      "Senior Digital Compositor based in Buenos Aires, with 18+ years of experience delivering visual effects for feature films, television, game cinematics and high-end advertising. I started in 2007 in architectural visualization studios, and have since worked with teams like Gizmo, Dazzle Pictures and MediaMonks.",
      "I specialize in complex CG integration, multi-pass AOV compositing, camera projections, relighting and look development in Nuke — working closely with VFX Supervisors to solve technically challenging shots. I also build Python tools to automate repetitive workflows and speed up shot delivery.",
    ],
    tools: ["Nuke", "Maya", "Arnold", "Blender", "Photoshop", "Mocha Pro", "Python", "PySide / Qt", "ComfyUI"],
  },

  contact: {
    email: "milton.maguna@gmail.com",
    linkedin: "https://www.linkedin.com/in/miltonmaguna/",
    imdb: "https://www.imdb.com/name/nm6702807/",
    cv: "assets/Milton_Maguna_CV.pdf", // delete this line to hide the CV button
  },
};
