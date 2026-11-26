import { useEffect, useState } from "react";

// ============================================================================
// ANNONCES (immobilier / automobile)
// Elles viennent UNIQUEMENT de la base de données, alimentée par l'espace manager.
// Tant qu'aucune annonce n'est créée, le catalogue reste vide (aucune donnée de démonstration).
//
// Une annonce attendue par le site :
//   { id, titre, transaction ("Location" | "Location saisonnière" | "Vente"), prix, unitePrix,
//     durees: [], description, equipements: [], medias: [{ type: "image" | "video", url }],
//     immobilier : typeBien, categorieBien, quartier, chambres, sallesBain, surface
//     automobile : typeVehicule, categorieVehicule, marque, annee, kilometrage, carburant, boite }
//
// À ADAPTER : indiquez le nom des tables créées par l'espace manager (null = catalogue vide)
// et, si les colonnes ont d'autres noms, faites la correspondance dans mapRow().
// ============================================================================
const TABLES = { immobilier: null, automobile: null };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

function mapRow(row) {
  return row;
}

export async function fetchAnnonces(kind) {
  const table = TABLES[kind];
  if (!table || !SUPABASE_URL || !SUPABASE_KEY) return [];
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) throw new Error(`Lecture des annonces impossible (${res.status})`);
  return (await res.json()).map(mapRow);
}

export function useAnnonces(kind) {
  const [state, setState] = useState({ items: [], loading: true });
  useEffect(() => {
    let ok = true;
    fetchAnnonces(kind)
      .then((items) => ok && setState({ items: items || [], loading: false }))
      .catch(() => ok && setState({ items: [], loading: false }));
    return () => {
      ok = false;
    };
  }, [kind]);
  return state;
}
