// ===== IMAGES =====
// Importe tous les fichiers image de src/assets/ en une seule ligne
const allImages = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp}', { eager: true });
// Helper : img('cleanMind-1.png') retourne l'URL du fichier
const img = (filename) => allImages[`../assets/${filename}`]?.default;

// ===== PROJECTS DATA =====
export const projects = [
  {
  "id": 1,
  "title": "Portfolio Personnel",
  "category": "Personnel",
  "description": "Vous êtes déja dessus :) \n\n• Portfolio React 19 avec Vite, routing React Router et design minimaliste dark/light via CSS variables\n\n• Animations Framer Motion : accordéon timeline avec stagger au scroll, carousel modal avec slide directionnel et AnimatePresence sur les filtres projets\n\n• Système de thème dark/light avec transitions globales et indicateur de navigation animé via layoutId",
  "tags": ["React 19", "Vite", "Framer Motion", "React Router", "CSS3", "JavaScript"],
  "images": [img('portfolio-3.png')],
},
{
  "id": 2,
  "title": "CleanMind",
  "category": "Académique",
  "description": "• Application web full-stack de gestion de vie personnelle — notes post-it, calendrier, suivi financier et tableau de bord centralisé\n• Architecture découplée : frontend Vue 3 (Composition API + TypeScript) avec backend Symfony 7 exposant une API REST sécurisée\n• Authentification stateless JWT avec paires de clés RSA, cookies HttpOnly et restauration de session automatique\n• Système de finances avancé : transactions récurrentes (jour/semaine/mois/an), visualisations Chart.js (camembert + courbes), analytics mensuel/annuel\n• Post-its en layout Masonry avec niveaux de priorité, recherche et tri dynamique\n• State management Pinia avec stores dédiés par domaine (user, notes, events, finances)\n• Documentation API auto-générée via NelmIO/Swagger\n• Tests unitaires Vitest (frontend) et PHPUnit (backend) avec fixtures Faker",
  "tags": ["Vue 3", "TypeScript", "Symfony 7", "PHP 8.2", "MySQL", "Pinia", "JWT", "REST API", "Chart.js", "Vuetify", "Doctrine ORM", "Vite"],
  "images": [
    img('cleanMind-1.png'),
    img('cleanMind-2.png'),
    img('cleanMind-3.png'),
    img('cleanMind-4.png'),
    img('clean-Mind-5.png'),
  ],
},
    {
  "id": 3,
  "title": "Bakery Stock",
  "category": "Personnel",
  "description": "• Système de gestion de stock et commandes fournisseurs pour boulangerie, avec dashboard de statistiques en temps réel (produits, ruptures, commandes)\n• Architecture microservices : 3 services Express.js indépendants (produits, commandes, consommation stock) chacun sur son propre port\n• Frontend React avec React Router, requêtes parallèles via Promise.all et 4 pages fonctionnelles (Dashboard, Produits, Commandes, Rapport journalier)\n• Déploiement complet sur Kubernetes : ConfigMaps, Secrets, Deployments, Services NodePort et init SQL automatisé\n• Images Docker multi-stage (Node builder → Nginx) avec reverse proxy Nginx routant les appels API vers chaque microservice\n• Base de données MySQL avec schéma relationnel (produits, commandes, order_items, historique stock) et cascades FK",
  "tags": ["React 19", "Express.js", "Node.js", "MySQL", "Docker", "Kubernetes", "Nginx", "Microservices", "Axios", "REST API"],
  "images": [
    img('bakery-2.png'),
    img('bakery-1.png'),
    img('bakery-3.png'),
    img('bakery-4.png'),
  ],
},

{
  "id": 4,
  "title": "Burger ESGI",
  "category": "Académique",
  "description": "• Application SPA de commande de burgers en ligne : catalogue, personnalisation des ingrédients, panier persistant et tunnel de commande complet\n• Frontend Vue 3 (Composition API + TypeScript) avec Vuetify pour le design Material, Pinia pour le state management et persistance automatique via pinia-plugin-persistedstate\n• Authentification JWT avec guards sur les routes protégées, stockage du token en localStorage et redirection automatique\n• Panier temps réel avec badge dynamique, calcul du total, persistance au refresh et vidage automatique post-commande\n• Backend léger json-server + json-server-auth simulant une vraie API REST (register, login, CRUD burgers) avec hachage bcrypt des mots de passe\n• State management séparé en deux stores Pinia distincts : user store (auth, prénom, modal) et cart store (items, quantités, total)",
  "tags": ["Vue 3", "TypeScript", "Vuetify", "Pinia", "Vue Router", "JWT", "Vite", "json-server", "SCSS"],
  "images": [
    img('burger-1.png'),
    img('burger-2.png'),
    img('burger-3.png'),
    img('burger-4.png'),
    img('burger-5.png'),
  ],
},
{
  "id": 5,
  "title": "Valorant Agents",
  "category": "Personnel",
  "description": "• Application React vitrine qui consomme l'API publique Valorant pour afficher tous les agents en temps réel, organisés par rôle (Duelist, Initiator, Controller, Sentinel)\n• Animations avancées avec Framer Motion : cartes en stagger au scroll, modal flottante avec entrée scale/opacity, particules CSS animées en hero section\n• Modal de détail plein écran avec backdrop blur, portrait HD et informations complètes de l'agent\n• Layout CSS Grid responsive avec auto-fit/minmax, effets de glow au hover et thème visuel Valorant (gradients, typographie clamp)\n• Architecture React simple et propre : hooks natifs (useState, useEffect) sans librairie de state externe\n• Build ultra-rapide avec Vite 7 et HMR pour une DX optimale",
  "tags": ["React 19", "Vite", "Framer Motion", "REST API", "CSS3", "JavaScript"],
  "images": [
    img('valorant-3.png'),
    img('valorant-1.png'),
    img('valorant-2.png'),
  ],
},


{
  "id": 6,
  "title": "Salon & SPA Reservation",
  "category": "Académique",
  "description": "• Plateforme de réservation en ligne pour un salon bien-être multi-services (Coiffure, SPA, Manucure, Barbier) avec persistance en base de données\n• Architecture MVC Symfony 7.1 : controllers, entities Doctrine, repositories et templates Twig avec héritage de layout\n• Formulaire de réservation avec date picker, time picker et protection CSRF native Symfony, rendu Bootstrap 5\n• Tunnel complet : sélection du service → formulaire → persistance MySQL via Doctrine ORM → page de confirmation\n• Migrations Doctrine versionnées pour la gestion du schéma de base de données\n• Routing par attributs PHP (style Symfony 7), 7 routes dédiées et une navigation cohérente sur toutes les pages",
  "tags": ["Symfony 7", "PHP 8.2", "Doctrine ORM", "MySQL", "Twig", "Bootstrap 5", "MVC", "Docker"],
  "images": [
    img('reservation-1.png'),
    img('reservation-2.png'),
    img('reservation-3.png'),
  ],
},
];

