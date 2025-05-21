"use client"; // This page uses client-side state for filtering

import React, { useState, useEffect } from 'react';
import { ItemCard } from '@/components/items/ItemCard';
import { ItemSearchFilter } from '@/components/items/ItemSearchFilter';
import type { Item, ItemType, ItemCategory } from '@/lib/types';
import { MOCK_ITEMS_DATA } from '@/lib/constants'; // Using mock data
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function ItemsPage() {
  const [filteredItems, setFilteredItems] = useState<Item[]>(MOCK_ITEMS_DATA);
  const [isLoading, setIsLoading] = useState(true); // Simulate loading

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setFilteredItems(MOCK_ITEMS_DATA);
      setIsLoading(false);
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (filters: { query: string; type?: ItemType; category?: ItemCategory }) => {
    setIsLoading(true);
    // Simulate filtering
    setTimeout(() => {
      let items = MOCK_ITEMS_DATA;
      if (filters.query) {
        const lowerQuery = filters.query.toLowerCase();
        items = items.filter(
          (item) =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            item.location?.toLowerCase().includes(lowerQuery)
        );
      }
      if (filters.type && filters.type !== ("ALL_TYPES" as any) ) { // Temp any for "ALL_TYPES"
        items = items.filter((item) => item.itemType === filters.type);
      }
      if (filters.category && filters.category !== ("ALL_CATEGORIES" as any)) { // Temp any for "ALL_CATEGORIES"
        items = items.filter((item) => item.category === filters.category);
      }
      setFilteredItems(items);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Browse All Items</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/report-lost"><PlusCircle className="mr-2 h-4 w-4" /> Report Lost</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/list-exchange"><PlusCircle className="mr-2 h-4 w-4" /> List for Exchange</Link>
          </Button>
        </div>
      </div>
      
      <ItemSearchFilter onSearch={handleSearch} />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4 animate-pulse">
              <div className="h-40 bg-muted rounded-md"></div>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-10 bg-muted rounded w-full mt-4"></div>
            </div>
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Items Found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria, or check back later.
          </p>
        </div>
      )}
    </div>
  );
}
