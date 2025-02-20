import Faqs from "../../Components/Faqs"
import Footer from "../../Components/Footer"
import Herosection from "../../Components/Herosection"
import Testimonials from "../../Components/Testimonials"
import Whysection from "../../Components/Whysection"

const Home = () => {
  return (
    <>
      <Herosection />
      <Whysection />
      <Testimonials />
      <Faqs />
      <Footer />
    </>
    
  )
}

export default Home