// ===== CATEGORIES =====
export const categories = ["Tous", "Académique", "Personnel"];

// ===== EXPERIENCE DATA =====
export const experience = [
  {
    id: 1,
    year: "Sep 2024 — Sep 2026",
    title: "Développeuse Front-End",
    company: "Witt Group France • Lille",
    type: "Pro",
    description: "Intégration pixel-perfect et responsive d'interfaces e-commerce dans le respect strict des guidelines UI/UX en HTML, CSS et JavaScript.\nDéveloppement et intégration de landing pages et campagnes commerciales animées.\nOptimisation SEO, accessibilité WCAG et performances front-end.\nCréation et intégration de campagnes emailing HTML responsive via Dartagnan.\nCollaboration avec les équipes design, produit et développement.",
    tags: ["HTML", "CSS", "JavaScript", "SEO", "WCAG", "Emailing", "Dartagnan"],
  },
];

// ===== PARCOURS DATA =====
export const parcours = [
  {
    id: 1,
    year: "2024 — 2026",
    title: "Master Ingénierie du Web",
    company: "ESGI • Lille",
    type: "Formation",
    description: "Master en ingénierie du web avec spécialisation en développement full stack. Projets en équipe, architecture logicielle, DevOps et développement d'applications web modernes.",
    tags: ["React", "Vue.js", "Node.js", "Docker", "Kubernetes", "Symfony"],
  },
  {
    id: 2,
    year: "2023 — 2024",
    title: "Licence 2 Mathématiques",
    company: "Université Aix-Marseille • Luminy",
    type: "Formation",
    description: "Deuxième année de licence en mathématiques. Approfondissement en analyse, algèbre et probabilités.",
    tags: ["Mathématiques", "Analyse", "Algèbre", "Probabilités"],
  },
  {
    id: 3,
    year: "2021 — 2023",
    title: "Licence 2 & 3 Informatique",
    company: "Université Mouloud MAMMERI • Algérie",
    type: "Formation",
    description: "Deuxième et troisième année de licence en informatique. Algorithmique avancée, bases de données, réseaux et développement logiciel.",
    tags: ["Algorithmique", "Bases de données", "Réseaux", "C++", "Java"],
  },
  {
    id: 4,
    year: "2020 — 2021",
    title: "Licence 1 Mathématiques & Informatique",
    company: "Université Mouloud MAMMERI • Algérie",
    type: "Formation",
    description: "Première année de licence en mathématiques et informatique. Introduction à la programmation, logique mathématique et structures de données.",
    tags: ["Mathématiques", "Informatique", "C", "Algorithmique"],
  },
];