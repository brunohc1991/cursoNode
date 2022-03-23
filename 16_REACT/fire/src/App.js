import './styles.css'
import firebase from "./firebaseConnection";
import { useEffect, useState } from 'react';

function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState('');
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const [isLogado, setIsLogado] = useState(false);
  const [user, setUser] = useState({});
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  

  useEffect(() => {
    async function loadPosts(){
      await firebase.firestore().collection('posts').onSnapshot((doc) => {
        let lista = [];
        doc.forEach((item) => {
          lista.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor
          })
        });

        setPosts(lista);
      })
    }

    loadPosts();
  }, [])

  useEffect(() => {
    async function checkLogin(){
      await firebase.auth().onAuthStateChanged((user) => {
        if(user){
          setUser({
            uid: user.uid,
            email: user.email,
          });
          setIsLogado(true);
        } else {
          console.log("Não possui usuario logado");
          setIsLogado(false);
          setUser({});
        }
      });
    }

    checkLogin();
  }, [])

  async function handleadd(){
    // await firebase.firestore().collection('posts').doc('teste').set({titulo:titulo, autor:autor}).then(() => {
    //   console.log("Cadastrado com sucesso")
    // }).catch((error) => {
    //   console.log('gerou erro' + error);
    // });
    await firebase.firestore().collection('posts').add({
      titulo:titulo,
      autor:autor
    }).then(() => {
      console.log("Salvo com sucesso!");
      setTitulo('');
      setAutor('');
    }).catch((err) => {
      console.log(`Ocorreu um erro: ${err}`);
    })
  }

  async function buscaPost(){
    await firebase.firestore().collection('posts').doc('notes').get().then((resp) => {
      setTitulo(resp.data().titulo);
      setAutor(resp.data().autor);
    })
  }

  async function buscarTodos(){
    await firebase.firestore().collection('posts').get().then((snapshot) => {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        });
      });
      setPosts(lista);
    }).catch((error) => {
      console.log(error);
    })
  }

  async function editarPost(){
    await firebase.firestore().collection('posts').doc(idPost)
      .update({
        titulo: titulo,
        autor: autor
      }).then(() => {
        alert("Atualizado")
        setTitulo('');
        setAutor('')
        setIdPost('');
      }).catch((err) => {
        console.log(err);
      })
  }

  async function excluirPost(id){
    await firebase.firestore().collection('posts').doc(id)
      .delete().then(() => {
        alert("Item excluido")
        setTitulo('');
        setAutor('')
        setIdPost('');
      }).catch((err) => {
        console.log(err);
      })
  }

  async function cadastrarNovoUser(){
    await firebase.auth().createUserWithEmailAndPassword(email, senha).then(async (resp) => {
      await firebase.firestore().collection('users')
        .doc(resp.user.uid)
        .set({
          nome: nome,
          cargo: cargo,
          status: true
        }).then(() => {
          setNome('');
          setCargo('');
          setEmail('');
          setSenha('');
        })
    }).catch((err) => {
      console.log(err);
    })
  }

  async function logoutUser(){
    await firebase.auth().signOut().then(() => {
      console.log("Logout realizado");
    }).catch((err) => {
      console.log(err);
    });
  }

  async function login(){
    await firebase.auth().signInWithEmailAndPassword(email, senha)
    .then( async (resp) => {
      await firebase.firestore().collection('users').doc(resp.user.uid).get()
      .then((resp) => {
        setNome(resp.data().nome);
        setCargo(resp.data().cargo);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>

      <h1>React JS + Firebase</h1><br />

      {isLogado && (
        <div>
          <strong>Seja bem vindo, você esta logado</strong> <br />
          <span>{user.uid} - {user.email}</span> <br /> <br />
        </div>
      )}
      <div className='container'>

        <label>Nome</label>
        <input type='text' value={nome} onChange={(e) => {setNome(e.target.value)}} /> <br />
        <label>Cargo</label>
        <input type='text' value={cargo} onChange={(e) => {setCargo(e.target.value)}} /> <br />
        <label>E-mail</label>
        <input type='email' value={email} onChange={(e) => {setEmail(e.target.value)}} /> <br />
        <label>Senha</label>
        <input type='password' value={senha} onChange={(e) => {setSenha(e.target.value)}} /> <br /> <br />
        <button onClick={login}>Login</button>
        <button onClick={cadastrarNovoUser}>Cadastrar</button>
        <button onClick={logoutUser}>logout</button>

      </div>

      <br /><br /><br />
    
      <hr />
      <div className='container'>
        <h2>Banco de dados</h2>
        <label>ID:</label>
        <input type="text" value={idPost} onChange={(e) => {setIdPost(e.target.value)}}/>

        <label>Titulo: </label>
        <textarea type="text" value={titulo} onChange={(e) => {setTitulo(e.target.value)}}/>
        <br />
        <label>Autor: </label>
        <input type="text" value={autor} onChange={(e) => {setAutor(e.target.value)}}/>

        <button onClick={handleadd}>Cadastrar</button>
        <button onClick={buscarTodos}>Buscar post</button>
        <button onClick={editarPost}>Editar</button>
        
        <ul>
          {posts.map((item) => {
            return (
              <li key={item.id}>
                <span>ID: {item.id}</span><br />
                <span>Titulo: {item.titulo}</span><br />
                <span>Autor: {item.autor}</span>
                <button onClick={() => {excluirPost(item.id)}}>Excluir</button><br /><br />
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  );
}

export default App;
