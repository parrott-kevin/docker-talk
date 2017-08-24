import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getHackerNewsTopStory, getServerStatus } from '../actions.js'
import Header from '../components/Header.jsx'

class Home extends Component {
  componentDidMount () {
    this.props.dispatch(getHackerNewsTopStory())
    this.props.dispatch(getServerStatus())
  }

  render () {
    const { story, serverStatus } = this.props
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <Header />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <p className='text-center'>Top Story from HackerNews</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            {story.id &&
              <p className='text-center'><a href={story.url}>{story.title}</a></p>
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <p className='text-center'>
              <strong>Server Says: </strong>{serverStatus}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
  story: PropTypes.object,
  serverStatus: PropTypes.string
}

function mapStateToProps (state) {
  const { story, serverStatus } = state
  return {
    story,
    serverStatus: serverStatus.message
  }
}

export default connect(mapStateToProps)(Home)
