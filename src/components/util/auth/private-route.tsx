import { Component, h } from 'preact';
import { Route } from 'preact-router';

export default class PrivateRoute extends Component<Component, {}> {
  public render(props: any) {
    return props.authenticated ? <Route component={props.children} /> : null;
  }
}