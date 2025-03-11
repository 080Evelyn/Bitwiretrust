import { a_vector, arrow_data, bitcoin, bitcoin_svg, ellipse, exchange, gift_card_svg, google_play, green_arrow, login_png, logo, menu, payment_svg, red_arrow, setting, user, wallet_done, white_logo, Xicon } from "../assets";
import { FAQItem, RateData, Testimonial, Transaction, TransactionRate, } from "../types";

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

  export default transactionData

  export const testimonials: Testimonial[] = [
    {
      id: '1',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: ellipse,
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      icon: Xicon,
    },
    {
      id: '2',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: user,
      },
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla',
      icon: Xicon,
    },
    {
      id: '3',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: ellipse,
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      icon: Xicon,
      
    },
    {
      id: '4',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: user,
      },
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl',
      icon: Xicon,
     
    },
    {
      id: '5',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: ellipse,
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      icon: Xicon,
     
    },
    {
      id: '6',
      author: {
        name: 'Okoro Emmanuel',
        username: 'activity',
        avatar: user,
      },
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl',
      icon: Xicon,
     
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

export const navLinks = [
  {
    to: "/home-dashboard",
    icon: menu,
    text: "Home",
  },
  {
    to: "/utility-payment",
    icon: payment_svg,
    text: "Utility Payment",
  },
  {
    to: "/virtual-topups",
    icon: arrow_data,
    text: "VirtualTopUps",
  },
  {
    to: "/trade-gift-cards",
    icon: gift_card_svg,
    text: "TradeGiftCards",
  },
  {
    to: "/crypto-trading",
    icon: bitcoin,
    text: "Crypto Trading",
  },
  {
    to: "/settings",
    icon: setting,
    text: "Settings",
  },
];

 export const bottomLinks = [
    {
      to: "/log-out",
      icon: login_png,
      text: "Log Out",
    },
    {
      to: "/switch-accounts",
      icon: exchange,
      text: "Switch Accounts",
    },
  ];

  export const giftcardRates: RateData[] = [
    { 
      id: 'amazon-1', 
      name: 'Amazon', 
      image: a_vector, 
      amount: '540,000.00', 
      icon: green_arrow
    },
    { 
      id: 'googleplay-2', 
      name: 'GooglePlay', 
      image: google_play, 
      amount: '120,000.00',
      icon: red_arrow
    },
    { 
      id: 'googleplay-3', 
      name: 'GooglePlay', 
      image: google_play, 
      amount: '120,000.00',
      icon: red_arrow
    },
    { 
      id: 'googleplay-4', 
      name: 'GooglePlay', 
      image: google_play, 
      amount: '120,000.00',
      icon: red_arrow
    },
    { 
      id: 'fortrite-5', 
      name: 'Fortrite', 
      image: bitcoin_svg, 
      amount: '120,000,000.00',
      icon: red_arrow
    },
    { 
      id: 'fortrite-6', 
      name: 'Fortrite', 
      image: bitcoin_svg, 
      amount: '120,000,000.00',
      icon: red_arrow
    },
    { 
      id: 'fortrite-7', 
      name: 'Fortrite', 
      image: bitcoin_svg, 
      amount: '120,000,000.00',
      icon: red_arrow
    },
  ];
  
  export const coinRates: RateData[] = [
    { 
      id: 'aave-1', 
      name: 'AAVE', 
      image: a_vector, 
      amount: '54,000.00', 
      icon: green_arrow
    },
    { 
      id: 'bitcoin-2', 
      name: 'Bitcoin', 
      image: google_play, 
      amount: '120,000,000.00',
      icon: red_arrow
    },
    { 
      id: 'googleplay-3', 
      name: 'GooglePlay', 
      image: google_play, 
      amount: '120,000,000.00',
      icon: red_arrow
    },
    { 
      id: 'googleplay-4', 
      name: 'GooglePlay', 
      image: google_play, 
      amount: '120,000,000.00',
      icon: red_arrow
    },
    { 
      id: 'fortrite-5', 
      name: 'Fortrite', 
      image: bitcoin_svg, 
      amount: '120,000,000.00',
      icon: red_arrow
    },
    { 
      id: 'fortrite-6', 
      name: 'Fortrite', 
      image: bitcoin_svg, 
      amount: '120,000,000.00',
      icon: red_arrow
    },
    { 
      id: 'fortrite-7', 
      name: 'Fortrite', 
      image: bitcoin_svg, 
      amount: '120,000,000.00',
      icon: red_arrow
    },
   
  ];
  
  export const transactions: TransactionRate[] = [
    { 
      id: '1', 
      image: wallet_done, 
      type: 'received', 
      amount: '0.3237788', 
      currency: 'BTC',
      description: 'You have recieved 0.3237788 BTC',
      subdescription: 'Your BTC wallet has been credited with received 0.3237788',
      status: 'green'
    },
    { 
      id: '2', 
      image: wallet_done, 
      type: 'transferred', 
      amount: '0.3237788', 
      currency: 'BTC',
      description: 'You have recieved 0.3237788 BTC',
      subdescription: 'Your BTC wallet has been debited with transferred 0.3237788 BTC',
      status: 'green'
    },
    { 
      id: '3', 
      image: wallet_done, 
      type: 'transferred', 
      amount: '0.3237788', 
      currency: 'BTC',
      description: 'You have recieved 0.3237788 BTC',
      subdescription: 'Your BTC wallet has been debited with transferred 0.3237788 BTC',
      status: 'green'
    },
    { 
      id: '4', 
      image: wallet_done, 
      type: 'transferred', 
      amount: '0.3237788', 
      currency: 'BTC',
      description: 'You have recieved 0.3237788 BTC',
      subdescription: 'Your BTC wallet has been debited with transferred 0.3237788 BTC',
      status: 'green'
    },
    { 
      id: '5', 
      image: wallet_done, 
      type: 'transferred', 
      amount: '0.3237788', 
      currency: 'BTC',
      description: 'You have recieved 0.3237788 BTC',
      subdescription: 'Your BTC wallet has been debited with transferred 0.3237788 BTC',
      status: 'green'
    },
    { 
      id: '6', 
      image: white_logo, 
      type: 'updated', 
      amount: '', 
      currency: '',
      description: 'Talk more, Always Stay Updated',
      subdescription: 'Top up your Airtime and mobile data and always stay updated on trending news.',
      status: 'orange'
    },
    { 
      id: '7', 
      image: white_logo, 
      type: 'updated', 
      amount: '', 
      currency: '',
      description: 'Talk more, Always Stay Updated',
      subdescription: 'Top up your Airtime and mobile data and always stay updated on trending news.',
      status: 'orange'
    }
  ];