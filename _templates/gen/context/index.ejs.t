---
to: "src\
/<%= locals.type === 'component' ? 'components' : null %>\
/contexts\
<%= locals.ctx ? '/' + ctx : null %>\
/<%= h.changeCase.paramCase(name) %>.\
<%= type === 'component' ? 'tsx' : 'ts' %>"
unless_exists: true
---
import { Component, h } from 'preact';
import { createContext } from 'preact-context';




export default class <%= h.changeCase.pascal(name) %> extends Component<Component, {}> {
  public render(props: any, state: any) {
    return (
      <div>
      </div>
    );
  }
}