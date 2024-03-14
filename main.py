from fastapi import FastAPI, Request, Header, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import Annotated

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

temps = {}
lights = {}


class TemperatureState(BaseModel):
  temp: float


class LightState(BaseModel):
  light: bool


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
  return templates.TemplateResponse("index.html", {"request": request})


@app.get("/api/light", response_model=LightState)
async def get_light_status(api_key: Annotated[str | None, Header()] = None):
  if api_key is None:
    raise HTTPException(status_code=401, detail="API key is required")
  if api_key not in lights:
    raise HTTPException(status_code=404, detail="API key not found")
  return lights[api_key]


@app.put("/api/light")
async def set_light_state(light: LightState,
                          api_key: Annotated[str | None, Header()] = None):
  if api_key is None:
    raise HTTPException(status_code=401, detail="API key is required")

  lights[api_key] = light

  return lights[api_key]


@app.get("/api/temp", response_model=TemperatureState)
async def get_temp_status(api_key: Annotated[str | None, Header()] = None):
  if api_key is None:
    raise HTTPException(status_code=401, detail="API key is required")
  if api_key not in temps:
    raise HTTPException(status_code=404, detail="API key not found")
  return temps[api_key]


@app.put("/api/temp")
async def set_temp_status(temp: TemperatureState,
                          api_key: Annotated[str | None, Header()] = None):
  if api_key is None:
    raise HTTPException(status_code=401, detail="API key is required")

  temps[api_key] = temp

  return {"message": "Temperature state updated"}


if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=10000)
