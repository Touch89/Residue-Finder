import { useEffect, useState } from "react";
import type { Residue, ResidueInput, RiskLevel } from "../api";

const RISK_OPTIONS: { value: RiskLevel; label: string }[] = [
  { value: "danger", label: "Peligroso" },
  { value: "caution", label: "Precaución" },
  { value: "safe", label: "Seguro / Reciclable" },
];

interface FormState {
  id: string;
  name: string;
  category: string;
  riskLevel: RiskLevel;
  riskLabel: string;
  description: string;
  handling: string;
  recycling: string;
  imageUrl: string;
  featured: boolean;
  position: string;
  equipment: string[];
  tags: string;
}

function toFormState(r: Residue | null): FormState {
  return {
    id: r?.id ?? "",
    name: r?.name ?? "",
    category: r?.category ?? "",
    riskLevel: r?.riskLevel ?? "safe",
    riskLabel: r?.riskLabel ?? "",
    description: r?.description ?? "",
    handling: r?.handling ?? "",
    recycling: r?.recycling ?? "",
    imageUrl: r?.imageUrl ?? "",
    featured: r?.featured ?? false,
    position: r ? String(r.position) : "",
    equipment: r?.equipment.map((e) => e.label) ?? [""],
    tags: r?.tags.join(", ") ?? "",
  };
}

// Mismo formato que los ids existentes: minúsculas y guiones, conservando acentos.
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

const inputCls =
  "w-full bg-white border border-[#d1ddd1] rounded-lg px-3 py-2 text-sm text-[#1a2419] placeholder-[#9aad9a] focus:outline-none focus:ring-2 focus:ring-[#1d4a2e]/30 focus:border-[#1d4a2e]";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#4a5e4a] uppercase tracking-wide mb-1.5">
        {label}
      </span>
      {children}
      {hint && <span className="block text-xs text-[#9aad9a] mt-1">{hint}</span>}
    </label>
  );
}

