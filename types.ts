export enum Category {
  ZIANA = 'Ziana & Visagie',
  CATERING = 'Catering & Traiteur',
  VENUE = 'Zalen & Locaties',
  MUSIC = 'DJ & Muziek',
  PHOTO = 'Fotografie & Video',
  DECOR = 'Decoratie',
  OTHER = 'Overig'
}

export interface Provider {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  priceStart: number;
  imageUrl: string;
  rating: number;
  phone?: string;
  email?: string;
  isOwner?: boolean;
}

export interface BudgetItem {
  id: string;
  providerId?: string; // If linked to a specific provider
  name: string;
  estimatedCost: number;
  note?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}