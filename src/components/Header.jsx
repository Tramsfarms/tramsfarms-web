"use client";

import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingCart,
  Bell,
  User,
  LogOut,
  UserCog,
  ArrowLeftRight,
  Search,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/CartStore";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import constants from "@/utils/constant";

const { API_URL } = constants;

const formatCurrency = (number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number);
};

export default function Header() {
  const categories = [
    { name: "All Categories", link: "/" },
    { name: "Sea Food", link: "/products/category/sea-foods" },
    { name: "Land Animals", link: "/products/category/lands-animals" },
    { name: "Grain", link: "/products/category/grain" },
    { name: "Vegetable", link: "/products/category/vegetable" },
    { name: "Tubers", link: "/products/category/tubers" },
    { name: "Fruits", link: "/products/category/fruits" },
    { name: "Nuts and Seeds", link: "/products/category/nuts-and-seeds" },
    { name: "Vegetable Oil", link: "/products/category/vegetable-oil" },
  ];

  const [isVendor, setIsVendor] = useState();
  const [userType, setUserType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);
  const [notifications, setNotifications] = useState([
    // {
    //   id: 1,
    //   message: "New message from seller",
    //   read: false,
    //   time: "2 hours ago",
    // },
    // {
    //   id: 2,
    //   message: "Your order has been shipped",
    //   read: false,
    //   time: "Yesterday",
    // },
    // { id: 3, message: "Payment received", read: true, time: "3 days ago" },
  ]);
  const [unreadCount, setUnreadCount] = useState(0);
  const searchRef = useRef(null);
  const path = usePathname();
  const { cart } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const type = Cookies.get("user_type");
    setUserType(type);
  }, []);

  useEffect(() => {
    // Count unread notifications
    const count = notifications.filter(
      (notification) => !notification.read
    ).length;
    setUnreadCount(count);
  }, [notifications]);

  useEffect(() => {
    // Handle clicks outside search dropdown
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const accountLink = userType === "buyer" ? "/user" : "/vendors/profile";

  const toggleUserType = () => {
    const newUserType = userType === "buyer" ? "seller" : "buyer";
    Cookies.set("user_type", newUserType); // Store for 7 days
    setUserType(newUserType);
  };

  const logOut = () => {
    Cookies.remove("vendors_auth_token");
    Cookies.remove("stream_id");
    Cookies.remove("stream_token");
    setIsVendor(null);
  };

  useEffect(() => {
    const isVendor =
      Cookies.get("vendors_auth_token") ||
      Cookies.get("vendors_auth_token") ||
      false;
    if (isVendor) {
      setIsVendor(isVendor);
    }
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(true);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debouncing
    searchTimeoutRef.current = setTimeout(async () => {
      if (query.length > 2) {
        try {
          const response = await fetch(
            `${API_URL}products/search?query=${encodeURIComponent(query)}`
          );
          const data = await response.json();

          if (data.status) {
            setSearchResults(data.data);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Error searching products:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
      setIsSearching(false);
    }, 300); // 300ms debounce delay
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <>
      {/* Desktop Header */}
      <div className="flex-col lg:container items-center py-2 justify-between hidden w-screen  space-x-8 md:flex md:flex-row">
        <Link href={"/"}>
          <img
            src="/images/logo/BWT.svg"
            className="w-[200px] h-[50px]"
            alt="Tramsfarms Logo"
          />
        </Link>
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center p-2 w-full md:w-[610px] space-x-3">
          <div className="relative w-full" ref={searchRef}>
            <Input
              className="pr-10 border-gray-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
            />
            <Search className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />

            {/* Search Results Dropdown */}
            {isSearchFocused && (
              <Card className="absolute z-50 w-full mt-1 shadow-lg">
                <CardContent className="p-0">
                  <ScrollArea className="h-[300px]">
                    {isSearching ? (
                      <div className="p-4 text-center text-muted-foreground">
                        Searching...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="p-2">
                        {searchResults.map((result) => (
                          <Link
                            href={`/product/${result.slug}`}
                            key={result.id}
                            onClick={() => setIsSearchFocused(false)}
                          >
                            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                              <div className="relative w-12 h-12 overflow-hidden rounded-md">
                                <img
                                  src={
                                    result.images?.[0]?.image_path ||
                                    "/placeholder.svg"
                                  }
                                  alt={result.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{result.name}</p>
                                <p className="text-sm text-primary">
                                  {formatCurrency(result.sale_price)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : searchQuery.length > 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        No results found for "{searchQuery}"
                      </div>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        Type to search products...
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="flex space-x-2">
            <Button className="text-gray-500 border-gray-500" variant="outline">
              Search
            </Button>
            <Link href={isVendor ? "/vendors" : "/vendors/register"}>
              <Button className="text-white" variant="primary">
                Sell on Tramsfarms
              </Button>
            </Link>
          </div>
        </div>
        <div>
          {isVendor ? (
            <div className="flex items-center gap-4">
              <Link href="/carts">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                    <Badge
                      variant="default"
                      className="absolute flex items-center justify-center w-5 h-5 p-0 text-xs -top-1 -right-1"
                    >
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Notifications Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-6 h-6" />
                    {unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute flex items-center justify-center w-5 h-5 p-0 text-xs -top-1 -right-1"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                        Mark all as read
                      </Button>
                    )}
                  </div>
                  <ScrollArea className="h-[300px]">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className={`p-4 border-b cursor-default ${!notification.read ? "bg-muted/50" : ""
                            }`}
                          onSelect={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`w-2 h-2 mt-1.5 rounded-full ${!notification.read
                                ? "bg-primary"
                                : "bg-transparent"
                                }`}
                            />
                            <div className="flex-1">
                              <p className="text-sm">{notification.message}</p>
                              <p className="text-xs text-muted-foreground">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No notifications
                      </div>
                    )}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="/avatars/user.png" alt="User profile" />
                      <AvatarFallback>
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={accountLink} className="flex w-full gap-2">
                      <UserCog className="w-4 h-4" />
                      <span>My Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={toggleUserType}
                    className="gap-2 cursor-pointer"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>
                      Switch to {userType === "buyer" ? "Seller" : "Buyer"}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logOut}
                    className="gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex mr-10 space-x-2">
              <Link href="/login">
                <Button
                  className="text-primary border-primary"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-white" variant="primary">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Categories */}
      <div className=" lg:justify-center w-full bg-white  lg:mx-auto border border-r-0 py-3 hidden md:flex  ">
        <div className="flex   lg:gap-12">
          {categories.map((category, index) => (
            <Link
              href={category.link}
              key={index}
              onClick={() => setSelectedCategory(index)}
              className={`${path == category.link
                ? "text-primary underline underline-offset-8"
                : "text-black"
                }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-80px)]">
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Categories</h3>
                      {categories.map((category, index) => (
                        <SheetClose asChild key={index}>
                          <Link
                            href={category.link}
                            className={`block p-2 rounded-md ${path == category.link
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted"
                              }`}
                          >
                            {category.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      {isVendor ? (
                        <>
                          <SheetClose asChild>
                            <Link
                              href={accountLink}
                              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                            >
                              <UserCog className="w-4 h-4" />
                              <span>My Account</span>
                            </Link>
                          </SheetClose>
                          <button
                            className="flex items-center w-full gap-2 p-2 rounded-md hover:bg-muted"
                            onClick={toggleUserType}
                          >
                            <ArrowLeftRight className="w-4 h-4" />
                            <span>
                              Switch to{" "}
                              {userType === "buyer" ? "Seller" : "Buyer"}
                            </span>
                          </button>
                          <button
                            className="flex items-center w-full gap-2 p-2 rounded-md hover:bg-muted"
                            onClick={logOut}
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <SheetClose asChild>
                            <Link href="/login">
                              <Button className="w-full" variant="outline">
                                Login
                              </Button>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/register">
                              <Button className="w-full">Register</Button>
                            </Link>
                          </SheetClose>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <Link href="/">
              <img
                src="/images/logo/BWT.svg"
                className="w-[70px] h-[50px]"
                alt="Tramsfarms Logo"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {isVendor && (
              <>
                {/* Mobile Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute flex items-center justify-center w-4 h-4 p-0 text-[10px] -top-1 -right-1"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                    <ScrollArea className="h-[300px]">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <DropdownMenuItem
                            key={notification.id}
                            className={`p-4 border-b cursor-default ${!notification.read ? "bg-muted/50" : ""
                              }`}
                            onSelect={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-2">
                              <div
                                className={`w-2 h-2 mt-1.5 rounded-full ${!notification.read
                                  ? "bg-primary"
                                  : "bg-transparent"
                                  }`}
                              />
                              <div className="flex-1">
                                <p className="text-sm">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className="p-4 text-center text-muted-foreground">
                          No notifications
                        </div>
                      )}
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link href="/carts">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cart.length > 0 && (
                      <Badge
                        variant="default"
                        className="absolute flex items-center justify-center w-4 h-4 p-0 text-[10px] -top-1 -right-1"
                      >
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/avatars/user.png" alt="User profile" />
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              {isVendor ? (
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={accountLink} className="flex w-full gap-2">
                      <UserCog className="w-4 h-4" />
                      <span>My Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={toggleUserType}
                    className="gap-2 cursor-pointer"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>
                      Switch to {userType === "buyer" ? "Seller" : "Buyer"}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logOut}
                    className="gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="flex w-full gap-2">
                      <User className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="flex w-full gap-2">
                      <UserCog className="w-4 h-4" />
                      <span>Register</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="p-2" ref={searchRef}>
          <div className="relative">
            <Input
              className="bg-[#F4F5F9] text-xs pl-8 pr-10"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <div className="absolute flex items-center gap-1 transform -translate-y-1/2 right-3 top-1/2">
              <span className="text-xs text-gray-500">All</span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </div>

            {/* Mobile Search Results */}
            {isSearchFocused && (
              <Card className="absolute z-50 w-full mt-1 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-2 border-b">
                    <h3 className="text-sm font-medium">Search Results</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsSearchFocused(false);
                        setSearchQuery("");
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <ScrollArea className="h-[300px]">
                    {searchResults.length > 0 ? (
                      <div className="p-2">
                        {searchResults.map((result) => (
                          <Link
                            href={`/product/${result.slug}`}
                            key={result.id}
                            onClick={() => setIsSearchFocused(false)}
                          >
                            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                              <div className="relative w-12 h-12 overflow-hidden rounded-md">
                                <img
                                  src={
                                    result.images?.[0]?.image_path ||
                                    "/placeholder.svg"
                                  }
                                  alt={result.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{result.name}</p>
                                <p className="text-sm text-primary">
                                  {formatCurrency(result.sale_price)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : searchQuery.length > 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        No results found for "{searchQuery}"
                      </div>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        Type to search products...
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Mobile Categories */}
        <div className="flex overflow-auto text-xs scrollbar-hide border-y">
          <div className="flex p-3 space-x-8">
            {categories.map((category, index) => (
              <Link
                href={category.link}
                key={index}
                onClick={() => setSelectedCategory(index)}
                className={`${path == category.link
                  ? "text-primary underline underline-offset-8"
                  : "text-black"
                  } w-auto whitespace-nowrap`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
