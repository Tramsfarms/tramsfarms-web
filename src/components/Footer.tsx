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
    <footer className=''>
      {/* Main Footer */}
      <div className='  bg-[#25252E] lg:p-0 p-5 '>
        <div className='lg:container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-40 py-6 text-white'>
          <div className=''>
            <img
              src='/images/logo/WWt.svg'
              className='w-full max-w-[150px]'
              alt='Tramsfarms Logo'
            />
          </div>
          <div className='grid gap-5'>
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
              <div className='flex items-start  space-x-2'>
                <Checkbox
                  id='terms'
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                  className='mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                />
                <label htmlFor='terms' className='text-xs mt-1 text-[#d9d9d9]'>
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
      <div className='lg:container grid lg:grid-cols-4 grid-cols-2 gap-10 lg:p-0 p-5 lg:gap-52 py-6'>
        {footerSectionSchema.map((section) => (
          <div key={section.title} className='space-y-4'>
            <h6 className='lg:text-lg text-[1rem] font-bold text-[#25252E]'>
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
      <hr className='-mt-2' />
      <div className='flex flex-col justify-center items-center py-3 px-6 sm:flex-row'>
        <p className='text-sm text-muted font-bold-foreground'>
          © {new Date().getFullYear()} Tramsfarms. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
