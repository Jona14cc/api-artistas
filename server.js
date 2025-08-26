// server.js
// API sencilla de 40 artistas reales con 2–3 eventos inventados cada uno

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Utilidad para crear URLs "bonitas"
const slugify = (str) =>
  str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const artists = [
  {
    id: 1,
    name: "Bad Bunny",
    genre: "Reggaetón / Latin Trap",
    country: "Puerto Rico",
    slug: slugify("Bad Bunny"),
    events: [
      { id: "1-1", date: "2025-09-12", city: "Miami", country: "USA", venue: "Kaseya Center", price_from: 65, currency: "USD", tickets_url: "https://tickets.example.com/bad-bunny-miami-2025-09-12" },
      { id: "1-2", date: "2025-10-04", city: "Ciudad de México", country: "México", venue: "Foro Sol", price_from: 40, currency: "MXN", tickets_url: "https://tickets.example.com/bad-bunny-cdmx-2025-10-04" },
      { id: "1-3", date: "2025-11-20", city: "Madrid", country: "España", venue: "WiZink Center", price_from: 55, currency: "EUR", tickets_url: "https://tickets.example.com/bad-bunny-madrid-2025-11-20" },
    ],
  },
  {
    id: 2,
    name: "Taylor Swift",
    genre: "Pop",
    country: "Estados Unidos",
    slug: slugify("Taylor Swift"),
    events: [
      { id: "2-1", date: "2025-09-28", city: "Toronto", country: "Canadá", venue: "Rogers Centre", price_from: 120, currency: "CAD", tickets_url: "https://tickets.example.com/taylor-swift-toronto-2025-09-28" },
      { id: "2-2", date: "2025-10-18", city: "São Paulo", country: "Brasil", venue: "Allianz Parque", price_from: 90, currency: "BRL", tickets_url: "https://tickets.example.com/taylor-swift-sao-paulo-2025-10-18" },
      { id: "2-3", date: "2025-12-05", city: "Barcelona", country: "España", venue: "Estadi Olímpic", price_from: 110, currency: "EUR", tickets_url: "https://tickets.example.com/taylor-swift-barcelona-2025-12-05" },
    ],
  },
  {
    id: 3,
    name: "Coldplay",
    genre: "Rock / Pop",
    country: "Reino Unido",
    slug: slugify("Coldplay"),
    events: [
      { id: "3-1", date: "2025-09-15", city: "Londres", country: "Reino Unido", venue: "Wembley Stadium", price_from: 75, currency: "GBP", tickets_url: "https://tickets.example.com/coldplay-londres-2025-09-15" },
      { id: "3-2", date: "2025-10-10", city: "París", country: "Francia", venue: "Stade de France", price_from: 70, currency: "EUR", tickets_url: "https://tickets.example.com/coldplay-paris-2025-10-10" },
      { id: "3-3", date: "2025-11-08", city: "Buenos Aires", country: "Argentina", venue: "River Plate", price_from: 60, currency: "ARS", tickets_url: "https://tickets.example.com/coldplay-buenos-aires-2025-11-08" },
    ],
  },
  {
    id: 4,
    name: "Billie Eilish",
    genre: "Pop / Alternativo",
    country: "Estados Unidos",
    slug: slugify("Billie Eilish"),
    events: [
      { id: "4-1", date: "2025-09-30", city: "Los Ángeles", country: "USA", venue: "Crypto.com Arena", price_from: 85, currency: "USD", tickets_url: "https://tickets.example.com/billie-elish-la-2025-09-30" },
      { id: "4-2", date: "2025-11-02", city: "Berlín", country: "Alemania", venue: "Mercedes-Benz Arena", price_from: 70, currency: "EUR", tickets_url: "https://tickets.example.com/billie-elish-berlin-2025-11-02" },
      { id: "4-3", date: "2026-01-18", city: "Sídney", country: "Australia", venue: "Qudos Bank Arena", price_from: 95, currency: "AUD", tickets_url: "https://tickets.example.com/billie-elish-sydney-2026-01-18" },
    ],
  },
  {
    id: 5,
    name: "Ed Sheeran",
    genre: "Pop / Folk",
    country: "Reino Unido",
    slug: slugify("Ed Sheeran"),
    events: [
      { id: "5-1", date: "2025-09-19", city: "Dublín", country: "Irlanda", venue: "Croke Park", price_from: 65, currency: "EUR", tickets_url: "https://tickets.example.com/ed-sheeran-dublin-2025-09-19" },
      { id: "5-2", date: "2025-10-22", city: "Roma", country: "Italia", venue: "Stadio Olimpico", price_from: 70, currency: "EUR", tickets_url: "https://tickets.example.com/ed-sheeran-roma-2025-10-22" },
      { id: "5-3", date: "2025-12-12", city: "Nueva York", country: "USA", venue: "Madison Square Garden", price_from: 85, currency: "USD", tickets_url: "https://tickets.example.com/ed-sheeran-nyc-2025-12-12" },
    ],
  },
  {
    id: 6,
    name: "Dua Lipa",
    genre: "Pop",
    country: "Reino Unido",
    slug: slugify("Dua Lipa"),
    events: [
      { id: "6-1", date: "2025-09-26", city: "Ámsterdam", country: "Países Bajos", venue: "Ziggo Dome", price_from: 60, currency: "EUR", tickets_url: "https://tickets.example.com/dua-lipa-amsterdam-2025-09-26" },
      { id: "6-2", date: "2025-10-31", city: "Madrid", country: "España", venue: "WiZink Center", price_from: 65, currency: "EUR", tickets_url: "https://tickets.example.com/dua-lipa-madrid-2025-10-31" },
      { id: "6-3", date: "2025-12-19", city: "Los Ángeles", country: "USA", venue: "The Forum", price_from: 75, currency: "USD", tickets_url: "https://tickets.example.com/dua-lipa-la-2025-12-19" },
    ],
  },
  {
    id: 7,
    name: "Rosalía",
    genre: "Pop / Flamenco",
    country: "España",
    slug: slugify("Rosalía"),
    events: [
      { id: "7-1", date: "2025-09-21", city: "Sevilla", country: "España", venue: "Estadio La Cartuja", price_from: 45, currency: "EUR", tickets_url: "https://tickets.example.com/rosalia-sevilla-2025-09-21" },
      { id: "7-2", date: "2025-10-25", city: "París", country: "Francia", venue: "Accor Arena", price_from: 55, currency: "EUR", tickets_url: "https://tickets.example.com/rosalia-paris-2025-10-25" },
      { id: "7-3", date: "2025-12-07", city: "Buenos Aires", country: "Argentina", venue: "Movistar Arena", price_from: 50, currency: "ARS", tickets_url: "https://tickets.example.com/rosalia-buenos-aires-2025-12-07" },
    ],
  },
  {
    id: 8,
    name: "Karol G",
    genre: "Reggaetón / Pop latino",
    country: "Colombia",
    slug: slugify("Karol G"),
    events: [
      { id: "8-1", date: "2025-09-18", city: "Bogotá", country: "Colombia", venue: "Estadio El Campín", price_from: 40, currency: "COP", tickets_url: "https://tickets.example.com/karol-g-bogota-2025-09-18" },
      { id: "8-2", date: "2025-10-27", city: "Lima", country: "Perú", venue: "Estadio Nacional", price_from: 35, currency: "PEN", tickets_url: "https://tickets.example.com/karol-g-lima-2025-10-27" },
      { id: "8-3", date: "2025-11-30", city: "Madrid", country: "España", venue: "Cívitas Metropolitano", price_from: 55, currency: "EUR", tickets_url: "https://tickets.example.com/karol-g-madrid-2025-11-30" },
    ],
  },
  {
    id: 9,
    name: "The Weeknd",
    genre: "R&B / Pop",
    country: "Canadá",
    slug: slugify("The Weeknd"),
    events: [
      { id: "9-1", date: "2025-10-03", city: "Los Ángeles", country: "USA", venue: "SoFi Stadium", price_from: 95, currency: "USD", tickets_url: "https://tickets.example.com/weeknd-la-2025-10-03" },
      { id: "9-2", date: "2025-11-10", city: "Madrid", country: "España", venue: "Santiago Bernabéu", price_from: 100, currency: "EUR", tickets_url: "https://tickets.example.com/weeknd-madrid-2025-11-10" },
      { id: "9-3", date: "2026-02-14", city: "Tokio", country: "Japón", venue: "Tokyo Dome", price_from: 80, currency: "JPY", tickets_url: "https://tickets.example.com/weeknd-tokyo-2026-02-14" },
    ],
  },
  {
    id: 10,
    name: "Drake",
    genre: "Hip-hop / R&B",
    country: "Canadá",
    slug: slugify("Drake"),
    events: [
      { id: "10-1", date: "2025-09-24", city: "Chicago", country: "USA", venue: "United Center", price_from: 85, currency: "USD", tickets_url: "https://tickets.example.com/drake-chicago-2025-09-24" },
      { id: "10-2", date: "2025-11-18", city: "Londres", country: "Reino Unido", venue: "The O2", price_from: 80, currency: "GBP", tickets_url: "https://tickets.example.com/drake-londres-2025-11-18" },
      { id: "10-3", date: "2026-01-22", city: "Toronto", country: "Canadá", venue: "Scotiabank Arena", price_from: 90, currency: "CAD", tickets_url: "https://tickets.example.com/drake-toronto-2026-01-22" },
    ],
  },
  {
    id: 11,
    name: "Beyoncé",
    genre: "Pop / R&B",
    country: "Estados Unidos",
    slug: slugify("Beyoncé"),
    events: [
      { id: "11-1", date: "2025-09-27", city: "Houston", country: "USA", venue: "NRG Stadium", price_from: 95, currency: "USD", tickets_url: "https://tickets.example.com/beyonce-houston-2025-09-27" },
      { id: "11-2", date: "2025-10-29", city: "París", country: "Francia", venue: "Stade de France", price_from: 100, currency: "EUR", tickets_url: "https://tickets.example.com/beyonce-paris-2025-10-29" },
      { id: "11-3", date: "2025-12-15", city: "Barcelona", country: "España", venue: "Estadi Olímpic", price_from: 90, currency: "EUR", tickets_url: "https://tickets.example.com/beyonce-barcelona-2025-12-15" },
    ],
  },
  {
    id: 12,
    name: "Harry Styles",
    genre: "Pop / Rock",
    country: "Reino Unido",
    slug: slugify("Harry Styles"),
    events: [
      { id: "12-1", date: "2025-10-06", city: "Manchester", country: "Reino Unido", venue: "Etihad Stadium", price_from: 70, currency: "GBP", tickets_url: "https://tickets.example.com/harry-styles-manchester-2025-10-06" },
      { id: "12-2", date: "2025-11-12", city: "Lisboa", country: "Portugal", venue: "Altice Arena", price_from: 65, currency: "EUR", tickets_url: "https://tickets.example.com/harry-styles-lisboa-2025-11-12" },
      { id: "12-3", date: "2026-02-02", city: "Nueva York", country: "USA", venue: "MSG", price_from: 95, currency: "USD", tickets_url: "https://tickets.example.com/harry-styles-nyc-2026-02-02" },
    ],
  },
  {
    id: 13,
    name: "Post Malone",
    genre: "Hip-hop / Pop",
    country: "Estados Unidos",
    slug: slugify("Post Malone"),
    events: [
      { id: "13-1", date: "2025-09-20", city: "Las Vegas", country: "USA", venue: "T-Mobile Arena", price_from: 80, currency: "USD", tickets_url: "https://tickets.example.com/post-malone-vegas-2025-09-20" },
      { id: "13-2", date: "2025-11-09", city: "Zúrich", country: "Suiza", venue: "Hallenstadion", price_from: 75, currency: "CHF", tickets_url: "https://tickets.example.com/post-malone-zurich-2025-11-09" },
      { id: "13-3", date: "2026-01-10", city: "Melbourne", country: "Australia", venue: "Rod Laver Arena", price_from: 85, currency: "AUD", tickets_url: "https://tickets.example.com/post-malone-melbourne-2026-01-10" },
    ],
  },
  {
    id: 14,
    name: "Ariana Grande",
    genre: "Pop",
    country: "Estados Unidos",
    slug: slugify("Ariana Grande"),
    events: [
      { id: "14-1", date: "2025-10-01", city: "Los Ángeles", country: "USA", venue: "Kia Forum", price_from: 90, currency: "USD", tickets_url: "https://tickets.example.com/ariana-la-2025-10-01" },
      { id: "14-2", date: "2025-11-22", city: "Madrid", country: "España", venue: "WiZink Center", price_from: 85, currency: "EUR", tickets_url: "https://tickets.example.com/ariana-madrid-2025-11-22" },
    ],
  },
  {
    id: 15,
    name: "Imagine Dragons",
    genre: "Rock / Pop",
    country: "Estados Unidos",
    slug: slugify("Imagine Dragons"),
    events: [
      { id: "15-1", date: "2025-09-25", city: "Praga", country: "Chequia", venue: "O2 Arena", price_from: 60, currency: "EUR", tickets_url: "https://tickets.example.com/imagine-dragons-praga-2025-09-25" },
      { id: "15-2", date: "2025-12-03", city: "Ciudad de México", country: "México", venue: "Arena CDMX", price_from: 50, currency: "MXN", tickets_url: "https://tickets.example.com/imagine-dragons-cdmx-2025-12-03" },
      { id: "15-3", date: "2026-02-20", city: "Santiago", country: "Chile", venue: "Movistar Arena", price_from: 45, currency: "CLP", tickets_url: "https://tickets.example.com/imagine-dragons-santiago-2026-02-20" },
    ],
  },
  {
    id: 16,
    name: "J Balvin",
    genre: "Reggaetón",
    country: "Colombia",
    slug: slugify("J Balvin"),
    events: [
      { id: "16-1", date: "2025-10-08", city: "Medellín", country: "Colombia", venue: "Estadio Atanasio Girardot", price_from: 35, currency: "COP", tickets_url: "https://tickets.example.com/j-balvin-medellin-2025-10-08" },
      { id: "16-2", date: "2025-11-27", city: "Madrid", country: "España", venue: "Vistalegre Arena", price_from: 50, currency: "EUR", tickets_url: "https://tickets.example.com/j-balvin-madrid-2025-11-27" },
      { id: "16-3", date: "2026-01-24", city: "Miami", country: "USA", venue: "Kaseya Center", price_from: 60, currency: "USD", tickets_url: "https://tickets.example.com/j-balvin-miami-2026-01-24" },
    ],
  },
  {
    id: 17,
    name: "Shakira",
    genre: "Pop latino",
    country: "Colombia",
    slug: slugify("Shakira"),
    events: [
      { id: "17-1", date: "2025-09-29", city: "Barcelona", country: "España", venue: "Estadi Olímpic", price_from: 70, currency: "EUR", tickets_url: "https://tickets.example.com/shakira-barcelona-2025-09-29" },
      { id: "17-2", date: "2025-11-16", city: "Miami", country: "USA", venue: "Kaseya Center", price_from: 85, currency: "USD", tickets_url: "https://tickets.example.com/shakira-miami-2025-11-16" },
      { id: "17-3", date: "2026-03-05", city: "Buenos Aires", country: "Argentina", venue: "River Plate", price_from: 55, currency: "ARS", tickets_url: "https://tickets.example.com/shakira-buenos-aires-2026-03-05" },
    ],
  },
  {
    id: 18,
    name: "BTS",
    genre: "K-pop",
    country: "Corea del Sur",
    slug: slugify("BTS"),
    events: [
      { id: "18-1", date: "2025-10-12", city: "Seúl", country: "Corea del Sur", venue: "Seoul Olympic Stadium", price_from: 95, currency: "KRW", tickets_url: "https://tickets.example.com/bts-seoul-2025-10-12" },
      { id: "18-2", date: "2025-12-01", city: "Los Ángeles", country: "USA", venue: "SoFi Stadium", price_from: 110, currency: "USD", tickets_url: "https://tickets.example.com/bts-la-2025-12-01" },
    ],
  },
  {
    id: 19,
    name: "Metallica",
    genre: "Metal",
    country: "Estados Unidos",
    slug: slugify("Metallica"),
    events: [
      { id: "19-1", date: "2025-09-23", city: "Copenhague", country: "Dinamarca", venue: "Parken Stadium", price_from: 65, currency: "EUR", tickets_url: "https://tickets.example.com/metallica-copenhague-2025-09-23" },
      { id: "19-2", date: "2025-11-19", city: "Madrid", country: "España", venue: "Cívitas Metropolitano", price_from: 80, currency: "EUR", tickets_url: "https://tickets.example.com/metallica-madrid-2025-11-19" },
      { id: "19-3", date: "2026-02-28", city: "Tokio", country: "Japón", venue: "Nippon Budokan", price_from: 90, currency: "JPY", tickets_url: "https://tickets.example.com/metallica-tokyo-2026-02-28" },
    ],
  },
  {
    id: 20,
    name: "Red Hot Chili Peppers",
    genre: "Rock alternativo",
    country: "Estados Unidos",
    slug: slugify("Red Hot Chili Peppers"),
    events: [
      { id: "20-1", date: "2025-10-09", city: "Los Ángeles", country: "USA", venue: "BMO Stadium", price_from: 75, currency: "USD", tickets_url: "https://tickets.example.com/rhcp-la-2025-10-09" },
      { id: "20-2", date: "2025-11-25", city: "Múnich", country: "Alemania", venue: "Olympiastadion", price_from: 70, currency: "EUR", tickets_url: "https://tickets.example.com/rhcp-munich-2025-11-25" },
      { id: "20-3", date: "2026-01-30", city: "Santiago", country: "Chile", venue: "Estadio Nacional", price_from: 60, currency: "CLP", tickets_url: "https://tickets.example.com/rhcp-santiago-2026-01-30" },
    ],
  },
  {
    id: 21,
    name: "Bruno Mars",
    genre: "Pop / Funk",
    country: "Estados Unidos",
    slug: slugify("Bruno Mars"),
    events: [
      { id: "21-1", date: "2025-10-14", city: "Las Vegas", country: "USA", venue: "Park MGM", price_from: 120, currency: "USD", tickets_url: "https://tickets.example.com/bruno-mars-vegas-2025-10-14" },
      { id: "21-2", date: "2025-12-09", city: "Londres", country: "Reino Unido", venue: "The O2", price_from: 95, currency: "GBP", tickets_url: "https://tickets.example.com/bruno-mars-londres-2025-12-09" },
    ],
  },
  {
    id: 22,
    name: "Lady Gaga",
    genre: "Pop",
    country: "Estados Unidos",
    slug: slugify("Lady Gaga"),
    events: [
      { id: "22-1", date: "2025-10-05", city: "Milán", country: "Italia", venue: "Mediolanum Forum", price_from: 80, currency: "EUR", tickets_url: "https://tickets.example.com/lady-gaga-milan-2025-10-05" },
      { id: "22-2", date: "2025-11-30", city: "Nueva York", country: "USA", venue: "Madison Square Garden", price_from: 110, currency: "USD", tickets_url: "https://tickets.example.com/lady-gaga-nyc-2025-11-30" },
    ],
  },
  {
    id: 23,
    name: "Kendrick Lamar",
    genre: "Hip-hop",
    country: "Estados Unidos",
    slug: slugify("Kendrick Lamar"),
    events: [
      { id: "23-1", date: "2025-09-17", city: "Oakland", country: "USA", venue: "Oakland Arena", price_from: 85, currency: "USD", tickets_url: "https://tickets.example.com/kendrick-oakland-2025-09-17" },
      { id: "23-2", date: "2025-11-08", city: "París", country: "Francia", venue: "Accor Arena", price_from: 80, currency: "EUR", tickets_url: "https://tickets.example.com/kendrick-paris-2025-11-08" },
    ],
  },
  {
    id: 24,
    name: "Travis Scott",
    genre: "Hip-hop",
    country: "Estados Unidos",
    slug: slugify("Travis Scott"),
    events: [
      { id: "24-1", date: "2025-10-11", city: "Houston", country: "USA", venue: "Toyota Center", price_from: 85, currency: "USD", tickets_url: "https://tickets.example.com/travis-houston-2025-10-11" },
      { id: "24-2", date: "2025-12-06", city: "Berlín", country: "Alemania", venue: "Mercedes-Benz Arena", price_from: 75, currency: "EUR", tickets_url: "https://tickets.example.com/travis-berlin-2025-12-06" },
    ],
  },
  {
    id: 25,
    name: "Olivia Rodrigo",
    genre: "Pop",
    country: "Estados Unidos",
    slug: slugify("Olivia Rodrigo"),
    events: [
      { id: "25-1", date: "2025-09-16", city: "Madrid", country: "España", venue: "WiZink Center", price_from: 60, currency: "EUR", tickets_url: "https://tickets.example.com/olivia-rodrigo-madrid-2025-09-16" },
      { id: "25-2", date: "2025-10-23", city: "Londres", country: "Reino Unido", venue: "The O2", price_from: 75, currency: "GBP", tickets_url: "https://tickets.example.com/olivia-rodrigo-londres-2025-10-23" },
      { id: "25-3", date: "2025-12-20", city: "Los Ángeles", country: "USA", venue: "Kia Forum", price_from: 85, currency: "USD", tickets_url: "https://tickets.example.com/olivia-rodrigo-la-2025-12-20" },
    ],
  },
  {
    id: 26,
    name: "Doja Cat",
    genre: "Hip-hop / Pop",
    country: "Estados Unidos",
    slug: slugify("Doja Cat"),
    events: [
      { id: "26-1", date: "2025-10-02", city: "Chicago", country: "USA", venue: "United Center", price_from: 70, currency: "USD", tickets_url: "https://tickets.example.com/doja-chicago-2025-10-02" },
      { id: "26-2", date: "2025-11-21", city: "Madrid", country: "España", venue: "IFEMA Hall", price_from: 65, currency: "EUR", tickets_url: "https://tickets.example.com/doja-madrid-2025-11-21" },
    ],
  },
  {
    id: 27,
    name: "Justin Bieber",
    genre: "Pop",
    country: "Canadá",
    slug: slugify("Justin Bieber"),
    events: [
      { id: "27-1", date: "2025-10-15", city: "Vancouver", country: "Canadá", venue: "Rogers Arena", price_from: 85, currency: "CAD", tickets_url: "https://tickets.example.com/justin-vancouver-2025-10-15" },
      { id: "27-2", date: "2025-12-01", city: "Madrid", country: "España", venue: "WiZink Center", price_from: 80, currency: "EUR", tickets_url: "https://tickets.example.com/justin-madrid-2025-12-01" },
    ],
  },
  {
    id: 28,
    name: "The Rolling Stones",
    genre: "Rock",
    country: "Reino Unido",
    slug: slugify("The Rolling Stones"),
    events: [
      { id: "28-1", date: "2025-09-14", city: "Londres", country: "Reino Unido", venue: "Hyde Park", price_from: 95, currency: "GBP", tickets_url: "https://tickets.example.com/stones-londres-2025-09-14" },
      { id: "28-2", date: "2025-10-26", city: "Madrid", country: "España", venue: "Santiago Bernabéu", price_from: 100, currency: "EUR", tickets_url: "https://tickets.example.com/stones-madrid-2025-10-26" },
    ],
  },
  {
    id: 29,
    name: "U2",
    genre: "Rock",
    country: "Irlanda",
    slug: slugify("U2"),
    events: [
      { id: "29-1", date: "2025-11-03", city: "Dublín", country: "Irlanda", venue: "3Arena", price_from: 85, currency: "EUR", tickets_url: "https://tickets.example.com/u2-dublin-2025-11-03" },
      { id: "29-2", date: "2026-02-12", city: "Las Vegas", country: "USA", venue: "Sphere", price_from: 120, currency: "USD", tickets_url: "https://tickets.example.com/u2-vegas-2026-02-12" },
    ],
  },
  {
    id: 30,
    name: "Foo Fighters",
    genre: "Rock",
    country: "Estados Unidos",
    slug: slugify("Foo Fighters"),
    events: [
      { id: "30-1", date: "2025-09-22", city: "Barcelona", country: "España", venue: "Parc del Fòrum", price_from: 70, currency: "EUR", tickets_url: "https://tickets.example.com/foo-barcelona-2025-09-22" },
      { id: "30-2", date: "2025-11-26", city: "Buenos Aires", country: "Argentina", venue: "Tecnópolis", price_from: 60, currency: "ARS", tickets_url: "https://tickets.example.com/foo-buenos-aires-2025-11-26" },
      { id: "30-3", date: "2026-03-02", city: "Santiago", country: "Chile", venue: "Parque Bicentenario", price_from: 55, currency: "CLP", tickets_url: "https://tickets.example.com/foo-santiago-2026-03-02" },
    ],
  },
  {
    id: 31,
    name: "Muse",
    genre: "Rock alternativo",
    country: "Reino Unido",
    slug: slugify("Muse"),
    events: [
      { id: "31-1", date: "2025-10-07", city: "París", country: "Francia", venue: "Accor Arena", price_from: 65, currency: "EUR", tickets_url: "https://tickets.example.com/muse-paris-2025-10-07" },
      { id: "31-2", date: "2025-12-11", city: "Madrid", country: "España", venue: "WiZink Center", price_from: 70, currency: "EUR", tickets_url: "https://tickets.example.com/muse-madrid-2025-12-11" },
    ],
  },
  {
    id: 32,
    name: "Arctic Monkeys",
    genre: "Indie Rock",
    country: "Reino Unido",
    slug: slugify("Arctic Monkeys"),
    events: [
      { id: "32-1", date: "2025-09-18", city: "Manchester", country: "Reino Unido", venue: "AO Arena", price_from: 60, currency: "GBP", tickets_url: "https://tickets.example.com/arctic-manchester-2025-09-18" },
      { id: "32-2", date: "2025-11-14", city: "Barcelona", country: "España", venue: "Sant Jordi Club", price_from: 55, currency: "EUR", tickets_url: "https://tickets.example.com/arctic-barcelona-2025-11-14" },
      { id: "32-3", date: "2026-01-25", city: "Buenos Aires", country: "Argentina", venue: "Luna Park", price_from: 45, currency: "ARS", tickets_url: "https://tickets.example.com/arctic-buenos-aires-2026-01-25" },
    ],
  },
  {
    id: 33,
    name: "Maluma",
    genre: "Reggaetón / Pop",
    country: "Colombia",
    slug: slugify("Maluma"),
    events: [
      { id: "33-1", date: "2025-10-04", city: "Medellín", country: "Colombia", venue: "La Macarena", price_from: 35, currency: "COP", tickets_url: "https://tickets.example.com/maluma-medellin-2025-10-04" },
      { id: "33-2", date: "2025-11-23", city: "Santo Domingo", country: "R. Dominicana", venue: "Estadio Quisqueya", price_from: 40, currency: "DOP", tickets_url: "https://tickets.example.com/maluma-sd-2025-11-23" },
      { id: "33-3", date: "2026-02-07", city: "Madrid", country: "España", venue: "WiZink Center", price_from: 55, currency: "EUR", tickets_url: "https://tickets.example.com/maluma-madrid-2026-02-07" },
    ],
  },
  {
    id: 34,
    name: "Luis Miguel",
    genre: "Balada / Pop",
    country: "México",
    slug: slugify("Luis Miguel"),
    events: [
      { id: "34-1", date: "2025-09-13", city: "Monterrey", country: "México", venue: "Arena Monterrey", price_from: 50, currency: "MXN", tickets_url: "https://tickets.example.com/luismi-monterrey-2025-09-13" },
      { id: "34-2", date: "2025-10-20", city: "Madrid", country: "España", venue: "Barclaycard Center", price_from: 70, currency: "EUR", tickets_url: "https://tickets.example.com/luismi-madrid-2025-10-20" },
      { id: "34-3", date: "2025-12-18", city: "Buenos Aires", country: "Argentina", venue: "Movistar Arena", price_from: 55, currency: "ARS", tickets_url: "https://tickets.example.com/luismi-buenos-aires-2025-12-18" },
    ],
  },
  {
    id: 35,
    name: "Camila Cabello",
    genre: "Pop",
    country: "Estados Unidos / Cuba",
    slug: slugify("Camila Cabello"),
    events: [
      { id: "35-1", date: "2025-10-10", city: "Miami", country: "USA", venue: "Kaseya Center", price_from: 60, currency: "USD", tickets_url: "https://tickets.example.com/camila-miami-2025-10-10" },
      { id: "35-2", date: "2025-11-28", city: "Madrid", country: "España", venue: "WiZink Center", price_from: 65, currency: "EUR", tickets_url: "https://tickets.example.com/camila-madrid-2025-11-28" },
    ],
  },
  {
    id: 36,
    name: "Ozuna",
    genre: "Reggaetón",
    country: "Puerto Rico",
    slug: slugify("Ozuna"),
    events: [
      { id: "36-1", date: "2025-09-16", city: "San Juan", country: "Puerto Rico", venue: "Coliseo de PR", price_from: 40, currency: "USD", tickets_url: "https://tickets.example.com/ozuna-san-juan-2025-09-16" },
      { id: "36-2", date: "2025-12-13", city: "Madrid", country: "España", venue: "Vistalegre Arena", price_from: 50, currency: "EUR", tickets_url: "https://tickets.example.com/ozuna-madrid-2025-12-13" },
      { id: "36-3", date: "2026-02-18", city: "Ciudad de Panamá", country: "Panamá", venue: "Figali Convention Center", price_from: 35, currency: "PAB", tickets_url: "https://tickets.example.com/ozuna-panama-2026-02-18" },
    ],
  },
  {
    id: 37,
    name: "Daddy Yankee",
    genre: "Reggaetón",
    country: "Puerto Rico",
    slug: slugify("Daddy Yankee"),
    events: [
      { id: "37-1", date: "2025-10-20", city: "San Juan", country: "Puerto Rico", venue: "Hiram Bithorn Stadium", price_from: 70, currency: "USD", tickets_url: "https://tickets.example.com/dy-san-juan-2025-10-20" },
      { id: "37-2", date: "2025-12-08", city: "Miami", country: "USA", venue: "Kaseya Center", price_from: 85, currency: "USD", tickets_url: "https://tickets.example.com/dy-miami-2025-12-08" },
    ],
  },
  {
    id: 38,
    name: "Quevedo",
    genre: "Urbano / Trap",
    country: "España",
    slug: slugify("Quevedo"),
    events: [
      { id: "38-1", date: "2025-09-11", city: "Madrid", country: "España", venue: "WiZink Center", price_from: 35, currency: "EUR", tickets_url: "https://tickets.example.com/quevedo-madrid-2025-09-11" },
      { id: "38-2", date: "2025-11-06", city: "Barcelona", country: "España", venue: "Palau Sant Jordi", price_from: 38, currency: "EUR", tickets_url: "https://tickets.example.com/quevedo-barcelona-2025-11-06" },
      { id: "38-3", date: "2026-01-16", city: "Buenos Aires", country: "Argentina", venue: "Movistar Arena", price_from: 30, currency: "ARS", tickets_url: "https://tickets.example.com/quevedo-ba-2026-01-16" },
    ],
  },
  {
    id: 39,
    name: "C. Tangana",
    genre: "Urbano / Pop",
    country: "España",
    slug: slugify("C. Tangana"),
    events: [
      { id: "39-1", date: "2025-09-17", city: "Valencia", country: "España", venue: "Ciudad de las Artes", price_from: 45, currency: "EUR", tickets_url: "https://tickets.example.com/ctangana-valencia-2025-09-17" },
      { id: "39-2", date: "2025-10-30", city: "Madrid", country: "España", venue: "WiZink Center", price_from: 50, currency: "EUR", tickets_url: "https://tickets.example.com/ctangana-madrid-2025-10-30" },
      { id: "39-3", date: "2026-02-04", city: "Ciudad de México", country: "México", venue: "Pepsi Center", price_from: 40, currency: "MXN", tickets_url: "https://tickets.example.com/ctangana-cdmx-2026-02-04" },
    ],
  },
  {
    id: 40,
    name: "Myke Towers",
    genre: "Urbano / Trap",
    country: "Puerto Rico",
    slug: slugify("Myke Towers"),
    events: [
      { id: "40-1", date: "2025-10-03", city: "San Juan", country: "Puerto Rico", venue: "Coliseo de PR", price_from: 35, currency: "USD", tickets_url: "https://tickets.example.com/myke-san-juan-2025-10-03" },
      { id: "40-2", date: "2025-11-29", city: "Madrid", country: "España", venue: "Vistalegre Arena", price_from: 45, currency: "EUR", tickets_url: "https://tickets.example.com/myke-madrid-2025-11-29" },
      { id: "40-3", date: "2026-03-10", city: "Santiago", country: "Chile", venue: "Movistar Arena", price_from: 40, currency: "CLP", tickets_url: "https://tickets.example.com/myke-santiago-2026-03-10" },
    ],
  },
];

