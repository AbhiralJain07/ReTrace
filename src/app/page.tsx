import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LocateFixed, PackagePlus, ShoppingBag, Search, Users } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const features = [
    {
      icon: LocateFixed,
      title: 'Report Lost Items',
      description: 'Misplaced something valuable? Quickly report it and let our community help you find it.',
      link: '/report-lost',
      linkText: 'Report Lost Item',
      image: 'https://placehold.co/600x400.png',
      imageAlt: 'Illustration of a magnifying glass over a map',
      aiHint: 'lost map'
    },
    {
      icon: PackagePlus,
      title: 'Announce Found Items',
      description: 'Found an item? Post the details and help reunite it with its rightful owner.',
      link: '/announce-found',
      linkText: 'Announce Found Item',
      image: 'https://placehold.co/600x400.png',
      imageAlt: 'Illustration of a person holding a found item',
      aiHint: 'found item'
    },
    {
      icon: ShoppingBag,
      title: 'Second-hand Exchange',
      description: 'Buy, sell, or donate pre-loved items. Give your belongings a new life and find great deals.',
      link: '/list-exchange',
      linkText: 'List an Item for Exchange',
      image: 'https://placehold.co/600x400.png',
      imageAlt: 'Illustration of items being exchanged',
      aiHint: 'marketplace exchange'
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-12">
      <section className="w-full py-12 md:py-24 lg:py-32 text-center bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-xl shadow-lg">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
            Welcome to ReTrace
          </h1>
          <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4">
            Your trusted platform for reuniting lost items with their owners and discovering second-hand treasures.
          </p>
          <div className="mt-8 space-x-4">
            <Button size="lg" asChild>
              <Link href="/items">
                <Search className="mr-2 h-5 w-5" /> Browse All Items
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">
                <Users className="mr-2 h-5 w-5" /> Join Our Community
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full">
        <h2 className="text-3xl font-semibold tracking-tight text-center mb-10">How ReTrace Helps You</h2>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-2">
                  <feature.icon className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col items-center">
                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                   <Image 
                     src={feature.image} 
                     alt={feature.imageAlt} 
                     layout="fill" 
                     objectFit="cover" 
                     data-ai-hint={feature.aiHint}
                   />
                </div>
                <Button asChild className="w-full mt-auto">
                  <Link href={feature.link}>{feature.linkText}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="w-full py-12 md:py-24 text-center border-t">
          <h2 className="text-3xl font-semibold tracking-tight mb-6">Ready to Get Started?</h2>
          <p className="mx-auto max-w-[600px] text-foreground/80 md:text-lg mb-8">
            Join ReTrace today. It’s free, easy, and you might just make someone’s day (or find a great deal!).
          </p>
          <div className="space-x-4">
             <Button size="lg" asChild>
                <Link href="/auth/login">Create an Account</Link>
             </Button>
             <Button size="lg" variant="secondary" asChild>
                <Link href="/items">Explore Listings</Link>
             </Button>
          </div>
      </section>
    </div>
  );
}
