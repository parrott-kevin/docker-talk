import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import * as axios from 'axios';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = { story: { url: '', title: '' }, serverStatus: '' };
  }
  async componentDidMount() {
    const stories = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    );
    const storyId = stories.data[0];
    const story = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
    );
    const serverStatus = await axios.get(`${API_HOST}/api/status`);
    this.setState({
      story: { url: story.data.url, title: story.data.title },
      serverStatus: serverStatus.data.message
    });
  }

  render() {
    const { story, serverStatus } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="jumbotron">
              <h1 className="display-4">Docker Example</h1>
            </div>
          </div>
        </div>
        <div className="row">
          {story.title && (
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Top Story from HackerNews</h5>
                  <p className="card-text">
                    <a href={story.url}>{story.title}</a>
                  </p>
                </div>
              </div>
            </div>
          )}
          {serverStatus && (
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Server Message</h5>
                  <p className="card-text">{serverStatus}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Root.propTypes = {};
