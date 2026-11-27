import { useEffect, useState } from "react";

// ============================================================================
// ANNONCES (immobilier / automobile) — lues dans la table `properties` de Supabase,
// la même que celle alimentée par l'espace manager.
// Seules les annonces "Publié" sont visibles (la politique RLS le garantit aussi côté base).
// ============================================================================
// L'URL et la clé "publishable" sont publiques par conception (la sécurité repose sur la RLS).
// On accepte les deux noms de variable (PUBLISHABLE_KEY ou ANON_KEY) + valeurs de secours,
// pour que le site public lise toujours la même base que l'espace manager.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://tyucydvnfvasmyzckowq.supabase.co";
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_A93kHgte_vu1gBaWeN-QcA_2gkueTd6";

// kind du site public -> valeur de la colonne `category` dans Supabase
const CATEGORY = { immobilier: "immobilier", automobile: "auto" };

const DUREE_LABELS = {
  price_daily: "Location journalière",
  price_weekly: "Location hebdomadaire",
  price_monthly: "Location mensuelle",
};

// Convertit une ligne Supabase (snake_case) vers le format attendu par le site public
function mapRow(row) {
  const durees = Object.entries(DUREE_LABELS)
    .filter(([col]) => row[col] !== null && row[col] !== undefined)
    .map(([, label]) => label);

  let transaction = "Vente";
  if (row.transaction_type === "Louer") {
    transaction = row.rental_frequency === "journalière" ? "Location saisonnière" : "Location";
  }

  const medias = (Array.isArray(row.media) ? row.media : [])
    .filter((m) => m && m.url)
    .sort((a, b) => Number(Boolean(b.isCover)) - Number(Boolean(a.isCover)))
    .map((m) => ({ type: m.type === "video" ? "video" : "image", url: m.url }));

  return {
    id: row.id,
    titre: row.title,
    transaction,
    prix: row.price ?? null,
    unitePrix: row.price_unit || "",
    durees,
    description: row.description || "",
    equipements: Array.isArray(row.amenities) ? row.amenities : [],
    medias,
    disponibilite: row.status,

    // Immobilier
    typeBien: row.property_type,
    categorieBien: row.property_type,
    quartier: row.neighborhood || "",
    chambres: row.bedrooms ?? 0,
    sallesBain: row.bathrooms ?? 0,
    surface: row.area ?? 0,

    // Automobile
    typeVehicule: row.property_type,
    categorieVehicule: row.property_type,
    marque: [row.vehicle_brand, row.vehicle_model].filter(Boolean).join(" "),
    annee: row.vehicle_year ?? "",
    kilometrage: row.mileage ?? 0,
    carburant: row.fuel_type || "",
    boite: row.transmission || "",
  };
}

export async function fetchAnnonces(kind) {
  const category = CATEGORY[kind];
  if (!category || !SUPABASE_URL || !SUPABASE_KEY) {
    console.warn("Supabase non configuré : vérifiez VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY.");
    return [];
  }
  const url =
    `${SUPABASE_URL}/rest/v1/properties?select=*` +
    `&category=eq.${category}` +
    `&publication_status=eq.${encodeURIComponent("Publié")}` +
    `&published=eq.true` +
    `&order=created_at.desc`;

  // Les clés "sb_publishable_..." ne sont pas des JWT : on ne les envoie que dans `apikey`.
  const headers = { apikey: SUPABASE_KEY };
  if (SUPABASE_KEY.startsWith("eyJ")) headers.Authorization = `Bearer ${SUPABASE_KEY}`;

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Lecture des annonces impossible (${res.status})`);
  return (await res.json()).map(mapRow);
}

export function useAnnonces(kind) {
  const [state, setState] = useState({ items: [], loading: true });
  useEffect(() => {
    let ok = true;
    fetchAnnonces(kind)
      .then((items) => ok && setState({ items: items || [], loading: false }))
      .catch((err) => {
        console.error(err);
        if (ok) setState({ items: [], loading: false });
      });
    return () => {
      ok = false;
    };
  }, [kind]);
  return state;
}
