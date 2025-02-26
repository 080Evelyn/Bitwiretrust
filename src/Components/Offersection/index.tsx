import './styles.css'
import { bitcoin_ellipse, gift_card, payment, wifi } from '../../assets'

type Props = {}

const Offersection = (_props: Props) => {
  return (
    <div className='offer-container'>
        <div className="offer-content">
            <div>
            <span>we offer</span>
            <div className='first-content'>
                <h2>Discover a Smarter Way to Manage Your Finances </h2>
                <p>Experience the ultimate convenience in managing your digital finances. Our platform offers fast, secure, and user-friendly solutions designed to streamline your everyday transactions. </p>
            </div>
           </div>

            <div className='second-content'>
                <div className='box'>
                    <img src={payment} alt="" />
                    <h3>Utility Payment</h3>
                    <p>Easily Manage and Pay Your Utility Bills Online. Enjoy a Secure, User-Friendly Platform Designed to Save You Time and Effort.</p>
                </div>
                <div className='box'>
                    <img src={wifi} alt="" />
                    <h3>Virtual Top Ups </h3>
                    <p>Effortlessly recharge your VTU services with our secure platform, offering instant top-ups for data, airtime, and more, anytime and anywhere.</p>
                </div>
                <div className='box'>
                    <img src={gift_card} alt="" />
                    <h3>Trade Your Gift Cards </h3>
                    <p>Easily trade your gift cards for cash or credit with our reliable platform, ensuring fast transactions, competitive rates, and complete security.</p>
                </div>
                <div className='box'>
                    <img src={bitcoin_ellipse} alt="" />
                    <h3>Crypto Trading</h3>
                    <p>Shop the perfect gift cards for any occasion, featuring a secure platform, instant access, and a wide range of choices to match every preference.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Offersection