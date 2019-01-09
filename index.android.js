import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import * as storage from 'redux-storage'
import {
  Text,
  View,
  BackAndroid,
  AppRegistry
} from 'react-native'

import NavigationExperimental from 'react-native-deprecated-custom-components';

import AllSiswa from './app/components/view_allSiswa'

import ApplicationStore from './app/reducers'
const reducer = storage.reducer(ApplicationStore);

import createEngine from 'redux-storage-engine-reactnativeasyncstorage'
const engine = createEngine('notes-app-store')

const middleware = storage.createMiddleware(engine)
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

const load = storage.createLoader(engine)
load(store)

const routes = [
  { component: AllSiswa }
]

class codeTRNote extends Component {
 componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationExperimental.Navigator
          style={{ flex: 1 }}
          ref='nav'
          initialRouteStack={routes}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
        />
      </Provider>
    )
  }
  renderScene(route, navigator) {
    return <route.component navigator={navigator} {...route.passProps}/>
  }
  configureScene(route, routeStack) {
    if (route.type == 'addingSiswa') {
      return NavigationExperimental.Navigator.SceneConfigs.FloatFromBottomAndroid
    }
    if (route.type == 'editingSiswa'){
      return NavigationExperimental.Navigator.SceneConfigs.FloatFromBottomAndroid
    }
    return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight
  }
}

AppRegistry.registerComponent('codeTRNote', () => codeTRNote);
