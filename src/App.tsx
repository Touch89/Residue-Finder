import { useState, useCallback, useRef, useEffect } from "react";
import {
  residues,
  categories,
  searchResidues,
  type Residue,
  type RiskLevel,
} from "./data/residues";

const UNSPLASH_IMAGES: Record<string, string> = {
  jeringa:
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=320&fit=crop&auto=format",
  pila: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400&h=320&fit=crop&auto=format",
  cartón:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=320&fit=crop&auto=format",
  "residuo-orgánico":
    "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=320&fit=crop&auto=format",
  celular:
    "https://images.unsplash.com/photo-1558618047-f0a193bf8e77?w=400&h=320&fit=crop&auto=format",
  "aceite-motor":
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=320&fit=crop&auto=format",
  vidrio:
    "https://images.unsplash.com/photo-1590246814883-56951e52dbe4?w=400&h=320&fit=crop&auto=format",
  mascarilla:
    "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=320&fit=crop&auto=format",
};

function riskConfig(level: RiskLevel) {
  if (level === "danger")
    return {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      badge: "bg-red-100 text-red-800 border border-red-200",
      dot: "bg-red-500",
      label: "Peligroso",
    };
  if (level === "caution")
    return {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      badge: "bg-amber-100 text-amber-800 border border-amber-200",
      dot: "bg-amber-400",
      label: "Precaución",
    };
  return {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-800 border border-green-200",
    dot: "bg-green-500",
    label: "Seguro",
  };
}

function RiskDot({ level }: { level: RiskLevel }) {
  const { dot } = riskConfig(level);
  return <span className={`inline-block w-2 h-2 rounded-full ${dot} shrink-0`} />;
}

/* SVG icons */
function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
    </svg>
  );
}
function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function ArrowLeftIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}
function LeafIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" d="M12 22c0 0-8-4.5-8-11a8 8 0 0116 0c0 6.5-8 11-8 11z" />
    </svg>
  );
}
function RecycleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5M4.5 19.5l7.5-7.5 7.5 7.5" />
    </svg>
  );
}
function ShieldIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" />
    </svg>
  );
}
function ToolboxIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="2" y="10" width="20" height="12" rx="2" />
      <path strokeLinecap="round" d="M8 10V7a4 4 0 018 0v3" />
      <line x1="2" y1="15" x2="22" y2="15" />
    </svg>
  );
}
function ImagePlaceholderIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path strokeLinecap="round" d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function CategoryIcon({ category }: { category: string }) {
  const lower = category.toLowerCase();
  if (lower.includes("punzante") || lower.includes("médico") || lower.includes("sanitario"))
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" d="M9 3l6 6m0 0l-3 3m3-3l3 3M3 21l6-6" />
      </svg>
    );
  if (lower.includes("electrónico") || lower.includes("raee") || lower.includes("químico"))
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth={2.5} strokeLinecap="round" />
      </svg>
    );
  if (lower.includes("orgánico"))
    return <LeafIcon className="w-5 h-5" />;
  if (lower.includes("peligroso"))
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    );
  return <RecycleIcon className="w-5 h-5" />;
}

function Navbar({ onLogoClick }: { onLogoClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-[#1d4a2e] shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <button onClick={onLogoClick} className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-white">
            <LeafIcon className="w-4 h-4" />
          </span>
          <span
            className="text-white font-semibold text-lg tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ResidueFinder
          </span>
        </button>
        <span className="text-white/50 text-xs font-medium hidden sm:block">
          Guía de clasificación de residuos
        </span>
      </div>
    </header>
  );
}

function SearchBar({
  value,
  onChange,
  onSubmit,
  compact = false,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!compact) inputRef.current?.focus();
  }, [compact]);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(value); }}
      className={compact ? "w-full" : "w-full max-w-xl mx-auto"}
    >
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5e4a] pointer-events-none">
          <SearchIcon className="w-5 h-5" />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit(value)}
          placeholder="Buscar residuo (ej. jeringa, pila, cartón...)"
          className={`w-full pl-12 pr-10 bg-white border border-[#d1ddd1] rounded-xl text-[#1a2419] placeholder-[#9aad9a] focus:outline-none focus:ring-2 focus:ring-[#1d4a2e]/30 focus:border-[#1d4a2e] transition-all ${
            compact ? "h-11 text-sm" : "h-14 text-base shadow-md"
          }`}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aad9a] hover:text-[#4a5e4a] transition-colors p-1"
          >
            <XIcon />
          </button>
        )}
      </div>
    </form>
  );
}

