import { JewelrySpecs, GeneratedJewelry } from '@/types/jewelry';

export interface EngravingOptions {
  text: string;
  font: 'classic' | 'modern' | 'script' | 'block';
  size: 'small' | 'medium' | 'large';
  depth: 'shallow' | 'medium' | 'deep';
  position: 'inside' | 'outside' | 'side' | 'back';
  style: 'engraved' | 'raised' | 'filled';
}

export interface NFCOptions {
  enabled: boolean;
  chipType: 'ntag213' | 'ntag215' | 'ntag216';
  placement: 'hidden' | 'visible' | 'decorative';
  content: {
    type: 'url' | 'contact' | 'text' | 'wifi' | 'custom';
    data: string;
  };
  encapsulation: 'resin' | 'metal' | 'ceramic';
}

export interface OutfitMatch {
  occasion: 'casual' | 'formal' | 'business' | 'evening' | 'sport' | 'travel';
  style: 'minimalist' | 'bold' | 'classic' | 'trendy' | 'elegant';
  colors: string[];
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'all';
  compatibility: number; // 0-1 score
  suggestions: string[];
}

export class AdvancedFeatures {
  
  /**
   * Generate engraving preview and specifications
   */
  static async generateEngravingPreview(
    jewelry: GeneratedJewelry,
    options: EngravingOptions
  ): Promise<{
    previewImage: string;
    specifications: {
      feasible: boolean;
      cost: number;
      limitations: string[];
      recommendations: string[];
    };
  }> {
    // Simulate engraving analysis
    await new Promise(resolve => setTimeout(resolve, 1000));

    const isFeasible = this.validateEngraving(jewelry.specs, options);
    const cost = this.calculateEngravingCost(options);

    return {
      previewImage: '/api/engraving-preview',
      specifications: {
        feasible: isFeasible,
        cost,
        limitations: this.getEngravingLimitations(jewelry.specs, options),
        recommendations: this.getEngravingRecommendations(jewelry.specs, options)
      }
    };
  }

  /**
   * Validate engraving feasibility
   */
  private static validateEngraving(specs: JewelrySpecs, options: EngravingOptions): boolean {
    // Check if jewelry type supports engraving
    const engravableTypes = ['ring', 'pendant', 'bracelet', 'cufflinks'];
    if (!engravableTypes.includes(specs.type)) return false;

    // Check text length limits
    const maxLengths = {
      ring: 20,
      pendant: 50,
      bracelet: 30,
      cufflinks: 15
    };
    
    const maxLength = maxLengths[specs.type as keyof typeof maxLengths] || 20;
    if (options.text.length > maxLength) return false;

    // Check material compatibility
    const softMaterials = ['gold', 'silver', 'titanium'];
    const hardMaterials = ['platinum', 'stainless-steel'];
    
    if (hardMaterials.includes(specs.material) && options.depth === 'deep') {
      return false;
    }

    return true;
  }

  /**
   * Calculate engraving cost
   */
  private static calculateEngravingCost(options: EngravingOptions): number {
    let baseCost = 25; // Base engraving cost

    // Font complexity
    const fontMultipliers = {
      classic: 1.0,
      modern: 1.1,
      script: 1.3,
      block: 1.0
    };
    baseCost *= fontMultipliers[options.font];

    // Size multiplier
    const sizeMultipliers = {
      small: 1.0,
      medium: 1.2,
      large: 1.5
    };
    baseCost *= sizeMultipliers[options.size];

    // Depth/style multiplier
    const styleMultipliers = {
      shallow: 1.0,
      medium: 1.2,
      deep: 1.5
    };
    baseCost *= styleMultipliers[options.depth];

    // Character count
    baseCost += options.text.length * 0.5;

    return Math.round(baseCost * 100) / 100;
  }

  /**
   * Get engraving limitations
   */
  private static getEngravingLimitations(specs: JewelrySpecs, options: EngravingOptions): string[] {
    const limitations: string[] = [];

    if (specs.type === 'earrings') {
      limitations.push('Engraving not recommended for earrings due to size constraints');
    }

    if (specs.material === 'stainless-steel' && options.depth === 'deep') {
      limitations.push('Deep engraving not possible on stainless steel');
    }

    if (options.text.length > 30) {
      limitations.push('Long text may affect readability');
    }

    if (specs.gemstone !== 'none' && options.position === 'outside') {
      limitations.push('Outside engraving may interfere with gemstone setting');
    }

    return limitations;
  }

  /**
   * Get engraving recommendations
   */
  private static getEngravingRecommendations(specs: JewelrySpecs, options: EngravingOptions): string[] {
    const recommendations: string[] = [];

    if (specs.type === 'ring') {
      recommendations.push('Inside band engraving is most popular for rings');
    }

    if (specs.style === 'minimalist') {
      recommendations.push('Consider small, subtle engraving to maintain minimalist aesthetic');
    }

    if (options.text.length > 20) {
      recommendations.push('Consider abbreviations or symbols for shorter text');
    }

    if (specs.material === 'gold') {
      recommendations.push('Gold engraves beautifully with all font styles');
    }

    return recommendations;
  }

