// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

const { ipcRenderer, remote } = require('electron');

type Props = {};

export default class Home extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);
    this.state = { data: '' };
  }

  componentDidMount() {
    this.receiveData();
  }

  componentDidUpdate(prevProps, prevState, rootNode) {
    ipcRenderer.removeAllListeners('data_fetched');
  }

  receiveData() {
    ipcRenderer.on('data_fetched', (event, data) => {
      let jsonData = JSON.stringify(data);
      this.setState({
        data: jsonData,
      });
      console.log('Recieved data');
    });
  }
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <p>{this.state.data}</p>

          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
