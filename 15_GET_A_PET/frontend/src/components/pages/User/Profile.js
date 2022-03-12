import styles from './Profile.module.css';
import formStyles from '../../form/Form.module.css';
import Input from '../../form/Input';
import {useState, useEffect} from 'react';
import api from '../../../utils/api';
import useFlashMessage from '../../../hooks/useFlashMessage';
import RoundedImage from '../../layouts/RoundedImage';

function Profile(){

    const [user, setUser] = useState({});
    const [preview, setPreview] = useState();
    const [token] = useState(localStorage.getItem('token') || '');
    const {setFlashMessage} = useFlashMessage();

    useEffect(() => {
        api.get('/users/checkUser',{
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data);
            console.log(user.img);
        })
    }, [token])

    function onFileChange(e){
        setPreview(e.target.files[0]);
        setUser({...user, [e.target.name] : e.target.files[0]});
    }

    function handleOnChange(e){
        setUser({...user, [e.target.name] : e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();

        let msgType = 'success'; 
        const formdata = new FormData();

        await Object.keys(user).forEach(key => {
            formdata.append(key, user[key]);
        });

        // await Object.keys(user).forEach((key) => 
        //     formdata.append(key, user[key])
        // );

        const data = await api.patch(`/users/edit/${user._id}`, formdata,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-type':'multipart/form-data'
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
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                {(user.img || preview) && (

                    <RoundedImage src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/users/${user.img}`} alt={user.name}/>
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input text="imagem" type="file" name="img" handleOnChange={onFileChange}/>
                <Input text="E-mail" type="email" name="email" placeholder="Digite seu e-mail" handleOnChange={handleOnChange} value={user.email || ''}/>
                <Input text="Nome" type="text" name="name" placeholder="Digite seu nome" handleOnChange={handleOnChange} value={user.name || ''}/>
                <Input text="Telefone" type="text" name="phone" placeholder="Digite seu telefone" handleOnChange={handleOnChange} value={user.phone || ''}/>
                <Input text="Senha" type="password" name="password" placeholder="Digite sua senha" handleOnChange={handleOnChange}/>
                <Input text="Confirmação de senha" type="password" name="confirmPassword" placeholder="Confirme sua senha" handleOnChange={handleOnChange}/>
                <Input type='submit' value="Editar"/>
            </form>
        </section>
    )
}

export default Profile