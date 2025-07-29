from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List, Optional
import base64
import io
import os
import uuid
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont
import json

app = FastAPI(title="Jewellery Design Generator")

# In-memory storage for designs
designs_storage = []

# Ensure directories exist
os.makedirs("static", exist_ok=True)
os.makedirs("uploads", exist_ok=True)
os.makedirs("models", exist_ok=True)
os.makedirs("previews", exist_ok=True)

class TextGenerationRequest(BaseModel):
    prompt: str
    jewellery_type: str

class ImageGenerationRequest(BaseModel):
    image_data: str
    jewellery_type: str
    prompt: Optional[str] = ""

class Design(BaseModel):
    id: str
    prompt: str
    jewellery_type: str
    created_at: str
    preview_url: str
    model_url: Optional[str] = None
    source_type: str

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/previews", StaticFiles(directory="previews"), name="previews")
app.mount("/models", StaticFiles(directory="models"), name="models")

def create_placeholder_image(prompt: str, jewellery_type: str, width: int = 400, height: int = 400):
    img = Image.new('RGB', (width, height), color='#f0f0f0')
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        color_value = int(240 - (y / height) * 40)
        draw.line([(0, y), (width, y)], fill=(color_value, color_value, 255))
    
    try:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    type_text = f"💎 {jewellery_type.upper()} 💎"
    draw.text((50, 50), type_text, fill='#333', font=font_large)
    
    words = prompt.split()
    lines = []
    current_line = []
    
    for word in words:
        test_line = ' '.join(current_line + [word])
        if len(test_line) <= 30:
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
                current_line = [word]
            else:
                lines.append(word)
    
    if current_line:
        lines.append(' '.join(current_line))
    
    start_y = 150
    for i, line in enumerate(lines):
        draw.text((50, start_y + i * 25), line, fill='#555', font=font_small)
    
    draw.rectangle([10, 10, width-10, height-10], outline='#ddd', width=2)
    
    design_id = str(uuid.uuid4())
    filename = f"preview_{design_id}.png"
    filepath = os.path.join("previews", filename)
    img.save(filepath)
    
    return f"/previews/{filename}", design_id

def create_dummy_3d_model(design_id: str, jewellery_type: str):
    filename = f"model_{design_id}.obj"
    filepath = os.path.join("models", filename)
    
    obj_content = f"""# Dummy {jewellery_type} model
# Generated for design {design_id}

v 0.0 0.0 0.0
v 1.0 0.0 0.0
v 1.0 1.0 0.0
v 0.0 1.0 0.0
v 0.0 0.0 1.0
v 1.0 0.0 1.0
v 1.0 1.0 1.0
v 0.0 1.0 1.0

f 1 2 3 4
f 5 8 7 6
f 1 5 6 2
f 2 6 7 3
f 3 7 8 4
f 5 1 4 8
"""
    
    with open(filepath, 'w') as f:
        f.write(obj_content)
    
    return f"/models/{filename}"

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("static/index.html", "r") as f:
        return HTMLResponse(content=f.read())

@app.post("/api/generate-from-text", response_model=Design)
async def generate_from_text(request: TextGenerationRequest):
    try:
        preview_url, design_id = create_placeholder_image(request.prompt, request.jewellery_type)
        model_url = create_dummy_3d_model(design_id, request.jewellery_type)
        
        design = Design(
            id=design_id,
            prompt=request.prompt,
            jewellery_type=request.jewellery_type,
            created_at=datetime.now().isoformat(),
            preview_url=preview_url,
            model_url=model_url,
            source_type="text"
        )
        
        designs_storage.append(design.model_dump())
        return design
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating design: {str(e)}")

@app.post("/api/generate-from-image", response_model=Design)
async def generate_from_image(request: ImageGenerationRequest):
    try:
        image_data = base64.b64decode(request.image_data.split(',')[1])
        image = Image.open(io.BytesIO(image_data))
        
        design_id = str(uuid.uuid4())
        original_filename = f"original_{design_id}.png"
        original_path = os.path.join("uploads", original_filename)
        image.save(original_path)
        
        preview_image = image.copy()
        preview_image.thumbnail((400, 400), Image.Resampling.LANCZOS)
        
        draw = ImageDraw.Draw(preview_image)
        font = ImageFont.load_default()
        
        overlay_text = f"AI-Generated {request.jewellery_type.title()}"
        draw.text((10, preview_image.height - 30), overlay_text, fill='white', font=font)
        
        preview_filename = f"preview_{design_id}.png"
        preview_path = os.path.join("previews", preview_filename)
        preview_image.save(preview_path)
        
        model_url = create_dummy_3d_model(design_id, request.jewellery_type)
        
        prompt = request.prompt or f"Generated from uploaded image ({request.jewellery_type})"
        design = Design(
            id=design_id,
            prompt=prompt,
            jewellery_type=request.jewellery_type,
            created_at=datetime.now().isoformat(),
            preview_url=f"/previews/{preview_filename}",
            model_url=model_url,
            source_type="image"
        )
        
        designs_storage.append(design.model_dump())
        return design
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.get("/api/designs", response_model=List[Design])
async def get_designs():
    return [Design(**design) for design in designs_storage]

@app.delete("/api/designs/{design_id}")
async def delete_design(design_id: str):
    global designs_storage
    original_length = len(designs_storage)
    designs_storage = [d for d in designs_storage if d['id'] != design_id]
    
    if len(designs_storage) == original_length:
        raise HTTPException(status_code=404, detail="Design not found")
    
    return {"message": "Design deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)