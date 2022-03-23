import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Contato from './pages/Contato';
import Error from './pages/Error';
import Home from './pages/Home'
import Produto from './pages/Produto';
import Sobre from './pages/Sobre';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/sobre" element={<Sobre />}/>
                <Route path="/contato" element={<Contato />}/>
                <Route path="/produto/:id" element={<Produto />}/>
                <Route path="*" element={<Error />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;