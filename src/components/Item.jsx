import React from 'react';

const Item = ({ data }) => {
    const { firstName, lastName, description, address } = data;
    const { streetAddress, city, state, zip } = address;
    return (
        <div className="item">
          <p>Выбран пользователь <b>{`${firstName} ${lastName}`}</b></p>
          <label name="description"></label>
          <textarea name="description" cols="30" rows="10">{description}</textarea>
          <p>Адрес проживания: <b>{streetAddress}</b></p>
          <p>Город: <b>{city}</b></p>
          <p>Провинция/штат: <b>{state}</b></p>
          <p>Индекс: <b>{zip}</b></p>
        </div>
    );
}

export default Item;
