import { Link } from "react-router-dom";
import { LogIn, UserPlus, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/redux/slices/authSlice";
import { clearState } from "@/redux/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const authState = useSelector((state) => state.auth);
  const dispatcher = useDispatch();

  const NavLinks = () => (
    <div className="flex flex-col md:flex-row gap-4">
      {authState?.token ? (
        <></>
      ) : (
        <>
          <Link
            to="/login"
            className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded"
          >
            <LogIn size={20} />
            Login
          </Link>

          <Link
            to="/signup"
            className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded"
          >
            <UserPlus size={20} />
            Sign Up
          </Link>
        </>
      )}
    </div>
  );

  return (
    <nav className="border-b">
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 20v-6"
            />
          </svg>
          <span className="text-xl">React Academy</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
          </div>
          {authState?.token && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="size-10">
                    <AvatarImage src={""} alt="user avatar" />
                    <AvatarFallback>
                      {authState?.user?.name[0] || "?"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1 text-center">
                    <p className="text-sm font-medium">
                      {authState?.user?.name || "user name"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {authState.user?.email || "user email"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    dispatcher(logout());
                    dispatcher(clearState());
                  }}
                  className="text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet className="md:hidden">
              <SheetTrigger className="md:hidden" asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="md:hidden">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2 font-bold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 20v-6"
                        />
                      </svg>
                      <span className="text-xl">React Academy</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-5">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
