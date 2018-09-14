import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Table from './components/Table.jsx';

const main = document.querySelector('main');
ReactDOM.render(<Table />, main);
