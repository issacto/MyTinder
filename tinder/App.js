if (__DEV__) {
  import('./src/debug/ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

import React from 'react';
import AppNav from './src/navigation/index'
import Amplify from 'aws-amplify';
import aws_exports from './src/aws-export.js';

import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

Amplify.configure(aws_exports)

export default class App extends React.Component {
  render() {
      return (
          <Provider store = {store}>
              <PersistGate loading={null} persistor={persistor}>
                  <AppNav />
              </PersistGate>
          </Provider>
      );
  }
}
