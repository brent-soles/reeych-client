import { Component, ComponentChildren, h } from 'preact';

type ObjectUlFunction = (key: any, value: any, index: number) => Element;

interface ObjectUlProps {
  id?: string;
  data: object;
  mode: string;
  children: ObjectUlFunction[] | ObjectUlFunction;
}


export default class ObjectUl extends Component<ObjectUlProps, {}> {

  public render(props: ObjectUlProps, state: any) {
    // Props is either an array or object
    const { data, mode, children } = props;
    if(typeof data !== 'object') { throw new Error('ObjectUl accepts data of type: array, object'); }
    
    // Need to have for TS explicitness
    const iterator: any = this.decideObjIterator(mode);
    const [childFn, ..._]: any = children; // Kinda hacky?
    return (
      <ul id={props.id}>
        {iterator(data).map((element: any, index: number): any => {
          // In preact, children are only an array, so the first
          // child needs to be referenced for the render props
          // pattern to work on children.
          const [key, val, ind] = this.decideArgPass(mode, {element, index});
          return <li key={index}>{childFn(key, val, ind)}</li>;
        })}
      </ul>
    );
  }

  private decideArgPass = (mode: string, { element, index }: any): any[] => {
    switch(mode){
      case 'entries':
        return [element[0], element[1], index];
      case 'keys':
        return [element, null, index];
      case 'values':
        return [null, element, index];
      default:
        throw new Error('ObjectUl must have mode of: entries, values, keys');
    }
  }

  private decideObjIterator = (mode: string): any => {
    switch(mode) {
      case 'entries':
        return Object.entries;
      case 'keys':
        return Object.keys;
      case 'values':
        return Object.values;
      default:
        throw new Error('ObjectUl must have mode of: entries, values, keys');
    }
  }
}