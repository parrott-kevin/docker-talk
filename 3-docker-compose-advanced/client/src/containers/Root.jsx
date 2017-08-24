import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from '../configureStore.js'
import Routes from './Routes.jsx'

const store = configureStore()

export default class Root extends Component {
  componentDidMount () {
  }
  render () {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}
