import type { Metadata } from 'next';
import {
  ChevronRight,
  Truck,
  Info,
  AlertTriangle,
  Clock,
  MapPin,
  ShieldCheck,
  HelpCircle,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Delivery Options | Tramsfarm Marketplace',
  description:
    'Learn about delivery options and how shipping works on Tramsfarm Marketplace.',
};

const DeliveryOptionsPage = () => {
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
              <span className='font-medium text-white'>Delivery Options</span>
            </div>
            <h1 className='flex items-center text-4xl font-bold text-white'>
              <Truck className='w-8 h-8 mr-3 text-white' />
              Delivery Options
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
                        <strong>Important Note:</strong> Tramsfarm Marketplace
                        does not provide delivery services directly. All
                        deliveries are handled by the individual sellers on our
                        platform. This page explains how delivery works through
                        our sellers and what you can expect as a buyer.
                      </p>
                    </div>
                  </div>
                </div>

                <p className='mb-8 text-gray-600'>
                  At Tramsfarm Marketplace, we connect buyers with independent
                  sellers who manage their own delivery processes. This page
                  outlines how delivery works on our platform, what to expect,
                  and how to track your orders.
                </p>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <Info className='w-5 h-5 mr-2 text-primary' />
                    How Delivery Works
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      When you place an order on Tramsfarm Marketplace, the
                      following process occurs:
                    </p>
                    <ol className='pl-6 mb-6 space-y-4 text-gray-600 list-decimal'>
                      <li>
                        <strong>Order Confirmation:</strong> Once your payment
                        is processed, the order is confirmed and sent to the
                        seller.
                      </li>
                      <li>
                        <strong>Seller Processing:</strong> The seller prepares
                        your order and arranges for delivery.
                      </li>
                      <li>
                        <strong>Shipping Method Selection:</strong> The seller
                        chooses an appropriate shipping method based on their
                        policies and your location.
                      </li>
                      <li>
                        <strong>Dispatch Notification:</strong> You'll receive a
                        notification when your order has been dispatched, often
                        with tracking information if available.
                      </li>
                      <li>
                        <strong>Delivery:</strong> The package is delivered to
                        your specified address by the seller's chosen delivery
                        service.
                      </li>
                      <li>
                        <strong>Delivery Confirmation:</strong> Once delivered,
                        you'll be asked to confirm receipt of your order.
                      </li>
                    </ol>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <Truck className='w-5 h-5 mr-2 text-primary' />
                    Seller Delivery Methods
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      Sellers on our platform may use various delivery methods,
                      including:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        <strong>Local Delivery Services:</strong> Sellers may
                        use local courier services for deliveries within their
                        region.
                      </li>
                      <li>
                        <strong>National Postal Services:</strong> For domestic
                        shipments, sellers often use the national postal
                        service.
                      </li>
                      <li>
                        <strong>Commercial Courier Services:</strong> Many
                        sellers partner with established courier companies like
                        DHL, FedEx, or UPS.
                      </li>
                      <li>
                        <strong>In-House Delivery:</strong> Some sellers,
                        especially local businesses, may have their own delivery
                        personnel.
                      </li>
                      <li>
                        <strong>Third-Party Logistics (3PL):</strong> Larger
                        sellers might use 3PL providers to handle their shipping
                        needs.
                      </li>
                    </ul>
                    <p className='mb-4 text-gray-600'>
                      The specific delivery methods available for each product
                      will be listed on the product page or during checkout.
                    </p>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <Clock className='w-5 h-5 mr-2 text-primary' />
                    Delivery Timeframes
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      Delivery timeframes vary depending on several factors:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        <strong>Seller Location:</strong> Products from sellers
                        closer to your location typically arrive faster.
                      </li>
                      <li>
                        <strong>Product Availability:</strong> In-stock items
                        ship more quickly than made-to-order products.
                      </li>
                      <li>
                        <strong>Delivery Method:</strong> Express shipping
                        options are faster but may cost more.
                      </li>
                      <li>
                        <strong>Destination:</strong> Rural or remote areas may
                        have longer delivery times.
                      </li>
                      <li>
                        <strong>Customs Clearance:</strong> International orders
                        may be subject to customs delays.
                      </li>
                    </ul>
                    <p className='mb-4 text-gray-600'>
                      Each seller provides estimated delivery timeframes on
                      their product listings. These are typically:
                    </p>
                    <div className='overflow-x-auto'>
                      <table className='min-w-full mb-6 bg-white border border-gray-200'>
                        <thead>
                          <tr>
                            <th className='px-4 py-2 text-left border-b'>
                              Delivery Type
                            </th>
                            <th className='px-4 py-2 text-left border-b'>
                              Estimated Timeframe
                            </th>
                            <th className='px-4 py-2 text-left border-b'>
                              Notes
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='px-4 py-2 border-b'>
                              Local Delivery
                            </td>
                            <td className='px-4 py-2 border-b'>
                              1-3 business days
                            </td>
                            <td className='px-4 py-2 border-b'>
                              For deliveries within the same city/region
                            </td>
                          </tr>
                          <tr>
                            <td className='px-4 py-2 border-b'>
                              Standard Domestic
                            </td>
                            <td className='px-4 py-2 border-b'>
                              3-7 business days
                            </td>
                            <td className='px-4 py-2 border-b'>
                              Most common for nationwide shipping
                            </td>
                          </tr>
                          <tr>
                            <td className='px-4 py-2 border-b'>
                              Express Domestic
                            </td>
                            <td className='px-4 py-2 border-b'>
                              1-2 business days
                            </td>
                            <td className='px-4 py-2 border-b'>
                              Premium option, higher cost
                            </td>
                          </tr>
                          <tr>
                            <td className='px-4 py-2 border-b'>
                              International Standard
                            </td>
                            <td className='px-4 py-2 border-b'>
                              7-21 business days
                            </td>
                            <td className='px-4 py-2 border-b'>
                              Subject to customs clearance
                            </td>
                          </tr>
                          <tr>
                            <td className='px-4 py-2 border-b'>
                              International Express
                            </td>
                            <td className='px-4 py-2 border-b'>
                              3-7 business days
                            </td>
                            <td className='px-4 py-2 border-b'>
                              Premium international option
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <MapPin className='w-5 h-5 mr-2 text-primary' />
                    Delivery Areas
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      Each seller specifies the areas they deliver to. This
                      information is available on the product page or during
                      checkout.
                    </p>
                    <p className='mb-4 text-gray-600'>Some sellers may:</p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>Deliver only within their local area or region</li>
                      <li>Ship nationwide but exclude certain remote areas</li>
                      <li>Offer international shipping to select countries</li>
                      <li>Deliver everywhere with varying shipping costs</li>
                    </ul>
                    <p className='mb-4 text-gray-600'>
                      If a seller doesn't deliver to your location, you'll be
                      notified during the checkout process.
                    </p>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <ShieldCheck className='w-5 h-5 mr-2 text-primary' />
                    Delivery Guarantees and Protection
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>
                      While Tramsfarm Marketplace doesn't directly handle
                      deliveries, we do provide certain protections:
                    </p>
                    <ul className='pl-6 mb-6 space-y-2 text-gray-600 list-disc'>
                      <li>
                        <strong>Buyer Protection:</strong> Your payment is held
                        securely until you confirm receipt of your order in the
                        condition described.
                      </li>
                      <li>
                        <strong>Seller Standards:</strong> We require all
                        sellers to maintain certain delivery standards and
                        provide accurate shipping information.
                      </li>
                      <li>
                        <strong>Dispute Resolution:</strong> If your order
                        doesn't arrive or arrives damaged, you can open a
                        dispute through our platform.
                      </li>
                      <li>
                        <strong>Delivery Tracking:</strong> We encourage sellers
                        to provide tracking information for all shipments.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <FileText className='w-5 h-5 mr-2 text-primary' />
                    Tracking Your Order
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <p className='mb-4 text-gray-600'>To track your order:</p>
                    <ol className='pl-6 mb-6 space-y-2 text-gray-600 list-decimal'>
                      <li>Log in to your Tramsfarm Marketplace account</li>
                      <li>Go to "My Orders" in your account dashboard</li>
                      <li>Select the order you want to track</li>
                      <li>
                        Click on "Track Order" if tracking information is
                        available
                      </li>
                    </ol>
                    <p className='mb-4 text-gray-600'>
                      If tracking information is not available or you have
                      concerns about your delivery, you can contact the seller
                      directly through our messaging system.
                    </p>
                  </div>
                </div>

                <div className='mb-10'>
                  <h2 className='flex items-center mb-4 text-2xl font-semibold text-gray-800'>
                    <HelpCircle className='w-5 h-5 mr-2 text-primary' />
                    Frequently Asked Questions
                  </h2>
                  <div className='border-l-2 border-gray-100 pl-7'>
                    <div className='space-y-6'>
                      <div>
                        <h3 className='mb-2 text-lg font-medium text-gray-800'>
                          What if my order doesn't arrive?
                        </h3>
                        <p className='text-gray-600'>
                          If your order doesn't arrive within the estimated
                          delivery timeframe, first check the tracking
                          information if available. If there's no update or the
                          tracking shows an issue, contact the seller directly.
                          If you can't resolve the issue with the seller, you
                          can open a dispute through our platform.
                        </p>
                      </div>

                      <div>
                        <h3 className='mb-2 text-lg font-medium text-gray-800'>
                          Can I change my delivery address after placing an
                          order?
                        </h3>
                        <p className='text-gray-600'>
                          Address changes after order placement are at the
                          seller's discretion. Contact the seller immediately if
                          you need to change your delivery address. If the order
                          has already been dispatched, it may not be possible to
                          change the address.
                        </p>
                      </div>

                      <div>
                        <h3 className='mb-2 text-lg font-medium text-gray-800'>
                          Do sellers offer same-day delivery?
                        </h3>
                        <p className='text-gray-600'>
                          Some sellers may offer same-day delivery for local
                          orders. This option, if available, will be clearly
                          indicated on the product page or during checkout.
                        </p>
                      </div>

                      <div>
                        <h3 className='mb-2 text-lg font-medium text-gray-800'>
                          What happens if I'm not available to receive my
                          delivery?
                        </h3>
                        <p className='text-gray-600'>
                          Delivery procedures for missed deliveries vary by
                          seller and their chosen delivery service. Typically,
                          the delivery person will leave a note with
                          instructions for rescheduling or picking up your
                          package. Some services may attempt delivery again the
                          next business day.
                        </p>
                      </div>

                      <div>
                        <h3 className='mb-2 text-lg font-medium text-gray-800'>
                          Are there additional fees for delivery?
                        </h3>
                        <p className='text-gray-600'>
                          Delivery fees are set by individual sellers and vary
                          based on factors like package size, weight,
                          destination, and shipping method. All applicable fees
                          will be clearly displayed during the checkout process
                          before you complete your purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-6 mb-8 rounded-lg bg-gray-50'>
                  <h2 className='mb-4 text-xl font-semibold text-gray-800'>
                    Contact Us
                  </h2>
                  <p className='mb-4 text-gray-600'>
                    If you have any questions about delivery on our platform,
                    please contact us:
                  </p>
                  <ul className='space-y-2 text-gray-600'>
                    <li>Email: officialtramsfarms@gmail.com</li>
                    <li>Phone: +234813764153</li>
                    <li>
                      Contact form:{' '}
                      <Link
                        href='/chat'
                        className='text-primary hover:underline'
                      >
                        Chat With Us
                      </Link>
                    </li>
                  </ul>
                </div>

                <p className='text-sm italic text-gray-500'>
                  This Delivery Options page was last updated on March 10, 2025
                  and is subject to change as our platform evolves.
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

export default DeliveryOptionsPage;
