'use client';

import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  FileText,
  Home,
  Menu,
  MessageSquare,
  ShoppingCart,
  User,
  Wallet,
  UserCog,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

import constant from '../../../../utils/constant';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const links: SidebarLink[] = [
  {
    href: '/user',
    label: 'Orders',
    icon: ShoppingCart,
  },
  {
    href: '/user/payments',
    label: 'Payments',
    icon: Wallet,
  },
  {
    href: '/user/messages',
    label: 'Messages',
    icon: MessageSquare,
  },
  {
    href: '/user/profile',
    label: 'Profile',
    icon: UserCog,
  },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const [full_name, setFullname] = useState('');
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constant;

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const token = Cookies.get('buyer_auth_token'); // Get the token from cookies

        if (!token) {
          throw new Error('User not authenticated');
        }

        const myHeaders = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        };

        const response = await axios.get(`${API_URL}profile`, {
          headers: myHeaders,
        });

        if (response.status === 200 && response.data.data) {
          const { fullname, email } = response.data.data;

          setFullname(fullname);

          setEmail(email);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          toast.info(
            'No personal information found, please fill out the form.'
          );
        } else {
          toast.error('An error occurred while fetching personal information.');
        }
      }
    };

    fetchPersonalInfo();
  }, [API_URL]);

  const NavLink = ({ href, label, icon: Icon }: SidebarLink) => {
    const isActive = pathname === href;

    return (
      <Link href={href}>
        <span
          className={cn(
            'group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            isActive
              ? 'bg-primary text-white dark:bg-primary dark:text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Icon
            className={cn(
              'mr-2 h-4 w-4 transition-colors',
              isActive
                ? 'text-inherit'
                : 'text-muted-foreground group-hover:text-inherit'
            )}
          />
          <span>{label}</span>
          {isActive && (
            <span className='absolute inset-y-0 left-0 w-1 rounded-full bg-primary-foreground' />
          )}
        </span>
      </Link>
    );
  };

  return (
    <div className='flex min-h-screen'>
      {/* Desktop Sidebar */}
      <aside className='hidden w-64 border-r bg-background md:flex md:flex-col'>
        <div className='flex flex-col p-4 space-y-6'>
          <div className='flex items-center gap-2'>
            <img src='/images/logo/BA.svg' alt='Logo' className='w-8 h-8' />
            <div className='flex items-center gap-1 text-sm font-medium text-primary'>
              <span className='font-bold'>BUYERS</span>
              <span>CENTER</span>
            </div>
          </div>
          <Link href='/'>
            <Button className='w-full' variant={'primary'}>
              <Home className='w-4 h-4 mr-2' />
              Back to Homepage
            </Button>
          </Link>
        </div>
        <Separator />
        <ScrollArea className='flex-1 px-3 py-4'>
          <nav className='flex flex-col space-y-1'>
            {links.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </ScrollArea>
        <Separator />
        <div className='p-4'>
          <div className='flex items-center gap-2 p-3 rounded-lg bg-muted'>
            <div className='flex items-center justify-center rounded-full h-9 w-9 bg-primary'>
              <User className='w-4 h-4 text-primary-foreground' />
            </div>
            <div>
              <p className='text-sm font-medium'>John Doe</p>
              <p className='text-xs text-muted-foreground'>john@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon' className='md:hidden'>
            <Menu className='w-6 h-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-64 p-0'>
          <SheetHeader className='p-4'>
            <SheetTitle className='flex items-center gap-2'>
              <img src='/images/logo/BA.svg' alt='Logo' className='w-8 h-8' />
              <div className='flex items-center gap-1 text-sm font-medium text-primary'>
                <span className='font-bold'>BUYERS</span>
                <span>CENTER</span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <Separator />
          <ScrollArea className='flex-1 px-3 py-4'>
            <nav className='flex flex-col space-y-1'>
              {links.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>
          </ScrollArea>
          <Separator />
          <div className='p-4'>
            <div className='flex items-center gap-2 p-3 rounded-lg bg-muted'>
              <div className='flex items-center justify-center rounded-full h-9 w-9 bg-primary'>
                <User className='w-4 h-4 text-primary-foreground' />
              </div>
              <div>
                <p className='text-sm font-medium'>{full_name}</p>
                <p className='text-xs text-muted-foreground'>{email}</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className='flex-1 overflow-auto bg-muted/50'>
        <div className='container py-6'>{children}</div>
      </main>
    </div>
  );
}
