import React from 'react';

import './style.scss';

import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import Form from '../Form/Form.jsx';
import Item from '../Item/Item.jsx';

import axios from 'axios';
import 'babel-polyfill';

const linkSmallData = 'http://www.filltext.com/?rows=32&id={number|1000}\
&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)\
xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const linkBigData = 'http://www.filltext.com/?rows=1000&id={number|1000}&\
firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|\
(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

export default class Table extends React.Component {
    state = {
        progress: 0,
        data: [],
        page: 1,
        find: '',
        isFormOpen: false,
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        showItem: null,
    }

    onClickGetData = (linkData, total) => async () => {
        try {
            await this.setState({ progress: 0 });

            const res = await axios.get(linkData, {
                onDownloadProgress: progressEvent => {
                    this.setState({ progress: Math.floor(progressEvent.loaded / total) });     
                },
            });

            this.setState({
                data: res.data,
                page: 1,
                find: '',
                isFormOpen: false,
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                showItem: null,
            });
        } catch (error) {
            alert(error);
        }
    }

    onChangeFind = event => {
        const value = event.target.value;

        this.setState({
            page: 1,
            find: value,
        });
    }

    onClickFind = () => {
        this.setState({
            page: 1,
            find: '',
        });
    }

    filterFind = find => ({ firstName, lastName, email }) => 
        ([firstName, lastName, email]
        .some(string => string.toLowerCase().startsWith(find.toLowerCase())));

    filterPage = page => (item, index) => 
        ((index > -1 + (page - 1) * 50) && (50 + (page - 1) * 50 > index));

    onClickOpenForm = () => (this.setState({ isFormOpen: true }));

    onClickAddItem = (id, firstName, lastName, email, phone) => {
        const { data } = this.state;

        this.setState({ data: [{
            id,
            firstName,
            lastName,
            email,
            phone,
        }, ...data], isFormOpen: false });
    }

    onClickCloseForm = () => (this.setState({ isFormOpen: false }));

    onClickSort = sortParam => () => {
        const { data, [sortParam]: stateParam } = this.state;

        const sortData = data.slice();
        sortData.sort((a, b) => {
            if (a[sortParam] > b[sortParam]) {
                return stateParam ? 1 : -1;
            } else if (a[sortParam] < b[sortParam]) {
                return stateParam ? -1 : 1;
            } else {
                return 0;
            }
        });

        this.setState({ data: sortData, [sortParam]: !stateParam });
    }

    onClickItem = item => () => (this.setState({ showItem: item }));

    onClickPage = side => () => {
        const { data, page } = this.state;
        if (data.length < 51) {
            return;
        }
        const lastPage = Math.ceil(data.length / 50);

        if (side === 'Prev' && page !== 1) {
            this.setState({ page: page - 1 });
        } else if (side === 'Next' && page !== lastPage) {
            this.setState({ page: page + 1 });
        }
    }

    render() {
        const {
            progress,
            data,
            page,
            find,
            isFormOpen,
            id,
            firstName, 
            lastName, 
            email, 
            phone,
            showItem, 
        } = this.state;

        return (
            <div className="table">
              <div className="table__header">
                <div className="table__get-buttons">
                    <div className="table__progress-bar">
                        <ProgressBar progress={progress}/>
                    </div>
                    <button
                        className="table__button"
                        onClick={this.onClickGetData(linkSmallData, 140)}
                    >Get small data</button>
                    <button
                        className="table__button"
                        onClick={this.onClickGetData(linkBigData, 4300)}
                    >Get big data</button>
                </div>
                <div className="table__find-add-buttons">
                    <input
                        className="table__input"
                        type="text"
                        placeholder="Input"
                        value={find}
                        onChange={this.onChangeFind}
                    />
                    <button
                        className="table__button"
                        onClick={this.onClickFind}
                    >Find</button>
                    <button
                        className="table__button"
                        onClick={this.onClickOpenForm}
                    >Add item</button>
                </div>
                {
                    isFormOpen ?
                    <Form
                        onClickAddItem={this.onClickAddItem}
                        onClickCloseForm={this.onClickCloseForm}
                    />
                    :
                    null
                }
              </div>
              <table className="table__main">
                  <tr>
                    <th
                        onClick={this.onClickSort('id')}
                    >{`id ${id ? '▼' : '▲'}`}</th>
                    <th
                        onClick={this.onClickSort('firstName')}
                    >{`firstName ${firstName ? '▼' : '▲'}`}</th>
                    <th
                        onClick={this.onClickSort('lastName')}
                    >{`lastName ${lastName ? '▼' : '▲'}`}</th>
                    <th
                        onClick={this.onClickSort('email')}
                    >{`email ${email ? '▼' : '▲'}`}</th>
                    <th
                        onClick={this.onClickSort('phone')}
                    >{`phone ${phone ? '▼' : '▲'}`}</th>
                  </tr>
                  {
                    (
                        find ?
                        data.filter(this.filterFind(find))
                        :
                        data.filter(this.filterPage(page))
                    )
                    .map(item => {
                        const { id, firstName, lastName, email, phone } = item;

                        return (
                            <tr onClick={this.onClickItem(item)}>
                              <td>{id}</td>
                              <td>{firstName}</td>
                              <td>{lastName}</td>
                              <td>{email}</td>
                              <td>{phone}</td>
                            </tr>
                        );
                    })
                  }
              </table>
              {
                !find ?
                <div className="table__footer">
                    <button
                        className="table__button table__button_footer"
                        onClick={this.onClickPage('Prev')}
                    >Prev</button>
                    <div className="table__text">{page}</div>
                    <button
                        className="table__button table__button_footer"
                        onClick={this.onClickPage('Next')}
                    >Next</button>
                </div>
                :
                null
              }
              {showItem ? <Item data={showItem}/> : null}
            </div>
        );
    }
}
