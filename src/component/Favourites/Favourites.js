import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { nameBoard } from "../../redux/action";
import './Favourites.css';

export default function Favourites(props) {

  const favorits = useSelector((state) => state.nameBoard);

  const [state, setState] = useState(() => {
    return {
      flag: ''
    }
  })

  const dispatch = useDispatch();

  const status = text => {
    dispatch(nameBoard(text))
    setState(prev => {
      return {
        ...prev,
        flag: text,
      }
    })
  }

  return (
    <div onClick={(e) => { status(e.target.textContent) }}
      className={state.flag === favorits ? 'favourites-block__true' : 'favourites-block'}>
      <div className={state.flag !== favorits ?
        'favorites-block__lamp-favorit'
        :
        'favorites-block__lamp'
      }
      >
      </div>
      <p className='favorites-block__text'>{props.item.name}</p>
    </div>
  );
}