  /**
   * Design NFC integration
   */
  static async designNFCIntegration(
    jewelry: GeneratedJewelry,
    options: NFCOptions
  ): Promise<{
    feasible: boolean;
    design: {
      placement: string;
      dimensions: { width: number; height: number; thickness: number };
      waterproofRating: string;
    };
    cost: number;
    limitations: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const feasible = this.validateNFCIntegration(jewelry.specs, options);
    const cost = this.calculateNFCCost(options);

    return {
      feasible,
      design: {
        placement: this.getOptimalNFCPlacement(jewelry.specs, options),
        dimensions: this.getNFCDimensions(options.chipType),
        waterproofRating: 'IPX7'
      },
      cost,
      limitations: this.getNFCLimitations(jewelry.specs, options)
    };
  }

  /**
   * Validate NFC integration feasibility
   */
  private static validateNFCIntegration(specs: JewelrySpecs, options: NFCOptions): boolean {
    // Size requirements for NFC chips
    const minSizes = {
      ring: { width: 15, height: 15 },
      pendant: { width: 10, height: 10 },
      bracelet: { width: 12, height: 12 },
      brooch: { width: 10, height: 10 }
    };

    const jewelrySize = minSizes[specs.type as keyof typeof minSizes];
    if (!jewelrySize) return false;

    const chipSize = this.getNFCDimensions(options.chipType);
    return jewelrySize.width >= chipSize.width && jewelrySize.height >= chipSize.height;
  }

  /**
   * Get NFC chip dimensions
   */
  private static getNFCDimensions(chipType: string): { width: number; height: number; thickness: number } {
    const dimensions = {
      ntag213: { width: 13, height: 13, thickness: 0.12 },
      ntag215: { width: 15, height: 15, thickness: 0.12 },
      ntag216: { width: 15, height: 15, thickness: 0.12 }
    };

    return dimensions[chipType as keyof typeof dimensions] || dimensions.ntag213;
  }

  /**
   * Calculate NFC integration cost
   */
  private static calculateNFCCost(options: NFCOptions): number {
    const baseCosts = {
      ntag213: 5,
      ntag215: 8,
      ntag216: 12
    };

    let cost = baseCosts[options.chipType] || 5;

    // Placement complexity
    if (options.placement === 'hidden') cost += 15;
    if (options.placement === 'decorative') cost += 25;

    // Encapsulation cost
    const encapsulationCosts = {
      resin: 10,
      metal: 20,
      ceramic: 15
    };
    cost += encapsulationCosts[options.encapsulation];

    return cost;
  }

  /**
   * Get optimal NFC placement
   */
  private static getOptimalNFCPlacement(specs: JewelrySpecs, options: NFCOptions): string {
    const placements = {
      ring: 'Inside band, opposite the setting',
      pendant: 'Back surface, center position',
      bracelet: 'Inside clasp or central link',
      brooch: 'Back plate, behind decorative elements'
    };

    return placements[specs.type as keyof typeof placements] || 'Optimal position to be determined';
  }

  /**
   * Get NFC limitations
   */
  private static getNFCLimitations(specs: JewelrySpecs, options: NFCOptions): string[] {
    const limitations: string[] = [];

    if (specs.type === 'earrings') {
      limitations.push('NFC not recommended for earrings due to size and proximity to head');
    }

    if (specs.material === 'stainless-steel') {
      limitations.push('Metal interference may reduce NFC read range');
    }

    if (options.placement === 'visible') {
      limitations.push('Visible NFC chip may affect aesthetic design');
    }

    return limitations;
  }

  /**
   * Analyze outfit matching compatibility
   */
  static async analyzeOutfitCompatibility(
    jewelry: GeneratedJewelry,
    outfitDescription: string
  ): Promise<OutfitMatch[]> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Simulate AI analysis of outfit compatibility
    const matches: OutfitMatch[] = [
      {
        occasion: 'formal',
        style: 'elegant',
        colors: ['black', 'navy', 'charcoal'],
        season: 'all',
        compatibility: 0.92,
        suggestions: [
          'Perfect for evening events and formal occasions',
          'Pairs beautifully with dark, sophisticated colors',
          'Consider matching earrings for complete set'
        ]
      },
      {
        occasion: 'business',
        style: 'classic',
        colors: ['white', 'cream', 'light blue'],
        season: 'all',
        compatibility: 0.85,
        suggestions: [
          'Excellent for professional settings',
          'Subtle enough for conservative dress codes',
          'Works well with business attire'
        ]
      },
      {
        occasion: 'casual',
        style: 'trendy',
        colors: ['denim', 'white', 'pastels'],
        season: 'spring',
        compatibility: 0.78,
        suggestions: [
          'Great for weekend outings',
          'Adds elegance to casual wear',
          'Perfect spring accessory'
        ]
      }
    ];

