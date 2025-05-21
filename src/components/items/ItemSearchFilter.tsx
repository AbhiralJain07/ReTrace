"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ITEM_CATEGORIES, ITEM_TYPES } from '@/lib/constants';
import { ItemCategory, ItemType } from '@/lib/types';
import { Search, FilterX, ListFilter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ItemSearchFilterProps {
  onSearch: (filters: { query: string; type?: ItemType; category?: ItemCategory }) => void;
}

export function ItemSearchFilter({ onSearch }: ItemSearchFilterProps) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<ItemType | undefined>(undefined);
  const [category, setCategory] = useState<ItemCategory | undefined>(undefined);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch({ query, type, category });
  };

  const handleClearFilters = () => {
    setQuery('');
    setType(undefined);
    setCategory(undefined);
    onSearch({ query: '', type: undefined, category: undefined });
  };

  return (
    <Card className="mb-8 p-4 md:p-6 shadow-md sticky top-20 z-40 bg-background/90 backdrop-blur">
      <CardContent className="p-0">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items by name, description, location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={type} onValueChange={(value) => setType(value as ItemType)}>
              <SelectTrigger className="py-3 text-base">
                <SelectValue placeholder="Filter by Type (All)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL_TYPES">All Types</SelectItem>
                {ITEM_TYPES.map((itemType) => (
                  <SelectItem key={itemType.value} value={itemType.value}>
                    {itemType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={(value) => setCategory(value as ItemCategory)}>
              <SelectTrigger className="py-3 text-base">
                <SelectValue placeholder="Filter by Category (All)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL_CATEGORIES">All Categories</SelectItem>
                {ITEM_CATEGORIES.map((itemCategory) => (
                  <SelectItem key={itemCategory.value} value={itemCategory.value}>
                    {itemCategory.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button type="submit" className="w-full py-3 text-base lg:col-span-1">
              <ListFilter className="mr-2 h-5 w-5" /> Apply Filters
            </Button>
            <Button type="button" variant="outline" onClick={handleClearFilters} className="w-full py-3 text-base lg:col-span-1">
              <FilterX className="mr-2 h-5 w-5" /> Clear Filters
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
