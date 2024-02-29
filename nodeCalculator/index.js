// using terminal to design a calculator that can interact with the user
const readline = require('readline');   

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


// function for operator that can be used in the calculator
const CalResult = (op,a,b) => {
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
            if (b === 0) {
                throw "Cannot divide by zero";
            }  
        default:
            // handle unknown operator
            throw "NaN";
            break;
    };
};




// Function to calculate the sum of two numbers
const cal = (answer) => {
    //1. catogorize the input as operators and operands
        //1.1 声明变量名 
        const operators = [];
        const operands = [];
        //1.2 拆分字符串
        const tokens = answer.match(/\d+|\S/g);
        //1.3 遍历字符串， 识别数字和运算符，存入数组
        for (let i = 0; i < tokens.length; i++) {
            //first check if the token is a number or an operator
            if (tokens[i] === '+' || tokens[i] === '-' || tokens[i] === '*' || tokens[i] === '/') {
                operators.push(tokens[i]);

            } else {
                operands.push(tokens[i]);
            }
        }

        return console.log(tokens, operators,operands);
    //2. calculate the result
        //when operator is empty, return "Undifined"
        if (operators.length === 0) {
            return "Undifined";
        }
        
        //when operators array is more than one operators, keep calculating the result
        while (operators.length > 0) {
            const op = operators.shift();
            const a = operands.shift();
            const b = operands.shift();
            const result = CalResult(op, parseInt(a), parseInt(b));
            operands.unshift(result);
        }
}



//
// Function to ask the user for input and calculate the result
const askQuestion = () => {
    rl.question("Enter an expression: ", (answer) => {
        if (answer === "exit") {
            rl.close();
            return;
        } 
        const result = cal(answer);
        console.log(result);
        askQuestion();
    });
};
askQuestion();