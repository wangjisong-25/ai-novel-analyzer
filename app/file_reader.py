import io
from docx import Document

def read_txt(content):
    return content.decode("utf-8")

def read_docx_bytes(content_bytes):
    # 使用 io.BytesIO 直接在内存中把二进制流变成一个虚拟文件
    doc = Document(io.BytesIO(content_bytes))
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text