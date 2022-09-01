# OOP with Typescript
## Generics
Generics give you static typing for dynamic data types.

You do not always now which type of data you are going to receive. In the example below we merge datasets but there are two possible shapes for the user data: one with first and last name, the other has an additional middle name.

Instead of using the `àny` datatype we can use a generic by adding the letter `<T>` to the class and `: T` to the property in question.

When merging the actual user data we add the actual interface that best represents the data type.
```ts
export class User<T> {
    name: string;
    age: number;
    email: string;
    userData: T;
    
    mergeUserData(params: T): void {
        const { name, age, email } = this;
        this.userData = { name, age, email, ...params};
    }
}

interface IUserData1 {
    name: { first: string, last: string }
}

interface IUserData2 {
    name: { first: string, middle: string, last: string }
}

const user1 = new User();
// at this point the type for user1 is <unknown> and so is the expected params for the mergeUserData method
//if we now fill in the generic T by giving it an interface, a specific type is expected
//if you try to pass a third argument to mergeUserData, TS will complain
const user2 = new User<IUserData1>();
user2.mergeUserData({name: {first: 'J', last: 'R'}})
//both properties are now available:
user2.userData.name.first
user2.userData.name.last

const user3 = new User<IUserData2>();
user3.mergeUserData({name: {first: 'J', middle: 'H', last: 'R'}})
user.userData.name.first
user.userData.name.middle
user.userData.name.last
```