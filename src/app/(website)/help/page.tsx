import {
  Search,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  PlayCircle,
  HelpCircle,
  BookOpen,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { div } from 'framer-motion/client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function HelpPage() {
  // Common help topics
  const helpTopics = [
    {
      icon: <FileText className='w-6 h-6' />,
      title: 'Getting Started',
      description: 'Learn the basics of using our platform',
      articles: 12,
    },
    {
      icon: <BookOpen className='w-6 h-6' />,
      title: 'Account Management',
      description: 'Manage your account settings and preferences',
      articles: 8,
    },
    {
      icon: <PlayCircle className='w-6 h-6' />,
      title: 'Products & Orders',
      description: 'Information about products, orders, and shipping',
      articles: 15,
    },
    {
      icon: <AlertCircle className='w-6 h-6' />,
      title: 'Troubleshooting',
      description: 'Solutions to common problems',
      articles: 10,
    },
    {
      icon: <MessageCircle className='w-6 h-6' />,
      title: 'Seller Support',
      description: 'Help for sellers and vendors',
      articles: 9,
    },
    {
      icon: <HelpCircle className='w-6 h-6' />,
      title: 'Payments & Refunds',
      description: 'Information about payments, refunds, and billing',
      articles: 7,
    },
  ];

  // FAQ items
  const faqItems = [
    {
      question: 'How do I create an account?',
      answer:
        "To create an account, click on the 'Register' button in the top right corner of the homepage. Fill in your details in the registration form and follow the instructions to complete your account setup.",
    },
    {
      question: 'How can I track my order?',
      answer:
        "You can track your order by logging into your account and navigating to the 'Orders' section. Click on the specific order you want to track, and you'll see the current status and tracking information.",
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept various payment methods including credit/debit cards, bank transfers, Paystack, Flutterwave, and mobile money. All payment information is securely processed and encrypted.',
    },
    {
      question: 'How do I become a seller on your platform?',
      answer:
        "To become a seller, log in to your account and click on 'Become a Seller' in your account dashboard. Complete the seller application form, providing all required information about your business, and submit for review.",
    },
    {
      question: 'What is your return policy?',
      answer:
        "Our return policy allows returns within 14 days of receiving your order. The item must be in its original condition and packaging. To initiate a return, go to your order details and select 'Return Item'.",
    },
    {
      question: 'How long does shipping take?',
      answer:
        "Shipping times vary depending on your location and the seller's location. Typically, local deliveries take 1-3 business days, while interstate deliveries may take 3-7 business days. International shipping can take 7-14 business days.",
    },
  ];

  // Recent articles
  const recentArticles = [
    {
      title: 'How to optimize your product listings',
      category: 'Seller Tips',
      date: 'March 5, 2025',
    },
    {
      title: 'Understanding the new payment system',
      category: 'Payments',
      date: 'March 3, 2025',
    },
    {
      title: 'Tips for faster order processing',
      category: 'Orders',
      date: 'February 28, 2025',
    },
    {
      title: 'Securing your account with two-factor authentication',
      category: 'Security',
      date: 'February 25, 2025',
    },
  ];

  return (
    <div>
      <Header />
      <div className='container px-4 py-8 mx-auto max-w-7xl'>
        {/* Hero Section */}
        <section className='p-8 mb-12 text-white bg-gradient-to-r from-primary/90 to-primary rounded-2xl md:p-12'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='mb-4 text-3xl font-bold md:text-4xl'>
              How can we help you today?
            </h1>
            <p className='mb-8 text-lg opacity-90'>
              Search our knowledge base or browse categories below
            </p>

            <div className='relative max-w-2xl mx-auto'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Search className='w-5 h-5 text-white/70' />
              </div>
              <Input
                type='search'
                placeholder='Search for help articles...'
                className='w-full py-6 pl-10 text-white bg-white/20 border-white/30 placeholder:text-white/70 focus:bg-white/30 focus:ring-white/50 rounded-xl'
              />
              <Button className='absolute right-1.5 top-1.5 bg-white text-primary hover:bg-white/90'>
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Help Topics Grid */}
        <section className='mb-16'>
          <h2 className='mb-8 text-2xl font-bold text-center'>
            Browse Help Topics
          </h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {helpTopics.map((topic, index) => (
              <Card
                key={index}
                className='transition-shadow hover:shadow-md group'
              >
                <CardHeader className='flex flex-row items-start pb-2 space-x-4'>
                  <div className='p-2 rounded-lg bg-primary/10 text-primary'>
                    {topic.icon}
                  </div>
                  <div>
                    <CardTitle className='text-xl'>{topic.title}</CardTitle>
                    <CardDescription className='mt-1'>
                      {topic.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className='flex items-center justify-between pt-2'>
                  <span className='text-sm text-gray-500'>
                    {topic.articles} articles
                  </span>
                  <Button
                    variant='ghost'
                    className='transition-transform text-primary group-hover:translate-x-1'
                  >
                    View <ChevronRight className='w-4 h-4 ml-1' />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ and Contact Section */}
        <div className='grid grid-cols-1 gap-8 mb-16 lg:grid-cols-3'>
          {/* FAQ Section */}
          <div className='lg:col-span-2'>
            <h2 className='mb-6 text-2xl font-bold'>
              Frequently Asked Questions
            </h2>
            <Accordion
              type='single'
              collapsible
              className='bg-white shadow-sm rounded-xl'
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className='border-b last:border-b-0'
                >
                  <AccordionTrigger className='px-6 py-4 text-left hover:no-underline hover:bg-gray-50'>
                    <span className='font-medium'>{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className='px-6 pt-0 pb-4'>
                    <p className='text-gray-600'>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className='mt-4 text-center'>
              <Button variant='outline' className='text-primary'>
                View all FAQs <ArrowRight className='w-4 h-4 ml-2' />
              </Button>
            </div>
          </div>

          {/* Contact Support Section */}
          <div>
            <h2 className='mb-6 text-2xl font-bold'>Contact Support</h2>
            <Card className='border-0 bg-gray-50'>
              <CardHeader>
                <CardTitle className='text-xl'>Need more help?</CardTitle>
                <CardDescription>
                  Our support team is here to assist you
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center p-3 bg-white rounded-lg shadow-sm'>
                  <MessageCircle className='w-5 h-5 mr-3 text-primary' />
                  <div>
                    <h3 className='font-medium'>Live Chat</h3>
                    <p className='text-sm text-gray-500'>
                      Available 8am - 8pm WAT
                    </p>
                  </div>
                </div>
                <div className='flex items-center p-3 bg-white rounded-lg shadow-sm'>
                  <Phone className='w-5 h-5 mr-3 text-primary' />
                  <div>
                    <h3 className='font-medium'>Phone Support</h3>
                    <p className='text-sm text-gray-500'>+234 800 123 4567</p>
                  </div>
                </div>
                <div className='flex items-center p-3 bg-white rounded-lg shadow-sm'>
                  <Mail className='w-5 h-5 mr-3 text-primary' />
                  <div>
                    <h3 className='font-medium'>Email Support</h3>
                    <p className='text-sm text-gray-500'>
                      officialtramsfarms@gmail.com
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className='w-full bg-primary hover:bg-primary/90'>
                  Contact Support
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Video Tutorials and Recent Articles */}
        <div className='grid grid-cols-1 gap-8 mb-16 lg:grid-cols-2'>
          {/* Video Tutorials */}
          <div>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold'>Video Tutorials</h2>
              <Button variant='ghost' className='text-primary'>
                View all <ChevronRight className='w-4 h-4 ml-1' />
              </Button>
            </div>
            <div className='relative mb-4 overflow-hidden bg-gray-100 aspect-video rounded-xl'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <Button className='flex items-center justify-center w-16 h-16 rounded-full bg-primary/90 hover:bg-primary'>
                  <PlayCircle className='w-8 h-8' />
                </Button>
              </div>
              <img
                src='/placeholder.svg?height=400&width=600'
                alt='Tutorial thumbnail'
                className='object-cover w-full h-full'
              />
            </div>
            <h3 className='mb-2 text-xl font-medium'>
              Getting Started with Our Platform
            </h3>
            <p className='text-gray-600'>
              A comprehensive guide to help you navigate and make the most of
              our platform's features.
            </p>
          </div>

          {/* Recent Articles */}
          <div>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold'>Recent Articles</h2>
              <Button variant='ghost' className='text-primary'>
                View all <ChevronRight className='w-4 h-4 ml-1' />
              </Button>
            </div>
            <div className='space-y-4'>
              {recentArticles.map((article, index) => (
                <Card key={index} className='transition-shadow hover:shadow-sm'>
                  <CardHeader className='p-4'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='text-lg'>
                          {article.title}
                        </CardTitle>
                        <div className='flex items-center mt-2'>
                          <span className='px-2 py-1 text-xs rounded-full bg-primary/10 text-primary'>
                            {article.category}
                          </span>
                          <span className='ml-3 text-xs text-gray-500'>
                            {article.date}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='w-8 h-8 p-0 text-primary'
                      >
                        <ChevronRight className='w-5 h-5' />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Community Support */}
        <section className='p-8 mb-12 bg-gray-50 rounded-2xl'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='mb-4 text-2xl font-bold'>Join Our Community</h2>
            <p className='mb-6 text-gray-600'>
              Connect with other users, share experiences, and get help from our
              community of experts.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Button className='bg-primary hover:bg-primary/90'>
                Join Community Forum
              </Button>
              <Button variant='outline' className='text-primary'>
                View Knowledge Base
              </Button>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className='max-w-2xl mx-auto mb-8 text-center'>
          <h2 className='mb-4 text-xl font-medium'>
            Was this help center useful?
          </h2>
          <div className='flex justify-center gap-4'>
            <Button
              variant='outline'
              className='text-green-600 border-green-500 hover:bg-green-50'
            >
              Yes, it was helpful
            </Button>
            <Button
              variant='outline'
              className='text-red-600 border-red-500 hover:bg-red-50'
            >
              No, I need more help
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
