import React from 'react';

import './style.scss';

const Item = ({ data }) => {
    const { firstName, lastName, description='', address={} } = data;
    const { streetAddress='', city='', state='', zip='' } = address;

    return (
        <div className="item">
          <p className="item__text">
            Выбран пользователь
            <b className="item__bold">{` ${firstName} ${lastName}`}</b>
          </p>
          <label className="item__label" name="description">
            Описание:
          </label>
          <textarea
            className="item__textarea"
            name="description"
            cols="30"
            rows="10"
            value={description}
          ></textarea>
          <p className="item__text">
            Адрес проживания: <b className="item__bold">{streetAddress}</b>
          </p>
          <p className="item__text">
            Город: <b className="item__bold">{city}</b>
          </p>
          <p className="item__text">
            Провинция/штат: <b className="item__bold">{state}</b>
          </p>
          <p className="item__text">
            Индекс: <b className="item__bold">{zip}</b>
          </p>
        </div>
    );
}

export default Item;
