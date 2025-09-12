import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/layouts/header/Header';
import Footer from './components/layouts/footer/Footer';
import ScrollToHashElement from './utils/scrollToHashElement';

function App() {

  return (
    <div className='global'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
        <ScrollToHashElement />
      </BrowserRouter>
    </div>
  )
}

export default App
