import { Component, h } from 'preact';

const ListObjectDecider = (props: any) => (
  props.listType === 'ul' ? 
    <ul>{props.children}</ul> :
    <ol>{props.children}</ol>
)

export default ListObjectDecider;