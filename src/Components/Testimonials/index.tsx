import React from 'react'
import './styles.css'
import { testimonials } from '../../constants';
import { Testimonial } from '../../types';


interface TestimonialItemProps {
  testimonial: Testimonial;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ testimonial }) => {
  return (
    <div className="testimonial-item">
      <div className="testimonial-content">
        <div className="testimonial-header">
          <div className='testimonial-header-img'>
            <img 
              src={testimonial.author.avatar} 
              alt={testimonial.author.name} 
              className='testimonial-avatar'
            />
            <div className="testimonial-header-info">
              <p className="testimonial-author-name">{testimonial.author.name}</p>
              <span className="testimonial-author-username">@{testimonial.author.username}</span>
            </div>
          </div>
          <span className="testimonial-timestamp">{testimonial.icon}</span>
        </div>
        <p className="testimonial-text">{testimonial.content}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <div className='testimonials-container'>
      <div className='testimonials-content'>
        <div className='testimonials-header'>
          <span>Testimonials</span>
          <h3>
            Here What The Public Has To Say About Us
          </h3>
          <p>
            Find Out How Our Users Are Spreading The Word!
          </p>
        </div>
      </div>

      <div className="testimonials-list">
        {testimonials.map((testimonial) => (
          <TestimonialItem key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials