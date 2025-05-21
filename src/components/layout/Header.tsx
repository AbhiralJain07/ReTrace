
"use client";

import Link from 'next/link';
import { LogoIcon } from '@/components/icons/LogoIcon';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'; // Added SheetHeader and SheetTitle
import { Menu, Search, PackagePlus, LocateFixed, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/report-lost', label: 'Report Lost', icon: LocateFixed },
  { href: '/announce-found', label: 'Announce Found', icon: PackagePlus },
  { href: '/list-exchange', label: 'Sell/Donate', icon: ShoppingBag },
  { href: '/items', label: 'Browse Items', icon: Search },
];

export function Header() {
  const pathname = usePathname();
  // Mock authentication status
  const isAuthenticated = false; // Replace with actual auth check

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="ReTrace Home">
          <LogoIcon className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">ReTrace</span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                "text-foreground/70 hover:text-primary",
                pathname === link.href && "text-primary font-semibold"
              )}
            >
              <Link href={link.href}>
                <link.icon className="mr-2 h-4 w-4" />
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant={isAuthenticated ? "outline" : "default"} asChild className="hidden md:flex">
            <Link href={isAuthenticated ? "/dashboard" : "/auth/login"}>
              {isAuthenticated ? "Dashboard" : "Login / Sign Up"}
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="mb-4 border-b pb-4">
                <SheetTitle className="text-left">
                  <Link href="/" className="flex items-center gap-2">
                    <LogoIcon className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold text-primary">ReTrace Menu</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    asChild
                    className={cn(
                      "w-full justify-start text-lg",
                      pathname === link.href && "bg-accent text-accent-foreground"
                    )}
                  >
                    <Link href={link.href}>
                      <link.icon className="mr-2 h-5 w-5" />
                      {link.label}
                    </Link>
                  </Button>
                ))}
                <Button variant={isAuthenticated ? "outline" : "default"} asChild className="mt-4 text-lg">
                  <Link href={isAuthenticated ? "/dashboard" : "/auth/login"}>
                    {isAuthenticated ? "Dashboard" : "Login / Sign Up"}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
