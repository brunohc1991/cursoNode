import { Link } from "react-router-dom"
import Input from "../../form/Input"
import style from "../../form/Form.module.css"
import { useContext, useState } from "react"
import { Context } from "../../../context/UserContext"

function Register(){

    const {register} = useContext(Context);
    const [user, setUser] = useState({});

    function handleChange(e){
        setUser({...user, [e.target.name] : e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        register(user);
        //Enviar usuario
    }


    return (
        <section className={style.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>  
                <Input text="Nome" type="text" name="name" placeholder="Digite seu nome" handleOnChange={handleChange}/>
                <Input text="Telefone" type="text" name="phone" placeholder="Digite seu telefone" handleOnChange={handleChange}/>
                <Input text="E-mail" type="email" name="email" placeholder="Digite seu e-mail" handleOnChange={handleChange}/>
                <Input text="Senha" type="password" name="password" placeholder="Digite sua senha" handleOnChange={handleChange}/>
                <Input text="Confirmação de senha" type="password" name="confirmPassword" placeholder="Digite sua senha novamente" handleOnChange={handleChange}/>
                <Input value="Cadastrar" type="submit"/>
            </form>
            <p>
                Já tem uma conta? <Link to="/login">Clique aqui</Link>
            </p>
        </section>
    )
}

export default Register