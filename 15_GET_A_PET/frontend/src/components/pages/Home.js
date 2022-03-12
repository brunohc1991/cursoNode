import api from '../../utils/api';
import {Link} from  'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Home.module.css';

function Home(){

    const [pets, setPets] = useState([]);
    useEffect(() => {
        api.get('/pets').then((response) => {
            setPets(response.data.pets);
        })
    }, [])

    return (
        <section>
            <div className={styles.pet_home_header}>
                <h1>Adote um PET</h1>
                <p>Veja os detalhes de cada um e conheça o tutor deles</p>
            </div>
            <div className={styles.pet_container}>
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div key={pet._id} className={styles.pet_card}>
                            <div 
                                style={{backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`, }} className={styles.pet_card_image} >
                            </div>
                            <h3>{pet.name}</h3>
                            <p><span className='bold'>Peso: {pet.weight} KG</span></p>
                            {pet.available ? 
                                (<Link to={`/pet/${pet._id}`}>Main detalhes</Link>) : 
                                (<p className={styles.adopted_text}>Já adotado</p>)}
                        </div>
                    ))
                )}
                {pets.length === 0 && (
                    <p>Nenhum PET cadastrado ou disponível para adoção</p>
                )}
            </div>
        </section>
    )
}

export default Home