import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

import Table from './components/Table/Table.jsx';

const renderDiv = document.getElementById('render');
ReactDOM.render(<Table/>, renderDiv);
