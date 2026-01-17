import './styles/Header.css'
import logo from '/logo.svg'
import { Link } from 'react-router-dom'

export default function Header() {
    return(<header className='Header'>
        <div className='Header_itens'>
            <Link to={"/"}><img src={logo} alt="Logo do site" /></Link>
            <div className='Header_itens_paginas'>
                <Link to={"/"}>Início</Link>
                <Link to={"/sobre"}>Sobre</Link>
            </div>
        </div>
    </header>)
}