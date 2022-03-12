import styles from './Message.module.css'
import {useState, useEffect} from 'react';
import bus from '../../utils/bus';

function Message(){
    const [visibily, setVisibily] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        bus.addListener('flash', ({message, type}) => {
            setVisibily(true);
            setMessage(message);
            setType(type);

            setTimeout(() => {
               setVisibily(false) 
            }, 3000);
        })
    }, [])

    return (
        visibily && (
            <div className={`${styles.message} ${styles[type]}`}>
                {message}
            </div>)
        )
}

export default Message