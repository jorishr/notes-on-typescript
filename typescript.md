# TypeScript
Table of contents
- [TypeScript](#typescript)
  - [About TypeScript](#about-typescript)
  - [When to use](#when-to-use)
  - [Instal and project setup](#instal-and-project-setup)
  - [TS + Gulp](#ts--gulp)
  - [Type checking](#type-checking)
    - [Type annotation](#type-annotation)
    - [Interfaces](#interfaces)
    - [Classes](#classes)
    - [Functions](#functions)
    - [Arrays](#arrays)
    - [Tuple](#tuple)
    - [Generics](#generics)
    - [Objects](#objects)

## About TypeScript
TypeScript is a superset of JS that needs to be compiled into regular JS to run in a browser. 

Dynamic versus static typing. With static typing you have specify the type of data that a variable will hold (booleans, number, string, etc.). With dynamic typing this can change easily.

Errors with static typing are caught when compiling to regular JS which makes it safer because errors with dynamic typing are caught at run time in the browser by the user. 

Which TypeScript features you use is optional. Which makes it a good compromise.

## When to use
TypeScript becomes useful when you work with larger codebases because no single person will have written all the components and especially when components are built on top of one another, a loosely typed language may conceal potential errors and inconsistencies.

## Instal and project setup
`npm install -g TypeScript`

Compile manually using the CLI, a config file or a task runner such as Gulp or Webpack.
```bash
tsc <ts-file>	# auto compiler

# see tsconfig.ts in JS folder for example of configuration and task automation.

tsc -w 		
# watches the files you specified in the tsconfig.json
```

## TS + Gulp
```
npm install --save-dev TypeScript gulp gulp-TypeScript
```
Create the file tsconfig.json which takes in the main.ts files and creates an ES5 browser compatible file in the .dist folder through the gulp pipeline.
```js
{ 
    "files": ["src/main.ts"],
    "compilerOptions": { 
        "noImplicitAny": true, 
        "target": "es5"
    }
}

var gulp = require('gulp');
var ts 	 = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function () {
    return tsProject.src()
       .pipe(tsProject())
       .pipe(gulp.dest('dist'));
});
```

## Type checking
### Type annotation
In the function below we expect the parameter person to be a string. If you call the function without a string parameter or with an arr or any other data type, TS will warn you.
```js
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];	
document.body.textContent = greeter(user);
//-> error 

//to be even more restrictive you can specify which string values you expect

function greeter(person: "Joris" | "Jack" | "John" ) {
    return "Hello, " + person;
}
//intellisense will give you the allowed options when calling the function:
greeter('Joe') //-> not assignable

//using the TYPE keyword you can define a range of types that can be re-used
type PersonType = string | boolean | number;

function greeter(person: PersonType ) {
    return "Hello, " + person;
}
```

### Interfaces
An interface can be used to set the expect value types of an object:
```js
interface Person {
    firstName: string;
    lastName: string;
    [key: string]: any  //allows for additional properties of any type
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
```
### Classes
The use of `public` on arguments to the constructor is a short hand that allows us to automatically create properties with that name.
```js
class Student {
    fullName: string;
    constructor(
        public firstName: string, 
        public middleInitial: string, 
        public lastName: string
        ) {     
		this.fullName = firstName + " " + middleInitial + " " + lastName;
    	}
}
```
### Functions
Set types on the parameters and the return value. If the function does not return any value, set the type to `void`.

```ts
function sum(a: number, b: number): string {
    return (a + b).toString();
}

function sayHello(): void {
    console.log('Hello world');
}
```
### Arrays
Declare an empty array that only accepts numbers: `const arr: number[] = []`. Especially useful when working with an array of objects that need to have a shape that can be stored in an interface.
```ts
interface Person {
    first: string,
    last: string,
    age: number,
    address?: string
}

const arr: Person[] = []
arr.push({"first": "Joris", "last": "R", "age": 36})
```
### Tuple
An array or list whereby each element can have it's own type. Combine with the alias `type`
```ts
type MyList = [number, boolean, string];
const arr: MyList[] = []; 
```
### Generics
Generics can be used to constrain the input and output data of a function to be of the same type.
```ts
//the input is a generic type array and we expect the function to return an array of the same type
function reverse<T>(arr: T[]): T[]{
    return arr.reverse();
}

const arr1 = [1,2,3];       //array of numbers
let arr2 = reverse(arr1); //arr2 is expected to be an array of numbers
//if you try arr2 = ["1", "2", "3"] typescript will complain

//insertion type for objects:
function extend<T, U>(first: T, second: U): T & U {
  return { ...first, ...second };
}

const x = extend({ a: "hello" }, { b: 42 });

// x now has both a and b
const a = x.a;
const b = x.b;

//Aliases
type Text = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;
```

### Objects
Allow for extra properties to be added:
```ts
//index signature: [key: string]: any
var x: { foo: number, [x: string]: any };
x = { foo: 1, baz: 2 };  // Ok, `baz` matched by index signature
```