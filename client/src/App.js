import React, { Component } from 'react';
import './App.css';
import ListOfProcesses from './components/ListOfProcesses';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

import reducers from './modules/Reducers';


const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleware));
const socket = io.connect('http://localhost:3001');
socket.on('news', msg => console.log(msg));
  


class App extends Component {
  render() {
    return (
      <div className="App">
      <Provider store={store}>
          <SocketProvider socket={socket}>
        <ListOfProcesses/>
          </SocketProvider>
      </Provider>
      </div>
    );
  }
}

export default App;
