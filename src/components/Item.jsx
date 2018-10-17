import React from 'react';

const Item = ({ data }) => {
    const { firstName, lastName, description, address } = data;
    const { streetAddress, city, state, zip } = address;
    return (
        <div className="item">
          <p className="item__p">Выбран пользователь <b className="item__b">{`${firstName} ${lastName}`}</b></p>
          <label name="description" className="item__label"></label>
          <textarea name="description" cols="30" rows="10" className="item__textarea">{description}</textarea>
          <p className="item__p">Адрес проживания: <b className="item__b">{streetAddress}</b></p>
          <p className="item__p">Город: <b className="item__b">{city}</b></p>
          <p className="item__p">Провинция/штат: <b className="item__b">{state}</b></p>
          <p className="item__p">Индекс: <b className="item__b">{zip}</b></p>
        </div>
    );
}

export default Item;
