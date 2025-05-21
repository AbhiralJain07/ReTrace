export enum ItemType {
  LOST = 'Lost',
  FOUND = 'Found',
  EXCHANGE = 'Exchange',
}

export enum ItemCategory {
  ELECTRONICS = 'Electronics',
  CLOTHING = 'Clothing',
  BOOKS = 'Books',
  FURNITURE = 'Furniture',
  JEWELRY = 'Jewelry',
  ACCESSORIES = 'Accessories', // Bags, Wallets, etc.
  KEYS = 'Keys',
  PETS = 'Pets', // For lost/found pets
  DOCUMENTS = 'Documents', // ID cards, passports
  OTHER = 'Other',
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  itemType: ItemType;
  location?: string; // Optional, but highly recommended for lost/found
  imageUrl?: string;
  dateReported: Date;
  contactInfo?: string; // For exchange items or if user wants to share for lost/found
  price?: number; // For exchange items
  userId?: string; // To link to a user
}
