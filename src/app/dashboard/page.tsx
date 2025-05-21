import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, PackagePlus, LocateFixed, ShoppingBag, UserCircle, Settings } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual user data
const userSummary = {
  name: 'Alex Doe',
  reportedLost: 2,
  announcedFound: 1,
  itemsForSale: 3,
};

const quickActions = [
  { label: 'Report a Lost Item', href: '/report-lost', icon: LocateFixed },
  { label: 'Announce a Found Item', href: '/announce-found', icon: PackagePlus },
  { label: 'List Item for Exchange', href: '/list-exchange', icon: ShoppingBag },
  { label: 'My Listings', href: '/dashboard/my-items', icon: ListChecks },
  { label: 'Account Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <UserCircle className="h-16 w-16 text-primary" />
            <div>
              <CardTitle className="text-3xl">Welcome back, {userSummary.name}!</CardTitle>
              <CardDescription className="text-lg">Here&apos;s a summary of your activity on ReTrace.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reported Lost Items</CardTitle>
              <LocateFixed className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userSummary.reportedLost}</div>
              <p className="text-xs text-muted-foreground">items you are looking for</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Announced Found Items</CardTitle>
              <PackagePlus className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userSummary.announcedFound}</div>
              <p className="text-xs text-muted-foreground">items you&apos;ve helped find</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items for Exchange</CardTitle>
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userSummary.itemsForSale}</div>
              <p className="text-xs text-muted-foreground">items currently listed</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Quick Actions</CardTitle>
          <CardDescription>Easily access common ReTrace features.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Button key={action.href} variant="outline" size="lg" asChild className="justify-start p-6 text-left h-auto">
              <Link href={action.href} className="flex items-center gap-3">
                <action.icon className="h-8 w-8 text-primary" />
                <div>
                  <span className="block font-semibold text-base">{action.label}</span>
                </div>
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Placeholder for recent activity or messages */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Recent Activity</CardTitle>
          <CardDescription>Updates on your items or messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No new activity at this time.</p>
          {/* This section would be populated with dynamic data in a full application */}
        </CardContent>
      </Card>
    </div>
  );
}
