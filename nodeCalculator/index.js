// using terminal to design a calculator that can interact with the user
const { parse } = require('path');
const readline = require('readline');   

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// multiply and divide have higher precedence than add and subtract
const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
};


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




// function to calculate the result
const cal = (answer) => {
    //1. catogorize the input as operators and operands
        //1.1 声明变量名 
        const operators = [];
        const operands = [];
        //1.2 拆分字符串
        const tokens = answer.match(/\d+|\S/g);
        console.log(tokens);
        //1.3 遍历字符串， 识别数字和运算符，存入数组
       for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            console.log(token);
            //if token is a number, push it to the operands array
            if (!isNaN(parseInt(token))) {
                operands.push(parseInt(token));
                console.log(operands);
            }
            else {
                //if token is an operator, push it to the operators array
                if(operators.length === 0 && operands.length <2) {
                    operators.push(token);
                    continue;
                }
                const operator = operators.pop();
                const a = operands.pop();
                const b = operands.pop();
                CalResult(operator, a, b);
            }
        }

        
    //2. calculate the result
        
        
        //when operators array is more than one operators, keep calculating the result
        while (operators.length > 0) {
            const op = operators.pop();
            const a = operands.pop();
            const b = operands.pop();
            return CalResult(op, a, b);
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