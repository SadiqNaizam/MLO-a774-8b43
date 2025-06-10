import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, UserCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // For mobile sidebar

// Define navigation links structure for reusability
interface NavLinkItem {
  href: string;
  label: string;
  // Add icon or other props if needed
}

// Example sidebar content for mobile
const MobileSidebarContent = ({ navLinks }: { navLinks: NavLinkItem[] }) => (
  <nav className="flex flex-col gap-2 p-4">
    {navLinks.map((link) => (
      <Link
        key={link.label}
        to={link.href}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 transition-all hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-50 dark:hover:bg-gray-800"
      >
        {link.label}
      </Link>
    ))}
  </nav>
);


interface HeaderProps {
  // Example: onToggleMobileSidebar?: () => void;
  // For now, mobile sidebar toggle is internal to Header via Sheet
  navLinksForMobile: NavLinkItem[]; // Links to show in mobile flyout
}

const Header: React.FC<HeaderProps> = ({ navLinksForMobile }) => {
  console.log("Rendering Header");

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium p-4">
            <Link
              to="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              {/* Placeholder for Logo Icon e.g. <Package2 className="h-5 w-5 transition-all group-hover:scale-110" /> */}
              <span className="text-xl">D</span>
              <span className="sr-only">Dashboard Inc</span>
            </Link>
            {navLinksForMobile.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Optional: Breadcrumbs or Page Title area can go here */}
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Search input can go here if needed */}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="h-6 w-6" /> {/* Using UserCircle for simplicity */}
          <span className="sr-only">User Menu</span>
        </Button>
      </div>
    </header>
  );
}

export default Header;