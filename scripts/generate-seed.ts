// Genera db/init/02_seed.sql a partir de src/data/residues.ts.
// Uso: node scripts/generate-seed.ts
import { writeFileSync } from "node:fs";
import { residues, categories, residueImages } from "../src/data/residues.ts";

// Cantidad de residuos marcados como "frecuentes" en la portada.
const FEATURED_COUNT = 4;

const q = (v: string | number | boolean | null) =>
  v === null
    ? "NULL"
    : typeof v === "boolean"
    ? (v ? "TRUE" : "FALSE")
    : typeof v === "number"
    ? String(v)
    : "'" + v.replace(/\\/g, "\\\\").replace(/'/g, "''") + "'";

const rows = (values: (string | number | boolean | null)[][]) =>
  values.map((r) => `  (${r.map(q).join(", ")})`).join(",\n");

const out: string[] = [
  "-- Archivo generado por scripts/generate-seed.ts. No editar a mano.",
  "SET NAMES utf8mb4;",
  "",
  "INSERT INTO categories (label, color) VALUES",
  rows(categories.map((c) => [c.label, c.color])) + ";",
  "",
  "INSERT INTO residues (id, name, category, risk_level, risk_label, description, handling, recycling, image_url, position, featured) VALUES",
  rows(
    residues.map((r, i) => [
      r.id,
      r.name,
      r.category,
      r.riskLevel,
      r.riskLabel,
      r.description,
      r.handling,
      r.recycling,
      residueImages[r.id] ?? null,
      i,
      i < FEATURED_COUNT,
    ])
  ) + ";",
  "",
  "INSERT INTO residue_equipment (residue_id, label, position) VALUES",
  rows(
    residues.flatMap((r) => r.equipment.map((e, i) => [r.id, e.label, i]))
  ) + ";",
  "",
  "INSERT INTO residue_tags (residue_id, tag) VALUES",
  rows(
    residues.flatMap((r) => [...new Set(r.tags)].map((t) => [r.id, t]))
  ) + ";",
  "",
];

writeFileSync(new URL("../db/init/02_seed.sql", import.meta.url), out.join("\n"));
console.log(`Seed generado: ${residues.length} residuos, ${categories.length} categorías`);
