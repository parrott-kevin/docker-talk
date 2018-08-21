import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root.jsx';
import 'bootstrap';

import './styles/index.scss';

render(<Root />, document.getElementById('app'));