function CategoryChip({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) {
  const colorMap: Record<string, string> = {
    danger: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100",
    caution: "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100",
    safe: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-medium transition-all hover:scale-105 active:scale-95 ${colorMap[color] || colorMap.safe}`}
    >
      <span className="opacity-70">
        <CategoryIcon category={label} />
      </span>
      <span>{label}</span>
    </button>
  );
}

function ResidueCardImage({ residue }: { residue: Residue }) {
  const src = UNSPLASH_IMAGES[residue.id];
  return (
    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#e8f0ea] border border-[#d1ddd1] shrink-0 flex items-center justify-center">
      {src ? (
        <img src={src} alt={residue.name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-[#9aad9a]">
          <ImagePlaceholderIcon className="w-6 h-6" />
        </span>
      )}
    </div>
  );
}

function ResidueCard({ residue, onClick }: { residue: Residue; onClick: () => void }) {
  const risk = riskConfig(residue.riskLevel);
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-[#d1ddd1] rounded-2xl p-4 hover:border-[#1d4a2e]/40 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-3">
        <ResidueCardImage residue={residue} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold text-[#1a2419] text-base group-hover:text-[#1d4a2e] transition-colors">
              {residue.name}
            </h3>
            <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${risk.badge}`}>
              <RiskDot level={residue.riskLevel} />
              {residue.riskLabel}
            </span>
          </div>
          <p className="text-sm text-[#4a5e4a] line-clamp-2">{residue.description}</p>
          <span className="text-xs text-[#9aad9a] mt-1 block">{residue.category}</span>
        </div>
      </div>
    </button>
  );
}

