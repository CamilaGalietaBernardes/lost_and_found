import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'


function Menu() {
    return (
        <header>
            <nav>
                <ul className = "menu">
                    <li> <Link to='/'>Home</Link> </li>
                    <li> <Link to='/new-item'>Novo Item</Link> </li>
                    <li> <Link to='/recovered-items'>Itens Recuperados</Link> </li>
                    <li> <Link to='/lost-items'>Itens Perdidos</Link> </li>
                    <li> <Link to='/local-report'>Relatório local</Link> </li>
                </ul>
            </nav>
        </header>
    );
}

export default Menu;