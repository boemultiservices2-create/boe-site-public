import { useState, useMemo, useRef, useEffect } from "react";
import {
  Home,
  Car,
  Users,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  MapPin,
  Clock,
  Award,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  Phone,
} from "lucide-react";
import { buildWhatsAppUrl, BOE_PHONES, BOE_EMAIL, LOGO_SRC, FAVICON_SRC, buildMailUrl } from "./config.js";
import {
  OPTIONS_PERSONNEL_GARDIENNAGE,
  SERVICES_LANDING,
  HOME_SERVICES,
  DUREES,
  CATALOGUES,
  LEGAL,
  PARTENAIRES,
} from "./data.js";
import { useAnnonces } from "./annonces.js";

// ============================================================================
// APPLICATION PRINCIPALE (Mobile-First, header épuré : logo uniquement)
// ============================================================================
function App() {
  const [route, setRoute] = useState({
    page: "home",
  });
  const [sheet, setSheet] = useState(null); // formulaire « Demander… » (devis, demande, candidature…)
  const navigate = (nextRoute) => {
    setRoute(nextRoute);
    setSheet(null);
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const openSheet = (config) => setSheet(config);
  // Favicon (logo) + titre de l'onglet
  useEffect(() => {
    document.title = "BOÉ MULTI-SERVICES — Congo-Brazzaville";
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = FAVICON_SRC;
  }, []);
  const isImmo =
    route.page === "immobilier" ||
    route.page === "immobilier-detail" ||
    (route.page === "partenaire" && route.kind === "immobilier");
  const isAuto =
    route.page === "automobile" ||
    route.page === "automobile-detail" ||
    (route.page === "partenaire" && route.kind === "automobile");
  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col pb-16 md:pb-0 antialiased"
    >
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <button
            type="button"
            onClick={() =>
              navigate({
                page: "home",
              })
            }
            className="text-left focus:outline-none"
          >
            <BoeLogo />
          </button>
        </div>
      </header>
      <div className="flex-1 flex flex-col">
        {route.page === "home" && <HomeView navigate={navigate} />}
        {route.page === "immobilier" && (
          <CatalogueView kind="immobilier" navigate={navigate} openSheet={openSheet} />
        )}
        {route.page === "immobilier-detail" && (
          <DetailView kind="immobilier" id={route.id} navigate={navigate} />
        )}
        {route.page === "automobile" && (
          <CatalogueView kind="automobile" navigate={navigate} openSheet={openSheet} />
        )}
        {route.page === "automobile-detail" && (
          <DetailView kind="automobile" id={route.id} navigate={navigate} />
        )}
        {route.page === "personnel" && (
          <PersonnelGardiennageView initialCat={route.initialCat} navigate={navigate} openSheet={openSheet} />
        )}
        {route.page === "landing" && (
          <ServiceLandingView slug={route.slug} navigate={navigate} openSheet={openSheet} />
        )}
        {route.page === "legal" && <LegalView slug={route.slug} navigate={navigate} />}
        {route.page === "partenaire" && (
          <PartenaireView kind={route.kind} navigate={navigate} openSheet={openSheet} />
        )}
      </div>
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div className="flex flex-col gap-3">
            <BoeLogo />
            <p className="text-slate-500">Congo-Brazzaville.</p>
            <div className="flex flex-col gap-1.5 font-semibold text-slate-700">
              <a
                href={buildWhatsAppUrl("Bonjour BOÉ MULTI-SERVICES, je vous contacte depuis votre site web.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              {BOE_PHONES.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`}>
                  {p.label}
                </a>
              ))}
              <a href={`mailto:${BOE_EMAIL}`}>{BOE_EMAIL}</a>
            </div>
          </div>
          <FooterCol titre="Services">
            <FooterLink
              onClick={() =>
                navigate({
                  page: "immobilier",
                })
              }
            >
              Immobilier
            </FooterLink>
            <FooterLink
              onClick={() =>
                navigate({
                  page: "automobile",
                })
              }
            >
              Automobile
            </FooterLink>
            <FooterLink
              onClick={() =>
                navigate({
                  page: "personnel",
                  initialCat: "Personnel",
                })
              }
            >
              Personnel
            </FooterLink>
            <FooterLink
              onClick={() =>
                navigate({
                  page: "personnel",
                  initialCat: "Gardiennage",
                })
              }
            >
              Gardiennage
            </FooterLink>
          </FooterCol>
          <FooterCol titre="Sur devis">
            {Object.values(SERVICES_LANDING).map((s) => (
              <FooterLink
                key={s.slug}
                onClick={() =>
                  navigate({
                    page: "landing",
                    slug: s.slug,
                  })
                }
              >
                {s.titre}
              </FooterLink>
            ))}
          </FooterCol>
          <FooterCol titre="Informations">
            {Object.entries(LEGAL).map(([slug, l]) => (
              <FooterLink
                key={slug}
                onClick={() =>
                  navigate({
                    page: "legal",
                    slug,
                  })
                }
              >
                {l.titre}
              </FooterLink>
            ))}
          </FooterCol>
        </div>
        <p className="text-xs text-slate-500 text-center pb-6 px-4">
          © 2026 BOÉ MULTI-SERVICES · Congo-Brazzaville. Tous droits réservés.
        </p>
      </footer>
      <nav
        aria-label="Navigation mobile rapide"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 grid grid-cols-4 h-16 px-1 shadow-[0_-2px_10px_rgba(15,23,42,0.06)]"
      >
        <button
          type="button"
          onClick={() =>
            navigate({
              page: "home",
            })
          }
          className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold ${route.page === "home" ? "text-[#0056A3]" : "text-slate-500"}`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Services</span>
        </button>
        <button
          type="button"
          onClick={() =>
            navigate({
              page: "immobilier",
            })
          }
          className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold ${isImmo ? "text-[#0056A3]" : "text-slate-500"}`}
        >
          <Home className="w-5 h-5" />
          <span>Immo</span>
        </button>
        <button
          type="button"
          onClick={() =>
            navigate({
              page: "automobile",
            })
          }
          className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold ${isAuto ? "text-[#0056A3]" : "text-slate-500"}`}
        >
          <Car className="w-5 h-5" />
          <span>Auto</span>
        </button>
        <a
          href={buildWhatsAppUrl("Bonjour BOÉ MULTI-SERVICES, je vous contacte depuis votre site web.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-[#16a34a]"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
      </nav>
      {sheet && <RequestSheet key={sheet.title} config={sheet} onClose={() => setSheet(null)} />}
    </div>
  );
}
function FooterCol({ titre, children }) {
  return (
    <div>
      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">{titre}</h4>
      <div className="flex flex-col items-start gap-2 font-semibold text-slate-600">{children}</div>
    </div>
  );
}
function FooterLink({ onClick, children }) {
  return (
    <button type="button" onClick={onClick} className="text-left hover:text-[#0056A3]">
      {children}
    </button>
  );
}
// ============================================================================
// BOUTONS DE CONTACT (WhatsApp · Appel · E-mail) — identiques sur toutes les pages
// ============================================================================
function ContactActions({ message, subject = "Demande depuis le site BOÉ MULTI-SERVICES" }) {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold py-3.5 px-4 rounded-2xl text-sm transition";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      <a
        href={buildWhatsAppUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-[#25D366] hover:bg-[#1ebe5d] text-white sm:col-span-2`}
      >
        <MessageCircle className="w-5 h-5" /> WhatsApp
      </a>
      {BOE_PHONES.map((p) => (
        <a key={p.tel} href={`tel:${p.tel}`} className={`${base} bg-[#0056A3] hover:bg-blue-800 text-white`}>
          <Phone className="w-5 h-5" />
          {p.label}
        </a>
      ))}
      <a
        href={buildMailUrl(subject, message)}
        className={`${base} bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 sm:col-span-2`}
      >
        <Mail className="w-5 h-5" /> E-mail
      </a>
    </div>
  );
}
// ============================================================================
// FENÊTRE (bottom sheet sur mobile) — base commune des formulaires et de la recherche guidée
// ============================================================================
function Sheet({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 flex items-end md:items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-lg max-h-[92%] overflow-auto rounded-t-3xl md:rounded-3xl p-5 sm:p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}
// Formulaire de demande : s'ouvre APRÈS le bouton « Demander… » de la landing page.
// Envoi au choix : WhatsApp, e-mail ou appel direct.
function RequestSheet({ config, onClose }) {
  const [v, setV] = useState({
    opt: config.options ? config.options[0] : "",
    freq: config.freqs ? config.freqs[0] : "",
    nom: "",
    tel: "",
    quartier: "",
    details: "",
  });
  const set = (k) => (e) =>
    setV({
      ...v,
      [k]: e.target.value,
    });
  const message = [
    `Bonjour BOÉ MULTI-SERVICES, ${config.intro}`,
    config.options ? `• ${config.optionLabel} : ${v.opt}` : null,
    config.freqs ? `• Rythme : ${v.freq}` : null,
    `• ${config.candidat ? "Nom & Prénom" : "Nom / Société"} : ${v.nom || "Non précisé"}`,
    `• Téléphone : ${v.tel || "Non précisé"}`,
    `• Quartier : ${v.quartier || "Congo-Brazzaville"}`,
    v.details ? `• ${config.detailsLabel || "Détails"} : ${v.details}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  const field = "w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm bg-white";
  const label = "block text-xs font-bold text-slate-600 mb-1.5";
  return (
    <Sheet onClose={onClose}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-extrabold text-slate-900">{config.title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="p-2 rounded-xl border border-slate-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-sm text-slate-500 mt-1 mb-4">
        Renseignez ces quelques informations, puis envoyez votre demande comme vous préférez.
      </p>
      <div className="flex flex-col gap-3.5">
        {config.options && (
          <div>
            <label className={label}>{config.optionLabel}</label>
            <select value={v.opt} onChange={set("opt")} className={field}>
              {config.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        )}
        {config.freqs && (
          <div>
            <label className={label}>Rythme / Formule souhaitée</label>
            <select value={v.freq} onChange={set("freq")} className={field}>
              {config.freqs.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className={label}>{config.candidat ? "Votre nom et prénom" : "Votre nom ou société"}</label>
          <input
            type="text"
            value={v.nom}
            onChange={set("nom")}
            placeholder="Ex: Patrick Mouanda"
            className={field}
          />
        </div>
        <div>
          <label className={label}>Téléphone / WhatsApp</label>
          <input
            type="tel"
            value={v.tel}
            onChange={set("tel")}
            placeholder="Ex: 06 600 00 00"
            className={field}
          />
        </div>
        <div>
          <label className={label}>Quartier</label>
          <input
            type="text"
            value={v.quartier}
            onChange={set("quartier")}
            placeholder="Ex: votre quartier ou votre ville"
            className={field}
          />
        </div>
        <div>
          <label className={label}>{config.detailsLabel || "Détails de votre besoin"} (facultatif)</label>
          <textarea rows={3} value={v.details} onChange={set("details")} className={field} />
        </div>
      </div>
      <div className="mt-5">
        <ContactActions message={message} subject={config.title} />
      </div>
    </Sheet>
  );
}
// ============================================================================
// CARROUSEL DE MÉDIAS (photos + vidéos, flèches, compteur) — alimenté par la base de données
// ============================================================================
function MediaCarousel({ medias = [], alt, className = "h-48" }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const n = medias.length;
  const go = (dir) => {
    const el = ref.current;
    if (!el) return;
    const next = Math.min(n - 1, Math.max(0, index + dir));
    setIndex(next);
    el.scrollTo({
      left: el.clientWidth * next,
      behavior: "smooth",
    });
  };
  const onScroll = () => {
    const el = ref.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };
  const arrow =
    "absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center";
  return (
    <div className={`relative bg-slate-100 ${className}`}>
      <div
        ref={ref}
        onScroll={onScroll}
        className="boe-scroll flex h-full overflow-x-auto snap-x snap-mandatory"
      >
        {medias.map((m, i) => (
          <div key={i} className="shrink-0 w-full h-full snap-center">
            {m.type === "video" ? (
              <video
                src={m.url}
                controls={true}
                playsInline={true}
                preload="metadata"
                className="w-full h-full object-cover bg-black"
              />
            ) : (
              <img src={m.url} alt={alt} loading="lazy" className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>
      {n > 1 && (
        <>
          <button type="button" aria-label="Précédent" onClick={() => go(-1)} className={`${arrow} left-2`}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" aria-label="Suivant" onClick={() => go(1)} className={`${arrow} right-2`}>
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5">
            {medias.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
// ============================================================================
// RECHERCHE GUIDÉE (Étape 1 : Louer / Acheter / Vendre → Étape 2 : type → Étape 3 : durée)
// ============================================================================
function GuidedSearch({ cfg, onApply, onSell, onClose }) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(null);
  const [type, setType] = useState(null);
  const bigBtn =
    "w-full text-left p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#0056A3] active:scale-[0.99] transition flex flex-col gap-0.5";
  const smallBtn =
    "px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-800 hover:border-[#0056A3] hover:text-[#0056A3]";
  const ghost = "px-4 py-3 rounded-xl text-sm font-bold";
  return (
    <Sheet onClose={onClose}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#0056A3]">
            Recherche guidée · Étape {step}
          </p>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            {step === 1 && "Que voulez-vous faire ?"}
            {step === 2 && (mode === "louer" ? cfg.louerQ : cfg.acheterQ)}
            {step === 3 && "Quelle durée de location recherchez-vous ?"}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="p-2 rounded-xl border border-slate-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {step === 1 && (
          <>
            <button
              type="button"
              className={bigBtn}
              onClick={() => {
                setMode("louer");
                setStep(2);
              }}
            >
              <span className="font-extrabold text-slate-900">Louer</span>
              <span className="text-xs text-slate-500">{cfg.louerTxt}</span>
            </button>
            <button
              type="button"
              className={bigBtn}
              onClick={() => {
                setMode("acheter");
                setStep(2);
              }}
            >
              <span className="font-extrabold text-slate-900">Acheter</span>
              <span className="text-xs text-slate-500">{cfg.acheterTxt}</span>
            </button>
            <button type="button" className={bigBtn} onClick={onSell}>
              <span className="font-extrabold text-[#D61F26]">Vendre</span>
              <span className="text-xs text-slate-500">{cfg.vendreTxt}</span>
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="grid grid-cols-2 gap-2.5">
              {(mode === "louer" ? cfg.types : cfg.acheterTypes).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={smallBtn}
                  onClick={() => {
                    if (mode === "louer") {
                      setType(t);
                      setStep(3);
                    } else
                      onApply({
                        mode,
                        type: t,
                        duree: null,
                      });
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 pt-2">
              <button type="button" className={`${ghost} text-slate-600`} onClick={() => setStep(1)}>
                ← Retour
              </button>
              <button
                type="button"
                className={`${ghost} bg-blue-50 text-[#0056A3]`}
                onClick={() =>
                  onApply({
                    mode,
                    type: null,
                    duree: null,
                  })
                }
              >
                Voir tous les résultats
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="flex flex-col gap-2.5">
              {DUREES.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={smallBtn}
                  onClick={() =>
                    onApply({
                      mode,
                      type,
                      duree: d,
                    })
                  }
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 pt-2">
              <button type="button" className={`${ghost} text-slate-600`} onClick={() => setStep(2)}>
                ← Retour
              </button>
              <button
                type="button"
                className={`${ghost} bg-blue-50 text-[#0056A3]`}
                onClick={() =>
                  onApply({
                    mode,
                    type,
                    duree: null,
                  })
                }
              >
                Toutes les durées
              </button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  );
}
// ============================================================================
// CATALOGUE (Immobilier ET Automobile : même logique, même composant)
// ============================================================================
function CatalogueView({ kind, navigate, openSheet }) {
  const cfg = CATALOGUES[kind];
  const [crit, setCrit] = useState({
    mode: null,
    type: null,
    duree: null,
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const { items, loading } = useAnnonces(kind);
  const liste = useMemo(
    () =>
      items.filter((b) => {
        if (crit.mode === "louer" && b.transaction === "Vente") return false;
        if (crit.mode === "acheter" && b.transaction !== "Vente") return false;
        if (crit.type && b[cfg.typeKey] !== crit.type) return false;
        if (crit.duree && !(b.durees || []).includes(crit.duree)) return false;
        return true;
      }),
    [cfg, items, crit],
  );
  const resume = [
    crit.mode === "louer" ? "Louer" : crit.mode === "acheter" ? "Acheter" : null,
    crit.type,
    crit.duree,
  ].filter(Boolean);
  const reset = () =>
    setCrit({
      mode: null,
      type: null,
      duree: null,
    });
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6">
      <div>
        <button
          type="button"
          onClick={() =>
            navigate({
              page: "home",
            })
          }
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0056A3] py-1"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux services
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          {cfg.titre}
        </h1>
        <p className="text-sm text-slate-600">{cfg.sous}</p>
        <button
          type="button"
          onClick={() =>
            navigate({
              page: "partenaire",
              kind,
            })
          }
          className="mt-3 inline-flex items-center gap-2 bg-[#D61F26] hover:bg-red-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition"
        >
          <Users className="w-4 h-4" /> Devenir partenaire
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-left shadow-sm hover:border-[#0056A3] transition"
          >
            <Search className="w-5 h-5 text-[#0056A3] shrink-0" />
            <span
              className={`flex-1 text-sm font-semibold truncate ${resume.length ? "text-slate-900" : "text-slate-400"}`}
            >
              {resume.length ? resume.join(" · ") : cfg.placeholder}
            </span>
            <span className="shrink-0 px-3 py-1.5 rounded-lg bg-[#0056A3] text-white text-xs font-bold">
              Rechercher
            </span>
          </button>
          {resume.length > 0 && (
            <div className="flex items-center justify-between gap-2 text-xs font-bold">
              <span className="text-[#0056A3]">
                {liste.length} résultat{liste.length > 1 ? "s" : ""}
              </span>
              <button type="button" onClick={reset} className="text-slate-600 underline">
                Effacer la recherche
              </button>
            </div>
          )}
        </div>
      )}
      {loading ? (
        <p className="text-sm font-semibold text-slate-500 text-center py-10">Chargement…</p>
      ) : items.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-sm font-bold text-slate-700">Aucune annonce pour le moment.</p>
          <p className="text-xs text-slate-500 mt-1">Les annonces publiées apparaîtront ici.</p>
        </div>
      ) : liste.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center gap-3">
          <p className="text-sm font-bold text-slate-700">{cfg.vide}</p>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 rounded-xl bg-[#0056A3] text-white text-xs font-bold"
          >
            {cfg.tousLabel}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {liste.map((it) => (
            <div
              key={it.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative">
                <MediaCarousel
                  medias={(it.medias || []).filter((m) => m.url)}
                  alt={it.titre}
                  className="h-48"
                />
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold text-white ${it.transaction === "Vente" ? "bg-[#D61F26]" : "bg-[#0056A3]"}`}
                >
                  {it.transaction}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  navigate({
                    page: cfg.detailPage,
                    id: it.id,
                  })
                }
                className="group text-left p-4 sm:p-5 flex flex-col gap-3 flex-1"
              >
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#0056A3]">{it.titre}</h2>
                <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                  <FirstBadge cfg={cfg} it={it} />
                </p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between w-full">
                  <div>
                    <span className="text-lg font-extrabold text-[#0056A3]">
                      {it.prix.toLocaleString("fr-FR")} FCFA
                    </span>
                    {it.unitePrix && <span className="text-xs text-slate-500"> {it.unitePrix}</span>}
                  </div>
                  <span className="text-xs font-bold text-[#0056A3]">Détails →</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
      {searchOpen && (
        <GuidedSearch
          cfg={cfg}
          onClose={() => setSearchOpen(false)}
          onApply={(c) => {
            setCrit(c);
            setSearchOpen(false);
          }}
          onSell={() => {
            setSearchOpen(false);
            openSheet({
              ...cfg.sell,
            });
          }}
        />
      )}
    </main>
  );
}
// ============================================================================
// FICHE DÉTAILLÉE (Immobilier ET Automobile)
// ============================================================================
function DetailView({ kind, id, navigate }) {
  const cfg = CATALOGUES[kind];
  const { items, loading } = useAnnonces(kind);
  const it = items.find((x) => x.id === id);
  if (!it)
    return (
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-4">
        <button
          type="button"
          onClick={() =>
            navigate({
              page: kind,
            })
          }
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0056A3] py-1 self-start"
        >
          <ArrowLeft className="w-4 h-4" /> {cfg.retourDetail}
        </button>
        <p className="text-sm font-semibold text-slate-500">
          {loading ? "Chargement…" : "Cette annonce n’est plus disponible."}
        </p>
      </main>
    );
  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6">
      <button
        type="button"
        onClick={() =>
          navigate({
            page: kind,
          })
        }
        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0056A3] py-1 self-start"
      >
        <ArrowLeft className="w-4 h-4" /> {cfg.retourDetail}
      </button>
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col md:grid md:grid-cols-2 shadow-sm">
        <MediaCarousel
          medias={(it.medias || []).filter((m) => m.url)}
          alt={it.titre}
          className="h-64 sm:h-80 md:h-full md:min-h-[460px]"
        />
        <div className="p-5 sm:p-8 flex flex-col gap-5">
          <div>
            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${it.transaction === "Vente" ? "bg-[#D61F26]" : "bg-[#0056A3]"}`}
            >
              {it.transaction}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">{it.titre}</h1>
            <p className="text-xl sm:text-2xl font-extrabold text-[#D61F26] mt-1">
              {it.prix.toLocaleString("fr-FR")} FCFA{" "}
              <span className="text-sm font-semibold text-slate-500">{it.unitePrix}</span>
            </p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{it.description}</p>
          <dl className="grid grid-cols-2 gap-3 text-sm border-y border-slate-100 py-4">
            {cfg.specs(it).map(([k, val]) => (
              <div key={k}>
                <dt className="text-slate-400 text-xs font-semibold">{k}</dt>
                <dd className="font-bold text-slate-900">{val}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-1.5">
            {it.equipements.map((eq) => (
              <span
                key={eq}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                ✓ {eq}
              </span>
            ))}
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">{cfg.cta}</p>
            <ContactActions message={cfg.interest(it)} subject={it.titre} />
          </div>
        </div>
      </div>
    </main>
  );
}
// ============================================================================
// BLOCS COMMUNS DES LANDING PAGES
// ============================================================================
const CARD = "bg-white border border-slate-200 rounded-3xl p-6 sm:p-9 shadow-sm";
function SectionTitle({ children }) {
  return <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">{children}</h2>;
}
function Steps({ items }) {
  return (
    <ol className="flex flex-col gap-3">
      {items.map((s, i) => (
        <li key={s} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
          <span className="w-8 h-8 rounded-full bg-[#E8F0F9] text-[#0056A3] font-extrabold flex items-center justify-center shrink-0">
            {i + 1}
          </span>
          {s}
        </li>
      ))}
    </ol>
  );
}
const BackToServices = ({ navigate }) => (
  <button
    type="button"
    onClick={() =>
      navigate({
        page: "home",
      })
    }
    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0056A3] py-1 self-start"
  >
    <ArrowLeft className="w-4 h-4" /> Retour à tous nos services
  </button>
);
// ============================================================================
// MODÈLE 2 : PERSONNEL + GARDIENNAGE — vraie landing page, formulaire APRÈS le bouton
// ============================================================================
function PersonnelGardiennageView({ initialCat = "Personnel", navigate, openSheet }) {
  const cat = initialCat;
  const estPerso = cat === "Personnel";
  const profils = OPTIONS_PERSONNEL_GARDIENNAGE.filter((o) => o.categorie === cat);
  const demander = (p) =>
    openSheet({
      title: p.titre,
      intro: `je souhaite faire une demande (${p.categorie}) : ${p.titre}.`,
      freqs: p.frequences,
      detailsLabel: "Précisions (horaires, surface, consignes…)",
    });
  return (
    <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6">
      <BackToServices navigate={navigate} />
      <section className={`${CARD} flex flex-col gap-5`}>
        <span className="self-start px-3 py-1 rounded-lg bg-[#EEF2F6] text-[#334155] text-xs font-bold">
          {estPerso ? "Mise à disposition du personnel" : "Gardiennage"} · Sur demande
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          {estPerso
            ? "Du personnel de maison fiable, à votre rythme"
            : "Des agents de gardiennage pour vos sites"}
        </h1>
        <p className="text-base sm:text-lg font-semibold text-[#0056A3]">
          {estPerso
            ? "Femme de ménage, cuisinière, chauffeur : des profils sélectionnés, pour quelques heures ou à temps plein."
            : "Surveillance de jour comme de nuit pour vos locaux, chantiers et résidences."}
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          BOÉ MULTI-SERVICES sélectionne, vérifie et encadre du personnel de maison et des agents de sécurité
          pour les particuliers, résidences, chantiers BTP et entreprises du Congo-Brazzaville.
        </p>
      </section>
      <section className={CARD}>
        <SectionTitle>Pourquoi nous confier cette mission</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0056A3]">
              <Award className="w-4 h-4" /> Profils vérifiés
            </span>
            <p className="text-xs text-slate-600">
              Identité contrôlée, références vérifiées et suivi régulier par nos superviseurs.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0056A3]">
              <Clock className="w-4 h-4" /> Mise en place rapide
            </span>
            <p className="text-xs text-slate-600">
              Remplacement garanti en cas d’absence ou d’indisponibilité de l’agent.
            </p>
          </div>
        </div>
      </section>
      <section className={CARD}>
        <SectionTitle>Comment ça marche</SectionTitle>
        <Steps
          items={[
            "Vous choisissez le profil et le rythme",
            "Nous vous rappelons pour valider vos besoins",
            "Le professionnel démarre à la date convenue",
          ]}
        />
      </section>
      <section id="profils" className={CARD}>
        <SectionTitle>Nos profils</SectionTitle>
        <div className="flex flex-col gap-3">
          {profils.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center gap-3 justify-between"
            >
              <div>
                <div className="text-base font-bold text-slate-900">{p.titre}</div>
                <p className="text-xs sm:text-sm text-slate-600">{p.description}</p>
              </div>
              <button
                type="button"
                onClick={() => demander(p)}
                className="shrink-0 bg-[#0056A3] hover:bg-blue-800 text-white text-sm font-bold px-5 py-3 rounded-xl transition"
              >
                Demander ce profil
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className={CARD}>
        <SectionTitle>Une question ?</SectionTitle>
        <ContactActions
          message={`Bonjour BOÉ MULTI-SERVICES, j’ai une question sur ${estPerso ? "la mise à disposition du personnel" : "le gardiennage"}.`}
        />
      </section>
    </main>
  );
}
// ============================================================================
// MODÈLE 3 : LANDING PAGE SERVICE SUR DEVIS — le formulaire s’ouvre APRÈS le bouton
// ============================================================================
function ServiceLandingView({ slug, navigate, openSheet }) {
  const service = SERVICES_LANDING[slug] || SERVICES_LANDING.desinfection;
  const intro = service.messageWhatsApp.replace("Bonjour BOÉ MULTI-SERVICES, ", "");
  const devis = () =>
    openSheet({
      title: `Devis · ${service.titre}`,
      intro,
      detailsLabel: "Décrivez brièvement votre besoin (surface, type de bâtiment, délai…)",
    });
  return (
    <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6">
      <BackToServices navigate={navigate} />
      <section className={`${CARD} flex flex-col gap-5`}>
        <span className="self-start px-3 py-1 rounded-lg bg-[#FBE9EA] text-[#D61F26] text-xs font-bold">
          Prestation sur devis · Congo-Brazzaville
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">{service.titre}</h1>
        <p className="text-base sm:text-lg font-semibold text-[#0056A3]">{service.sousTitre}</p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{service.description}</p>
      </section>
      <section className={CARD}>
        <SectionTitle>Ce que comprend notre prestation</SectionTitle>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.pointsForts.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-[#0056A3] shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className={CARD}>
        <SectionTitle>Comment ça se passe</SectionTitle>
        <Steps
          items={[
            "Vous nous décrivez votre besoin",
            "Nous vous contactons avec une estimation",
            "L’intervention est planifiée après votre accord",
          ]}
        />
      </section>
      <section className={`${CARD} flex flex-col gap-4`}>
        <div>
          <SectionTitle>Prêt à démarrer ?</SectionTitle>
          <p className="text-sm text-slate-500 -mt-1">Le devis est gratuit et sans engagement.</p>
        </div>
        <button
          type="button"
          onClick={devis}
          className="w-full bg-[#D61F26] hover:bg-red-700 text-white font-extrabold py-4 rounded-2xl shadow-md transition"
        >
          Demander un devis
        </button>
        <ContactActions message={service.messageWhatsApp} subject={service.titre} />
      </section>
    </main>
  );
}
// ============================================================================
// PAGES LÉGALES
// ============================================================================
function LegalView({ slug, navigate }) {
  const page = LEGAL[slug] || LEGAL.conditions;
  return (
    <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6">
      <button
        type="button"
        onClick={() =>
          navigate({
            page: "home",
          })
        }
        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0056A3] py-1 self-start"
      >
        <ArrowLeft className="w-4 h-4" /> Retour à l’accueil
      </button>
      <section className={CARD}>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">{page.titre}</h1>
        {page.blocs.map(([t, txt]) => (
          <div key={t} className="mb-4">
            <h2 className="font-bold text-slate-900">{t}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{txt}</p>
          </div>
        ))}
        <p className="text-xs text-slate-400">Texte provisoire à faire valider avant publication.</p>
      </section>
    </main>
  );
}
// ============================================================================
// PAGES PARTENARIAT (Devenir partenaire immobilier / automobile)
// ============================================================================

function PartenaireView({ kind, navigate, openSheet }) {
  const k = PARTENAIRES[kind] ? kind : "immobilier";
  const p = PARTENAIRES[k];
  const devenir = () =>
    openSheet({
      title: p.sheetTitle,
      intro: p.intro,
      optionLabel: "Vous êtes",
      options: p.options,
      detailsLabel: p.detailsLabel,
    });
  return (
    <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6">
      <button
        type="button"
        onClick={() =>
          navigate({
            page: k,
          })
        }
        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0056A3] py-1 self-start"
      >
        <ArrowLeft className="w-4 h-4" /> {p.retour}
      </button>
      <section className={`${CARD} flex flex-col gap-4`}>
        <span className="self-start px-3 py-1 rounded-lg bg-[#E8F0F9] text-[#0056A3] text-xs font-bold">
          {p.badge}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">{p.titre}</h1>
        <p className="text-base sm:text-lg font-semibold text-[#0056A3]">{p.sousTitre}</p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{p.description}</p>
      </section>
      <section className={CARD}>
        <SectionTitle>Qui peut devenir partenaire</SectionTitle>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {p.profils.map((x) => (
            <li key={x} className="flex items-start gap-2 text-sm font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-[#0056A3] shrink-0 mt-0.5" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className={CARD}>
        <SectionTitle>Comment ça marche</SectionTitle>
        <Steps items={p.etapes} />
      </section>
      <section className={`${CARD} flex flex-col gap-3`}>
        <SectionTitle>Prêt à devenir partenaire ?</SectionTitle>
        <button
          type="button"
          onClick={devenir}
          className="w-full bg-[#D61F26] hover:bg-red-700 text-white font-extrabold py-4 rounded-2xl shadow-md transition"
        >
          Devenir partenaire
        </button>
      </section>
      <section className={CARD}>
        <SectionTitle>Une question ?</SectionTitle>
        <ContactActions message={`Bonjour BOÉ MULTI-SERVICES, ${p.question}`} subject={p.sheetTitle} />
      </section>
    </main>
  );
}
// Vignette des cartes de l'accueil : photo si disponible, sinon bloc icône coloré
function ServiceThumb({ service }) {
  const [broken, setBroken] = useState(false);
  const IconComponent = service.Icon;
  return (
    <div
      className={`relative aspect-[16/10] flex items-center justify-center overflow-hidden ${service.phBg}`}
    >
      {service.image && !broken ? (
        <img
          src={service.image}
          alt={service.titre}
          loading="lazy"
          onError={() => setBroken(true)}
          style={{
            objectPosition: service.pos || "center",
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <IconComponent className="w-12 h-12 sm:w-14 sm:h-14 stroke-[1.5]" />
      )}
      <span
        className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold text-white shadow-sm ${service.badgeBg}`}
      >
        {service.badge}
      </span>
    </div>
  );
}
// ============================================================================
// VUE ACCUEIL (Sans section "Infos et annonces")
// ============================================================================
function HomeView({ navigate }) {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-10">
      <section className="flex flex-col gap-5 sm:gap-7">
        <div className="flex flex-col gap-2">
          <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-blue-50 text-[#0056A3] text-xs font-bold">
            <MapPin className="w-3.5 h-3.5" /> Congo-Brazzaville
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] font-extrabold text-slate-900 tracking-tight">
            Tous vos services, <span className="text-[#0056A3]">une seule entreprise</span>.
          </h1>
        </div>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Nos services</h2>
          <p className="text-sm sm:text-[15px] text-slate-600">
            Touchez un service pour consulter les offres ou demander un devis immédiat.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {HOME_SERVICES.map((service) => {
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => navigate(service.route)}
                className="group text-left flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden active:scale-[0.99] hover:border-[#0056A3] hover:shadow-md transition"
              >
                <ServiceThumb service={service} />
                <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
                  <h3 className="text-base sm:text-[17px] font-bold text-slate-900">{service.titre}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{service.desc}</p>
                  <span className="mt-1 pt-3 border-t border-slate-100 text-[13px] font-bold text-[#0056A3] group-hover:translate-x-0.5 transition-transform">
                    {service.cta}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
// ============================================================================
// LOGO OFFICIEL BOÉ MULTI-SERVICES (image du logo, remplace le texte)
// ============================================================================
function BoeLogo({ className = "h-12 w-12" }) {
  return (
    <img
      src={LOGO_SRC}
      alt="BOÉ MULTI-SERVICES"
      className={`${className} rounded-full object-cover select-none`}
    />
  );
}
function FirstBadge({ cfg, it }) {
  const [Icon, txt] = cfg.badges(it)[0];
  return (
    <>
      <Icon className="w-4 h-4 text-[#0056A3]" />
      {txt}
    </>
  );
}

export default App;
