import { Link } from "react-router-dom";
import './notfound.css'

export default function Notfound(){
    return(
        <div className="container">
            <h1>404</h1>
            <h2>Pagina não encontrada</h2>
            <Link to="/">Veja todos os filmes</Link>
        </div>
    )
}