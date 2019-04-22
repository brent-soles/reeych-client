import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import ObjectUl from '../components/util/lists/object-ul'
import Home from "../routes/home";
import Profile from "../routes/profile";
import Header from "./header";

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}


export default class App extends Component<Component, {}> {
    public currentUrl?: string;
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
                <ObjectUl data={{ 
                  a: { value: 'b', href: '/b'}, 
                  c: { value: 'd', href: '/d'} 
                }} mode="entries" >
                  {(key: any, value: any, index: number): any => {
                    console.log(key, value, index);
                    return <a href={value.href}>{key} + {value.value}</a>
                  }}
                </ObjectUl>
            </div>
        );
    }
}
