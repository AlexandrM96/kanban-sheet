import React from 'react'
import { useSelector } from 'react-redux';
import './Header.css'

export default function Header() {

    const favorits = useSelector((state) => state.nameBoard);

    return (
        <header className='header'>
            <div className='header__container'>
                <div className='header__container__title-and-navigate'>
                    <div className='header__container__title-and-navigate__title'>
                        <h2 className='header-title'>{favorits}</h2>
                        <div className='header-status__lamp'></div>
                        <span className='header-status__text'>В работе</span>
                    </div>
                    <nav className='header__container__title-and-navigate__navigation'>
                        <ul>
                            <li className='header__navigation-item' >Описание</li>
                            <li className='header__navigation-item' >Список</li>
                            <li className='header__navigation-items' >
                                <div>Канбан</div>
                                <hr />
                            </li>
                            <li className='header__navigation-item' >Планирование</li>
                            <li className='header__navigation-item' >Дашборд</li>
                            <li className='header__navigation-item' >Команда</li>
                        </ul>
                    </nav>
                </div>
                <div className='header__container__profile'>
                    <div className='header__container__profile-image'>
                        <img src='image/Уведомления.svg' alt='night mode button' />
                    </div>
                    <div className='header__container__profile-image'>
                        <img src='image/Уведомления (1).svg' alt='message button' />
                    </div>
                    <div className='header__container__profile-image'>
                        <img src='image/Уведомления (3).svg' alt='notification button' />
                    </div>
                    <div className='header__container__profile-image'>
                        <img src='image/image 1.svg' alt='logo' />
                    </div>
                </div>
            </div>
        </header>
    );
}
