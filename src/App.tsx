import * as React from 'react';

import * as Utils from './utils';
import './App.css';
import { Test } from './presentational/test';
import { Draws } from './presentational/draws';
import { Store } from './types';

const logo = require('./logo.svg');

interface Props { }

interface State {
  store: Store;
}

const API_HOST: string = process.env.REACT_APP_API_HOST || 'http://localhost:8000';
const IMAGE_HOST: string = process.env.REACT_APP_IMAGE_HOST || 'http://localhost';

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      store: {
        drawsAPI: API_HOST,
        drawsURL: IMAGE_HOST + '/s3/draws',
        queryParams: {
          page: 0,
          resultsPerPage: 10,
          filter: 'pet',
        },
        draws: []
      }
    };
    this.updateFilter = this.updateFilter.bind(this);
  }

  updateFilter() {
    let inputElement: HTMLInputElement = document.getElementById('input-filter') as HTMLInputElement;

    this.setState(
      (prevState, props) => {
        const newState = { ...prevState };
        newState.store.queryParams.filter = inputElement.value;
        return newState;
      },
      () => {
        this.fetchDraws();
      });
  }

  fetchDraws() {
    Utils.makeJSONRequest({
      method: 'GET',
      url: this.state.store.drawsAPI + '/draws',
      params: { ...this.state.store.queryParams } as Utils.ParamObject,
    }).then((respJSON) => {
      const resp = JSON.parse(respJSON);
      const newStore = { ...this.state.store };
      newStore.draws = resp.draws;
      this.setState({
        store: newStore
      });
    });
  }

  componentDidMount() {
    this.fetchDraws();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <input
          id="input-filter"
          type="text"
          placeholder="filter search here"
          onChange={this.updateFilter}
          autoFocus={true}
        />
        <Test name={'test'} enthusiasmLevel={12} />
        <Draws store={this.state.store} />
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
