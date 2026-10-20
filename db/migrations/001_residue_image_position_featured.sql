-- Migración 001: añade image_url, position y featured a residues.
-- Solo para BDD creadas antes de este cambio; las nuevas ya las traen en db/init.
SET NAMES utf8mb4;

ALTER TABLE residues
  ADD COLUMN image_url VARCHAR(500) NULL AFTER recycling,
  ADD COLUMN position INT NOT NULL DEFAULT 0 AFTER image_url,
  ADD COLUMN featured BOOLEAN NOT NULL DEFAULT FALSE AFTER position,
  ADD INDEX idx_residues_position (position),
  ADD INDEX idx_residues_featured (featured);

UPDATE residues SET position = 0, featured = TRUE, image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=320&fit=crop&auto=format' WHERE id = 'jeringa';
UPDATE residues SET position = 1, featured = TRUE, image_url = 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400&h=320&fit=crop&auto=format' WHERE id = 'pila';
UPDATE residues SET position = 2, featured = TRUE, image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=320&fit=crop&auto=format' WHERE id = 'cartón';
UPDATE residues SET position = 3, featured = TRUE, image_url = 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=320&fit=crop&auto=format' WHERE id = 'residuo-orgánico';
UPDATE residues SET position = 4, featured = FALSE, image_url = 'https://images.unsplash.com/photo-1558618047-f0a193bf8e77?w=400&h=320&fit=crop&auto=format' WHERE id = 'celular';
UPDATE residues SET position = 5, featured = FALSE, image_url = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=320&fit=crop&auto=format' WHERE id = 'aceite-motor';
UPDATE residues SET position = 6, featured = FALSE, image_url = 'https://images.unsplash.com/photo-1590246814883-56951e52dbe4?w=400&h=320&fit=crop&auto=format' WHERE id = 'vidrio';
UPDATE residues SET position = 7, featured = FALSE, image_url = 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=320&fit=crop&auto=format' WHERE id = 'mascarilla';
UPDATE residues SET position = 8, featured = FALSE WHERE id = 'aguja-sutura';
UPDATE residues SET position = 9, featured = FALSE WHERE id = 'bisturi';
UPDATE residues SET position = 10, featured = FALSE WHERE id = 'lanceta';
UPDATE residues SET position = 11, featured = FALSE WHERE id = 'cateter';
UPDATE residues SET position = 12, featured = FALSE WHERE id = 'navaja-afeitar';
UPDATE residues SET position = 13, featured = FALSE WHERE id = 'clavo-oxidado';
UPDATE residues SET position = 14, featured = FALSE WHERE id = 'vidrio-roto';
UPDATE residues SET position = 15, featured = FALSE WHERE id = 'aguja-tatuaje';
UPDATE residues SET position = 16, featured = FALSE WHERE id = 'cuchilla-cutter';
UPDATE residues SET position = 17, featured = FALSE WHERE id = 'laptop';
UPDATE residues SET position = 18, featured = FALSE WHERE id = 'cargador';
UPDATE residues SET position = 19, featured = FALSE WHERE id = 'televisor';
UPDATE residues SET position = 20, featured = FALSE WHERE id = 'impresora';
UPDATE residues SET position = 21, featured = FALSE WHERE id = 'control-remoto';
UPDATE residues SET position = 22, featured = FALSE WHERE id = 'audifonos';
UPDATE residues SET position = 23, featured = FALSE WHERE id = 'tablet';
UPDATE residues SET position = 24, featured = FALSE WHERE id = 'disco-duro';
UPDATE residues SET position = 25, featured = FALSE WHERE id = 'cascara-fruta';
UPDATE residues SET position = 26, featured = FALSE WHERE id = 'cafe-molido';
UPDATE residues SET position = 27, featured = FALSE WHERE id = 'hojas-secas';
UPDATE residues SET position = 28, featured = FALSE WHERE id = 'restos-poda';
UPDATE residues SET position = 29, featured = FALSE WHERE id = 'cascara-huevo';
UPDATE residues SET position = 30, featured = FALSE WHERE id = 'pan-duro';
UPDATE residues SET position = 31, featured = FALSE WHERE id = 'posos-te';
UPDATE residues SET position = 32, featured = FALSE WHERE id = 'restos-verduras';
UPDATE residues SET position = 33, featured = FALSE WHERE id = 'flores-marchitas';
UPDATE residues SET position = 34, featured = FALSE WHERE id = 'pintura-solventes';
UPDATE residues SET position = 35, featured = FALSE WHERE id = 'pesticida';
UPDATE residues SET position = 36, featured = FALSE WHERE id = 'medicamento-vencido';
UPDATE residues SET position = 37, featured = FALSE WHERE id = 'bateria-auto';
UPDATE residues SET position = 38, featured = FALSE WHERE id = 'aerosol';
UPDATE residues SET position = 39, featured = FALSE WHERE id = 'termometro-mercurio';
UPDATE residues SET position = 40, featured = FALSE WHERE id = 'limpiador-toxico';
UPDATE residues SET position = 41, featured = FALSE WHERE id = 'gasolina';
UPDATE residues SET position = 42, featured = FALSE WHERE id = 'asbesto';
UPDATE residues SET position = 43, featured = FALSE WHERE id = 'papel';
UPDATE residues SET position = 44, featured = FALSE WHERE id = 'botella-pet';
UPDATE residues SET position = 45, featured = FALSE WHERE id = 'lata-aluminio';
UPDATE residues SET position = 46, featured = FALSE WHERE id = 'lata-hojalata';
UPDATE residues SET position = 47, featured = FALSE WHERE id = 'periodico';
UPDATE residues SET position = 48, featured = FALSE WHERE id = 'revista';
UPDATE residues SET position = 49, featured = FALSE WHERE id = 'tetra-pak';
UPDATE residues SET position = 50, featured = FALSE WHERE id = 'chatarra-metalica';
UPDATE residues SET position = 51, featured = FALSE WHERE id = 'guantes-desechables';
UPDATE residues SET position = 52, featured = FALSE WHERE id = 'pañal';
UPDATE residues SET position = 53, featured = FALSE WHERE id = 'toalla-sanitaria';
UPDATE residues SET position = 54, featured = FALSE WHERE id = 'papel-higienico-usado';
UPDATE residues SET position = 55, featured = FALSE WHERE id = 'algodon-usado';
UPDATE residues SET position = 56, featured = FALSE WHERE id = 'venda';
UPDATE residues SET position = 57, featured = FALSE WHERE id = 'hisopo';
UPDATE residues SET position = 58, featured = FALSE WHERE id = 'protector-bucal';
UPDATE residues SET position = 59, featured = FALSE WHERE id = 'toallita-humeda';
