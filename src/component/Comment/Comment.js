import React from "react";
import 'moment-timezone';
import moment from 'moment';
import './Comment.css';

export default function Comment(props) {

  const newData = Math.round(Date.now() / 1000);

  const a = props.timeHasPassed;


  let seconds = parseInt((newData - a), 10);

  const days = Math.floor(seconds / (3600 * 24));

  seconds -= days * 3600 * 24;

  const hrs = Math.floor(seconds / 3600);

  seconds -= hrs * 3600;

  const mnts = Math.floor(seconds / 60);

  seconds -= mnts * 60;

  return (
    <div className='comment'>
      <div className='comment__container'>
        <div className='comment__container-user'>
          <div>
            <img src='image/image 1.svg' alt='user' />
          </div>
          <h6>{props.name} <span>{
            newData - a <= 60 ?
              moment.utc((newData - a) * 1000).format('s сек')
              :
              newData - a <= 3600 ?
                moment.utc((newData - a) * 1000).format('m мин')
                :
                newData - a <= 216000 ?
                  moment.utc((newData - a) * 1000).format('h ч m мин')
                  :
                  newData - a <= 5184000 ?
                    `${days} д ${mnts} ч`
                    :
                    `${days} д ${mnts} ч`
          } назад</span></h6>
        </div>
        <div className='comment__container-comment'>
          {props.comment}
        </div>
      </div>
    </div>
  );
}

