import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './Home.jsx'

class Routes extends Component {
  render () {
    return (
      <BrowserRouter>
        <Route exact path='/' component={Home} />
      </BrowserRouter>
    )
  }
}

Routes.propTypes = {}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(Routes)
