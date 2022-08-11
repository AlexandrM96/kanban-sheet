import React from "react";
import { useSelector } from 'react-redux';
import Favourites from '../Favourites/Favourites'
import './Aside.css';

export default function Aside() {

    const fav = useSelector((state) => state.listFavourites);

    return (
        <aside className='asside'>
            <div className='asside__container'>
                <div className='asside__container__title-block'>
                    <div className='asside__block-title'>
                        <img src='image/Брендинг.svg' alt='logo' />
                    </div>
                    <div className='asside__container__title-block-button'>
                        <img src='image/Бургер.svg' alt='Burger' />
                    </div>
                </div>
                <div className='asside__container__menu-buttons'>
                    <div>
                        <img src='image/Иконка.svg' alt='Dashboard' />
                        <p>Дашбоард</p>
                    </div>
                    <div>
                        <img src='image/Frame.svg' alt='My tasks' />
                        <p>Мои задачи</p>
                    </div>
                    <div>
                        <img src='image/Frame (1).svg' alt='Projects' />
                        <p>Проекты</p>
                    </div>
                </div>
                <div className='asside__container__favourites'>
                    <h4 className='asside__container__favourites-title'>
                        Избранное
                    </h4>
                    <div className='asside__container__favourites-block'>
                        {fav && fav.map(item =>
                            <div
                                key={item.id}
                            >
                                <Favourites item={item} />
                            </div>
                        )}
                    </div>
                    <div className='asside__container__favourites-block__button'>
                        <button>
                            <span>Раскрыть весь список</span>
                            <img src='image/Ve.svg' alt='strelka' />
                        </button>
                    </div>
                </div>
                <div className='asside__container__teams'>
                    <h4 className='asside__container__teams-title'>
                        Команды
                    </h4>
                    <div className='asside__container__teams-block'>
                        <div>
                            <img src='image/strelka.svg' alt='strelka' />
                            <p>Программисты</p>
                        </div>
                        <div>
                            <img src='image/strelka.svg' alt='strelka' />
                            <p>Маркетологи</p>
                        </div>
                        <div>
                            <img src='image/strelka.svg' alt='strelka' />
                            <p>Дизайнеры</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
