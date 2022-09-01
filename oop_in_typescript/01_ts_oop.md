# Object Oriented Programming with Typescript
- [Object Oriented Programming with Typescript](#object-oriented-programming-with-typescript)
  - [Classes](#classes)
    - [Class methods](#class-methods)
    - [Get and set a class instance property value](#get-and-set-a-class-instance-property-value)
    - [User class example](#user-class-example)
## Classes
Instead of regular objects, use classes to define objects that can be easily kept in sync. 
```ts
const message1 = {title: undefined, message: undefined};
const message2 = {title: undefined, message: undefined};
const message3 = {title: undefined, message: undefined};
//...
//if you would want to add a property id to all messages, that would have to be done manually
//instead use a class and all properties added to the class will initiated on each instance object of the class:

export class Message {
    title: string;
    message: string;
    id: string;
    isSent: boolean;
    
    constructor(title: string, message: string, id: string){
        this.title = title;
        this.message = message;
        this.id = id;
        this.isSent = false; 
    }
}

const message1 = new Message('title1', 'message1', 'id1');
const message2 = new Message('title2', 'message2', 'id2');
const message3 = new Message('title3', 'message3', 'id3');
```
*Note* that the pre-ES2015 syntax would be that of a constructor function that takes in arguments:
```ts
function Message(title, message, id){
    this.title = title;
    this.message = message;
    this.id = id;
}
const message1 = new Message('title', '...', '0001');
```
### Class methods
Class methods are functions that are defined inside a class and available on every object created by that class. For each function, you can specify what TYPE of value it returns.
```ts
export class Message {
    title: string;
    message: string;
    id: string;
    isSent: boolean;
    
    constructor(title: string, message: string, id: string){
        this.title = title;
        this.message = message;
        this.id = id;
        this.isSent = false; 
    }

    previewMessage(): string {
        return `${this.message.slice(0, 10)}...`;
    }
    returnNothing(): void {
        console.log('Void function')
    }
}
const message1 = new Message('title1', 'This is my first message.', 'id1');
message1.previewMessage();
```
### Get and set a class instance property value
```ts
export class Message {
    title: string;
    message: string;
    id: string;
    private _isSent: boolean;
    deliveryDate: Date;
    //delivery date is associated to the private isSent variable and updated by the isSent setter function
    
    constructor(title: string, message: string, id: string){
        this.title = title;
        this.message = message;
        this.id = id;
        this._isSent = false;
    }
    //the getter method messageStatus returns a string
    get messageStatus(): string {
        const messageStatus = this._isSent ? 'Message has been sent.' : 'Message has  not been sent.'
        return this._isSent ? `${this.message} | ${messageStatus} | Delivery date: ${this.deliveryDate}` : `${messageStatus}`
    }
    //the setter does not return a value, only takes in a value
    //it updates the value of the delivery date variable as well
    set setIsSent(newStatus: boolean) {
        if (newStatus === true) {
            this.deliveryDate = new Date();
        }
        this._isSent = newStatus; 
    }
    get isSent(): boolean {
        return this._isSent
    }
}
const message1 = new Message('title', 'My first message', 'id');
//the getter method can be accessed as a PROPERTY on each instance created by the class
message1.messageStatus
//-> Message has not been sent.
//the setter function is also available as property.
message1.setIsSent = true;
message1.messageStatus
//-> My first message | Message has been sent. | Delivery date: Thu Oct 08 2020 18:54:17 GMT+0200 (GMT+02:00) 
message1.isSent
//-> true
```
### User class example
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
        return `${firstname} ${lastname}`;
    }
    matchEmail(value: string): boolean {        
        return value === this.email;
    }
}
const firstUser = new User('J', 'R', 'j@r.com');
console.log(firstUser.fullName)
//-> J R
firstUser.matchEmail('j@r.com');
//-> true
firstUser.matchEmail('j@q.com');
//-> false
```