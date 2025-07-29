import { JewelrySpecs, JewelryType, Material, Gemstone, Style } from '@/types/jewelry';

export class JewelryPromptEngine {
  private static readonly BASE_STYLE = "ultra-high quality, professional jewelry photography, studio lighting, white background, detailed craftsmanship, luxury aesthetic";
  
  private static readonly MATERIAL_DESCRIPTORS = {
    'gold': 'warm 18k yellow gold with rich lustrous finish',
    'silver': 'polished sterling silver with bright reflective surface',
    'platinum': 'premium platinum with sophisticated matte finish',
    'rose-gold': 'elegant rose gold with warm pink undertones',
    'white-gold': 'brilliant white gold with mirror-like polish',
    'titanium': 'modern titanium with brushed industrial finish',
    'stainless-steel': 'high-grade stainless steel with satin finish'
  };

  private static readonly GEMSTONE_DESCRIPTORS = {
    'diamond': 'brilliant cut diamonds with exceptional clarity and fire',
    'sapphire': 'deep blue sapphires with vivid color saturation',
    'ruby': 'vibrant red rubies with intense crimson hue',
    'emerald': 'rich green emeralds with exceptional transparency',
    'pearl': 'lustrous cultured pearls with iridescent surface',
    'opal': 'mesmerizing opals with rainbow color play',
    'amethyst': 'deep purple amethysts with crystal clarity',
    'topaz': 'brilliant topaz with exceptional brilliance',
    'garnet': 'deep red garnets with warm undertones',
    'turquoise': 'vivid turquoise with natural matrix patterns',
    'none': ''
  };

  private static readonly STYLE_MODIFIERS = {
    'minimalist': 'clean lines, geometric simplicity, understated elegance, modern sophistication',
    'vintage': 'ornate details, antique charm, historical inspiration, intricate filigree work',
    'modern': 'contemporary design, innovative forms, sleek aesthetics, cutting-edge style',
    'gothic': 'dramatic elements, dark romanticism, medieval inspiration, bold statement pieces',
    'bohemian': 'free-spirited design, organic forms, artistic flair, unconventional beauty',
    'luxury': 'opulent grandeur, maximum brilliance, prestigious craftsmanship, elite status',
    'art-deco': 'geometric patterns, symmetrical design, 1920s glamour, architectural influences',
    'nature-inspired': 'organic shapes, botanical motifs, natural textures, earth-inspired forms',
    'geometric': 'precise angles, mathematical patterns, structural beauty, architectural precision',
    'custom': 'unique artistic vision, personalized elements, bespoke craftsmanship'
  };

  private static readonly TYPE_SPECIFIC_TERMS = {
    'ring': 'band, setting, prongs, cathedral mount, comfort fit',
    'pendant': 'bail, chain attachment, hanging orientation, front-facing design',
    'necklace': 'chain links, clasp mechanism, graduated design, choker style',
    'earrings': 'post and back, hook design, drop length, symmetrical pair',
    'bracelet': 'flexible links, adjustable clasp, wrist comfort, continuous flow',
    'brooch': 'pin mechanism, fabric attachment, decorative face, secure fastening',
    'cufflinks': 'toggle mechanism, shirt compatibility, formal wear accent',
    'anklet': 'delicate chain, ankle comfort, adjustable sizing, subtle elegance'
  };

  public static generateMainPrompt(specs: JewelrySpecs): string {
    const material = this.MATERIAL_DESCRIPTORS[specs.material];
    const gemstone = specs.gemstone !== 'none' ? this.GEMSTONE_DESCRIPTORS[specs.gemstone] : '';
    const style = this.STYLE_MODIFIERS[specs.style];
    const typeTerms = this.TYPE_SPECIFIC_TERMS[specs.type];

    let prompt = `Create a stunning ${specs.type} in ${material}`;
    
    if (gemstone) {
      prompt += ` featuring ${gemstone}`;
    }

    prompt += `. Style: ${style}. `;
    prompt += `Design elements: ${typeTerms}. `;
    
    if (specs.description) {
      prompt += `Specific requirements: ${specs.description}. `;
    }

    if (specs.engraving) {
      prompt += `Include elegant engraving: "${specs.engraving}". `;
    }

    prompt += `${this.BASE_STYLE}. `;
    prompt += this.getQualityEnhancers(specs);
    
    return prompt.trim();
  }

