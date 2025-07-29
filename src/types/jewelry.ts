export type JewelryType = 
  | 'ring' 
  | 'pendant' 
  | 'necklace' 
  | 'earrings' 
  | 'bracelet' 
  | 'brooch' 
  | 'cufflinks'
  | 'anklet';

export type Material = 
  | 'gold' 
  | 'silver' 
  | 'platinum' 
  | 'rose-gold' 
  | 'white-gold' 
  | 'titanium' 
  | 'stainless-steel';

export type Gemstone = 
  | 'diamond' 
  | 'sapphire' 
  | 'ruby' 
  | 'emerald' 
  | 'pearl' 
  | 'opal' 
  | 'amethyst' 
  | 'topaz' 
  | 'garnet' 
  | 'turquoise'
  | 'none';

export type Style = 
  | 'minimalist' 
  | 'vintage' 
  | 'modern' 
  | 'gothic' 
  | 'bohemian' 
  | 'luxury' 
  | 'art-deco' 
  | 'nature-inspired' 
  | 'geometric'
  | 'custom';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'custom';

export interface JewelrySpecs {
  type: JewelryType;
  material: Material;
  gemstone: Gemstone;
  style: Style;
  size: Size;
  customSize?: string;
  engraving?: string;
  description: string;
  budget?: number;
  urgency?: 'low' | 'medium' | 'high';
}

export interface GenerationOptions {
  quality: 'draft' | 'standard' | 'premium';
  variations: number;
  includeLifestyle: boolean;
  includeTechnical: boolean;
  include3D: boolean;
}

export interface GeneratedJewelry {
  id: string;
  specs: JewelrySpecs;
  images: {
    main: string;
    variations: string[];
    lifestyle?: string[];
    technical?: string[];
  };
  model3D?: {
    preview: string;
    downloadUrls: {
      obj?: string;
      fbx?: string;
      stl?: string;
      gltf?: string;
      rhino?: string;
    };
  };
  metadata: {
    createdAt: Date;
    processingTime: number;
    cost: number;
    prompt: string;
    aiModel: string;
  };
}

export interface UploadedImage {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  uploadedAt: Date;
  analysis?: ImageAnalysis;
}

export interface ImageAnalysis {
  description: string;
  detectedObjects: string[];
  colors: string[];
  style: string;
  suggestedJewelryType: JewelryType[];
  confidence: number;
  extractedFeatures: {
    shapes: string[];
    patterns: string[];
    textures: string[];
  };
}