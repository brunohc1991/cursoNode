import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './favoritos.css'
import { toast } from 'react-toastify';

export default function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('filmes');
        setFavoritos(JSON.parse(minhaLista) || []);
    }, []);

    function excluirFilme(id){
        let filtroFilmes = favoritos.filter((item) => {
            return (item.id !== id)
        });

        setFavoritos(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes));
        toast.success('Filme excluido com sucesso!');
    }

  return (
    <div id='meus-fimles'>
        <h1>Meus favoritos</h1>
        {favoritos.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}
        <ul>
            {favoritos.map((item) => {
                return(
                    <li key={item.id}>
                        <span>{item.nome}</span>
                        <div>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button onClick={() => {excluirFilme(item.id)}}>Excluir</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
    
  )
}