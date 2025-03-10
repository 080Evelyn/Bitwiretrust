import { useState } from 'react'
import './styles.css'
import { faqData } from '../../constants';

type Props = {}

const Faqs = (_props: Props) => {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div id="faqs" className='faqs-container'>
        <div className='faqs-content'>
            <div className='faqs-header'>
            <p className="subtitle">FAQs</p>
            <h3 className="main-title">
            Here What The Public Has To Say About Us
            </h3>
            <p className="description">
            Find Out How Our Users Are Spreading The Word!
            </p>
            </div>
        </div>

        <div className="faq-grid">
        {faqData.map((item, index) => (
         <div
            key={index}
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.question}</span>
              <span className="icon">{openIndex === index ? '−' : '+'}</span>
            </button>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faqs