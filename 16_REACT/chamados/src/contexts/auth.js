import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection'

export const AuthContext = createContext({});

function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loadinAuth, setLoadinAuth] = useState(false);
    const [loadin, setLoadin] = useState(true);

    
    useEffect(() => {
        function loadStorage(){
            const storageUser = localStorage.getItem('userSistema');
            if(storageUser){
                setUser(JSON.parse(storageUser));
            }
            setLoadin(false)
        }

        loadStorage();
    }, []);
    

    async function signUp(email, password, nome){
        setLoadinAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password).then( async (response) => {
            let uid = response.user.uid;

            await firebase.firestore().collection('users').doc(uid).set({nome: nome, avatarUrl: null})
                .then(() => {
                    let data = {
                        uid: uid,
                        nome: nome,
                        email: email,
                        avatarUrl: null
                    };
                    setUser(data);
                    storageUser(data);
                    setLoadinAuth(false);
                }).catch((err) => {
                    console.log('====================================');
                    console.log(err);
                    console.log('====================================');
                    setLoadinAuth(false);
                })
            });
            
        }
        
    function storageUser(data){
        localStorage.setItem('userSistema', JSON.stringify(data));
    }

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('userSistema');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
                    signed: !!user, user, loadin, signUp, signOut
                }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
