import { ChangeEvent, FormEvent, useState } from "react";
import { ContactData, ContactErrors } from "../../types";
import { MdPersonOutline, MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaArrowCircleRight } from "react-icons/fa";
import './styles.css'

type Props = {};

const Contact = (_props: Props) => {
  const [contactData, setContactData] = useState<ContactData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContactData({ ...contactData, [name]: value });

    if (errors[name as keyof ContactErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ContactErrors = {};
    if (!contactData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!contactData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      
    
      if (!contactData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!contactData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[0-9\s\-()]+$/.test(contactData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }

      if (!contactData.message.trim()) {
        newErrors.message = "Message is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
          setIsSubmitting(true);
          
          try {
            await new Promise(resolve => setTimeout(resolve, 1500));
           
            
            console.log('Form submitted successfully:', contactData);
            setSubmitSuccess(true);
            
            setContactData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              message: '',
            });
            
            setTimeout(() => {
              setSubmitSuccess(false);
            }, 3000);
          } catch (error) {
            console.error('Error submitting form:', error);
          } finally {
            setIsSubmitting(false);
          }
        }
  };
  return (<div className="contact-form-container">
    <div className="contact-form-header">
      <h1>Let's Talk</h1>
      <p className="subtitle">
        <span className="highlight">Reach out to us and let's discuss</span>, We are here to listen and help you achieve your goals
      </p>
    </div>
    
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">
            <MdPersonOutline /> 
            <span>First Name</span> 
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={contactData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">
            <MdPersonOutline /> 
            <span>Last Name</span> 
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={contactData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="email">
          <MdEmail /> 
         <span>Email</span> 
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          value={contactData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="phone">
          <FaPhone/> 
         <span>Phone</span> 
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+1-234-5678900"
          value={contactData.phone}
          onChange={handleChange}
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="message" className="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Write us a message"
          value={contactData.message}
          onChange={handleChange}
          className={errors.message ? 'error' : ''}
          rows={5}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>
      
      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send message'} 
        <FaArrowCircleRight />
      </button>
      
      {submitSuccess && (
        <div className="success-message">
          Your message has been sent successfully! We'll get back to you soon.
        </div>
      )}
    </form>
  </div>
  );
};

export default Contact;
