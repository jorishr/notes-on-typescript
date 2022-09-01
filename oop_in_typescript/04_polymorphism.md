When working with classes polymorphism may manifest itself in three cases:
- method or parameter overriding by a child class
```ts
class Parent {
    method1(): string {
        return 'a string'; 
    }
}
//child class method overrides the inherited parent class method
class Child extends Parent {
    method1(): boolean {
        return false;
    }
}

```
- method overloading: additional parameters are added to the same method in a child class (or less parameters are used). This is not supported by Javascript nor Typescript so a workaround is needed.
```ts
class Parent {
    method1(): string {
        return 'a string'; 
    }
}
//child class method overrides the inherited parent class method and takes in an additional parameter resulting in an error
class Child extends Parent {
    method1(username: string): string {
        return `Hello ${username}`;
    }
}
// the solution is to already define the parameter username as optional in the parent class 
class Parent {
    method1(username?: string): string {
        return 'a string'; 
    }
}
```
- implementing classes to match the shape of the properties