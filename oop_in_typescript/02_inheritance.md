# OOP with Typescript
- [OOP with Typescript](#oop-with-typescript)
  - [Inheritance](#inheritance)
    - [Extend a class](#extend-a-class)
    - [Implement a class](#implement-a-class)
    - [User and Admin class examples](#user-and-admin-class-examples)

## Inheritance
Class hierarchy example: Animal as parent or base class -> Dog and Cat as child classes.

### Extend a class
By extending the class the child classes inherit the parent class properties and method. You can also add properties and method to each child each class.

If no constructor is defined on the child class, JS/TS implements that for us. However, if you do use a constructor on a child class, you have to use the super() method and pass the inherited properties to as parameters.
```ts
class Animal {
    age: number;
    legs: number;
    name: string;

    constructor(age: number, legs: number, name: string){
        this.age = age;
        this.legs = legs;
        this.name = name
    }
}

class Dog extends Animal {
    //no constructor
    bark(): string {
        return 'Woof!'
    }
}

const firstDog = new Dog(9, 4, 'Brego')
firstDog.name
firstDog.bark()
//      .age
//      .legs

class Cat extends Animal {
    constructor(data: {age: number, legs: number, name: string}) {
        super(data.age, data.legs, data.name);
    }
    //the super keyword also gives you access to the parent class properties direclty if a constructor is used
    super.age
    super.legs
    super.name

    meow(): string {
        return 'meow'
    }
}

```
### Implement a class
A class implementation only matches the same shape as the parent class but it is not a child class. Thus objects created with an implementation class are not instances of the parent class.

You have to redine the properties from the parent class.
```ts
class Dog implements Animal {
    age: number;
    legs: number;
    name: string;
    
    bark(): string {
        return 'Woof!'
    }
}
const newDog = new Dog(9, 4, 'Brego');
console.log(newDog instanceOf Animal)   //-> false
```

### User and Admin class examples
```ts
export class User {
    firstname: string;
    lastname: string;
    email: string;

    constructor(firstname: string, lastname: string, email: string){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
    get fullName(): string {
        return `${this.firstname} ${this.lastname}`;
    }
    matchEmail(value: string): boolean {        
        return value === this.email;
    }
}

class Admin extends User {
    constructor(firstname: string, lastname: string, email: string){
        super(firstname, lastname, email);
    }
}

//match the shape of all properties AND methods
class Guest implements User {
    firstname: string;
    lastname: string;
    email: string;

    constructor(firstname: string, lastname: string, email: string){
        //no super keyword with implements
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    get fullName(): string {
        return `${this.firstname} ${this.lastname}`;
    }
    matchEmail(value: string): boolean {        
        return value === this.email;
    }
}
```