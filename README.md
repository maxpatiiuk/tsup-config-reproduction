# TSUP Ignoring Config Options Reproduction

TSUP seems to be ignoring the `minify: false,` and `splitting: false` options in
some cases

## Replication

I pushed the [dist/](./dist/) folder to this repo, so you don't have to build
the project. But you can reproduce it locally if you wish:

Clone the repository

```sh
git clone https://github.com/maxpatiiuk/tsup-config-reproduction
```

Install dependencies

```sh
npm install
```

Build the project

```sh
npx tsup
```

## Bugs

### `minify:false` is ignored:

See that dist has a [types-BzixD0y2.d.ts](./dist/types-BzixD0y2.d.ts) file that
has this:

```ts
export type { Type as T };
```

and then in index:

```ts
export { T as Type } from './types-BzixD0y2.js';
```

rather than what's expected:

```ts
export type { Type };
```

and in index

```ts
export { Type } from './types-BzixD0y2.js';
```

This is causing an issue when I consume a library (A) built with TSUP inside a
package (B) in my monorepo. The declarations for package B has this line:

```ts
declare const someFunction: (
  component: import('@internal-package/dist/CommonBundle-wZIQ4hbk').S
) => void;
```

Why is minified type used inside the package?

### `splitting: false` is ignored:

Why does a common bundle ([types-BzixD0y2.d.ts](./dist/types-BzixD0y2.d.ts))
file exist?

The common `.js` bundle is also emitted when some variable, not just type is
shared between entrypoints.

Isn't `splitting:false` supposed to prevent code splitting like this?

## Effect

I am getting this error in package B:
https://github.com/microsoft/TypeScript/issues/42873. Among the suggested fixes
(https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189),
not splitting the common bundle out, not minifying the types, and not using
`exports` in package.json fixes the issue.
