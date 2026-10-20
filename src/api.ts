export type RiskLevel = "danger" | "caution" | "safe";

export interface Residue {
  id: string;
  name: string;
  category: string;
  riskLevel: RiskLevel;
  riskLabel: string;
  description: string;
  handling: string;
  recycling: string;
  imageUrl: string | null;
  featured: boolean;
  position: number;
  equipment: { label: string }[];
  tags: string[];
}

export interface Category {
  label: string;
  color: RiskLevel;
}

const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:8000/api").replace(/\/$/, "");

export type ResidueInput = Omit<Residue, "position"> & { position?: number | null };

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: init?.body ? { "Content-Type": "application/json" } : undefined,
    });
  } catch (err) {
    if (init?.signal?.aborted) throw err;
    throw new ApiError(0, "No se pudo conectar con la API, o respondió con un error inesperado. Revisa los logs del servidor.");
  }
  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const body = await res.json();
      if (typeof body.detail === "string") message = body.detail;
      // Errores de validación de FastAPI: [{loc: [...], msg}]
      else if (Array.isArray(body.detail))
        message = body.detail
          .map((d: { loc: string[]; msg: string }) => `${d.loc.slice(1).join(".")}: ${d.msg}`)
          .join("; ");
    } catch {
      // Respuesta sin JSON: se queda el mensaje genérico.
    }
    throw new ApiError(res.status, message);
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}

const get = <T,>(path: string, signal?: AbortSignal) => request<T>(path, { signal });

export function fetchCategories(signal?: AbortSignal) {
  return get<Category[]>("/categories", signal);
}

export function fetchFeaturedResidues(signal?: AbortSignal) {
  return get<Residue[]>("/residues?featured=true", signal);
}

export function searchResidues(query: string, signal?: AbortSignal) {
  const q = query.trim();
  if (!q) return Promise.resolve([] as Residue[]);
  return get<Residue[]>(`/residues?q=${encodeURIComponent(q)}`, signal);
}

export function fetchAllResidues(signal?: AbortSignal) {
  return get<Residue[]>("/residues?limit=500", signal);
}

export function createResidue(data: ResidueInput) {
  return request<Residue>("/residues", { method: "POST", body: JSON.stringify(data) });
}

export function updateResidue(id: string, data: ResidueInput) {
  return request<Residue>(`/residues/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteResidue(id: string) {
  return request<void>(`/residues/${encodeURIComponent(id)}`, { method: "DELETE" });
}
