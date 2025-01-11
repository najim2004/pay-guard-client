import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground mt-10">
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col md:items-start items-center text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">
              <Link to="/" className="flex items-center gap-2">
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
            </h3>
            <p className="text-sm text-muted-foreground">
              A comprehensive learning platform offering high-quality courses
              and tutorials in web development, focusing on React.js and modern
              frontend technologies for developers of all skill levels.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-center">
              <Link
                to="/courses"
                className="block text-sm hover:text-primary transition-colors hover:underline"
              >
                Courses
              </Link>
              <Link
                to="/learning-paths"
                className="block text-sm hover:text-primary transition-colors hover:underline"
              >
                Learning Paths
              </Link>
              <Link
                to="/resources"
                className="block text-sm hover:text-primary transition-colors hover:underline"
              >
                Resources
              </Link>
              <Link
                to="/community"
                className="block text-sm hover:text-primary transition-colors hover:underline"
              >
                Community
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col md:items-end">
            <div className="">
              <h4 className="font-semibold mb-4 text-center">
                Connect With Us
              </h4>
              <div className="flex space-x-4 justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Facebook className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Facebook</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Twitter</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Instagram className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Instagram</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Github className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>GitHub</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          © {currentYear} React Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
