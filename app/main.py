from .file_reader import read_txt, read_docx_bytes
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from .analyzer import analyze_novel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():

    return {
        "message": "AI小说分析器启动成功"
    }

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    filename = file.filename

    if filename.endswith(".txt"):
        text = read_txt(content)
    elif filename.endswith(".docx"):
        # 🌟 核心改动：不再写入本地，直接在内存中读
        text = read_docx_bytes(content)
    else:
        return {"error": "暂不支持该文件类型"}

    result = analyze_novel(text)
    return {"analysis": result}