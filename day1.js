// // variable type
// // let, const, var
// // const is block-scoped and cannot be ressigned
// const name = 'John';
// // name = 'Doe' // Error : Assignment to constant varibale
// let age= 30;
// age=31; //allowed:age can be ressigned
// //let age =31 //Error

// var isActive =true; //var is function-scoped and can be ressigned
// var isActive=false; // allowed: var can be redeclared and reassigned

// console.log(city); //undefined

// if(true){
//     const lastname= "Doe"; // Block-scoped variable
//     let firstname = "Ram"; // Block-scoped variable
//     var city ="Kathmandu"; //Function-scoped varibale
//     console.log(lastname); //output:Doe
//     console.log(firstname); //output:Ram
//     console.log(city); //kathmandu

// }
// //console.log(lastname); //error:last name is not defined
// //console.log(firstnmae); ''error:firstname is not defined
// console.log(city); //because of var


// //Data types (commonly used)
// let stringVar = "Hello, World"; //String
// let numberVar = 42;
// let longNumberVar = 909028323n; //BigInt
// let booleanVar = true; //null and undefined
// let nullVar = null; //null
// let undefienedVar; // undefined
// let symbolVar = Symbol("unique"); //Symbol
// let symbolVar2 = Symbol("Unique"); //different symbol,even with the same description

// console.log(stringVar, typeof stringVar );
// console.log(numberVar, typeof numberVar);
// console.log(longNumberVar, typeof longNumberVar);
// console.log(booleanVar, typeof booleanVar);
// console.log(nullVar, typeof nullVar); //object (this is a quirk in JavaScript)
// console.log(undefienedVar, typeof undefienedVar);
// console.log(symbolVar, typeof symbolVar);
// console.log(symbolVar2, typeof symbolVar2); //output:false (different symbols) even with the same description


// //if-else if -else
// let score = 85;
// if(score >= 90){
//     console.log("Grade: A");
// }else if(score >= 80){
//     console.log("Grade: B");
// }else{
//     console.log("Grade: F");
// }

// //terneary operator
// // condition ? truth : false;
// let grade = score <40 ? "Fail" : "Pass";
// console.log("Grade:", grade); //output:Pass

// //switch
// let day = 3;
// switch(day){
//     case 1:
//         console.log("Monday");
//         break;
//     case 2:
//         console.log("Tuesday");
//         break;
//     default:
//         console.log("Other day");
// }

// //=, ==, ===
// let num1 = 21;
// let num2 = "21";
// console.log(num1 == num2); //true
// console.log(num1 === num2); //false


// const arr1 = ["apple", "mango", "watermelon"];
// console.log(arr1[0]); // output: apple
// arr1.push("banana"); //add banana at the end
// arr1.unshift("grape"); //add grape in the beg
// console.log(arr1);

// //iterating array
// for(let i=0; i < arr1; i++){
//     console.log(arr1[i]);
// }
// //for of loop (iteration element)
// for(const fruit of arr1){
//     console.log(fruit);
// }
// //for in loop (iteration index/key)
// for(const index in arr1){
//     console.log(arr1(index));
// }


// //object
// // JSON -> Js "Object "Notation
// //{key: value}, key is string, value can be any data type
// const person1 = {
//     firstname: "Ram",
//     lastname : "Bhanadur",
//     "age ":25,
//     isStudent: true,
//     hobbies: ['reading', 'travelling'],
//     address:{
//         city: "ktm",
//         country:"Nepal"
//     }
// }
// console.log(person1);
// consolelog(person1.firstname); // . notation
// console.log(person1["lastname"]); //[]
// console.log(person1.hobbies[0]); //output:reading
// console.log(person1.address.city); //output:kathmandu 

// person1.name ="Shyam";
// //person1 ={}

// console.log(person1.detail); //undefined
// //console.log(person1.detail.city); //error

// //nullable
// console.log(person1.detail ?? "Detail not found");
// console.log(person1.detail.city ?? "City not found");


// //create  a array of students
// const stu1 ={
//     name: "Ram",
//     age: 20,
//     score : 85
// }

// const stu2 ={
//     name:"Shyam",
//     age: 22,
//     score: 35
// }

// //create an array students and add stu1 and stu2 to it
// // loop students and print the name of students who score below 40

// const students = [stu1, stu2];
// for (const student of students){
//     if(student.score <40){
//         console.log();
//     }
// }