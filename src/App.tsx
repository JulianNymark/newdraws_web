import * as React from 'react';
import './App.css';
import { Test } from './presentational/test';
import { Draws } from './presentational/draws';

const logo = require('./logo.svg');

interface Props { }

export interface QueryParams {
  page: number;
  resultsPerPage: number;
  filter: string;
}
interface State {
  drawsAPI: string;
  drawsURL: string;
  queryParams: QueryParams;
}

const API_HOST: string = process.env.REACT_APP_API_HOST || 'http://localhost:8000';
const IMAGE_HOST: string = process.env.REACT_APP_IMAGE_HOST || 'http://localhost';

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      drawsAPI: API_HOST,
      drawsURL: IMAGE_HOST + '/s3/draws',
      queryParams: {
        page: 0,
        resultsPerPage: 10,
        filter: 'pet',
      }
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Test name={'test'} enthusiasmLevel={12} />
        <Draws drawsURL={this.state.drawsURL} drawsAPI={this.state.drawsAPI} queryParams={this.state.queryParams} />
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
