import React from 'react';

import './style.scss';

export default class Form extends React.Component {
    state = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    }

    onChangeInput = event => 
        (this.setState({ [event.target.name]: event.target.value }));

    onSubmitForm = event => {
        event.preventDefault();

        const {
            id,
            firstName,
            lastName,
            email,
            phone,
        } = this.state;
        const {
            onClickAddItem,
        } = this.props;

        if (id && firstName && lastName && email && phone) {
            onClickAddItem(id, firstName, lastName, email, phone);

            this.setState({
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            });
        }
    }

    render() {
        const {
            id,
            firstName,
            lastName,
            email,
            phone,
        } = this.state;
        const {
            onClickCloseForm,
        } = this.props;

        return (
            <form className="form" onSubmit={this.onSubmitForm}>
                <table className="form__table">
                    <tr>
                        <th>id</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>email</th>
                        <th>phone</th>
                    </tr>
                        <tr>
                            <td>
                                <input
                                className="form__input"
                                type="text"
                                name="id"
                                value={id}
                                onChange={this.onChangeInput}
                                />
                            </td>
                            <td>
                                <input
                                className="form__input"
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={this.onChangeInput}
                                />
                            </td>
                            <td>
                                <input
                                className="form__input"
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={this.onChangeInput}
                                />
                            </td>
                            <td>
                                <input
                                className="form__input"
                                type="text"
                                name="email"
                                value={email} 
                                onChange={this.onChangeInput}
                                />
                            </td>
                            <td>
                                <input
                                className="form__input"
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={this.onChangeInput}
                                />
                            </td>
                        </tr>
                </table>
                <div className="form__buttons">
                    <button
                    className="form__button"
                    >Add in table</button>
                    <button
                    className="form__button"
                    onClick={onClickCloseForm}
                    >Close</button>
                </div>
            </form>
        );
    }
}
