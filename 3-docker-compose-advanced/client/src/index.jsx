import 'babel-polyfill'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import {render} from 'react-dom'
import Root from './containers/Root.jsx'

render(
  <Root />,
  document.getElementById('app')
)
