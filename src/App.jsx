import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/layouts/header/Header';
import Footer from './components/layouts/footer/Footer';
import ScrollToHashElement from './utils/scrollToHashElement';

function App() {

  return (
    <div className='global'>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
        <ScrollToHashElement />
      </HashRouter>
    </div>
  )
}

export default App
