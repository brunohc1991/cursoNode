import style from './Footer.module.css'

function Footer(){
    return (
        <footer className={style.footer}>
            <p><span className="bold">Get a Pet</span> &copy; 2021</p>
        </footer>
    )
}

export default Footer