import { Provider } from 'react-redux'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import configureStore from './store/configureStore';

import './App.css';
import PropertiesTable from './components/table/PropertiesTable';
import PropertyHistoryTable from './components/table/PropertyHistoryTable';
import CreatePropertyFormContainer from './components/createPropertyForm/CreatePropertyFormContainer';
import UpdatePropertyFormContainer from './components/updatePropertyForm/UpdatePropertyFormContainer';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={PropertiesTable} />
            <Route exact path="/create" component={CreatePropertyFormContainer} />
            <Route exact path="/properties/:id" component={PropertyHistoryTable} />
            <Route path="/properties/:id/edit" component={UpdatePropertyFormContainer} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
