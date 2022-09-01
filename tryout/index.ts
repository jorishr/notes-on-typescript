console.log("Hello world");
async function sayHello (){
    return "Hello world"
}

console.log("Watch mode active; tsconfig setup correctly.");

const url = new URL("http://jorisr.com");

function sum(a: number, b: number): string {
    return (a + b).toString();
}

function sayHelloAgain(): void {
    console.log('Hello world');
}

interface Person {
    first: string,
    last: string,
    age: number,
    address?: string
}

const arr: Person[] = []
arr.push({"first": "Joris", "last": "R", "age": 36})

/* type MyList = [number, boolean, string]; */
type MyList = [number?, boolean?, string?];
const arrTuple: MyList = []; 
//cannot be empty, unless you make types optional
//array can now contain number, booleans, string or be empty but not objects
arrTuple.push(22);
arrTuple.push(22);
arrTuple.push(22);
arrTuple.push(true);
arrTuple.push("true");
/* arrTuple.push({}); //-> error*/    

function reverse<T>(arr: T[]): T[]{
    return arr.reverse();
}

const arr1 = [1,2,3];       //array of numbers
let arr2 = reverse(arr1);
/* arr2 = ["1", "2"] //-> error*/   