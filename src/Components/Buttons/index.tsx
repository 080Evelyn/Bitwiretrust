import React from 'react'
import { ButtonsProps } from '../../types';
import './styles.css'

  const Buttons: React.FC<ButtonsProps> = ({ 
    variant = 'primary', 
    children, 
    onClick,
    iconSrc,
    altText = 'icon',
    iconPosition = "left",
    className
  }) => {
    return (
      <button className={`button ${variant} ${className || ""}`} onClick={onClick}>
      {children}
      {iconSrc && iconPosition === "right" && (
        <img src={iconSrc} alt={altText} className="button-icon" />
      )}
    </button>
    );
  };
export default Buttons;