import "babel-core/register";
import "babel-polyfill";

import React from 'react';

import Item from './Item.jsx';
import ProgressBar from './ProgressBar.jsx';

import axios from 'axios';

const linkSmallData = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
const linkBigData = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

export default class Table extends React.Component {
    state = {
        data: [],
        page: 1,
        pageAmount: 1,
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        showItem: null,
        find: '',
        dataBeforeFind: [],
        onFind: false,
        progress: 0,
    }

    onClickGet = (linkData, total) => async () => {
        try {
          this.setState({ progress: 0 }); 
          const res = await axios.get(linkData, {
            onDownloadProgress: (progressEvent) => {
                this.setState({ progress: Math.floor(progressEvent.loaded / total) });     
            }
          });
          this.setState({ data: res.data, page: 1, pageAmount: Math.ceil(res.data.length / 50), id: true, firstName: true, lastName: true, email: true, phone: true, showItem: null, find: '', dataBeforeFind: [], onFind: false });
        } catch (error) {
            alert(error);
        }
    }

    onClickSort = (sortName) => () => {
        const { data } = this.state;
        const sortData = data.slice();
        sortData.sort((a, b) => {
            if (a[sortName] > b[sortName]) {
                return this.state[sortName]? 1 : -1;
            } else if (a[sortName] < b[sortName]) {
                return this.state[sortName]? -1 : 1;
            } else {
                return 0;
            }
        });
        this.setState({ data: sortData, [sortName]: !this.state[sortName] });
    }

    onClickPage = (actionType) => () => {
        const { page, pageAmount } = this.state;
        if (actionType === 'Back' && page !== 1) {
            this.setState({ page: page - 1 });
        } else if (actionType === 'Next' && page !== pageAmount) {
            this.setState({ page: page + 1 });
        }
    }

    onClickItem = (item) => () => {
        this.setState({ showItem: item });
    }

    prefix(itemString, findString) {
        for (let i = 0; i < findString.length && i < itemString.length; i++) {
            if (itemString[i].toLowerCase() !== findString[i] && itemString[i].toUpperCase() !== findString[i]) {
                return false;
            }
        }
        return true;
    }

    onChangeFind = (event) => {
        const { data, onFind } = this.state;
        const findData = data.filter(({ firstName, lastName, email }) => this.prefix(firstName, event.target.value) || this.prefix(lastName, event.target.value) || this.prefix(email, event.target.value));
        if (!onFind) {
            this.setState({ find: event.target.value, dataBeforeFind: data.slice(), data: findData, onFind: true, page: 1, pageAmount: Math.ceil(findData.length / 50)});
        } else {
            this.setState({ find: event.target.value, data: findData, page: 1, pageAmount: Math.ceil(findData.length / 50)});
        }
    }

    onClickFind = () => {
        const { onFind } = this.state;
        if (onFind) {
            const { dataBeforeFind } = this.state;
            this.setState({ find: '', data: dataBeforeFind.slice(), dataBeforeFind: [], onFind: false, page: 1, pageAmount: Math.ceil(dataBeforeFind.length / 50)});
        }
    }

    render() {
        const { data, page, id, firstName, lastName, email, phone, showItem, find, progress } = this.state;
        return (
            <div className="table">
              <div className="table__buttons">
                <button className="table__button" onClick={this.onClickGet(linkSmallData, 140)}>Get small data</button>
                <button className="table__button" onClick={this.onClickGet(linkBigData, 4300)}>Get big data</button>
                <ProgressBar progress={progress} />
                <div className="table__filter">
                    <input type="text" className="table__input" value={find} onChange={this.onChangeFind} />
                    <button className="table__button" onClick={this.onClickFind}>Find</button>
                </div>
              </div>
              <table className="table__main">
                  <tr><th onClick={this.onClickSort('id')}>{`id ${id ? '▼' : '▲'}`}</th><th onClick={this.onClickSort('firstName')}>{`firstName ${firstName ? '▼' : '▲'}`}</th><th onClick={this.onClickSort('lastName')}>{`lastName ${lastName ? '▼' : '▲'}`}</th><th onClick={this.onClickSort('email')}>{`email ${email ? '▼' : '▲'}`}</th><th onClick={this.onClickSort('phone')}>{`phone ${phone ? '▼' : '▲'}`}</th></tr>
                  {data.map((item, index) => {
                      const { id, firstName, lastName, email, phone } = item;
                      if (50 + (page - 1) * 50 > index && index > -1 + (page - 1) * 50) {
                        return (
                            <tr onClick={this.onClickItem(item)}><td>{id}</td><td>{firstName}</td><td>{lastName}</td><td>{email}</td><td>{phone}</td></tr>
                        );
                      }
                      return null;
                  })}
              </table>
              <div className="table__buttons--bottom">
                <button className="table__button" onClick={this.onClickPage('Back')}>Back</button>
                <button className="table__button" onClick={this.onClickPage('Next')}>Next</button>
              </div>
              {showItem ? <Item data={showItem} /> : null}
            </div>
        );
    }
}
