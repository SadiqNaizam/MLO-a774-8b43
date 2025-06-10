import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils'; // For conditional classes
import { Home, BarChart2, ShoppingBag, Users, Settings, LucideIcon } from 'lucide-react'; // Example icons

interface NavLinkItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  navLinks: NavLinkItem[];
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ navLinks, className }) => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  return (
    <aside className={cn("hidden border-r bg-muted/40 md:block", className)}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            {/* Placeholder for Logo Icon e.g. <Package2 className="h-6 w-6" /> */}
            <span className="text-xl">D</span>
            <span className="">Dashboard Inc</span>
          </Link>
          {/* Optional: Notification bell or other static items for desktop sidebar top */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  location.pathname === link.href && "bg-muted text-primary"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Optional: Footer section for sidebar */}
        {/* <div className="mt-auto p-4"> ... </div> */}
      </div>
    </aside>
  );
}

export default Sidebar;