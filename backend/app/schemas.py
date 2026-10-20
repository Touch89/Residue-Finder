from typing import Literal

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel

RiskLevel = Literal["danger", "caution", "safe"]


class CamelModel(BaseModel):
    # La API expone camelCase para coincidir con la interfaz Residue del frontend.
    model_config = ConfigDict(
        alias_generator=to_camel, populate_by_name=True, from_attributes=True
    )


class Equipment(CamelModel):
    label: str = Field(min_length=1, max_length=200)


class ResidueBase(CamelModel):
    name: str = Field(min_length=1, max_length=200)
    category: str = Field(min_length=1, max_length=100)
    risk_level: RiskLevel
    risk_label: str = Field(min_length=1, max_length=200)
    description: str
    handling: str
    recycling: str
    image_url: str | None = Field(None, max_length=500)
    featured: bool = False
    equipment: list[Equipment] = []
    tags: list[str] = []


class ResidueCreate(ResidueBase):
    id: str = Field(min_length=1, max_length=100)
    # Si no se indica, el residuo se añade al final.
    position: int | None = Field(None, ge=0)


class ResidueUpdate(ResidueBase):
    position: int | None = Field(None, ge=0)


class ResidueOut(ResidueBase):
    id: str
    position: int


class CategoryOut(CamelModel):
    label: str
    color: RiskLevel
