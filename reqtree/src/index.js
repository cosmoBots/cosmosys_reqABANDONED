import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles.css';
import 'react-sortable-tree/style.css';

 const query = new URLSearchParams(window.location.search);
 const nodeId = query.get('node_id')

const rootElement = document.getElementById('root');
ReactDOM.render(<App nodeId={nodeId}/>, rootElement);