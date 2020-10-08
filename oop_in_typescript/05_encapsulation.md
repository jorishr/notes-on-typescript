# OOP with Typescript
Encapsulation and access modifiers: regulate how you get access to properties and methods defined within a class.
- private: property values are only accessible from within the exact same class
- protected: property values can be accessed through child classes
- public: other non-related classes can access the property value
- static: a method that is used as a utiltity function at class level and does not get instanciated on objects created by that class, it cannot reference the this keyword.

By default, a property defined in a class is public. You can access it easily by typing: `objectFromClass.property1`
```ts
class User {
    name: string;
    private age: number;
}
//is equivalent of
class User {
    public name: string;
    private age: number;
}

const person = new User();
person.name
person.age //_> private, not accessible

// you have to define a getter function inside that class to make it accessible

class User {
    public name: string;
    private age: number;

    public get getAge(): number {
        return this.age;
    }
}
```
When using a `protected` property or method you cannot use an implementation class. It only works for extended child class methods that can access the protected property of the parent class. 

Static method example with readonly example. The id is readonly and can only be set once, in the constructor.
```ts
//message class
class Message {
    readonly id: string;
    title: string;
    message: string;
    isSent: boolean;

    constructor(id: string, title: string, message: string){
        this.id = id
        this.title = title;
        this.message = message;
        this.isSent = false
    }
}

//messages class works with an array of objects created by the Message class
//the static method takes in and returns an array of objects created by Message class
//filters out the one that are empty strings
class Messages {
    static getValidMessages(messages: Message[]): Message[]{
        return messages.filter(val => val.trim().length > 0)
    }
}
const message1 = new Message('id1', '', '');
const message2 = new Message('id2', 'hello', 'world');
//the static method is invoked on the class, never on an instance created by that class
Messages.getValidMessages([message1, message2]);
//-> [ Message { title: 'hello', message: 'world', isSent: false } ]
```

Example use of readonly, public, private and protected access modifiers
```ts
export class User {
    public readonly id: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    protected dob: Date;

    constructor(firstname: string, lastname: string, email: string, dob: Date){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.dob = dob;
    }
    public get fullName(): string {
        return `${this.firstname} ${this.lastname}`;
    }
    public matchEmail(value: string): boolean {        
        return value === this.email;
    }
}

class Admin extends User {
    yearBorn: number;
    constructor(firstname: string, lastname: string, email: string, dob: Date){
        super(firstname, lastname, email, dob);
        this.yearBorn = this.getYearBorn();
    }

    private getYearBorn(): number {
        return this.dob.getFullYear();
    }
}

const admin = new Admin('J', 'R', 'j@r.com', new Date)
```