import { ItemCategory, ItemType } from './types';

export const ITEM_CATEGORIES: { value: ItemCategory; label: string }[] = Object.values(ItemCategory).map((category) => ({
  value: category,
  label: category,
}));

export const ITEM_TYPES: { value: ItemType; label: string }[] = Object.values(ItemType).map((type) => ({
  value: type,
  label: type,
}));

export const MOCK_ITEMS_DATA: Item[] = [
  {
    id: '1',
    name: 'Lost Black Wallet',
    description: 'A black leather wallet containing ID and credit cards. Lost near Central Park.',
    category: ItemCategory.ACCESSORIES,
    itemType: ItemType.LOST,
    location: 'Central Park, New York',
    imageUrl: 'https://placehold.co/600x400.png',
    dateReported: new Date('2024-07-20'),
    contactInfo: 'user1@example.com',
  },
  {
    id: '2',
    name: 'Found iPhone 13',
    description: 'Found an iPhone 13 in a blue case at Starbucks on Main St. Screen has a small crack.',
    category: ItemCategory.ELECTRONICS,
    itemType: ItemType.FOUND,
    location: 'Starbucks, Main St.',
    imageUrl: 'https://placehold.co/600x400.png',
    dateReported: new Date('2024-07-22'),
  },
  {
    id: '3',
    name: 'Vintage Armchair for Sale',
    description: 'Beautiful vintage armchair, great condition. Minor wear. Pick up only.',
    category: ItemCategory.FURNITURE,
    itemType: ItemType.EXCHANGE,
    location: 'Downtown Apartment',
    imageUrl: 'https://placehold.co/600x400.png',
    dateReported: new Date('2024-07-21'),
    contactInfo: 'seller@example.com',
    price: 150,
  },
  {
    id: '4',
    name: 'Lost Golden Retriever "Buddy"',
    description: 'Lost our friendly Golden Retriever named Buddy. Last seen near Willow Creek Park. He is microchipped and wearing a blue collar.',
    category: ItemCategory.PETS,
    itemType: ItemType.LOST,
    location: 'Willow Creek Park',
    imageUrl: 'https://placehold.co/600x400.png',
    dateReported: new Date('2024-07-23'),
    contactInfo: 'petowner@example.com',
  },
  {
    id: '5',
    name: 'Set of Keys Found',
    description: 'Found a set of keys with a distinctive keychain (a small Eiffel Tower). Found on the #5 bus.',
    category: ItemCategory.KEYS,
    itemType: ItemType.FOUND,
    location: '#5 Bus Route',
    imageUrl: 'https://placehold.co/600x400.png',
    dateReported: new Date('2024-07-24'),
  },
  {
    id: '6',
    name: 'Collection of Sci-Fi Books',
    description: 'Selling a collection of 20 classic sci-fi novels. Good condition. Willing to negotiate price.',
    category: ItemCategory.BOOKS,
    itemType: ItemType.EXCHANGE,
    imageUrl: 'https://placehold.co/600x400.png',
    dateReported: new Date('2024-07-25'),
    contactInfo: 'booklover@example.com',
    price: 50,
  },
];
