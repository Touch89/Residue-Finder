SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS categories (
  label VARCHAR(100) NOT NULL PRIMARY KEY,
  color ENUM('danger', 'caution', 'safe') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS residues (
  id VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  risk_level ENUM('danger', 'caution', 'safe') NOT NULL,
  risk_label VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  handling TEXT NOT NULL,
  recycling TEXT NOT NULL,
  image_url VARCHAR(500) NULL,
  position INT NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_residues_category (category),
  INDEX idx_residues_risk_level (risk_level),
  INDEX idx_residues_position (position),
  INDEX idx_residues_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS residue_equipment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  residue_id VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  label VARCHAR(200) NOT NULL,
  position INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_equipment_residue FOREIGN KEY (residue_id)
    REFERENCES residues (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS residue_tags (
  residue_id VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  tag VARCHAR(100) NOT NULL,
  PRIMARY KEY (residue_id, tag),
  INDEX idx_tags_tag (tag),
  CONSTRAINT fk_tags_residue FOREIGN KEY (residue_id)
    REFERENCES residues (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
