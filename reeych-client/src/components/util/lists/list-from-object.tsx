import { Component, h } from 'preact';
import ListObjectDecider from '../decider/list-object-decider';

type ObjectListFunction = (key: any, value: any, index: number) => Element;
interface ObjectUlProps {
  id?: string;
  listType: string;
  data: object;
  mode: string;
  children: ObjectListFunction[] | ObjectListFunction;
}

export default class ListFromObject extends Component<ObjectUlProps, {}> {

  public render(props: ObjectUlProps, state: any) {
    // Props is either an array or object
    const { data, listType, mode, children } = props;
    if(typeof data !== 'object') { throw new Error('ListFromObject accepts data of type: array, object'); }
    
    // Need to have for TS explicitnesn
    const iterator: any = this.decideObjIterator(mode);
    const [childFn, ..._]: any = children; // Kinda hacky?
    return (
      <ListObjectDecider listType={listType}>
        {iterator(data).map((element: any, index: number): any => {
          // In preact, children are only an array, so the first
          // child needs to be referenced for the render props
          // pattern to work on children.
          const [key, val, ind] = this.decideArgPass(mode, {element, index});
          return <li key={index}>{childFn(key, val, ind)}</li>;
        })}
      </ListObjectDecider>
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