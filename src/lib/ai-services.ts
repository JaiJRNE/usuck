import OpenAI from 'openai';
import { JewelrySpecs, GenerationOptions, ImageAnalysis, UploadedImage } from '@/types/jewelry';
import { JewelryPromptEngine } from './prompt-engineering';

export class AIServices {
  private static openai: OpenAI;

  static initialize(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  static async generateJewelryImage(
    specs: JewelrySpecs,
    options: GenerationOptions = {
      quality: 'standard',
      variations: 1,
      includeLifestyle: false,
      includeTechnical: false,
      include3D: false
    }
  ): Promise<{
    main: string;
    variations: string[];
    lifestyle?: string[];
    technical?: string[];
  }> {
    try {
      const prompt = JewelryPromptEngine.generateMainPrompt(specs);
      const negativePrompt = JewelryPromptEngine.generateNegativePrompt();

      // Generate main image
      const mainResponse = await this.openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: options.quality === 'premium' ? '1792x1024' : '1024x1024',
        quality: options.quality === 'draft' ? 'standard' : 'hd',
        style: 'natural'
      });

      const main = mainResponse.data[0]?.url || '';

      // Generate variations
      const variations: string[] = [];
      if (options.variations > 1) {
        const variationPrompts = JewelryPromptEngine.generateVariationPrompts(specs, options.variations - 1);
        
        for (const variationPrompt of variationPrompts) {
          const variationResponse = await this.openai.images.generate({
            model: "dall-e-3",
            prompt: variationPrompt,
            n: 1,
            size: '1024x1024',
            quality: 'standard',
            style: 'natural'
          });
          
          if (variationResponse.data[0]?.url) {
            variations.push(variationResponse.data[0].url);
          }
        }
      }

      // Generate lifestyle images if requested
      let lifestyle: string[] | undefined;
      if (options.includeLifestyle) {
        const lifestylePrompt = JewelryPromptEngine.generateLifestylePrompt(specs);
        const lifestyleResponse = await this.openai.images.generate({
          model: "dall-e-3",
          prompt: lifestylePrompt,
          n: 1,
          size: '1024x1024',
          quality: 'hd',
          style: 'natural'
        });
        
        if (lifestyleResponse.data[0]?.url) {
          lifestyle = [lifestyleResponse.data[0].url];
        }
      }

      // Generate technical images if requested
      let technical: string[] | undefined;
      if (options.includeTechnical) {
        const technicalPrompt = JewelryPromptEngine.generateTechnicalPrompt(specs);
        const technicalResponse = await this.openai.images.generate({
          model: "dall-e-3",
          prompt: technicalPrompt,
          n: 1,
          size: '1024x1024',
          quality: 'hd',
          style: 'natural'
        });
        
        if (technicalResponse.data[0]?.url) {
          technical = [technicalResponse.data[0].url];
        }
      }

      return {
        main,
        variations,
        lifestyle,
        technical
      };

    } catch (error) {
      console.error('Error generating jewelry image:', error);
      throw new Error('Failed to generate jewelry image');
    }
  }

  static async analyzeImageForJewelry(imageUrl: string): Promise<ImageAnalysis> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: JewelryPromptEngine.analyzeImageForJewelry("Please analyze this image for jewelry design inspiration")
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      });

      const analysis = response.choices[0]?.message?.content || '';
      
      // Parse the AI response to extract structured data
      const extractedAnalysis = this.parseAnalysisResponse(analysis);
      
      return extractedAnalysis;

    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new Error('Failed to analyze image');
    }
  }

  private static parseAnalysisResponse(response: string): ImageAnalysis {
    // Simple parsing logic - in production, you'd want more sophisticated parsing
    const lines = response.split('\n').filter(line => line.trim());
    
    return {
      description: this.extractSection(response, 'description') || response.substring(0, 200),
      detectedObjects: this.extractListItems(response, 'objects') || [],
      colors: this.extractListItems(response, 'colors') || [],
      style: this.extractSection(response, 'style') || 'modern',
      suggestedJewelryType: this.extractJewelryTypes(response),
      confidence: 0.85, // Default confidence
      extractedFeatures: {
        shapes: this.extractListItems(response, 'shapes') || [],
        patterns: this.extractListItems(response, 'patterns') || [],
        textures: this.extractListItems(response, 'textures') || []
      }
    };
  }

  private static extractSection(text: string, section: string): string | null {
    const regex = new RegExp(`${section}[:\\s]+([^\\n]+)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  }

  private static extractListItems(text: string, category: string): string[] {
    const regex = new RegExp(`${category}[:\\s]+([^\\n]+)`, 'i');
    const match = text.match(regex);
    if (match) {
      return match[1].split(',').map(item => item.trim());
    }
    return [];
  }

  private static extractJewelryTypes(text: string): ('ring' | 'pendant' | 'necklace' | 'earrings' | 'bracelet' | 'brooch' | 'cufflinks' | 'anklet')[] {
    const types = ['ring', 'pendant', 'necklace', 'earrings', 'bracelet', 'brooch', 'cufflinks', 'anklet'];
    const found = types.filter(type => 
      text.toLowerCase().includes(type.toLowerCase())
    );
    return found as any[] || ['pendant']; // Default to pendant
  }

  static async enhancePromptWithAI(userPrompt: string, specs: JewelrySpecs): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a master jewelry designer and prompt engineer. Your task is to enhance user descriptions into detailed, professional jewelry design prompts that will produce stunning results with AI image generation.
            
            Guidelines:
            - Include specific technical jewelry terms
            - Describe materials, craftsmanship, and setting details
            - Add appropriate style and aesthetic descriptors
            - Ensure the prompt will generate a manufacturable piece
            - Keep focus on luxury and professional quality`
          },
          {
            role: "user",
            content: `Enhance this jewelry description: "${userPrompt}"
            
            Jewelry specs:
            - Type: ${specs.type}
            - Material: ${specs.material}
            - Gemstone: ${specs.gemstone}
            - Style: ${specs.style}
            
            Create an enhanced, detailed prompt for AI image generation.`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      return response.choices[0]?.message?.content || userPrompt;

    } catch (error) {
      console.error('Error enhancing prompt:', error);
      return userPrompt; // Fallback to original prompt
    }
  }

  static async generateImageVariationsFromImage(imageUrl: string, count: number = 3): Promise<string[]> {
    try {
      const variations: string[] = [];
      
      // Use DALL-E 2 for variations (DALL-E 3 doesn't support variations)
      for (let i = 0; i < count; i++) {
        const response = await this.openai.images.createVariation({
          image: imageUrl,
          n: 1,
          size: "1024x1024"
        });
        
        if (response.data[0]?.url) {
          variations.push(response.data[0].url);
        }
      }

      return variations;

    } catch (error) {
      console.error('Error generating image variations:', error);
      return [];
    }
  }

  static async estimateGenerationCost(options: GenerationOptions): Promise<number> {
    // DALL-E 3 pricing estimates (as of 2024)
    const prices = {
      'draft': 0.040,      // Standard quality 1024x1024
      'standard': 0.040,   // Standard quality 1024x1024
      'premium': 0.080     // HD quality 1792x1024
    };

    let totalCost = prices[options.quality];
    
    // Add cost for variations
    if (options.variations > 1) {
      totalCost += (options.variations - 1) * prices['standard'];
    }
    
    // Add cost for lifestyle images
    if (options.includeLifestyle) {
      totalCost += prices['premium'];
    }
    
    // Add cost for technical images
    if (options.includeTechnical) {
      totalCost += prices['premium'];
    }

    return Math.round(totalCost * 100) / 100; // Round to 2 decimal places
  }
}