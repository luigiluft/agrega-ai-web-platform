
export interface Theme {
  id: number;
  name: string;
  image: string;
  description: string;
  features: string[];
  fullDescription: string;
  market: "fashion" | "cosmetics" | "pets" | "marketplace" | "tech" | "market" | "sports" | "furniture" | "digital" | "books" | "organic";
  demoUrl: string;
}
