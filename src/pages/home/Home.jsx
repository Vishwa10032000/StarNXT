import Hero from "../../components/hero/Hero"
import Problems from "../../components/problems/Problems"
import Solutions from "../../components/solutions/Solutions"
import Testimonial from "../../components/testimonial/Testimonial"
import Brands from "../../components/brands/Brands"
import Contact from "../../components/contact/Contact"
import About from "../../components/about/About"

const Home = () => {
  return (
    <div>
      <Hero />  
      <About />
      <Problems/>
      <Solutions/>
      <Testimonial/>
      <Brands />
      <Contact />
    </div>
  )
}

export default Home