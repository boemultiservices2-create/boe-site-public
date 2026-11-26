import {
  Home,
  Car,
  Users,
  ShieldCheck,
  Sparkles,
  Building2,
  Hammer,
  Compass,
  HardHat,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
} from "lucide-react";
import { BOE_EMAIL } from "./config.js";

export // MODÈLE 2 : Personnel + Gardiennage sur la même page avec options
const OPTIONS_PERSONNEL_GARDIENNAGE = [
  {
    id: "femme-menage",
    categorie: "Personnel",
    titre: "Femme de ménage / Entretien",
    description: "Nettoyage, repassage et entretien régulier de maisons, appartements et bureaux.",
    frequences: ["Ponctuel (1 journée)", "2 à 3 fois / semaine", "Temps plein (Mensuel)"],
  },
  {
    id: "cuisiniere-gouvernante",
    categorie: "Personnel",
    titre: "Cuisinière / Gouvernante",
    description: "Personnel de maison qualifié, discret et expérimenté pour familles et expatriés.",
    frequences: ["Temps plein (Mensuel)", "Mi-temps"],
  },
  {
    id: "chauffeur",
    categorie: "Personnel",
    titre: "Chauffeur professionnel",
    description: "Chauffeur ponctuel maîtrisant tous les quartiers du Congo-Brazzaville (Permis B/C/D).",
    frequences: ["À la journée", "À la semaine", "Contrat mensuel"],
  },
  {
    id: "agent-gardiennage",
    categorie: "Gardiennage",
    titre: "Agent de gardiennage (Jour / Nuit)",
    description: "Surveillance continue de résidences, villas, commerces et entrepôts.",
    frequences: ["Garde de nuit (12h)", "Garde 24h/24 (Rotation)", "Événementiel"],
  },
  {
    id: "securite-chantier",
    categorie: "Gardiennage",
    titre: "Sécurisation de chantier BTP",
    description: "Contrôle strict des accès et protection des matériaux et engins sur site.",
    frequences: ["Contrat mensuel", "Durée complète du chantier"],
  },
];
// MODÈLE 3 : Landing pages simples avec devis WhatsApp pré-rempli
export const SERVICES_LANDING = {
  desinfection: {
    slug: "desinfection",
    titre: "Désinfection et dératisation",
    sousTitre: "Assainissement radical de vos logements, bureaux et entrepôts au Congo-Brazzaville.",
    description:
      "Nous intervenons rapidement avec des traitements homologués et sans danger pour éliminer durablement rongeurs, cafards, moustiques, termites et agents pathogènes.",
    pointsForts: [
      "Diagnostic gratuit sur place",
      "Produits certifiés sans odeur persistante",
      "Intervention discrète et rapide (7j/7)",
      "Contrats préventifs pour hôtels, restaurants et sociétés",
    ],
    messageWhatsApp:
      "Bonjour BOÉ MULTI-SERVICES, je souhaite demander un devis pour une intervention de Désinfection et dératisation.",
  },
  gestion: {
    slug: "gestion",
    titre: "Gestion immobilière",
    sousTitre: "Confiez la rentabilité et le suivi technique de vos biens à des experts locaux.",
    description:
      "De la recherche de locataires solvables à l'encaissement des loyers en passant par l'entretien courant, nous sécurisons vos revenus locatifs en toute transparence.",
    pointsForts: [
      "Sélection rigoureuse des locataires et rédaction des baux",
      "Suivi des encaissements et rapports mensuels clairs",
      "Gestion des réparations (plomberie, électricité, clim)",
      "Mise en valeur pour location meublée ou longue durée",
    ],
    messageWhatsApp:
      "Bonjour BOÉ MULTI-SERVICES, je souhaite demander un devis pour la Gestion immobilière de mon bien.",
  },
  btp: {
    slug: "btp",
    titre: "BTP et pavés autobloquants",
    sousTitre: "Aménagement durable de cours, parkings, allées et voies d'accès.",
    description:
      "Fourniture et pose de pavés autobloquants haute résistance, terrassement, compactage et gestion du drainage adaptés aux sols et pluies du Congo-Brazzaville.",
    pointsForts: [
      "Pavés haute densité (épaisseurs 6 cm et 8 cm)",
      "Terrassement, nivellement et pose de bordures",
      "Plusieurs coloris et motifs esthétiques au choix",
      "Devis précis au m² après visite technique gratuite",
    ],
    messageWhatsApp:
      "Bonjour BOÉ MULTI-SERVICES, je souhaite demander un devis pour des travaux BTP / pose de pavés autobloquants.",
  },
  architecture: {
    slug: "architecture",
    titre: "Architecture",
    sousTitre: "Conception architecturale, plans 2D/3D et études techniques de bâtiment.",
    description:
      "Donnez forme à vos projets résidentiels, commerciaux ou industriels : esquisses sur mesure, plans d'exécution, modélisation 3D et dossiers administratifs.",
    pointsForts: [
      "Plans architecturaux complets et visuels 3D réalistes",
      "Optimisation des volumes et de la ventilation naturelle",
      "Estimation budgétaire détaillée avant travaux",
      "Accompagnement du permis de construire jusqu'au chantier",
    ],
    messageWhatsApp:
      "Bonjour BOÉ MULTI-SERVICES, je souhaite demander un devis pour une étude / conception en Architecture.",
  },
  construction: {
    slug: "construction",
    titre: "Construction et rénovation",
    sousTitre: "Réalisation clé en main de constructions neuves et réhabilitation complète.",
    description:
      "Gros œuvre, maçonnerie, toiture, électricité, plomberie, carrelage et peinture : une équipe pluridisciplinaire pour livrer vos travaux dans les délais.",
    pointsForts: [
      "Construction de villas modernes, immeubles et locaux",
      "Rénovation intérieure et extérieure clé en main",
      "Contrôle qualité rigoureux des matériaux",
      "Un interlocuteur unique et suivi régulier du chantier",
    ],
    messageWhatsApp:
      "Bonjour BOÉ MULTI-SERVICES, je souhaite demander un devis pour un projet de Construction et rénovation.",
  },
};
// Cartes de la page d'accueil fidèles à la maquette HTML
export const IMG = {
  personnel: "/images/services/personnel.jpg",
  gardiennage: "/images/services/gardiennage.jpg",
  gestion: "/images/services/gestion.jpg",
  btp: "/images/services/btp.jpg",
  architecture: "/images/services/architecture.jpg",
  construction: "/images/services/construction.jpg",
  desinfection: "/images/services/desinfection.jpg",
};
export const HOME_SERVICES = [
  {
    id: "immobilier",
    image: "/images/services/immobilier.jpg",
    route: {
      page: "immobilier",
    },
    badge: "Annonces",
    badgeBg: "bg-[#0056A3]",
    phBg: "bg-[#E8F0F9] text-[#0056A3]",
    Icon: Home,
    titre: "Immobilier",
    desc: "Location saisonnière d’appartements, location, achat et vente de biens au Congo-Brazzaville.",
    cta: "Voir les biens →",
  },
  {
    id: "automobile",
    image: "/images/services/automobile.jpg",
    route: {
      page: "automobile",
    },
    badge: "Annonces",
    badgeBg: "bg-[#0056A3]",
    phBg: "bg-[#E8F0F9] text-[#0056A3]",
    Icon: Car,
    titre: "Automobile",
    desc: "Location, achat et vente de véhicules.",
    cta: "Voir les véhicules →",
  },
  {
    id: "personnel",
    image: IMG.personnel,
    pos: "50% 3%",
    route: {
      page: "personnel",
      initialCat: "Personnel",
      initialMode: "client",
    },
    badge: "Sur demande",
    badgeBg: "bg-[#334155]",
    phBg: "bg-[#EEF2F6] text-[#334155]",
    Icon: Users,
    titre: "Mise à disposition du personnel",
    desc: "Besoin d’une femme de ménage ou d’un autre profil ? Découvrez nos profils.",
    cta: "Voir les profils →",
  },
  {
    id: "gardiennage",
    image: IMG.gardiennage,
    pos: "50% 20%",
    route: {
      page: "personnel",
      initialCat: "Gardiennage",
      initialMode: "client",
    },
    badge: "Sur demande",
    badgeBg: "bg-[#334155]",
    phBg: "bg-[#EEF2F6] text-[#334155]",
    Icon: ShieldCheck,
    titre: "Gardiennage",
    desc: "Sécurisez vos locaux, chantiers et résidences avec des agents de gardiennage.",
    cta: "Voir les profils →",
  },
  {
    id: "desinfection",
    image: IMG.desinfection,
    pos: "50% 50%",
    route: {
      page: "landing",
      slug: "desinfection",
    },
    badge: "Sur devis",
    badgeBg: "bg-[#D61F26]",
    phBg: "bg-[#FBE9EA] text-[#D61F26]",
    Icon: Sparkles,
    titre: "Désinfection et dératisation",
    desc: "Traitement des logements, bureaux et locaux professionnels.",
    cta: "Demander un devis →",
  },
  {
    id: "gestion",
    image: IMG.gestion,
    pos: "50% 25%",
    route: {
      page: "landing",
      slug: "gestion",
    },
    badge: "Sur devis",
    badgeBg: "bg-[#D61F26]",
    phBg: "bg-[#FBE9EA] text-[#D61F26]",
    Icon: Building2,
    titre: "Gestion immobilière",
    desc: "Confiez la gestion de vos biens à des professionnels.",
    cta: "Demander un devis →",
  },
  {
    id: "btp",
    image: IMG.btp,
    pos: "50% 5%",
    route: {
      page: "landing",
      slug: "btp",
    },
    badge: "Sur devis",
    badgeBg: "bg-[#D61F26]",
    phBg: "bg-[#FBE9EA] text-[#D61F26]",
    Icon: Hammer,
    titre: "BTP et pavés autobloquants",
    desc: "Travaux de voirie, cours et allées en pavés autobloquants.",
    cta: "Demander un devis →",
  },
  {
    id: "architecture",
    image: IMG.architecture,
    pos: "50% 50%",
    route: {
      page: "landing",
      slug: "architecture",
    },
    badge: "Sur devis",
    badgeBg: "bg-[#D61F26]",
    phBg: "bg-[#FBE9EA] text-[#D61F26]",
    Icon: Compass,
    titre: "Architecture",
    desc: "Conception et plans pour vos projets de bâtiment.",
    cta: "Demander un devis →",
  },
  {
    id: "construction",
    image: IMG.construction,
    pos: "50% 40%",
    route: {
      page: "landing",
      slug: "construction",
    },
    badge: "Sur devis",
    badgeBg: "bg-[#D61F26]",
    phBg: "bg-[#FBE9EA] text-[#D61F26]",
    Icon: HardHat,
    titre: "Construction et rénovation",
    desc: "Construction neuve et rénovation de bâtiments.",
    cta: "Demander un devis →",
  },
];
// ============================================================================
// CATALOGUES : Immobilier et Automobile partagent exactement la même logique
// (barre de recherche → recherche guidée en étapes → résultats → fiche détaillée)
// ============================================================================
export const DUREES = ["Location journalière", "Location hebdomadaire", "Location mensuelle"];
export const CATALOGUES = {
  immobilier: {
    kind: "immobilier",
    titre: "Catalogue Immobilier",
    sous: "Location saisonnière d’appartements, location, achat et vente de biens au Congo-Brazzaville.",
    typeKey: "typeBien",
    catKey: "categorieBien",
    detailPage: "immobilier-detail",
    retourDetail: "Retour au catalogue immobilier",
    placeholder: "Rechercher un bien au Congo-Brazzaville…",
    louerTxt: "Appartement, studio ou maison à louer",
    acheterTxt: "Acquérir un bien immobilier au Congo-Brazzaville",
    vendreTxt: "Proposer votre bien immobilier à la vente ou location",
    louerQ: "Que voulez-vous louer ?",
    acheterQ: "Que voulez-vous acheter ?",
    types: ["Appartement", "Studio", "Maison"],
    acheterTypes: ["Appartement", "Maison"],
    vide: "Aucun bien immobilier ne correspond à ces critères.",
    tousLabel: "Afficher tous les biens",
    sell: {
      title: "Proposer votre bien",
      intro: "je souhaite proposer mon bien immobilier.",
      optionLabel: "Votre souhait",
      options: ["Vendre mon bien", "Louer mon bien"],
      detailsLabel: "Détails du bien (type, quartier, surface, prix souhaité)",
    },
    badges: (b) => [
      [MapPin, b.quartier],
      [BedDouble, `${b.chambres} ch.`],
      [Bath, `${b.sallesBain} sdb`],
      [Maximize2, `${b.surface} m²`],
    ],
    specs: (b) => [
      ["Quartier", b.quartier],
      ["Type de bien", b.categorieBien],
      ["Configuration", `${b.chambres} ch. · ${b.sallesBain} sdb`],
      ["Surface", `${b.surface} m²`],
    ],
    interest: (b) =>
      `Bonjour BOÉ MULTI-SERVICES, je suis intéressé(e) par le bien immobilier : ${b.titre} (${b.transaction} - Quartier ${b.quartier}, ${b.chambres} chambre(s)). Est-il disponible ?`,
    cta: "Réserver / Contacter",
  },
  automobile: {
    kind: "automobile",
    titre: "Catalogue Automobile",
    sous: "Location, achat et vente de véhicules au Congo-Brazzaville.",
    typeKey: "typeVehicule",
    catKey: "categorieVehicule",
    detailPage: "automobile-detail",
    retourDetail: "Retour au catalogue automobile",
    placeholder: "Rechercher un véhicule au Congo-Brazzaville…",
    louerTxt: "4x4, SUV ou pick-up à louer",
    acheterTxt: "Acquérir un véhicule au Congo-Brazzaville",
    vendreTxt: "Proposer votre véhicule à la vente ou location",
    louerQ: "Que voulez-vous louer ?",
    acheterQ: "Que voulez-vous acheter ?",
    types: ["SUV / 4x4", "Pick-up"],
    acheterTypes: ["SUV / 4x4", "Pick-up"],
    vide: "Aucun véhicule ne correspond à ces critères.",
    tousLabel: "Afficher tous les véhicules",
    sell: {
      title: "Proposer votre véhicule",
      intro: "je souhaite proposer mon véhicule.",
      optionLabel: "Votre souhait",
      options: ["Vendre mon véhicule", "Louer mon véhicule"],
      detailsLabel: "Détails du véhicule (marque, année, kilométrage, prix souhaité)",
    },
    badges: (v) => [
      [Calendar, v.annee],
      [Gauge, `${v.kilometrage.toLocaleString("fr-FR")} km`],
      [Fuel, v.carburant],
      [Settings2, v.boite],
    ],
    specs: (v) => [
      ["Marque", v.marque],
      ["Année", v.annee],
      ["Kilométrage", `${v.kilometrage.toLocaleString("fr-FR")} km`],
      ["Carburant & Boîte", `${v.carburant} · ${v.boite}`],
    ],
    interest: (v) =>
      `Bonjour BOÉ MULTI-SERVICES, je suis intéressé(e) par le véhicule : ${v.titre} (${v.transaction} - ${v.annee}, ${v.carburant}, ${v.kilometrage.toLocaleString("fr-FR")} km). Est-il disponible ?`,
    cta: "Réserver / Contacter",
  },
};
// ============================================================================
// PAGES LÉGALES (textes provisoires à faire valider avant publication)
// ============================================================================
export const LEGAL = {
  conditions: {
    titre: "Conditions d’utilisation",
    blocs: [
      [
        "Objet",
        "Ce site présente les services de BOÉ MULTI-SERVICES au Congo-Brazzaville et permet d’envoyer des demandes de devis, de réservation ou de candidature.",
      ],
      [
        "Annonces",
        "Les annonces (biens, véhicules) sont indicatives. Prix, disponibilité et caractéristiques sont confirmés lors de la prise de contact.",
      ],
      [
        "Demandes",
        "Envoyer une demande n’engage ni le client ni BOÉ MULTI-SERVICES. Seul un devis ou un contrat écrit fait foi.",
      ],
      ["Responsabilité", "Nous veillons à la mise à jour des informations sans garantir l’absence d’erreur."],
    ],
  },
  confidentialite: {
    titre: "Politique de confidentialité",
    blocs: [
      [
        "Données collectées",
        "Nom, téléphone, quartier et détails de votre demande, uniquement ceux saisis dans les formulaires.",
      ],
      ["Utilisation", "Ces données servent à répondre à votre demande, jamais à de la publicité tierce."],
      [
        "Vos droits",
        `Vous pouvez demander l’accès, la correction ou la suppression de vos données à ${BOE_EMAIL}.`,
      ],
    ],
  },
};
// ============================================================================
// APPLICATION PRINCIPALE (Mobile-First, header épuré : logo uniquement)
// ============================================================================
export // ============================================================================
// PAGES PARTENARIAT (Devenir partenaire immobilier / automobile)
// ============================================================================
const PARTENAIRES = {
  immobilier: {
    retour: "Retour au catalogue immobilier",
    badge: "Partenariat · Immobilier",
    titre: "Devenez partenaire immobilier",
    sousTitre: "Confiez vos biens à BOÉ MULTI-SERVICES et touchez plus de clients au Congo-Brazzaville.",
    description:
      "Propriétaire, agence ou promoteur : si vous avez des biens à louer, à vendre ou en location saisonnière, nous pouvons les présenter dans notre catalogue et vous mettre en relation avec des clients.",
    profils: [
      "Propriétaires de logements, villas ou appartements",
      "Agences immobilières et courtiers",
      "Promoteurs et constructeurs",
      "Gestionnaires de résidences meublées",
    ],
    etapes: [
      "Vous nous contactez ou envoyez votre demande de partenariat",
      "Nous étudions vos biens et vous recontactons pour en discuter",
      "Nous fixons ensemble les conditions du partenariat",
      "Vos annonces sont publiées dans le catalogue immobilier",
    ],
    sheetTitle: "Devenir partenaire · Immobilier",
    intro: "je souhaite devenir partenaire de BOÉ MULTI-SERVICES en immobilier.",
    options: ["Propriétaire", "Agence immobilière", "Promoteur / constructeur", "Autre"],
    detailsLabel: "Présentez votre activité et vos biens (type, quartiers, nombre)",
    question: "j’ai une question sur le partenariat immobilier.",
  },
  automobile: {
    retour: "Retour au catalogue automobile",
    badge: "Partenariat · Automobile",
    titre: "Devenez partenaire automobile",
    sousTitre:
      "Proposez vos véhicules via BOÉ MULTI-SERVICES et touchez plus de clients au Congo-Brazzaville.",
    description:
      "Propriétaire, garage ou société de location : si vous avez des véhicules à louer ou à vendre, nous pouvons les présenter dans notre catalogue et vous mettre en relation avec des clients.",
    profils: [
      "Propriétaires de véhicules à louer ou à vendre",
      "Concessionnaires et garages",
      "Sociétés de location de véhicules",
      "Particuliers qui souhaitent vendre leur véhicule",
    ],
    etapes: [
      "Vous nous contactez ou envoyez votre demande de partenariat",
      "Nous étudions vos véhicules et vous recontactons pour en discuter",
      "Nous fixons ensemble les conditions du partenariat",
      "Vos annonces sont publiées dans le catalogue automobile",
    ],
    sheetTitle: "Devenir partenaire · Automobile",
    intro: "je souhaite devenir partenaire de BOÉ MULTI-SERVICES en automobile.",
    options: ["Propriétaire de véhicule(s)", "Concessionnaire / garage", "Société de location", "Autre"],
    detailsLabel: "Présentez votre activité et vos véhicules (marques, nombre, location ou vente)",
    question: "j’ai une question sur le partenariat automobile.",
  },
};
