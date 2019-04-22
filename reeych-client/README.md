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
contexts. I am not talking about UI stateful context, but contexts as in grouping similar
functionality together. For instance, a "Authentication" context would include certain network
calls and client side validation operations, in order to implement the desired functionlity. In this
instance, you would create an "Authentication" context, which places utilities & components in the correct
places.

ex.)

`$> yarn gen:context --name Authentication --schema Auth`

Would generate the following files:

```javascript
src/
  __tests__/
    Authentication/
      ... tests ...

  ...other dirs...

  components/
    Authentication/
      index.ts

  ...more dirs...

  lib/
    Authentication/
      index.ts

// components/Authentication/index.ts
/** GraphQL queries/mutations for auth ctx */
import { queries, mutations } from 'lib/Authentication'

... other code ...

```

## Design
