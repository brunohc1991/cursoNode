import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../utils/api'
import styles from './PetDetails.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage';

function PetDetails() {
    const [pet, setPet] = useState({});
    const {id} = useParams();
    const {setFlashMessage} = useFlashMessage();
    const [token] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        }).catch((error) => {
            console.log(error)
        })
    }, [id]);

    async function schedule(){
        let msgType = 'success';
        const data = await api.patch(`/pets/schedule/${pet._id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-type':'multipart/form-data'
            }
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            msgType = 'error';
            return error.response.data;
        }, [token]);

        setFlashMessage(data.message, msgType);
    }

    return (
        <>
            {pet.name && (
                <section className={styles.pet_details_container}>
                    <div className={styles.pet_details_header}>
                        <h1>Conhecendo o PET: {pet.name}</h1>
                        <p>Se tiver interece, marque uma visita para conhece-lo pessoalmente</p>
                    </div>
                    <div className={styles.pet_images}>
                        {pet.images.map((img, index) => (
                            <img src={`${process.env.REACT_APP_API}/images/pets/${img}`} alt={pet.name} key={`${pet.name} + ${index}`}/>
                        ))}
                    </div>
                    <p>
                        <span className='bold'>Peso: {pet.weight} KG</span>
                    </p>
                    <p>
                        <span className='bold'>Idade: {pet.age} anos</span>
                    </p>
                    {token ? (
                        <button onClick={schedule}>Solicitar uma visita.</button>
                    ) : (
                        <p>Você precisa <Link to="/register">criar uma conta</Link> ou <Link to="/login">fazer o login</Link> para poder adotar um PET</p>
                    )}
                </section>
            )}
        </>
    )
}

export default PetDetails;