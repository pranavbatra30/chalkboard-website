import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import GetChalkBoard from './pages/GetChalkBoard/GetChalkBoard';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse/TermsOfUse';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/get-chalkboard" element={<GetChalkBoard />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfUse />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
