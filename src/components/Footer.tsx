'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { footerSectionSchema } from '../../utils/constant';

export default function Footer() {
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className=''>
      {/* Main Footer */}
      <div className='  bg-[#25252E] '>
        <div className='lg:container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-40 py-6 text-white'>
          <div className=''>
            <img
              src='/images/logo/WWt.svg'
              className='w-full max-w-[200px]'
              alt='Tramsfarms Logo'
            />
          </div>
          <div className='grid gap-3'>
            <div>
              <h2 className='text-lg font-bold text-[#d9d9d9]'>
                New to Tramsfarms?
              </h2>
              <p className='text-sm text-[#d9d9d9]'>
                Subscribe to our newsletter to get updates on our latest offers!
              </p>
            </div>{' '}
            <div className='space-y-4'>
              <div className='flex items-center w-full max-w-sm space-x-2'>
                <Input
                  type='email'
                  placeholder='Email'
                  className='bg-[#3a3a47] border-white text-white placeholder:text-gray-400'
                />
                <Button variant='primary' type='submit'>
                  Subscribe
                </Button>
              </div>
              <div className='flex items-start space-x-2'>
                <Checkbox
                  id='terms'
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                  className='mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                />
                <label htmlFor='terms' className='text-xs text-[#d9d9d9]'>
                  I agree to Tramsfarm's Privacy and Cookie Policy.
                  <br />
                  You can unsubscribe from newsletters at any time.
                  <br />I accept the Legal Terms.
                </label>
              </div>
            </div>
          </div>
          <div className=''>
            <div>
              <h2 className='text-lg font-bold text-[#d9d9d9]'>
                Payment Methods
              </h2>
              <div className='flex flex-wrap gap-2 mt-2'>
                <img
                  src='/images/cards/paystack.svg'
                  className='h-8'
                  alt='Paystack'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      {/* <div className='lg:container px-5 mt-5'>
        <div className='grid grid-cols-1 gap-8 px-6 md:grid-cols-4 lg:grid-cols-4'>
          <div className='space-y-3'>
            <h3 className='text-lg font-bold text-[#25252E]'>Need Help</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/chat'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  Chat with us
                </Link>
              </li>
              <li>
                <Link
                  href='/help'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href='https://blog.tramsfarms.com/'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                  target='_blank'
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-3'>
            <h3 className='text-lg font-bold text-[#25252E]'>Useful Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/report'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  Report a product
                </Link>
              </li>
              <li>
                <Link
                  href='/refund'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  Return & Refund Timeline
                </Link>
              </li>
              <li>
                <Link
                  href='/delivery'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  Delivery options & timelines
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-3'>
            <h3 className='text-lg font-bold text-[#25252E]'>
              About Tramsfarms
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/about'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  Privacy Notice
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h3 className='text-lg font-bold text-[#25252E]'>Social Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/about'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-muted-foreground hover:text-[#25252E] transition-colors'
                >
                  Privacy Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className='flex flex-col justify-center items-center py-2 px-6 sm:flex-row'>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Tramsfarms. All rights reserved.
          </p>
        </div>
      </div> */}
      <div className='lg:container grid grid-cols-4 gap-52 py-6'>
        {footerSectionSchema.map((section) => (
          <div key={section.title} className='space-y-4'>
            <h6 className='text-lg font-bold text-[#25252E]'>
              {section.title}
            </h6>

            <ul className='space-y-3 mt-6'>
              {section.links.map((link) => (
                <li key={link.label}>
                  {link.label === 'Contact Us' ? (
                    <button className="relative inline-block transition-colors duration-200 text-muted-foreground hover:text-[#25252E] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                      Contact Us
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="relative inline-block transition-colors duration-200 text-muted-foreground hover:text-[#25252E] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
