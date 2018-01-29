import * as React from 'react';

import * as Utils from './utils';
import './App.css';
import { Draws } from './presentational/draws';
import { Store } from './types';

const logo = require('./logo.svg');

interface Props { }

interface State {
  store: Store;
}

const API_HOST: string = process.env.REACT_APP_API_HOST || '';
const IMAGE_HOST: string = process.env.REACT_APP_IMAGE_HOST || '';

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
          filter: '',
        },
        draws: []
      }
    };
    this.updateFilter = this.updateFilter.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.updateResultsPerPage = this.updateResultsPerPage.bind(this);
  }

  updateFilter() {
    let inputElement: HTMLInputElement = document.getElementById('input-filter') as HTMLInputElement;

    this.setState(
      (prevState, props) => {
        const newState = { ...prevState };
        newState.store.queryParams.filter = inputElement.value;
        newState.store.queryParams.page = 0;
        return newState;
      },
      () => {
        this.fetchDraws();
      });
  }

  updatePage() {
    let inputElement: HTMLInputElement = document.getElementById('input-page') as HTMLInputElement;

    this.setState(
      (prevState, props) => {
        const newState = { ...prevState };
        newState.store.queryParams.page = parseInt(inputElement.value, 10);
        return newState;
      },
      () => {
        this.fetchDraws();
      });
  }

  updateResultsPerPage() {
    let inputElement: HTMLInputElement = document.getElementById('input-results-per-page') as HTMLInputElement;

    this.setState(
      (prevState, props) => {
        const newState = { ...prevState };
        newState.store.queryParams.resultsPerPage = parseInt(inputElement.value, 10);
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
          <h1 className="App-title">Welcome to Draws</h1>
        </header>
        <input
          id="input-filter"
          type="search"
          placeholder="Filter"
          onChange={this.updateFilter}
          autoFocus={true}
        />
        <label htmlFor="input-page">page: </label>
        <input
          id="input-page"
          type="number"
          onChange={this.updatePage}
          value={this.state.store.queryParams.page}
        />
        <label htmlFor="input-results-per-page">results per page: </label>
        <input
          id="input-results-per-page"
          type="number"
          onChange={this.updateResultsPerPage}
          value={this.state.store.queryParams.resultsPerPage}
        />
        <Draws store={this.state.store} />
        <label className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </label>
      </div>
    );
  }
}

export default App;