// ===== Endpoints =====
// Ping
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API de artistas y eventos', routes: ['/artists', '/artists/:id', '/events', '/events/:artistId'] });
});

// Lista de artistas (con filtros básicos)
app.get('/artists', (req, res) => {
  const { q, country, genre } = req.query;
  let data = [...artists];
  if (q) {
    const term = q.toString().toLowerCase();
    data = data.filter(a => a.name.toLowerCase().includes(term) || a.slug.includes(slugify(term)));
  }
  if (country) {
    const c = country.toString().toLowerCase();
    data = data.filter(a => a.country.toLowerCase().includes(c));
  }
  if (genre) {
    const g = genre.toString().toLowerCase();
    data = data.filter(a => a.genre.toLowerCase().includes(g));
  }
  res.json(data.map(({ events, ...rest }) => rest));
});

// Artista por id (incluye eventos)
app.get('/artists/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = artists.find(a => a.id === id);
  if (!found) return res.status(404).json({ error: 'Artista no encontrado' });
  res.json(found);
});

// Todos los eventos aplanados
app.get('/events', (req, res) => {
  const { city, country, from, to } = req.query;
  let events = artists.flatMap(a => a.events.map(e => ({ ...e, artist_id: a.id, artist_name: a.name, artist_slug: a.slug })));

  if (city) {
    const c = city.toString().toLowerCase();
    events = events.filter(e => e.city.toLowerCase().includes(c));
  }
  if (country) {
    const ctry = country.toString().toLowerCase();
    events = events.filter(e => e.country.toLowerCase().includes(ctry));
  }
  if (from) events = events.filter(e => e.date >= from);
  if (to) events = events.filter(e => e.date <= to);

  // Orden por fecha ascendente
  events.sort((a, b) => a.date.localeCompare(b.date));
  res.json(events);
});

// Eventos de un artista por id
app.get('/events/:artistId', (req, res) => {
  const id = Number(req.params.artistId);
  const artist = artists.find(a => a.id === id);
  if (!artist) return res.status(404).json({ error: 'Artista no encontrado' });
  // Ordenar por fecha
  const events = [...artist.events].sort((a, b) => a.date.localeCompare(b.date));
  res.json({ artist_id: artist.id, artist_name: artist.name, artist_slug: artist.slug, events });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
