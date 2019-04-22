---
to: "src\
/<%= locals.type === 'component' ? 'components' : 'lib' %>\
/util\
<%= locals.ctx ? '/' + ctx : null %>\
/<%= h.changeCase.paramCase(name) %>.\
<%= type === 'component' ? 'tsx' : 'ts' %>"
unless_exists: true
---
import { Component, h } from 'preact';

export default class <%= h.changeCase.pascal(name) %> extends Component<Component, {}> {
  public render(props, state) {
    return (
      <div>
      </div>
    );
  }
}