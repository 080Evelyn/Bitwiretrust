import React, { useEffect, useState } from 'react';
import { testimonials } from '../../constants';
import { Testimonial } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import './styles.css';

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
          <img src={testimonial.icon} className="testimonial-timestamp" alt=''></img>
        </div>
        <p className="testimonial-text">{testimonial.content}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const existingLink = document.getElementById('swiper-css');
      if (!existingLink) {
        const swiperCoreCSS = document.createElement('link');
        swiperCoreCSS.id = 'swiper-css';
        swiperCoreCSS.rel = 'stylesheet';
        swiperCoreCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/swiper/10.0.0/swiper-bundle.min.css';
        document.head.appendChild(swiperCoreCSS);
      }
    }
  }, [isMobile]);

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

      {isMobile ? (
        <div className="testimonials-swiper-container">
          <Swiper
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet testimonial-dot',
              bulletActiveClass: 'swiper-pagination-bullet-active testimonial-dot-active',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            spaceBetween={5}
            slidesPerView={1.25}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialItem testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="testimonials-list">
          {testimonials.map((testimonial) => (
            <TestimonialItem key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;