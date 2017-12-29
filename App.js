import React, { Component } from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import firebase from "firebase";

import reducers from "./src/reducers";

import Router from "./src/Router";

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: "AIzaSyDrnVDpQU2dSbHvbHcASCtNOjdmUJ5QQpM",
            authDomain: "manager-8fc87.firebaseapp.com",
            databaseURL: "https://manager-8fc87.firebaseio.com",
            projectId: "manager-8fc87",
            storageBucket: "manager-8fc87.appspot.com",
            messagingSenderId: "1077887709175"
        };

        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(Thunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;

AppRegistry.registerComponent("manager", () => App);
