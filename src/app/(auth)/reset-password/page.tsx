'use client';

import { CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Loader2, KeyRound, ArrowLeft } from 'lucide-react'; // Import ArrowLeft

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import constant from '@/utils/constant';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { API_URL } = constant;
  const router = useRouter();

  useEffect(() => {
    const savedEmail = Cookies.get('email');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      // Redirect to forgot password if no email is found
      router.push('/forgot-password');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error('Please enter a new password');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const myHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const data = {
        email: email,
        new_password: password,
        new_password_confirmation: confirmPassword,
      };

      const response = await axios.post(`${API_URL}password/reset`, data, {
        headers: myHeaders,
      });

      if (response.status === 200) {
        // Clear the email cookie
        Cookies.remove('email');

        toast.success(response.data.message || 'Password reset successfully');
        router.push('/login');
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((field) => {
          error.response.data.errors[field].forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to reset password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
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
            <CardTitle className='text-2xl font-bold'>Reset Password</CardTitle>
            <CardDescription>
              Create a new password for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col items-center justify-center mb-6'>
              <div className='p-3 mb-4 rounded-full bg-primary/10'>
                <KeyRound className='w-6 h-6 text-primary' />
              </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='password'>New Password</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter new password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute top-0 right-0 h-full px-3'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='w-4 h-4 text-muted-foreground' />
                    ) : (
                      <Eye className='w-4 h-4 text-muted-foreground' />
                    )}
                    <span className='sr-only'>
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                <div className='relative'>
                  <Input
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm new password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute top-0 right-0 h-full px-3'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='w-4 h-4 text-muted-foreground' />
                    ) : (
                      <Eye className='w-4 h-4 text-muted-foreground' />
                    )}
                    <span className='sr-only'>
                      {showConfirmPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
              </div>

              <Button
                variant={'primary'}
                type='submit'
                className='w-full'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className='flex justify-center'>
            <Button variant='link' asChild>
              <Link href='/login'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back to login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
