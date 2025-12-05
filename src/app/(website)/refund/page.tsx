import type { Metadata } from 'next';
import {
  ChevronRight,
  RotateCcw,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  HelpCircle,
  FileText,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Return & Refund Policy | Tramsfarms Marketplace',
  description:
    'Learn about our return and refund policies for products purchased on Tramsfarms Marketplace.',
};

const ReturnPolicyPage = () => {
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
              <ChevronRight className='w-4 h-4 mx-2 text-white' />
              <span className='font-medium text-white'>
                Return & Refund Policy
              </span>
            </div>
            <h1 className='flex items-center text-4xl font-bold text-white'>
              <RotateCcw className='w-8 h-8 mr-3 text-white' />
              Return & Refund Policy
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
                <div className='p-4 mb-8 border-l-4 border-yellow-400 rounded bg-yellow-50'>
                  <div className='flex'>
                    <div className='flex-shrink-0'>
                      <AlertTriangle className='w-5 h-5 text-yellow-400' />
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm text-yellow-700'>
                        <strong>Important Note:</strong> Tramsfarms Marketplace
                        is a platform that connects buyers with independent
                        sellers. All returns and refunds are handled directly by
                        the sellers according to their individual policies,
                        which must comply with our marketplace guidelines
                        outlined below.
                      </p>
                    </div>
                  </div>
                </div>

                <p className='mb-8 text-gray-600'>
                  At Tramsfarms Marketplace, we want to ensure a fair and
                  transparent return and refund process for all users. This
                  policy outlines the general guidelines that all sellers on our
                  platform must follow, as well as the process for requesting
                  returns and refunds.
                </p>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <Clock className='w-5 h-5 mr-2 text-primary' />
                    Return Timeframe
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      All sellers on Tramsfarms Marketplace must accept returns
                      within a minimum of 7 days from the date of delivery. Some
                      sellers may offer extended return periods, which will be
                      clearly indicated on their product listings.
                    </p>
                    <p className='mb-4 text-gray-600'>
                      To be eligible for a return, your request must be
                      initiated within the specified timeframe, and you must
                      have proof of purchase (order confirmation or receipt).
                    </p>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <CheckCircle className='w-5 h-5 mr-2 text-primary' />
                    Return Eligibility
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      The following conditions must be met for a return to be
                      eligible:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        The item must be unused, unworn, and in its original
                        condition
                      </li>
                      <li>
                        The item must be in its original packaging with all tags
                        attached
                      </li>
                      <li>
                        You must have proof of purchase (order confirmation or
                        receipt)
                      </li>
                      <li>
                        The return request must be initiated within the
                        specified timeframe
                      </li>
                    </ul>

                    <h3 className='mb-2 text-xl font-medium text-gray-800'>
                      Valid Reasons for Returns
                    </h3>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>Item received is damaged or defective</li>
                      <li>
                        Item received is significantly different from the
                        description
                      </li>
                      <li>Incorrect item was delivered</li>
                      <li>
                        Item is missing parts or accessories as advertised
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <XCircle className='w-5 h-5 mr-2 text-primary' />
                    Non-Returnable Items
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      The following items are generally not eligible for return:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        Perishable goods (such as food, flowers, or plants)
                      </li>
                      <li>Custom or personalized items</li>
                      <li>Digital products or downloadable items</li>
                      <li>Items that have been used, worn, or altered</li>
                      <li>
                        Items marked as "final sale," "non-returnable," or "as
                        is"
                      </li>
                      <li>
                        Intimate or sanitary items for health and hygiene
                        reasons
                      </li>
                      <li>Hazardous materials or flammable liquids or gases</li>
                    </ul>
                    <p className='mb-4 text-gray-600'>
                      Sellers may specify additional non-returnable items in
                      their individual policies, which will be clearly indicated
                      on their product listings.
                    </p>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <FileText className='w-5 h-5 mr-2 text-primary' />
                    Return Process
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      To initiate a return, please follow these steps:
                    </p>
                    <ol className='pl-6 mb-6 space-y-4 text-gray-600 list-decimal'>
                      <li>
                        <strong>Contact the Seller:</strong> Message the seller
                        directly through our platform to inform them of your
                        intention to return the item. Include your order number,
                        the reason for the return, and photos if applicable
                        (especially for damaged or defective items).
                      </li>
                      <li>
                        <strong>Wait for Approval:</strong> The seller will
                        review your return request and respond within 2 business
                        days. If approved, they will provide you with return
                        instructions.
                      </li>
                      <li>
                        <strong>Package the Item:</strong> Securely package the
                        item in its original packaging with all tags attached.
                        Include a copy of your order confirmation or receipt.
                      </li>
                      <li>
                        <strong>Ship the Item:</strong> Ship the item back to
                        the seller using the method specified in their
                        instructions. We recommend using a trackable shipping
                        method.
                      </li>
                      <li>
                        <strong>Refund Processing:</strong> Once the seller
                        receives and inspects the returned item, they will
                        process your refund according to their refund policy.
                      </li>
                    </ol>
                    <p className='mb-4 text-gray-600'>
                      <strong>Note:</strong> Return shipping costs are typically
                      the responsibility of the buyer, unless the return is due
                      to a seller error (such as sending the wrong item) or the
                      item being defective.
                    </p>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <DollarSign className='w-5 h-5 mr-2 text-primary' />
                    Refund Process
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      Once your return is received and inspected by the seller,
                      they will process your refund according to the following
                      guidelines:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        <strong>Full Refunds:</strong> If the item is returned
                        in its original condition and meets all eligibility
                        requirements, you will receive a full refund of the
                        purchase price.
                      </li>
                      <li>
                        <strong>Partial Refunds:</strong> If the item shows
                        signs of use, is missing parts, or is not in its
                        original condition, the seller may offer a partial
                        refund.
                      </li>
                      <li>
                        <strong>Refund Method:</strong> Refunds will be issued
                        to the original payment method used for the purchase.
                      </li>
                      <li>
                        <strong>Refund Timeframe:</strong> Refunds typically
                        take 5-10 business days to process, depending on your
                        payment provider.
                      </li>
                      <li>
                        <strong>Shipping Costs:</strong> Original shipping costs
                        are generally non-refundable, unless the return is due
                        to a seller error.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <AlertTriangle className='w-5 h-5 mr-2 text-primary' />
                    Damaged or Defective Items
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      If you receive a damaged or defective item:
                    </p>
                    <ol className='pl-6 mb-6 space-y-2 text-gray-600 list-decimal'>
                      <li>
                        Contact the seller within 48 hours of receiving the item
                      </li>
                      <li>Provide clear photos of the damage or defect</li>
                      <li>Do not discard the original packaging</li>
                      <li>
                        The seller will provide instructions for return or
                        replacement
                      </li>
                    </ol>
                    <p className='mb-4 text-gray-600'>
                      For damaged or defective items, return shipping costs will
                      typically be covered by the seller.
                    </p>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <HelpCircle className='w-5 h-5 mr-2 text-primary' />
                    Dispute Resolution
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      If you are unable to resolve a return or refund issue
                      directly with the seller, you can open a dispute through
                      our platform:
                    </p>
                    <ol className='pl-6 mb-6 space-y-2 text-gray-600 list-decimal'>
                      <li>
                        Go to your order history and select the order in
                        question
                      </li>
                      <li>
                        Click on "Open Dispute" and provide all relevant
                        information
                      </li>
                      <li>
                        Our customer support team will review the case and
                        mediate between you and the seller
                      </li>
                      <li>
                        A decision will be made based on our marketplace
                        policies and the evidence provided
                      </li>
                    </ol>
                    <p className='mb-4 text-gray-600'>
                      Disputes must be opened within 30 days of the delivery
                      date.
                    </p>
                  </div>
                </div>

                <div className='p-6 mb-8 rounded-lg bg-gray-50'>
                  <h2 className='mb-4 text-xl font-semibold text-gray-800'>
                    Contact Us
                  </h2>
                  <p className='mb-4 text-gray-600'>
                    If you have any questions about our Return and Refund
                    Policy, please contact us:
                  </p>
                  <ul className='space-y-2 text-gray-600'>
                    <li>Email: officialtramsfarms@gmail.com</li>
                    <li>Phone: +234813764153</li>
                    <li>
                      Contact form:{' '}
                      <Link
                        href='/contact-us'
                        className='text-primary hover:underline'
                      >
                        Contact Us Page
                      </Link>
                    </li>
                  </ul>
                </div>

                <p className='text-sm italic text-gray-500'>
                  This Return and Refund Policy was last updated on March 10,
                  2025 and applies to all purchases made on or after this date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReturnPolicyPage;
