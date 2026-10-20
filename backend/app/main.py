from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError

from .config import settings
from .database import engine
from .routers import residues

app = FastAPI(title="Residue Finder API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.cors_origins.split(",") if o.strip()],
    allow_origin_regex=settings.cors_origin_regex or None,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(residues.router, prefix="/api")


# Sin este handler el error llega como 500 sin cabeceras CORS y el navegador
# solo muestra "Failed to fetch".
@app.exception_handler(IntegrityError)
def integrity_error(_: Request, exc: IntegrityError):
    return JSONResponse(
        status_code=status.HTTP_409_CONFLICT,
        content={"detail": f"Conflicto con datos existentes: {exc.orig}"},
    )


@app.get("/health", tags=["health"])
def health():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"status": "ok"}
