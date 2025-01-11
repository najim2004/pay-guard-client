import { Link } from "react-router-dom";
import {
  LogIn,
  UserPlus,
  Menu,
  LogOut,
  LayoutDashboardIcon,
} from "lucide-react";
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
      {authState?.user?.email ? (
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
        <Link to="/" className="flex items-center gap-2 font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <span className="text-xl">Pay Guard</span>
        </Link>
        {/* Desktop Navigation */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="size-10">
                  <AvatarImage src={""} alt="user avatar" />
                  <AvatarFallback>
                    {authState?.user?.name[0] || "?"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-4" align="end" forceMount>
              <DropdownMenuLabel className="font-normal border-b mb-3">
                <div className="flex flex-col space-y-1 text-center">
                  <p className="text-sm font-medium">
                    {authState?.user?.name || "user name"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {authState.user?.email || "user email"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-4 text-sm font-semibold w-full"
                >
                  <LayoutDashboardIcon className="size-4" />{" "}
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  dispatcher(logout());
                  dispatcher(clearState());
                }}
                className="text-red-500 text-sm font-semibold"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Mobile Navigation */}
          <div className="hidden">
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <span className="text-xl">Pay Guard</span>
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
