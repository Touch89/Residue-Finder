import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createResidue,
  deleteResidue,
  fetchAllResidues,
  updateResidue,
  type Residue,
  type ResidueInput,
  type RiskLevel,
} from "../api";
import { ResidueForm } from "./ResidueForm";

const RISK_BADGE: Record<RiskLevel, string> = {
  danger: "bg-red-100 text-red-800 border border-red-200",
  caution: "bg-amber-100 text-amber-800 border border-amber-200",
  safe: "bg-green-100 text-green-800 border border-green-200",
};

// Comparación sin acentos ni mayúsculas, como la búsqueda de la API.
const normalize = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

type Editing = { residue: Residue | null } | null;

export default function AdminApp() {
  const [residues, setResidues] = useState<Residue[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState<Editing>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setResidues(await fetchAllResidues());
      setLoadError(null);
    } catch {
      setLoadError("No se pudo conectar con la API. Verifica que esté corriendo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "Admin · ResidueFinder";
    load();
  }, [load]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const categories = useMemo(
    () => [...new Set(residues.map((r) => r.category))].sort((a, b) => a.localeCompare(b)),
    [residues]
  );

  const visible = useMemo(() => {
    const q = normalize(filter.trim());
    if (!q) return residues;
    return residues.filter((r) =>
      [r.id, r.name, r.category, r.riskLabel, ...r.tags].some((v) => normalize(v).includes(q))
    );
  }, [residues, filter]);

  const handleSubmit = async (data: ResidueInput) => {
    const isNew = editing?.residue == null;
    const saved = isNew ? await createResidue(data) : await updateResidue(data.id, data);
    setEditing(null);
    setNotice({ kind: "ok", text: `${isNew ? "Creado" : "Actualizado"}: ${saved.name}` });
    await load();
  };

  const handleDelete = async (r: Residue) => {
    setConfirmDelete(null);
    try {
      await deleteResidue(r.id);
      setResidues((list) => list.filter((x) => x.id !== r.id));
      setNotice({ kind: "ok", text: `Eliminado: ${r.name}` });
    } catch (err) {
      setNotice({
        kind: "error",
        text: `No se pudo eliminar ${r.name}: ${err instanceof Error ? err.message : "error"}`,
      });
    }
  };

  const closeForm = useCallback(() => setEditing(null), []);

  return (
    <div className="min-h-screen bg-[#f4f7f2]">
      <header className="sticky top-0 z-40 bg-[#1d4a2e] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="text-white font-semibold text-lg tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ResidueFinder
            </span>
            <span className="text-xs font-medium bg-white/15 text-white px-2 py-0.5 rounded-full">
              Admin
            </span>
          </div>
          <a href="/" className="text-white/70 hover:text-white text-sm font-medium">
            Ver sitio &rarr;
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1
              className="text-3xl font-bold text-[#1a2419]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Residuos
            </h1>
            <p className="text-sm text-[#4a5e4a] mt-1">
              {loading
                ? "Cargando…"
                : filter
                ? `${visible.length} de ${residues.length} residuos`
                : `${residues.length} residuos`}
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filtrar por nombre, id, categoría…"
              className="w-full sm:w-72 bg-white border border-[#d1ddd1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4a2e]/30 focus:border-[#1d4a2e]"
            />
            <button
              onClick={() => setEditing({ residue: null })}
              className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium bg-[#1d4a2e] text-white hover:bg-[#2d6b44]"
            >
              + Nuevo residuo
            </button>
          </div>
        </div>

        {notice && (
          <p
            role="status"
            className={`mb-4 text-sm rounded-lg px-3 py-2 border ${
              notice.kind === "ok"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {notice.text}
          </p>
        )}

        {loadError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center justify-between gap-4">
            {loadError}
            <button onClick={load} className="font-medium underline shrink-0">
              Reintentar
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#d1ddd1] rounded-2xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-[#4a5e4a] border-b border-[#d1ddd1]">
                  <th className="px-4 py-3 font-semibold w-12">#</th>
                  <th className="px-4 py-3 font-semibold">Residuo</th>
                  <th className="px-4 py-3 font-semibold">Categoría</th>
                  <th className="px-4 py-3 font-semibold">Riesgo</th>
                  <th className="px-4 py-3 font-semibold text-center">Frecuente</th>
                  <th className="px-4 py-3 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.id} className="border-b border-[#eef2ee] last:border-0 hover:bg-[#f9fbf8]">
                    <td className="px-4 py-3 text-[#9aad9a] tabular-nums">{r.position}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#e8f0ea] border border-[#d1ddd1] shrink-0">
                          {r.imageUrl && (
                            <img src={r.imageUrl} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-[#1a2419]">{r.name}</div>
                          <div className="text-xs text-[#9aad9a]">{r.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#4a5e4a] whitespace-nowrap">{r.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${RISK_BADGE[r.riskLevel]}`}
                      >
                        {r.riskLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-[#1d4a2e]">{r.featured ? "✓" : ""}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {confirmDelete === r.id ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="text-xs text-red-700">¿Eliminar?</span>
                          <button
                            onClick={() => handleDelete(r)}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-red-600 text-white hover:bg-red-700"
                          >
                            Sí, eliminar
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="px-2.5 py-1 rounded-md text-xs font-medium text-[#4a5e4a] hover:bg-[#e8f0ea]"
                          >
                            No
                          </button>
                        </span>
                      ) : (
                        <span className="inline-flex gap-1">
                          <button
                            onClick={() => setEditing({ residue: r })}
                            className="px-2.5 py-1 rounded-md text-xs font-medium text-[#1d4a2e] hover:bg-[#e8f0ea]"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => setConfirmDelete(r.id)}
                            className="px-2.5 py-1 rounded-md text-xs font-medium text-red-700 hover:bg-red-50"
                          >
                            Eliminar
                          </button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {!loading && visible.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-[#4a5e4a]">
                      {filter ? `Ningún residuo coincide con “${filter}”.` : "No hay residuos todavía."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {editing && (
        <ResidueForm
          residue={editing.residue}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}
