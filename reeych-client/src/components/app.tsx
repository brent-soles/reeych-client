import ApolloClient from 'apollo-boost';
import gql from "graphql-tag"
import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import Home from "../routes/home";
import Profile from "../routes/profile";
import Header from "./header";

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: 'Bearer e5dabd50d6658c4f91f038f38fa6b72365c94da3'
  }
})


export default class App extends Component {
    public currentUrl?: string;
    public handleRoute = (e: RouterOnChangeArgs) => {
        this.currentUrl = e.url;
    };

    public componentDidMount(){
      console.log("mounted");
      client.query({
        query: gql`
          {
            user(login: "brent-soles") {
              pinnedItems(first: 8) {
                edges {
                  node {
                    ... on Repository {
                      name
                    }
                  }
                }
              }
            }
          }
        `
      }).then(res => console.log(res));
    }

    public render() {
        return (
            <div id="app">
                <Header />
                <Router onChange={this.handleRoute}>
                    <Route path="/" component={Home} />
                    <Route path="/profile/" component={Profile} user="me" />
                    <Route path="/profile/:user" component={Profile} />
                </Router>
            </div>
        );
    }
}
