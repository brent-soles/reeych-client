# reeych-client

## Overall Architecture & Design

### Intro

This document serves as a reference for the overall architecture of the frontend,
as well as some notes on the design intentions/decisions.

The first architecture design choice is this: use Preact. The reason Preact has been
chosen as the framework to use is a simple one: its main intention is to mitigate
JS bloat while keeping performance.

The previous version of this UI was built with React, and the main reason to move away
from it was to poise the frontend to be accessible from a performance standpoint. Not having
to load megabytes of JS on the client side will help with a greater demographic being able
to access this UI.

#### Code-gen

This frontend uses Hygen for templating:

-   Contexts (store, component, Utility)
-   Components
-   Routes
-   Utilities
-   etc...

## Architecture

### Contexts

One of the concepts that will be implemented and iteratd on in this frontend is the concept of
contexts, which is essentially an alias for an attribute in the overall store object, and its associated functions.
For instance, a "Authentication" context would include certain network
calls and client side validation operations, in order to implement the desired functionlity. In this
instance, you would create an "Authentication" context, which places utilities, types, and a store object in the correct
places.

ex.)

`$> yarn gen:context --name auth --type Auth --priv true`

Would generate the following files:

```javascript
src/
  __tests__/
    auth/
      ... tests ...

  ...other dirs...

  components/
    auth/
      index.ts

  ...more dirs...

  lib/
    store/
      index.ts
      ...others...
      auth/
        index.ts // Accumulator for the directory
        actions.ts
        reducers.ts
        authStoreObject.ts
    types/
      auth/
        index.ts

// components/Authentication/index.ts

```

### Utilities

Utilities are the business logic of the frontend application. There are a couple kinds:

-   General (components and functions)
-   Specific (components and functions)

An example of a general utility component would be a component that takes in a list and
returns a list of a specifed component type. Ex:

To generate a utility
`$> yarn gen:util --name ObjectUl --type component --file object-ul --ctx lists`
~or~
`$> yarn gen:util:component --name ObjectUl --file object-ul --ctx lists`

Would put the file in:

```javascript
src / components / util / lists / object - ul.tsx;
```

Then you could define:

```javascript
<ObjectUl data={{ a: 'b', c: 'd' }} mode="entries" />
// Would render:
//  <ul {...otherprops}>
//    <li key={'a'}>b</li>
//    <li key={'b'}>d</li>
//  </ul>

// Which could also provide a render prop pattern
<ObjectUl data={{
  a: { value: 'b', href: '/b'},
  c: { value: 'd', href: '/d'}
}} mode="entries" >
  {(key, value, index) => (
    <a href={value.href}>{value.value}</a>
  )}
</ObjectUl>
// Would render:
//  <ul {...otherprops}>
//    <li key={'a'}>
//      <a href="/b">b</a>
//    </li>
//    <li key={'b'}>
//      <a href="/d">d</a>
//    </li>
//  </ul>

// Example with 'keys' and 'values'

// keys: value will be null, so _ it
<ObjectUl data={{
  a: { value: 'b', href: '/b'},
  c: { value: 'd', href: '/d'}
}} mode="keys" >

  {(key, _, index) => (
    <p>{key}</p>
  )}
</ObjectUl>
// Would render:
//  <ul {...otherprops}>
//    <li key={'a'}>a</li>
//    <li key={'b'}>b</li>
//  </ul>

// value: key will be null, so _ it
<ObjectUl data={{
  a: { value: 'b', href: '/b'},
  c: { value: 'd', href: '/d'}
}} mode="keys" >
  {(_, value, index) => (
    <a href={value.href}>{value.value}</a>
  )}
</ObjectUl>
// Would render:
//  <ul {...otherprops}>
//    <li key={0}>
//      <a href="/b">b</a>
//    </li>
//    <li key={1}>
//      <a href="/d">d</a>
//    </li>
//  </ul>

```

## Design
