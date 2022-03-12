import {useState, useContext} from 'react';
import Input from '../../form/Input';
import styles from '../../form/Form.module.css';

/* CONTEXTO */
import {Context} from '../../../context/UserContext'
import { Link } from 'react-router-dom';


function Login(){

    const [user, setUser] = useState({});
    const {login} = useContext(Context);

    function handleOnChange(e){
        setUser({...user, [e.target.name] : e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        login(user);
        //Enviar usuario
    }
    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input text="E-mail" type="email" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleOnChange}></Input>
                <Input text="Senha" type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleOnChange}></Input>
                <Input type="submit" value="Entrar"></Input>
            </form>
            <p>Não possuir cadastro? <Link to="/register">Clique aqui.</Link></p>
        </section>
    )
}

export default Login