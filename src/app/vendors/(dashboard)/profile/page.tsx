'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Camera, Check, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import constant from '@/utils/constant';

export default function PersonalInformation() {
  const [full_name, setFullname] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [streetNo, setStreetNo] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [govtIdNumber, setGovtIdNumber] = useState('');
  const [idType, setIdType] = useState('');
  const [is_verified, setVerified] = useState('');
  const [idImage, setIdImage] = useState(null);
  const fileInputRef = useRef(null);
  const [profilePics, setProfilePics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { API_URL } = constant;
  const router = useRouter();
  const defaultImage = '/images/no-dp.png';

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const token = Cookies.get('vendors_auth_token');

        if (!token) {
          throw new Error('User not authenticated');
        }

        const myHeaders = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${API_URL}profile`, {
          headers: myHeaders,
        });

        if (response.status === 200 && response.data.data) {
          const {
            fullname,
            gender,
            phone_number,
            email,
            street_no,
            street_address,
            city,
            state,
            govt_id_number,
            id_type,
            id_image,
            is_verified,
            profile_picture,
          } = response.data.data;

          setFullname(fullname);
          setGender(gender);
          setProfilePics(profile_picture);
          setPhoneNumber(phone_number);
          setVerified(is_verified);
          setEmail(email);
          setStreetNo(street_no);
          setStreetAddress(street_address);
          setCity(city);
          setState(state);
          setGovtIdNumber(govt_id_number);
          setIdType(id_type);
          setIdImage(id_image);
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const token = Cookies.get('vendors_auth_token');
      if (!token) {
        toast.error('User not authenticated.');
        return;
      }

      const formData = new FormData();
      formData.append('profile_picture', file);

      try {
        setIsUploading(true);
        const response = await axios.post(
          `${API_URL}upload-profile-picture`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success('Profile picture uploaded successfully!');
          setProfilePics(response.data.profile_picture_url);
        }
      } catch (error) {
        toast.error('Failed to upload profile picture.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = Cookies.get('vendors_auth_token');

      const myHeaders = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const formData = new FormData();
      formData.append('full_name', full_name);
      formData.append('gender', gender);
      formData.append('phone_number', phoneNumber);
      formData.append('email', email);
      formData.append('street_no', streetNo);
      formData.append('street_address', streetAddress);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('govt_id_number', govtIdNumber);
      formData.append('id_type', idType);

      if (idImage && typeof idImage !== 'string') {
        formData.append('id_image', idImage);
      }

      const response = await axios.post(`${API_URL}profile`, formData, {
        headers: myHeaders,
      });

      if (response.status === 200) {
        toast.success(response.data.message || 'Profile updated successfully');
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
        toast.error('An unknown error occurred!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='p-1'>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className='space-y-8'>
            {/* Profile Picture Section */}
            <div className='flex flex-col items-center gap-6 sm:flex-row sm:items-start'>
              <div className='flex flex-col items-center gap-4'>
                <div className='relative'>
                  <Avatar className='w-32 h-32 border-2 border-primary'>
                    <AvatarImage
                      src={profilePics || defaultImage}
                      alt='Profile picture'
                    />
                    <AvatarFallback>
                      {full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size='icon'
                    className='absolute bottom-0 right-0 w-8 h-8 rounded-full'
                    onClick={handleButtonClick}
                    disabled={isUploading}
                  >
                    <Camera className='w-4 h-4' />
                  </Button>
                  <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className='hidden'
                  />
                </div>

                <Badge
                  variant={is_verified == '1' ? 'success' : 'destructive'}
                  className='px-3 py-1'
                >
                  {is_verified == '1' ? (
                    <Check className='w-3 h-3 mr-1' />
                  ) : (
                    <X className='w-3 h-3 mr-1' />
                  )}
                  {is_verified == '1' ? 'Verified' : 'Unverified'}
                </Badge>
              </div>

              <div className='flex-1 space-y-2'>
                <h3 className='text-lg font-medium'>Profile Details</h3>
                <p className='text-sm text-muted-foreground'>
                  Update your personal information and contact details. This
                  information will be used for verification and communication
                  purposes.
                </p>
                {!is_verified && (
                  <div className='p-3 text-sm border rounded-md bg-amber-50 border-amber-200 text-amber-800'>
                    Your account is not yet verified. Please complete your
                    profile and upload a valid ID to get verified.
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Personal Information Section */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Basic Information</h3>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                <div className='space-y-2'>
                  <Label htmlFor='fullName'>Full Name</Label>
                  <Input
                    id='fullName'
                    value={full_name}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder='Enter your full name'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='gender'>Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id='gender'>
                      <SelectValue placeholder='Select gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Male'>Male</SelectItem>
                      <SelectItem value='Female'>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phoneNumber'>Phone Number</Label>
                  <Input
                    id='phoneNumber'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder='Enter your phone number'
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information Section */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Contact Information</h3>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
                <div className='space-y-2'>
                  <Label htmlFor='streetNo'>Street Number</Label>
                  <Input
                    id='streetNo'
                    value={streetNo}
                    onChange={(e) => setStreetNo(e.target.value)}
                    placeholder='Street No.'
                  />
                </div>

                <div className='space-y-2 md:col-span-2'>
                  <Label htmlFor='streetAddress'>Street Address</Label>
                  <Input
                    id='streetAddress'
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder='Street Address'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='city'>City</Label>
                  <Input
                    id='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='City'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='state'>State</Label>
                  <Input
                    id='state'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder='State'
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Identification Section */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Identification Details</h3>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='idType'>ID Type</Label>
                  <Select value={idType} onValueChange={setIdType}>
                    <SelectTrigger id='idType'>
                      <SelectValue placeholder='Select ID type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='passport'>Passport</SelectItem>
                      <SelectItem value='drivers_license'>
                        Driver's License
                      </SelectItem>
                      <SelectItem value='national_id'>National ID</SelectItem>
                      <SelectItem value='voters_card'>Voter's Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='govtIdNumber'>ID Number</Label>
                  <Input
                    id='govtIdNumber'
                    value={govtIdNumber}
                    onChange={(e) => setGovtIdNumber(e.target.value)}
                    placeholder='Enter your ID number'
                  />
                </div>

                <div className='space-y-2 sm:col-span-2'>
                  <Label htmlFor='idImage'>ID Document</Label>
                  <div className='flex items-center gap-4'>
                    {typeof idImage === 'string' && idImage ? (
                      <div className='relative w-32 h-20 overflow-hidden border rounded-md'>
                        <Image
                          src={idImage || '/placeholder.svg'}
                          alt='ID Document'
                          fill
                          className='object-cover'
                        />
                      </div>
                    ) : null}
                    <Input
                      id='idImage'
                      type='file'
                      accept='image/*'
                      onChange={(e) => setIdImage(e.target.files[0])}
                      className='max-w-sm'
                    />
                  </div>
                  <p className='mt-1 text-xs text-muted-foreground'>
                    Upload a clear image of your ID document. This will be used
                    for verification.
                  </p>
                </div>
              </div>
            </div>

            <div className='flex justify-end'>
              <Button variant={'primary'} type='submit' disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
