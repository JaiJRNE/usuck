# 💎 Jewellery Design Generator

A proof-of-concept web application for generating bespoke jewellery designs from either free-text prompts or uploaded images. This prototype demonstrates the user interface and data flow that would be used with real generative AI models and CAD pipelines.

## Features

### 🌟 Generate from Text
- Enter descriptive prompts for jewellery designs
- Choose from multiple jewellery types (ring, pendant, bracelet, earring, necklace, other)
- Get placeholder preview images with your prompt text
- Automatic 3D model file generation (dummy .obj files)

### 🎨 Generate from Image  
- Upload images (sketches, fashion photos, etc.)
- Drag & drop or click to upload
- Support for common image formats (PNG, JPG)
- Image preprocessing with overlay effects
- Base64 encoding for JSON API communication

### 🏆 Browse Designs
- View all generated designs in a responsive grid
- Preview images, prompts, and metadata
- Download 3D model files
- Delete unwanted designs
- Real-time updates

## Technology Stack

- **Backend**: FastAPI with Python
- **Frontend**: HTML5, CSS3, vanilla JavaScript
- **Image Processing**: Pillow (PIL)
- **Storage**: In-memory (for prototype)
- **3D Models**: Dummy .obj files

## Installation & Setup

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the application**:
   ```bash
   python main.py
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:8000
   ```

## Project Structure

```
jewellery-generator/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
├── static/
│   └── index.html      # Frontend interface
├── uploads/            # Original uploaded images
├── previews/           # Generated preview images
├── models/             # 3D model files (.obj)
└── README.md           # This file
```

## API Endpoints

### `POST /api/generate-from-text`
Generate design from text prompt
```json
{
  "prompt": "An elegant silver ring with blue sapphire",
  "jewellery_type": "ring"
}
```

### `POST /api/generate-from-image`
Generate design from uploaded image
```json
{
  "image_data": "data:image/jpeg;base64,/9j/4AAQ...",
  "jewellery_type": "pendant",
  "prompt": "Optional additional description"
}
```

### `GET /api/designs`
Retrieve all generated designs

### `DELETE /api/designs/{design_id}`
Delete a specific design

## Development Notes

This is a **proof-of-concept** application with stubbed functionality:

- **Image generation**: Creates placeholder images with prompt text overlay
- **3D modeling**: Generates simple cube .obj files as placeholders
- **AI processing**: No actual machine learning models integrated
- **Database**: Uses in-memory storage (data lost on restart)

## Production Considerations

For a production system, you would integrate:

- **Diffusion models** (DALL·E, Midjourney, Stable Diffusion)
- **3D reconstruction** algorithms (TripoSR, DreamGaussian)
- **Persistent database** (PostgreSQL, MongoDB)
- **File storage** (AWS S3, CloudFlare R2)
- **User authentication** and session management
- **Rate limiting** and API security
- **Model optimization** and caching
- **Quality validation** for generated content

## Usage Examples

1. **Text Generation**: "A vintage art deco emerald engagement ring with intricate filigree details"

2. **Image Upload**: Upload a sketch or reference photo and specify the jewellery type

3. **Browse Results**: View all your generated designs in the gallery with preview images and download links

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers supported

---

*This application demonstrates the user experience and API design that would be used with production-grade generative AI models for jewellery design.*