  public static generateVariationPrompts(specs: JewelrySpecs, count: number): string[] {
    const basePrompt = this.generateMainPrompt(specs);
    const variations = [];

    const angleVariations = [
      'three-quarter view angle',
      'side profile perspective',
      'top-down view',
      'artistic angled shot',
      'macro detail focus'
    ];

    const lightingVariations = [
      'dramatic side lighting',
      'soft diffused illumination',
      'high-key bright lighting',
      'golden hour warm glow',
      'museum display lighting'
    ];

    for (let i = 0; i < count; i++) {
      let variation = basePrompt;
      if (i < angleVariations.length) {
        variation += ` Photographed with ${angleVariations[i]}.`;
      }
      if (i < lightingVariations.length) {
        variation += ` Enhanced with ${lightingVariations[i]}.`;
      }
      variations.push(variation);
    }

    return variations;
  }

  public static generateLifestylePrompt(specs: JewelrySpecs): string {
    const basePrompt = this.generateMainPrompt(specs);
    const lifestyleContexts = {
      'ring': 'elegant hand gesture, sophisticated pose, luxury setting',
      'pendant': 'graceful neck display, elegant portrait, refined atmosphere',
      'earrings': 'profile beauty shot, hair styled elegantly, natural lighting',
      'bracelet': 'wrist accent shot, hand in motion, lifestyle context',
      'necklace': 'décolletage focus, elegant styling, sophisticated backdrop'
    };

    const context = lifestyleContexts[specs.type] || 'elegant lifestyle photography';
    
    return `${basePrompt} Presented in lifestyle photography with ${context}, professional model, luxury environment, natural beauty, high-end fashion styling.`;
  }

  public static generateTechnicalPrompt(specs: JewelrySpecs): string {
    const basePrompt = this.generateMainPrompt(specs);
    
    return `${basePrompt} Technical documentation style: orthographic views (front, side, top), precise measurements visible, CAD-quality rendering, engineering drawing aesthetic, detailed construction visible, professional blueprint style, white background with subtle grid.`;
  }

  public static generate3DPrompt(specs: JewelrySpecs): string {
    const basePrompt = this.generateMainPrompt(specs);
    
    return `${basePrompt} 3D rendered model: isometric view, 360-degree rotation capability, detailed surface textures, accurate material properties, realistic lighting and shadows, suitable for 3D printing, high-polygon mesh, production-ready geometry.`;
  }

  private static getQualityEnhancers(specs: JewelrySpecs): string {
    let enhancers = 'Exceptional detail, masterful craftsmanship, premium quality construction';
    
    if (specs.budget && specs.budget > 5000) {
      enhancers += ', luxury grade materials, exclusive design elements';
    }
    
    if (specs.urgency === 'high') {
      enhancers += ', bold statement piece, eye-catching presence';
    }
    
    return enhancers;
  }

  public static analyzeImageForJewelry(imageDescription: string): string {
    return `Analyze this image for jewelry design inspiration: "${imageDescription}". 
    
    Identify:
    1. Key visual elements that could translate to jewelry
    2. Color palette suitable for gemstones and metals
    3. Shapes and patterns for design inspiration
    4. Style characteristics (modern, vintage, organic, geometric)
    5. Recommended jewelry type that best captures the essence
    6. Specific design elements to incorporate
    
    Provide detailed analysis for creating a jewelry piece that captures the spirit and aesthetic of this image while maintaining wearability and craftsmanship standards.`;
  }

  public static generateNegativePrompt(): string {
    return 'blurry, low quality, pixelated, amateur, poorly lit, cluttered background, unrealistic proportions, fake materials, cheap appearance, distorted geometry, incorrect anatomy, oversaturated colors, watermark, text overlay';
  }
}