export function ResidueForm({
  residue,
  categories,
  onSubmit,
  onCancel,
}: {
  residue: Residue | null;
  categories: string[];
  onSubmit: (data: ResidueInput) => Promise<void>;
  onCancel: () => void;
}) {
  const isNew = residue === null;
  const [form, setForm] = useState<FormState>(() => toFormState(residue));
  const [idTouched, setIdTouched] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !saving && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel, saving]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setName = (name: string) =>
    setForm((f) => ({ ...f, name, id: idTouched ? f.id : slugify(name) }));

  const setEquipment = (i: number, value: string) =>
    set("equipment", form.equipment.map((e, j) => (j === i ? value : e)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit({
        id: form.id.trim(),
        name: form.name.trim(),
        category: form.category.trim(),
        riskLevel: form.riskLevel,
        riskLabel: form.riskLabel.trim(),
        description: form.description.trim(),
        handling: form.handling.trim(),
        recycling: form.recycling.trim(),
        imageUrl: form.imageUrl.trim() || null,
        featured: form.featured,
        position: form.position.trim() === "" ? null : Number(form.position),
        equipment: form.equipment
          .map((label) => label.trim())
          .filter(Boolean)
          .map((label) => ({ label })),
        tags: [
          ...new Set(
            form.tags
              .split(",")
              .map((t) => t.trim().toLowerCase())
              .filter(Boolean)
          ),
        ],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      onMouseDown={(e) => e.target === e.currentTarget && !saving && onCancel()}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-[#f4f7f2] rounded-2xl shadow-xl border border-[#d1ddd1]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d1ddd1]">
          <h2
            className="text-xl font-semibold text-[#1a2419]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isNew ? "Nuevo residuo" : `Editar: ${residue.name}`}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="text-[#9aad9a] hover:text-[#4a5e4a] text-2xl leading-none px-2"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        <div className="p-6 grid gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nombre">
              <input
                required
                maxLength={200}
                className={inputCls}
                value={form.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Lata de aluminio"
                autoFocus
              />
            </Field>
            <Field
              label="ID"
              hint={isNew ? "Se genera a partir del nombre. No se puede cambiar después." : "El id no se puede cambiar."}
            >
              <input
                required
                maxLength={100}
                pattern="[^/?#\s]+"
                title="Sin espacios ni los caracteres / ? #"
                className={`${inputCls} ${isNew ? "" : "bg-[#e8f0ea] text-[#4a5e4a]"}`}
                value={form.id}
                readOnly={!isNew}
                onChange={(e) => {
                  setIdTouched(true);
                  set("id", e.target.value);
                }}
                placeholder="lata-de-aluminio"
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Categoría">
              <input
                required
                maxLength={100}
                className={inputCls}
                list="admin-categories"
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="Ej. Reciclable"
              />
              <datalist id="admin-categories">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
            <Field label="Nivel de riesgo">
              <select
                className={inputCls}
                value={form.riskLevel}
                onChange={(e) => set("riskLevel", e.target.value as RiskLevel)}
              >
                {RISK_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Etiqueta de riesgo">
              <input
                required
                maxLength={200}
                className={inputCls}
                value={form.riskLabel}
                onChange={(e) => set("riskLabel", e.target.value)}
                placeholder="Ej. Reciclable"
              />
            </Field>
          </div>

          <Field label="Descripción">
            <textarea
              required
              rows={3}
              className={inputCls}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Manejo del residuo">
              <textarea
                required
                rows={4}
                className={inputCls}
                value={form.handling}
                onChange={(e) => set("handling", e.target.value)}
              />
            </Field>
            <Field label="Cómo reciclarlo">
              <textarea
                required
                rows={4}
                className={inputCls}
                value={form.recycling}
                onChange={(e) => set("recycling", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-start">
            <Field label="URL de la imagen" hint="Opcional.">
              <input
                type="url"
                maxLength={500}
                className={inputCls}
                value={form.imageUrl}
                onChange={(e) => set("imageUrl", e.target.value)}
                placeholder="https://..."
              />
            </Field>
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#e8f0ea] border border-[#d1ddd1] flex items-center justify-center text-xs text-[#9aad9a]">
              {form.imageUrl ? (
                <img src={form.imageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                "Sin imagen"
              )}
            </div>
          </div>

          <div>
            <span className="block text-xs font-semibold text-[#4a5e4a] uppercase tracking-wide mb-1.5">
              Equipo necesario
            </span>
            <div className="grid gap-2">
              {form.equipment.map((label, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className={inputCls}
                    maxLength={200}
                    value={label}
                    onChange={(e) => setEquipment(i, e.target.value)}
                    placeholder="Ej. Guantes de nitrilo"
                    aria-label={`Equipo ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => set("equipment", form.equipment.filter((_, j) => j !== i))}
                    className="shrink-0 px-3 rounded-lg border border-[#d1ddd1] text-[#4a5e4a] hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-sm"
                    aria-label={`Quitar equipo ${i + 1}`}
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => set("equipment", [...form.equipment, ""])}
              className="mt-2 text-sm font-medium text-[#1d4a2e] hover:underline"
            >
              + Añadir equipo
            </button>
          </div>

          <Field label="Etiquetas" hint="Separadas por comas. Se usan en la búsqueda.">
            <input
              className={inputCls}
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="aluminio, lata, metal"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <Field label="Posición" hint={isNew ? "Vacío = al final de la lista." : "Orden en listados y búsquedas."}>
              <input
                type="number"
                min={0}
                className={inputCls}
                value={form.position}
                onChange={(e) => set("position", e.target.value)}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm text-[#1a2419] pb-2">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#1d4a2e]"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
              />
              Mostrar en &ldquo;Residuos frecuentes&rdquo;
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#d1ddd1]">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 rounded-lg text-sm font-medium text-[#4a5e4a] hover:bg-[#e8f0ea]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[#1d4a2e] text-white hover:bg-[#2d6b44] disabled:opacity-60"
          >
            {saving ? "Guardando…" : isNew ? "Crear residuo" : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
