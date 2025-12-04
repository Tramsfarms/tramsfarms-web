'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useRegisterFormStore from '@/stores/registerStore';

export default function RegisterPage() {
  const router = useRouter();
  const { fullname, user_type, setFullName, setUserType } =
    useRegisterFormStore();

  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState(false);

  const handleNext = () => {
    if (!fullname) {
      toast.error('Please enter your full name');
      return;
    }

    if (!user_type) {
      toast.error('Please select an account type');
      return;
    }

    if (!terms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
      if (user_type === 'buyer') {
        router.push('/register/complete');
      } else {
        router.push('/register/seller-info');
      }
    }, 500);
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-4 py-12 bg-muted/30'>
      <div className='w-full max-w-lg space-y-8'>
        <div className='flex justify-center'>
          <Image
            src='/images/logo/BWT.svg'
            alt='Tramsfarms Logo'
            width={200}
            height={200}
          />
        </div>
        <Card className='shadow-md border-muted/60'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-2xl font-bold'>
              Create an account
            </CardTitle>
            <CardDescription>
              Register on{' '}
              <span className='font-medium text-primary'>Tramsfarms</span> to
              get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='fullname'>Full Name</Label>
                <Input
                  id='fullname'
                  placeholder='Enter your full name'
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='accountType'>Account Type</Label>
                <Select value={user_type} onValueChange={setUserType}>
                  <SelectTrigger id='accountType'>
                    <SelectValue placeholder='Select account type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='seller'>Farmer</SelectItem>
                    <SelectItem value='buyer'>Buyer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex items-center mt-4 space-x-2'>
                <Checkbox
                  id='terms'
                  checked={terms}
                  onCheckedChange={() => setTerms(!terms)}
                  required
                />
                <Label htmlFor='terms' className='text-sm'>
                  I agree to the{' '}
                  <Link href='/terms' className='text-primary hover:underline'>
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    href='/privacy'
                    className='text-primary hover:underline'
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                className='w-full mt-2'
                onClick={handleNext}
                variant={'primary'}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Processing...
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter className='flex justify-center'>
            <div className='text-sm text-center'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='font-medium text-primary hover:underline'
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