function HomeScreen({
  onSearch,
  onSelectResidue,
}: {
  onSearch: (q: string) => void;
  onSelectResidue: (r: Residue) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Residue[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback((q: string) => {
    setResults(searchResidues(q));
    setSearched(true);
    onSearch(q);
  }, [onSearch]);

  const handleChange = useCallback((v: string) => {
    setQuery(v);
    if (v.length >= 2) {
      setResults(searchResidues(v));
      setSearched(true);
    } else {
      setResults([]);
      setSearched(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setSearched(false);
    setResults([]);
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#1d4a2e]/8 text-[#1d4a2e] text-xs font-medium px-3 py-1.5 rounded-full mb-5">
          <LeafIcon className="w-3.5 h-3.5" />
          Guía de clasificación y manejo responsable
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold text-[#1a2419] mb-4 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ¿Qué hago con este{" "}
          <span className="text-[#1d4a2e] italic">residuo?</span>
        </h1>
        <p className="text-[#4a5e4a] text-lg mb-8 max-w-md mx-auto leading-relaxed">
          Busca cualquier tipo de desecho y obtén instrucciones claras para
          manejarlo de forma segura y responsable.
        </p>
        <SearchBar value={query} onChange={handleChange} onSubmit={handleSearch} />
      </div>

      {/* Search results */}
      {searched && query.length >= 2 && (
        <div className="mb-10">
          {results.length > 0 ? (
            <>
              <p className="text-sm text-[#4a5e4a] mb-4">
                {results.length} resultado{results.length !== 1 ? "s" : ""} para{" "}
                <span className="font-semibold text-[#1a2419]">&ldquo;{query}&rdquo;</span>
              </p>
              <div className="grid gap-3">
                {results.map((r) => (
                  <ResidueCard key={r.id} residue={r} onClick={() => onSelectResidue(r)} />
                ))}
              </div>
            </>
          ) : (
            <EmptyState query={query} onClear={clearSearch} />
          )}
        </div>
      )}

      {/* Quick categories */}
      {(!searched || query.length < 2) && (
        <>
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-[#4a5e4a] uppercase tracking-widest mb-3">
              Categorías rápidas
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <CategoryChip
                  key={cat.label}
                  label={cat.label}
                  color={cat.color}
                  onClick={() => handleChange(cat.label)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-[#4a5e4a] uppercase tracking-widest mb-4">
              Residuos frecuentes
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {residues.slice(0, 4).map((r) => (
                <ResidueCard key={r.id} residue={r} onClick={() => onSelectResidue(r)} />
              ))}
            </div>
          </div>

          {/* Risk legend */}
          <div className="mt-12 border-t border-[#d1ddd1] pt-8">
            <h2 className="text-xs font-semibold text-[#4a5e4a] uppercase tracking-widest mb-4">
              Sistema de clasificación
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  level: "danger" as RiskLevel,
                  label: "Peligroso",
                  desc: "Requiere manejo especializado y equipo de protección personal",
                  cls: "bg-red-50 border-red-200",
                },
                {
                  level: "caution" as RiskLevel,
                  label: "Precaución",
                  desc: "Manejo cuidadoso; puede ser tóxico o contaminante",
                  cls: "bg-amber-50 border-amber-200",
                },
                {
                  level: "safe" as RiskLevel,
                  label: "Reciclable / Seguro",
                  desc: "Puede reciclarse o compostarse con bajo riesgo",
                  cls: "bg-green-50 border-green-200",
                },
              ].map((item) => (
                <div key={item.label} className={`rounded-xl border p-4 ${item.cls}`}>
                  <div className="mb-3">
                    <RiskDot level={item.level} />
                  </div>
                  <div className="font-semibold text-[#1a2419] text-sm mb-1">{item.label}</div>
                  <div className="text-xs text-[#4a5e4a] leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

function EmptyState({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-16 h-16 rounded-2xl bg-[#e8f0ea] border border-[#d1ddd1] flex items-center justify-center mx-auto mb-5 text-[#9aad9a]">
        <SearchIcon className="w-7 h-7" />
      </div>
      <h3
        className="text-xl font-semibold text-[#1a2419] mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        No encontramos &ldquo;{query}&rdquo;
      </h3>
      <p className="text-[#4a5e4a] mb-6 max-w-sm mx-auto leading-relaxed">
        Verifica la ortografía o intenta con el nombre genérico del residuo.
        También puedes explorar por categoría.
      </p>
      <button
        onClick={onClear}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1d4a2e] hover:underline"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Ver categorías
      </button>
    </div>
  );
}

function DetailScreen({ residue, onBack }: { residue: Residue; onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const risk = riskConfig(residue.riskLevel);
  const imgSrc =
    UNSPLASH_IMAGES[residue.id] ||
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=320&fit=crop&auto=format";

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top bar */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-[#4a5e4a] hover:text-[#1d4a2e] transition-colors font-medium shrink-0"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Volver
        </button>
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={(q) => {
              if (q.trim()) {
                const found = searchResidues(q);
                if (found.length > 0) onBack();
              }
            }}
            compact
          />
        </div>
      </div>

      {/* Header card */}
      <div className={`rounded-2xl border p-6 mb-6 ${risk.bg} ${risk.border}`}>
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Image — prominent space */}
          <div className="shrink-0">
            <div className="w-full sm:w-56 h-48 rounded-xl overflow-hidden bg-[#e8f0ea] border border-[#d1ddd1]">
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={residue.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#9aad9a] gap-2">
                  <ImagePlaceholderIcon className="w-10 h-10" />
                  <span className="text-xs">Imagen del residuo</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${risk.badge}`}>
                <RiskDot level={residue.riskLevel} />
                {residue.riskLabel}
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold text-[#1a2419] leading-none mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {residue.name}
            </h1>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-[#1d4a2e]/10 text-[#1d4a2e] mb-4">
              <CategoryIcon category={residue.category} />
              {residue.category}
            </span>
            <p className="text-[#4a5e4a] text-sm leading-relaxed">{residue.description}</p>
          </div>
        </div>
      </div>

      {/* Info sections */}
      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <InfoSection
          icon={<ShieldIcon />}
          title="Manejo del residuo"
          content={residue.handling}
          accentClass="bg-[#1d4a2e]/5 border-[#1d4a2e]/15"
        />
        <InfoSection
          icon={<RecycleIcon />}
          title="Cómo reciclarlo"
          content={residue.recycling}
          accentClass="bg-blue-50 border-blue-100"
        />
      </div>

      {/* Equipment */}
      <div className="bg-white border border-[#d1ddd1] rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#1d4a2e]">
            <ToolboxIcon />
          </span>
          <h2 className="font-semibold text-[#1a2419]">Equipo necesario al manejar</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {residue.equipment.map((eq) => (
            <div
              key={eq.label}
              className="flex items-center gap-2 bg-[#f4f7f2] border border-[#d1ddd1] rounded-xl px-3.5 py-2.5 text-sm"
            >
              {/* Icon placeholder — 24×24 square */}
              <div className="w-6 h-6 rounded bg-[#e8f0ea] border border-[#d1ddd1] flex items-center justify-center text-[#9aad9a] shrink-0">
                <ImagePlaceholderIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[#1a2419] font-medium">{eq.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {residue.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-[#1d4a2e]/8 text-[#1d4a2e] px-2.5 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </main>
  );
}

function InfoSection({
  icon,
  title,
  content,
  accentClass,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  accentClass: string;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${accentClass}`}>
      <div className="flex items-center gap-2 mb-3 text-[#1d4a2e]">
        {icon}
        <h2 className="font-semibold text-[#1a2419]">{title}</h2>
      </div>
      <p className="text-[#4a5e4a] text-sm leading-relaxed">{content}</p>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<"home" | "detail">("home");
  const [selectedResidue, setSelectedResidue] = useState<Residue | null>(null);

  const handleSelectResidue = useCallback((r: Residue) => {
    setSelectedResidue(r);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = useCallback(() => {
    setView("home");
    setSelectedResidue(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f7f2]">
      <Navbar onLogoClick={handleBack} />
      {view === "home" ? (
        <HomeScreen onSearch={() => {}} onSelectResidue={handleSelectResidue} />
      ) : selectedResidue ? (
        <DetailScreen residue={selectedResidue} onBack={handleBack} />
      ) : null}
    </div>
  );
}
