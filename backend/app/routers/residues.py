import unicodedata

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Category, Residue, ResidueEquipment, ResidueTag
from ..schemas import CategoryOut, ResidueBase, ResidueCreate, ResidueOut, ResidueUpdate, RiskLevel

router = APIRouter()


def _get_or_404(db: Session, residue_id: str) -> Residue:
    residue = db.get(Residue, residue_id)
    if residue is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Residuo no encontrado")
    return residue


def _tag_key(tag: str) -> str:
    # Igual que la collation de MySQL (utf8mb4_0900_ai_ci): sin mayúsculas ni acentos.
    decomposed = unicodedata.normalize("NFD", tag.strip())
    return "".join(c for c in decomposed if not unicodedata.combining(c)).casefold()


def _unique_tags(tags: list[str]) -> list[str]:
    seen: dict[str, str] = {}
    for tag in tags:
        if tag.strip() and _tag_key(tag) not in seen:
            seen[_tag_key(tag)] = tag.strip()
    return list(seen.values())


def _apply(db: Session, residue: Residue, data: ResidueBase) -> None:
    for field in (
        "name", "category", "risk_level", "risk_label",
        "description", "handling", "recycling", "image_url", "featured",
    ):
        setattr(residue, field, getattr(data, field))
    residue.equipment = [
        ResidueEquipment(label=e.label, position=i) for i, e in enumerate(data.equipment)
    ]
    # Borrar las etiquetas viejas antes de insertar las nuevas: si no, "RAEE" -> "raee"
    # choca con la clave primaria porque la collation no distingue mayúsculas.
    residue.tag_rows.clear()
    db.flush()
    residue.tag_rows = [ResidueTag(tag=t) for t in _unique_tags(data.tags)]


@router.get("/categories", response_model=list[CategoryOut], tags=["categories"])
def list_categories(db: Session = Depends(get_db)):
    return db.scalars(select(Category).order_by(Category.label)).all()


@router.get("/residues", response_model=list[ResidueOut], tags=["residues"])
def list_residues(
    q: str | None = Query(None, description="Busca en nombre, categoría, descripción y etiquetas"),
    category: str | None = None,
    risk_level: RiskLevel | None = Query(None, alias="riskLevel"),
    featured: bool | None = None,
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    stmt = select(Residue).order_by(Residue.position, Residue.name)
    if q and q.strip():
        like = f"%{q.strip()}%"
        tag_match = select(ResidueTag.residue_id).where(ResidueTag.tag.like(like))
        stmt = stmt.where(
            or_(
                Residue.name.like(like),
                Residue.category.like(like),
                Residue.description.like(like),
                Residue.id.in_(tag_match),
            )
        )
    if category:
        stmt = stmt.where(Residue.category == category)
    if risk_level:
        stmt = stmt.where(Residue.risk_level == risk_level)
    if featured is not None:
        stmt = stmt.where(Residue.featured == featured)
    return db.scalars(stmt.limit(limit).offset(offset)).all()


@router.get("/residues/{residue_id}", response_model=ResidueOut, tags=["residues"])
def get_residue(residue_id: str, db: Session = Depends(get_db)):
    return _get_or_404(db, residue_id)


@router.post("/residues", response_model=ResidueOut, status_code=status.HTTP_201_CREATED, tags=["residues"])
def create_residue(data: ResidueCreate, db: Session = Depends(get_db)):
    if db.get(Residue, data.id) is not None:
        raise HTTPException(status.HTTP_409_CONFLICT, "Ya existe un residuo con ese id")
    position = data.position
    if position is None:
        position = (db.scalar(select(func.max(Residue.position))) or 0) + 1
    residue = Residue(id=data.id, position=position)
    _apply(db, residue, data)
    db.add(residue)
    db.commit()
    db.refresh(residue)
    return residue


@router.put("/residues/{residue_id}", response_model=ResidueOut, tags=["residues"])
def update_residue(residue_id: str, data: ResidueUpdate, db: Session = Depends(get_db)):
    residue = _get_or_404(db, residue_id)
    _apply(db, residue, data)
    if data.position is not None:
        residue.position = data.position
    db.commit()
    db.refresh(residue)
    return residue


@router.delete("/residues/{residue_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["residues"])
def delete_residue(residue_id: str, db: Session = Depends(get_db)):
    db.delete(_get_or_404(db, residue_id))
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
