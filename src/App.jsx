import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import Projects from './components/Projects';
import Process from './components/Process';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTAForm from './components/CTAForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="landing">
      <Header />
      <main>
        <Hero />
        <Calculator />
        <Projects />
        <Process />
        <Team />
        <Testimonials />
        <FAQ />
        <CTAForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
