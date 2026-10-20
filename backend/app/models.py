from datetime import datetime

from sqlalchemy import Boolean, Enum, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base

RISK_LEVELS = ("danger", "caution", "safe")


class Category(Base):
    __tablename__ = "categories"

    label: Mapped[str] = mapped_column(String(100), primary_key=True)
    color: Mapped[str] = mapped_column(Enum(*RISK_LEVELS, name="risk_level"))


class Residue(Base):
    __tablename__ = "residues"

    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    category: Mapped[str] = mapped_column(String(100), index=True)
    risk_level: Mapped[str] = mapped_column(Enum(*RISK_LEVELS, name="risk_level"))
    risk_label: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text)
    handling: Mapped[str] = mapped_column(Text)
    recycling: Mapped[str] = mapped_column(Text)
    image_url: Mapped[str | None] = mapped_column(String(500))
    position: Mapped[int] = mapped_column(default=0, index=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), onupdate=func.now()
    )

    equipment: Mapped[list["ResidueEquipment"]] = relationship(
        order_by="ResidueEquipment.position",
        cascade="all, delete-orphan",
        lazy="selectin",
    )
    tag_rows: Mapped[list["ResidueTag"]] = relationship(
        cascade="all, delete-orphan", lazy="selectin"
    )

    @property
    def tags(self) -> list[str]:
        return [t.tag for t in self.tag_rows]


class ResidueEquipment(Base):
    __tablename__ = "residue_equipment"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    residue_id: Mapped[str] = mapped_column(
        ForeignKey("residues.id", ondelete="CASCADE")
    )
    label: Mapped[str] = mapped_column(String(200))
    position: Mapped[int] = mapped_column(default=0)


class ResidueTag(Base):
    __tablename__ = "residue_tags"

    residue_id: Mapped[str] = mapped_column(
        ForeignKey("residues.id", ondelete="CASCADE"), primary_key=True
    )
    tag: Mapped[str] = mapped_column(String(100), primary_key=True)
