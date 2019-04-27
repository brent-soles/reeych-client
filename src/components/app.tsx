import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";
const Rich = require('preact-richtextarea');
// import RichTextarea from 'preact-richtextarea';

import Home from "../routes/home";
import Profile from "../routes/profile";
import Header from "./header";
import ListFromObject from './util/lists/list-from-object'

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

const data = { 
  a: { value: 'b', href: '/b'}, 
  c: { value: 'd', href: '/d'} 
}

export default class App extends Component<Component, {}> {
    public currentUrl?: string;
    private editorText: any = {
      content: [
        {
          text: "hello everyone",
          styles: [
            { type: 'bold', from: 0, to: 5 },
            // { type: 'itialic', from: 6, to: 7}
          ]
        }
      ]
    };
    public handleRoute = (e: RouterOnChangeArgs) => {
        this.currentUrl = e.url;
    };

    public componentDidMount(){

    }

    public render() {
        return (
            <div id="app">
                {/* <Header /> */}
                {/* <Router onChange={this.handleRoute}>
                    <Route path="/" component={Home} />
                    <Route path="/profile/" component={Profile} user="me" />
                    <Route path="/profile/:user" component={Profile} />
                </Router> */}
                <ListFromObject 
                  data={data} 
                  mode="entries" 
                  listType="ol"
                >
                  {(key: any, value: any, index: number): any => {
                    console.log(key, value, index);
                    return <a href={value.href}>{key} + {value.value}</a>
                  }}
                </ListFromObject>
            </div>
        );
    }
}
