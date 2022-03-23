import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './App'
import Header from './components/Header'
import Favoritos from './pages/Favoritos'
import Filme from './pages/Filme'
import Home from './pages/Home'
import Notfound from './pages/Notfound'

const Rotas = () => {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route  path='/' element={<Home />}/>
                <Route  path='*' element={<Notfound />}/>
                <Route  path='/filme/:id' element={<Filme />}/>
                <Route  path='/favoritos' element={<Favoritos />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;