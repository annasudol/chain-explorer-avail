"use client";

import { AlignJustify, Blocks, Home, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WalletConnect from "./WalletConnect";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

const Header = () => {
  const pathname = usePathname();

  const isActive = (path?: string) => {
    if (!pathname || !path) return false;
    // Check if current path starts with the given path to handle nested routes
    // or exact match for home/root routes
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  const navItems: NavItem[] = [
    {
      path: "/",
      label: "Dashboard",
      icon: Home,
    },
    {
      path: "/blocks",
      label: "Blocks",
      icon: Blocks,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-avail-purple to-avail-blue">
              <span className="font-bold text-white">A</span>
            </div>
            <span className="hidden sm:inline-block">Avail Explorer</span>
          </Link>

          <nav className="ml-8 hidden items-center gap-6 sm:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-1 text-sm font-medium ${
                    isActive(item.path)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <WalletConnect />
          <Drawer direction="right">
            <DrawerTrigger>
              <Button size="sm" className="sm:hidden w-10" asChild>
                <AlignJustify className="size-3" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Navigation</DrawerTitle>
                <DrawerDescription>
                  Choose a page to navigate to
                </DrawerDescription>
              </DrawerHeader>
              <nav className="items-center gap-6 flex flex-col mt-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DrawerClose key={item.path} asChild>
                      <Link
                        href={item.path}
                        className={`flex items-center gap-1 text-sm font-medium ${
                          isActive(item.path)
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                        {item.label}
                      </Link>
                    </DrawerClose>
                  );
                })}
              </nav>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
