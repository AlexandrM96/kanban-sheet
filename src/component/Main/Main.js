import React from 'react'
import './Main.css'
import Header from '../Header/Header';
import Aside from '../Aside/Aside'
import Kanban from '../Kanban/Kanban';

export default function Main() {

    return (
        <section className='main__section'>
            <div className='main__section-asside'>
                <Aside />
            </div>
            <div className='main__section-container'>
                <Header />
                <Kanban />
            </div>
        </section>
    );
}

