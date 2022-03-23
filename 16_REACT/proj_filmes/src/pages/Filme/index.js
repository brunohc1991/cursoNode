import { useParams, useNavigate } from 'react-router-dom'
import './filme.css'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

export default function Filme(){

    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [filme, setFilme] = useState([]);

    useEffect(() => {
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);
            if(response.data.length === 0){
                navigate('/');
                return;
            }
            setFilme(response.data);
            setLoading(false);
        }

        loadFilme();
        return () => {
            console.log('Desmontando')
        }

    },[navigate, id])


    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((item) => item.id === filme.id );

        if(hasFilme){
           toast.info('Este filme ja esta em seus favoritos');
           return;
        }
        
        filmesSalvos.push(filme);
        
        localStorage.setItem("filmes", JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');

    }

    if(loading){
        return(
            <div className='loading'>
                <h1>Carregando seu filme!</h1>
            </div>
        )
    }
    
    return(
        <div className='filme-info'>  
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome}/>
            <h3>Sinopse</h3>
            <p>{filme.sinopse}</p>

            <div className='botao'>
                <button onClick={salvaFilme}>Salvar</button>
                <button><a href={`https://youtube.com/results?search_query=${filme.nome} Trailer`} target="_blank">Trailer</a></button>
            </div>

        </div>
    )
    
}