import type { Metadata } from 'next';
import {
  ChevronRight,
  Shield,
  Eye,
  Database,
  Share2,
  Cookie,
  UserCheck,
  Globe,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Tramsfarms Marketplace',
  description:
    'Learn how Tramsfarms Marketplace collects, uses, and protects your personal information.',
};

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Header />
      <div className='min-h-screen bg-background'>
        {/* Header */}
        <div className='py-12 bg-primary'>
          <div className='container px-4 mx-auto'>
            <div className='flex items-center mb-4 text-sm text-white'>
              <Link href='/' className='transition-colors hover:text-primary'>
                Home
              </Link>
              <ChevronRight className='w-4 h-4 mx-2' />
              <span className='font-medium text-white'>Privacy Policy</span>
            </div>
            <h1 className='flex items-center text-4xl font-bold text-white'>
              <Shield className='w-8 h-8 mr-3 text-white' />
              Privacy Policy
            </h1>
            <p className='max-w-3xl mt-4 text-white'>
              Last updated: March 10, 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className='container px-4 py-12 mx-auto'>
          <div className='max-w-4xl mx-auto overflow-hidden bg-white shadow-sm rounded-xl'>
            <div className='p-8'>
              <div className='prose max-w-none'>
                <p className='mb-8 text-gray-600'>
                  At Tramsfarms Marketplace, we are committed to protecting your
                  privacy and ensuring the security of your personal
                  information. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you use our
                  platform. Please read this policy carefully to understand our
                  practices regarding your personal data.
                </p>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <Eye className='w-5 h-5 mr-2 text-primary' />
                    Information We Collect
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <h3 className='mb-2 text-xl font-medium text-gray-800'>
                      Personal Information
                    </h3>
                    <p className='mb-4 text-gray-600'>
                      We collect personal information that you voluntarily
                      provide to us when you register on our platform, express
                      interest in obtaining information about us or our
                      products, or otherwise contact us. This information may
                      include:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        Name, email address, phone number, and other contact
                        details
                      </li>
                      <li>Username, password, and profile information</li>
                      <li>Billing and payment information</li>
                      <li>Shipping address and delivery preferences</li>
                      <li>
                        Profile pictures and other content you choose to upload
                      </li>
                      <li>Communication preferences and marketing choices</li>
                    </ul>

                    <h3 className='mb-2 text-xl font-medium text-gray-800'>
                      Automatically Collected Information
                    </h3>
                    <p className='mb-4 text-gray-600'>
                      When you access or use our platform, we automatically
                      collect certain information, including:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        Device information (such as your IP address, browser
                        type, and operating system)
                      </li>
                      <li>
                        Usage data (such as pages visited, time spent on pages,
                        and links clicked)
                      </li>
                      <li>Location information (if you grant permission)</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <Database className='w-5 h-5 mr-2 text-primary' />
                    How We Use Your Information
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      We use the information we collect for various purposes,
                      including:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        Providing, maintaining, and improving our platform
                      </li>
                      <li>Processing transactions and fulfilling orders</li>
                      <li>
                        Facilitating communication between buyers and sellers
                      </li>
                      <li>Verifying your identity and preventing fraud</li>
                      <li>
                        Sending you administrative notifications and updates
                      </li>
                      <li>
                        Providing customer support and responding to inquiries
                      </li>
                      <li>
                        Personalizing your experience and delivering relevant
                        content
                      </li>
                      <li>Analyzing usage patterns to improve our services</li>
                      <li>
                        Sending marketing communications (with your consent)
                      </li>
                      <li>Complying with legal obligations</li>
                    </ul>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <Share2 className='w-5 h-5 mr-2 text-primary' />
                    Information Sharing and Disclosure
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      We may share your information in the following
                      circumstances:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        <strong>With Sellers and Buyers:</strong> To facilitate
                        transactions and communications between users of our
                        platform
                      </li>
                      <li>
                        <strong>Service Providers:</strong> With third-party
                        vendors who provide services on our behalf (such as
                        payment processing, data analysis, email delivery, and
                        customer service)
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In connection with
                        a merger, acquisition, or sale of all or a portion of
                        our assets
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> When required by
                        law or to protect our rights, privacy, safety, or
                        property
                      </li>
                      <li>
                        <strong>With Your Consent:</strong> In other cases where
                        we have your explicit consent
                      </li>
                    </ul>
                    <p className='mb-4 text-gray-600'>
                      We do not sell your personal information to third parties
                      for their marketing purposes without your explicit
                      consent.
                    </p>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <Cookie className='w-5 h-5 mr-2 text-primary' />
                    Cookies and Tracking Technologies
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      We use cookies and similar tracking technologies to
                      collect information about your browsing activities and to
                      remember your preferences. You can control cookies through
                      your browser settings and other tools. However, disabling
                      cookies may limit your ability to use certain features of
                      our platform.
                    </p>
                    <p className='mb-4 text-gray-600'>
                      We use the following types of cookies:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        <strong>Essential Cookies:</strong> Necessary for the
                        operation of our platform
                      </li>
                      <li>
                        <strong>Analytical/Performance Cookies:</strong> Allow
                        us to recognize and count visitors and analyze how users
                        navigate our platform
                      </li>
                      <li>
                        <strong>Functionality Cookies:</strong> Used to
                        recognize you when you return to our platform
                      </li>
                      <li>
                        <strong>Targeting Cookies:</strong> Record your visits
                        to our platform, the pages you visit, and the links you
                        follow
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <UserCheck className='w-5 h-5 mr-2 text-primary' />
                    Your Rights and Choices
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      Depending on your location, you may have certain rights
                      regarding your personal information, including:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        Accessing, correcting, or deleting your personal
                        information
                      </li>
                      <li>
                        Withdrawing your consent at any time (where processing
                        is based on consent)
                      </li>
                      <li>
                        Requesting restriction of processing of your personal
                        information
                      </li>
                      <li>Requesting transfer of your personal information</li>
                      <li>Opting out of marketing communications</li>
                      <li>
                        Objecting to processing of your personal information
                      </li>
                    </ul>
                    <p className='mb-4 text-gray-600'>
                      To exercise these rights, please contact us using the
                      information provided in the "Contact Us" section below.
                    </p>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <Globe className='w-5 h-5 mr-2 text-primary' />
                    International Data Transfers
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      Your information may be transferred to, and processed in,
                      countries other than the country in which you reside.
                      These countries may have data protection laws that are
                      different from the laws of your country.
                    </p>
                    <p className='mb-4 text-gray-600'>
                      When we transfer your information to other countries, we
                      will take appropriate measures to protect your information
                      and ensure that any transfers comply with applicable data
                      protection laws.
                    </p>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <Clock className='w-5 h-5 mr-2 text-primary' />
                    Data Retention
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      We retain your personal information for as long as
                      necessary to fulfill the purposes outlined in this Privacy
                      Policy, unless a longer retention period is required or
                      permitted by law. When determining how long to retain
                      information, we consider:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        The amount, nature, and sensitivity of the information
                      </li>
                      <li>
                        The potential risk of harm from unauthorized use or
                        disclosure
                      </li>
                      <li>The purposes for which we process the information</li>
                      <li>
                        Whether we can achieve those purposes through other
                        means
                      </li>
                      <li>
                        Applicable legal, regulatory, tax, accounting, or other
                        requirements
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <AlertTriangle className='w-5 h-5 mr-2 text-primary' />
                    Changes to This Privacy Policy
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      We may update this Privacy Policy from time to time to
                      reflect changes in our practices or for other operational,
                      legal, or regulatory reasons. We will notify you of any
                      material changes by posting the updated Privacy Policy on
                      this page and updating the "Last updated" date.
                    </p>
                    <p className='mb-4 text-gray-600'>
                      We encourage you to review this Privacy Policy
                      periodically to stay informed about how we collect, use,
                      and protect your information.
                    </p>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    Contact Us
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      If you have any questions, concerns, or requests regarding
                      this Privacy Policy or our privacy practices, please
                      contact us at:
                    </p>
                    <div className='p-4 mb-4 rounded-lg bg-gray-50'>
                      <p className='font-medium text-gray-700'>
                        Tramsfarms Marketplace
                      </p>
                      <p className='text-gray-600'>
                        Email: officialtramsfarms@gmail.com
                      </p>
                      <p className='text-gray-600'>Phone: +234813764153</p>
                    </div>
                    <p className='text-gray-600'>
                      We will respond to your request within a reasonable
                      timeframe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
