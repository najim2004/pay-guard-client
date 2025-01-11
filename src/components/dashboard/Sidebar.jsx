import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IoDocumentsOutline } from "react-icons/io5";

import {
  ArrowRight,
  BookOpen,
  DollarSign,
  Home,
  Text,
  Users,
  Video,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navLinks = (
    <>
      <NavLink
        to="/dashboard"
        onClick={() => setIsMobileOpen(false)}
        end
        className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded"
      >
        <Home size={20} />
        Dashboard
      </NavLink>
      <NavLink
        to="/dashboard/payments"
        onClick={() => setIsMobileOpen(false)}
        className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded"
      >
        <DollarSign size={20} />
        Payments
      </NavLink>
      <NavLink
        to="/dashboard/documents"
        onClick={() => setIsMobileOpen(false)}
        className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded"
      >
        <IoDocumentsOutline size={20} />
        Documents
      </NavLink>

      <NavLink
        to="/dashboard/users"
        onClick={() => setIsMobileOpen(false)}
        className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded"
      >
        <Users size={20} />
        Users
      </NavLink>
    </>
  );
  return (
    <>
      {/* Mobile Sidebar (md and below) */}
      <div className="lg:hidden fixed top-[100px] -left-1 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen} className="">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="opacity-50">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 p-4 dashboard-nav">
              {/* Add your sidebar items here */}
              {navLinks}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar (lg and above) */}
      <div className="hidden lg:block w-full max-w-[300px] h-[calc(100vh-65px)] bg-background border-r">
        <nav className="flex flex-col gap-4 p-4 dashboard-nav">
          {/* Add your sidebar items here */}
          {navLinks}
        </nav>
      </div>
    </>
  );
};
