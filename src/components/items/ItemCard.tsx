import Image from 'next/image';
import { type Item, ItemType } from '@/lib/types'; // Import ItemType here
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Tag, CalendarDays, Info, DollarSign, Phone } from 'lucide-react';
import { format } from 'date-fns';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const { name, description, category, itemType, location, imageUrl, dateReported, price, contactInfo } = item;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader>
        <div className="relative aspect-video w-full mb-4 rounded-t-lg overflow-hidden">
          <Image 
            src={imageUrl || 'https://placehold.co/600x400.png'} 
            alt={name} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint={`${itemType.toLowerCase()} ${category.toLowerCase()}`}
          />
        </div>
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-1">
          <Badge variant={itemType === ItemType.LOST ? 'destructive' : itemType === ItemType.FOUND ? 'secondary' : 'default'}>
            {itemType}
          </Badge>
          <Badge variant="outline">
            <Tag className="mr-1 h-3 w-3" />
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="mb-3 line-clamp-3">{description}</CardDescription>
        
        {location && (
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <MapPin className="mr-2 h-4 w-4 text-primary" />
            <span>{location}</span>
          </div>
        )}
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <CalendarDays className="mr-2 h-4 w-4 text-primary" />
          <span>Reported: {format(new Date(dateReported), 'PPP')}</span>
        </div>
        {itemType === ItemType.EXCHANGE && price !== undefined && (
          <div className="flex items-center text-lg font-semibold text-primary mt-2 mb-1">
            <DollarSign className="mr-1 h-5 w-5" />
            <span>{price.toFixed(2)}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" variant="default">
          <Info className="mr-2 h-4 w-4" />
          View Details
        </Button>
        {contactInfo && itemType === ItemType.EXCHANGE && (
           <Button variant="outline" className="w-full ml-2">
             <Phone className="mr-2 h-4 w-4" /> Contact Seller
           </Button>
        )}
      </CardFooter>
    </Card>
  );
}