    return matches.filter(match => this.isCompatibleWithJewelry(jewelry.specs, match));
  }

  /**
   * Check jewelry compatibility with outfit match
   */
  private static isCompatibleWithJewelry(specs: JewelrySpecs, match: OutfitMatch): boolean {
    // Style compatibility
    const styleCompatibility = {
      minimalist: ['classic', 'elegant', 'minimalist'],
      luxury: ['elegant', 'bold', 'classic'],
      vintage: ['classic', 'elegant'],
      modern: ['trendy', 'bold', 'minimalist'],
      gothic: ['bold'],
      bohemian: ['trendy', 'bold']
    };

    const compatibleStyles = styleCompatibility[specs.style as keyof typeof styleCompatibility] || [];
    if (!compatibleStyles.includes(match.style)) {
      match.compatibility *= 0.7;
    }

    // Material compatibility with occasions
    if (specs.material === 'stainless-steel' && match.occasion === 'formal') {
      match.compatibility *= 0.8;
    }

    if (specs.material === 'platinum' && match.occasion === 'casual') {
      match.compatibility *= 0.9;
    }

    return match.compatibility > 0.6;
  }

  /**
   * Generate personalized jewelry recommendations
   */
  static async generatePersonalizedRecommendations(
    userPreferences: {
      style: string[];
      occasions: string[];
      budget: number;
      metals: string[];
      gems: string[];
    },
    previousJewelry: GeneratedJewelry[]
  ): Promise<{
    recommendations: JewelrySpecs[];
    reasoning: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const recommendations: JewelrySpecs[] = [];
    const reasoning: string[] = [];

    // Analyze user patterns
    const mostUsedStyle = this.getMostFrequent(previousJewelry.map(j => j.specs.style));
    const mostUsedMaterial = this.getMostFrequent(previousJewelry.map(j => j.specs.material));

    // Generate complementary pieces
    if (previousJewelry.some(j => j.specs.type === 'ring')) {
      recommendations.push({
        type: 'earrings',
        material: mostUsedMaterial,
        gemstone: 'diamond',
        style: mostUsedStyle,
        size: 'M',
        description: 'Matching earrings to complement your ring collection'
      });
      reasoning.push('Added matching earrings based on your existing ring preferences');
    }

    if (!previousJewelry.some(j => j.specs.type === 'necklace')) {
      recommendations.push({
        type: 'necklace',
        material: userPreferences.metals[0] as any,
        gemstone: 'none',
        style: 'minimalist',
        size: 'M',
        description: 'Versatile pendant necklace for daily wear'
      });
      reasoning.push('Suggested a necklace to diversify your jewelry collection');
    }

    return { recommendations, reasoning };
  }

  /**
   * Helper to find most frequent item in array
   */
  private static getMostFrequent<T>(arr: T[]): T {
    const frequency: Record<string, number> = {};
    arr.forEach(item => {
      const key = String(item);
      frequency[key] = (frequency[key] || 0) + 1;
    });

    let maxCount = 0;
    let mostFrequent = arr[0];
    Object.entries(frequency).forEach(([item, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequent = item as T;
      }
    });

    return mostFrequent;
  }

  /**
   * Calculate manufacturing cost estimate with advanced features
   */
  static calculateAdvancedManufacturingCost(
    specs: JewelrySpecs,
    engraving?: EngravingOptions,
    nfc?: NFCOptions
  ): {
    baseCost: number;
    engravingCost: number;
    nfcCost: number;
    totalCost: number;
    breakdown: Record<string, number>;
  } {
    const baseCost = this.getBaseCost(specs);
    const engravingCost = engraving ? this.calculateEngravingCost(engraving) : 0;
    const nfcCost = nfc?.enabled ? this.calculateNFCCost(nfc) : 0;

    const totalCost = baseCost + engravingCost + nfcCost;

    return {
      baseCost,
      engravingCost,
      nfcCost,
      totalCost,
      breakdown: {
        'Base Jewelry': baseCost,
        'Engraving': engravingCost,
        'NFC Integration': nfcCost,
        'Labor Premium': totalCost * 0.15
      }
    };
  }

  /**
   * Get base manufacturing cost
   */
  private static getBaseCost(specs: JewelrySpecs): number {
    const baseCosts = {
      ring: 150,
      pendant: 120,
      necklace: 200,
      earrings: 180,
      bracelet: 250,
      brooch: 100,
      cufflinks: 160,
      anklet: 180
    };

    const materialMultipliers = {
      gold: 3.0,
      platinum: 4.5,
      'white-gold': 2.8,
      'rose-gold': 2.9,
      silver: 1.0,
      titanium: 1.5,
      'stainless-steel': 0.8
    };

    const gemstoneAdders = {
      diamond: 500,
      ruby: 300,
      sapphire: 250,
      emerald: 350,
      pearl: 100,
      opal: 150,
      amethyst: 50,
      topaz: 75,
      garnet: 40,
      turquoise: 30,
      none: 0
    };

    const baseCost = baseCosts[specs.type] || 150;
    const materialMultiplier = materialMultipliers[specs.material] || 1.0;
    const gemstoneAdder = gemstoneAdders[specs.gemstone] || 0;

    return baseCost * materialMultiplier + gemstoneAdder;
  }
}