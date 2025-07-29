from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from pydantic import BaseModel
from typing import List, Optional
import base64
import io
import os
import uuid
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont
import json

app = FastAPI(title="Jewellery Design Generator", description="Generate bespoke jewellery designs from text or images")

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
    image_data: str  # base64 encoded image
    jewellery_type: str
    prompt: Optional[str] = ""

class Design(BaseModel):
    id: str
    prompt: str
    jewellery_type: str
    created_at: str
    preview_url: str
    model_url: Optional[str] = None
    source_type: str  # "text" or "image"

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/previews", StaticFiles(directory="previews"), name="previews")
app.mount("/models", StaticFiles(directory="models"), name="models")

def create_placeholder_image(prompt: str, jewellery_type: str, width: int = 400, height: int = 400) -> str:
    """Create a placeholder image with the prompt text centered"""
    # Create a new image with a gradient background
    img = Image.new('RGB', (width, height), color='#f0f0f0')
    draw = ImageDraw.Draw(img)
    
    # Add gradient effect
    for y in range(height):
        color_value = int(240 - (y / height) * 40)
        draw.line([(0, y), (width, y)], fill=(color_value, color_value, 255))
    
    # Try to load a font, fallback to default if not available
    try:
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 16)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Add jewellery type at the top
    type_text = f"💎 {jewellery_type.upper()} 💎"
    type_bbox = draw.textbbox((0, 0), type_text, font=font_large)
    type_width = type_bbox[2] - type_bbox[0]
    draw.text(((width - type_width) // 2, 50), type_text, fill='#333', font=font_large)
    
    # Add prompt text in the center, wrapped
    words = prompt.split()
    lines = []
    current_line = []
    
    for word in words:
        test_line = ' '.join(current_line + [word])
        test_bbox = draw.textbbox((0, 0), test_line, font=font_small)
        if test_bbox[2] - test_bbox[0] <= width - 40:
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
                current_line = [word]
            else:
                lines.append(word)
    
    if current_line:
        lines.append(' '.join(current_line))
    
    # Center the text vertically
    line_height = 20
    total_text_height = len(lines) * line_height
    start_y = (height - total_text_height) // 2 + 50
    
    for i, line in enumerate(lines):
        line_bbox = draw.textbbox((0, 0), line, font=font_small)
        line_width = line_bbox[2] - line_bbox[0]
        x = (width - line_width) // 2
        y = start_y + i * line_height
        draw.text((x, y), line, fill='#555', font=font_small)
    
    # Add decorative border
    draw.rectangle([10, 10, width-10, height-10], outline='#ddd', width=2)
    
    # Save the image
    design_id = str(uuid.uuid4())
    filename = f"preview_{design_id}.png"
    filepath = os.path.join("previews", filename)
    img.save(filepath)
    
    return f"/previews/{filename}", design_id

def create_dummy_3d_model(design_id: str, jewellery_type: str) -> str:
    """Create a dummy .obj file for the 3D model"""
    filename = f"model_{design_id}.obj"
    filepath = os.path.join("models", filename)
    
    # Create a simple cube as placeholder 3D model
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
    """Serve the main HTML page"""
    with open("static/index.html", "r") as f:
        return HTMLResponse(content=f.read())

@app.post("/api/generate-from-text", response_model=Design)
async def generate_from_text(request: TextGenerationRequest):
    """Generate jewellery design from text prompt"""
    try:
        # Create placeholder image
        preview_url, design_id = create_placeholder_image(request.prompt, request.jewellery_type)
        
        # Create dummy 3D model
        model_url = create_dummy_3d_model(design_id, request.jewellery_type)
        
        # Create design record
        design = Design(
            id=design_id,
            prompt=request.prompt,
            jewellery_type=request.jewellery_type,
            created_at=datetime.now().isoformat(),
            preview_url=preview_url,
            model_url=model_url,
            source_type="text"
        )
        
        # Store in memory
        designs_storage.append(design.dict())
        
        return design
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating design: {str(e)}")

@app.post("/api/generate-from-image", response_model=Design)
async def generate_from_image(request: ImageGenerationRequest):
    """Generate jewellery design from uploaded image"""
    try:
        # Decode base64 image
        image_data = base64.b64decode(request.image_data.split(',')[1])  # Remove data:image/...;base64, prefix
        image = Image.open(io.BytesIO(image_data))
        
        # Save original image
        design_id = str(uuid.uuid4())
        original_filename = f"original_{design_id}.png"
        original_path = os.path.join("uploads", original_filename)
        image.save(original_path)
        
        # Create scaled preview (simulate AI processing)
        preview_image = image.copy()
        preview_image.thumbnail((400, 400), Image.Resampling.LANCZOS)
        
        # Add overlay text to show it's processed
        draw = ImageDraw.Draw(preview_image)
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 20)
        except:
            font = ImageFont.load_default()
        
        overlay_text = f"AI-Generated {request.jewellery_type.title()}"
        bbox = draw.textbbox((0, 0), overlay_text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Add semi-transparent background for text
        overlay = Image.new('RGBA', preview_image.size, (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        padding = 10
        overlay_draw.rectangle([
            (preview_image.width - text_width) // 2 - padding,
            preview_image.height - text_height - 20 - padding,
            (preview_image.width + text_width) // 2 + padding,
            preview_image.height - 20 + padding
        ], fill=(0, 0, 0, 128))
        
        preview_image = Image.alpha_composite(preview_image.convert('RGBA'), overlay).convert('RGB')
        draw = ImageDraw.Draw(preview_image)
        draw.text(
            ((preview_image.width - text_width) // 2, preview_image.height - text_height - 20),
            overlay_text,
            fill='white',
            font=font
        )
        
        # Save preview
        preview_filename = f"preview_{design_id}.png"
        preview_path = os.path.join("previews", preview_filename)
        preview_image.save(preview_path)
        
        # Create dummy 3D model
        model_url = create_dummy_3d_model(design_id, request.jewellery_type)
        
        # Create design record
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
        
        # Store in memory
        designs_storage.append(design.dict())
        
        return design
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.get("/api/designs", response_model=List[Design])
async def get_designs():
    """Get all generated designs"""
    return [Design(**design) for design in designs_storage]

@app.delete("/api/designs/{design_id}")
async def delete_design(design_id: str):
    """Delete a design"""
    global designs_storage
    original_length = len(designs_storage)
    designs_storage = [d for d in designs_storage if d['id'] != design_id]
    
    if len(designs_storage) == original_length:
        raise HTTPException(status_code=404, detail="Design not found")
    
    return {"message": "Design deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)