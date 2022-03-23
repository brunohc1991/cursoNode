import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header>
            <Link to="/contato">Contato</Link>
            <h2>Header da pagina</h2>
        </header>
    )
}