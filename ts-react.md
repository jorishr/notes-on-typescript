# Typescript in React
Table of contents
- [Typescript in React](#typescript-in-react)
  - [Reference](#reference)
  - [Process](#process)
  - [Install](#install)
  - [TSConfig](#tsconfig)
  - [Components with TS](#components-with-ts)
  - [Webpack config](#webpack-config)

## Reference
- [Typescript React Getting Started](https://www.pluralsight.com/guides/typescript-react-getting-started)

## Process
TypeScript files will start out in your src folder, run through the TypeScript compiler, then webpack, and end up in a main.js file in the dist folder.

## Install
```bash
npm install --save-dev webpack webpack-cli
npm install --save react react-dom
npm install --save-dev @types/react @types/react-dom
npm install --save-dev typescript ts-loader source-map-loader
```
That @types/ prefix means that we also want to get the declaration files for React and React-DOM. Usually when you import a path like "react", it will look inside of the react package itself; however, not all packages include declaration files, so TypeScript also looks in the @types/react package as well. 

Also add development dependencies on the ts-loader and source-map-loader:
- The `ts-loader` helps Webpack compile your TypeScript code using the TypeScript standard configuration file named tsconfig.json. 
- The `source-map-loader` uses any sourcemap outputs from TypeScript to inform webpack when generating its own sourcemaps. This will allow you to debug your final output file as if you were debugging your original TypeScript source code.

## TSConfig
```js
{ 
    "compilerOptions": { 
        "outDir": "./dist/", 
        "sourceMap": true,
        "noImplicitAny": true, 
        "module": "commonjs",
        "target": "es6", 
        "jsx": "react" 
    }
}
```

## Components with TS
You not only export the component but also the props interface.
```js
import * as React from "react";
export interface HelloProps { compiler: string; framework: string; }
export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
```
## Webpack config
```js
module.exports = {
    mode: "production",
    devtool: "source-map",	//enable src-maps
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps 		re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just assume a corresponding global variable exists and use that instead. This is important because it allows us to avoid bundling all of our dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
```