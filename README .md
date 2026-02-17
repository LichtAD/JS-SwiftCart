1) What is the difference between null and undefined?
=> If I define a variable but don't assign a value, that's undefined. But If I can assign null as a value to a variable. null is an object whereas undefined is a type.

2) What is the use of the map() function in JavaScript? How is it different from forEach()?
=> Map creates a copy of original array and then return a new array of the same size.

Foreach is a type of loop which iterates through each element of an array. Map creates a whole new array and doesn't affect the original array while foreach makes changes in the original array.

3) What is the difference between == and ===?
=> == is used to compare only two values (3 == '3' will return true).
=== is used to compare two values and their types (3 == '3' will return false)

4) What is the significance of async/await in fetching API data?
=> asynce/await makes the code easier to follow and understand while .then() has lots of chain callbacks.

5) Explain the concept of Scope in JavaScript (Global, Function, Block).
=> With scope we can decide where we can access the variable. Global scope let us access the variable from anywhere. Function scope is declared inside function and can only be use in that function. Block scope like if, for loop can only be accessed inside that block only.