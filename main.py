from fastapi import FastAPI
from fastapi.templating import Jinja2Templates # 템플릿 엔진(Jinja2) 사용을 위한 임포트
from fastapi.requests import Request # 템플릿 렌더링 시 필요한 HTTP 요청 객체
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="templates"), name="static")

templates = Jinja2Templates(directory="templates")

# 1. index.html (홈 페이지)
# 로컬 호출 경로: http://localhost:8000/
@app.get("/")
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
