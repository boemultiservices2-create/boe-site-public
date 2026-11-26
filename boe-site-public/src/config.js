export // ============================================================================
// CONFIGURATION WHATSAPP (Congo-Brazzaville +242)
// ============================================================================
const BOE_WHATSAPP_NUMBER = "242064583191";
export function buildWhatsAppUrl(message) {
  return `https://wa.me/${BOE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
// ============================================================================
// CONTACT (mêmes moyens de contact sur toutes les pages : WhatsApp, appel, e-mail)
// À REMPLACER par les vraies coordonnées de BOÉ MULTI-SERVICES
// ============================================================================
// Appel : deux numéros. WhatsApp : +242 06 458 3191 (voir BOE_WHATSAPP_NUMBER plus haut)
export const BOE_PHONES = [
  {
    label: "+242 05 322 87 23",
    tel: "+242053228723",
  },
  {
    label: "+242 06 458 3191",
    tel: "+242064583191",
  },
];
export const BOE_EMAIL = "boemultiservices2@gmail.com"; // À REMPLACER par la vraie adresse e-mail
// Images (dossier public/images du projet)
export const LOGO_SRC = "/images/logo.jpg";
export const FAVICON_SRC = "/favicon.png";
export function buildMailUrl(subject, body) {
  return `mailto:${BOE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
// ============================================================================
// ANNONCES : elles viennent UNIQUEMENT de la base de données, alimentée par l'espace manager.
// Tant qu'aucune annonce n'est créée, le catalogue reste vide. Aucune donnée de démonstration.
// Une annonce = { id, titre, transaction ("Location" | "Location saisonnière" | "Vente"), prix, unitePrix,
//   typeBien | typeVehicule, categorieBien | categorieVehicule, durees[], description, equipements[],
//   medias: [{ type: "image" | "video", url }], + champs propres au modèle (quartier, chambres… / marque, année…) }
// À BRANCHER : lire ici les annonces publiées dans l'espace manager (kind = "immobilier" | "automobile").
// ============================================================================
