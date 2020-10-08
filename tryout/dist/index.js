console.log("Hello world");
async function sayHello() {
    return "Hello world";
}
console.log("Watch mode active; tsconfig setup correctly.");
const url = new URL("http://jorisr.com");
function sum(a, b) {
    return (a + b).toString();
}
function sayHelloAgain() {
    console.log('Hello world');
}
const arr = [];
arr.push({ "first": "Joris", "last": "R", "age": 36 });
const arrTuple = [];
//cannot be empty, unless you make types optional
//array can now contain number, booleans, string or be empty but not objects
arrTuple.push(22);
arrTuple.push(22);
arrTuple.push(22);
arrTuple.push(true);
arrTuple.push("true");
/* arrTuple.push({}); //-> error*/
