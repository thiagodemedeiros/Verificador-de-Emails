import './styles/Footer.css'
import logo from '/logo.svg'
import { Link } from 'react-router-dom'

export default function Footer() {
    return(<footer className='Footer'>
        <div className='Footer_itens'>
            <div className='Footer_itens_informacoes'>
                <div className='Footer_itens_informacoes_lista'>
                    <h5>Páginas</h5>
                    <div className='Footer_itens_informacoes_lista_itens'>
                        <Link to={"/"}>Início</Link>
                        <Link to={"/sobre"}>Sobre</Link>
                    </div>
                </div>
                <div className='Footer_itens_informacoes_lista'>
                    <h5>Informações</h5>
                    <div className='Footer_itens_informacoes_lista_itens'>
                        <a href="https://github.com/thiagodemedeiros/Verificador-de-Emails">Repositório</a>
                    </div>
                </div>
            </div>
            <Link to={"/"}><img src={logo} alt="Logo do site" /></Link>
        </div>
    </footer>)
}