import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';
import api from '../../../utils/api';
import RoundedImage from '../../layouts/RoundedImage';
import styles from './Dashboard.module.css';

function MyPets(){
    const [pets, setPets] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');
    const {setFlashMessage} = useFlashMessage();

    useEffect(() => {
        api.get('/pets/mypets', {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets);
        });
    }, [token]);

    async function removePet(id){
        let msgType = 'success';
        const data = await api.delete(`/pets/${id}`, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedPets = pets.filter((pet) => pet._id !== id);
            setPets(updatedPets);
            return response.data;
        }).catch((e) => {
            msgType = 'error';
            return e.response.data;
        });

        setFlashMessage(data.message, msgType);
    }

    async function concludeAdoption(id){
        let msgType = 'success';
        const data = await api.patch(`/pets/conclude/${id}`, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            msgType = 'error';
            return error.response.data;
        });

        setFlashMessage(data.message, msgType);
    }

    return (
        <section>
            <div className={styles.petslist_header}>
                <h1>MyPets</h1>
                <Link to="/pet/add">Cadastrar PET</Link>
            </div>
            <div className={styles.petlist_contaienr}>
                {pets.length > 0 && (
                    <div>
                        {pets.map((pet) => (
                            <div key={pet._id} className={styles.petlist_row}>
                                <RoundedImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={pet.name} width="px75" />
                                <span className='bold'>{pet.name}</span>
                                <div className={styles.actions}>
                                    {pet.available ? (
                                            (
                                                <>
                                                    {pet.adopter && (
                                                        <button className={styles.conclude_btn} onClick={()=>{
                                                            concludeAdoption(pet._id)
                                                        }}>Concluir ado????o.</button>
                                                        )}
                                                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                                    <button onClick={() => {removePet(pet._id)}}>Excluir.</button>

                                                </>
                                            )
                                        ) : (
                                            <p>Pet j?? adotado!</p>
                                        )
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {pets.length === 0  && (<p>N??o h?? pets cadastrados</p>)}
            </div>
        </section>
    )
}

export default MyPets