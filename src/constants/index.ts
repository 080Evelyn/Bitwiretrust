import { ellipse, user } from "../assets";
import { FAQItem, Testimonial, Transaction, } from "../types";

const transactionData: Transaction[] = [
    {
      id: 1,
      type: 'withdrawal',
      amount: 78000.00,
      status: 'successful',
      date: '15th Apr, 2023',
      currency: 'NGN',
      value: ''
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: 45000.00,
      status: 'successful',
      date: '15th Apr, 2023',
      currency: 'NGN',
      value:''
    },
    {
      id: 3,
      type: 'deposit',
      amount: 92500.00,
      status: 'pending',
      date: '15th Apr, 2023',
      currency: 'NGN',
      value: '1 AAVE'
    },
    {
      id: 4,
      type: 'deposit',
      amount: 63750.00,
      status: 'pending',
      date: '15th Apr, 2023',
      currency: 'NGN',
      value:'1 AAVE'
    }
  ];
  
  export default transactionData;

  export const testimonials: Testimonial[] = [
    {
      id: '1',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: ellipse,
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      icon: '3h',
    },
    {
      id: '2',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: user,
      },
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla',
      icon: '3h',
    },
    {
      id: '3',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: ellipse,
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      icon: '3h',
      
    },
    {
      id: '4',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: user,
      },
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl',
      icon: '3h',
     
    },
    {
      id: '5',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: ellipse,
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      icon: '3h',
     
    },
    {
      id: '6',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: user,
      },
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl',
      icon: '3h',
     
    },
]

export const faqData: FAQItem[] = [
  {
    question: "What services does this platform provide?",
    answer: "We offer secure solutions for utility payments, VTU recharge, gift card trading, and purchasing a variety of gift cards, all in one convenient platform."
  },
  {
    question: "How long do transactions take to process?",
    answer: "Most transactions are processed instantly. However, some transactions may take up to 24 hours depending on the type of service."
  },
  {
    question: "What types of gift cards can I trade or purchase?",
    answer: "We support a wide range of popular gift cards including Amazon, iTunes, Google Play, and many more international brands."
  },
  {
    question: "How secure is my personal and financial information?",
    answer: "We use industry-standard encryption and security measures to protect all your personal and financial information."
  },
  {
    question: "Can I track my transaction history?",
    answer: "Yes, you can easily track all your transactions through your account dashboard."
  },
  {
    question: "Is customer support available if I face any issues?",
    answer: "Yes, our customer support team is available 24/7 to assist you with any issues or questions."
  }
];