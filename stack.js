//栈结构的建立
function Stack(){
    this.space = [];
}

Stack.prototype = {
    constructor: Stack,
    push: function(value){
        return this.space.push(value);
    },
    pop: function(value){
        return this.space.pop();
    },
    clear: function(){
        this.value = [];
    },
    readTop: function(){
        return this.space[this.space.length-1];
    },
    read: function(){
        return this.space;
    }
}

//数组reverse的实现
function reverse(arr){
    var ArrStack = new Stack();

    for(var i = arr.length - 1; i >= 0; i--){
        ArrStack.push(arr[i]);
    }

    return ArrStack.read();
}

console.log(reverse([1,2,3,4,5]));

//十进制转化为二进制
function binary(number){
    var tmp = number;
    var ArrStack = new Stack();

    if(number === 0){
        return 0;
    }

    while(tmp){
        ArrStack.push(tmp % 2);
        tmp = parseInt(tmp / 2, 10);
    }

    return reverse(ArrStack.read()).join('');
}

console.log(binary(20));

//简单调度场算法实现，数字要求为整数，不允许表达式中出现多余的空格
function calculate(exp){
    var valueStack = new Stack(); // 数值栈
    var operatorStack = new Stack(); // 操作符栈 
    var expArr = exp.split(''); // 切割字符串表达式
    var FIRST_OPERATOR = ['+', '-']; // 加减运算符
    var SECOND_OPERATOR = ['*', '/']; // 乘除运算符
    var SPECIAL_OPERATOR = ['(', ')']; // 括号
    var tmp; // 临时存储当前处理的字符
    var tmpOperator; // 临时存储当前的运算符

    // 遍历表达式
    for(var i = 0, len = expArr.length; i < len; i++){
        tmp = expArr[i];
        switch(tmp){
            case '(':
                operatorStack.push(tmp);
                break;
            case ')':
                // 遇到右括号，先出栈括号内数据
                while( (tmpOperator = operatorStack.pop()) !== '(' && 
                    typeof tmpOperator !== 'undefined' ){
                    valueStack.push(calculator(tmpOperator, valueStack.pop(), valueStack.pop()));
                }
                break;
            case '+':
            case '-':
                while( typeof operatorStack.readTop() !== 'undefined' && 
                    SPECIAL_OPERATOR.indexOf(operatorStack.readTop()) === -1 &&
                    (SECOND_OPERATOR.indexOf(operatorStack.readTop()) !== -1 || tmp != operatorStack.readTop()) ){
                    // 栈顶为乘除或相同优先级运算，先出栈
                    valueStack.push(calculator(operatorStack.pop(), valueStack.pop(), valueStack.pop()));
                }
                operatorStack.push(tmp);
                break;
            case '*':
            case '/':
                while( typeof operatorStack.readTop() != 'undefined' && 
                    FIRST_OPERATOR.indexOf(operatorStack.readTop()) === -1 && 
                    SPECIAL_OPERATOR.indexOf(operatorStack.readTop()) === -1 && 
                    tmp != operatorStack.readTop()){
                    // 栈顶为相同优先级运算，先出栈
                    valueStack.push(calculator(operatorStack.pop(), valueStack.pop(), valueStack.pop()));
                }
                operatorStack.push(tmp);
                break;
            default:
                valueStack.push(tmp);
        }
    }

    // 处理栈内数据
    while( typeof (tmpOperator = operatorStack.pop()) !== 'undefined' ){
        valueStack.push(calculator(tmpOperator, valueStack.pop(), valueStack.pop()));
    }

    return valueStack.pop(); // 将计算结果推出

    /*
        @param operator 操作符
        @param initiativeNum 主动值
        @param passivityNum 被动值
    */
    function calculator(operator, passivityNum, initiativeNum){
        var result = 0;

        initiativeNum = typeof initiativeNum === 'undefined' ? 0 : parseInt(initiativeNum, 10);
        passivityNum = typeof passivityNum === 'undefined' ? 0 : parseInt(passivityNum, 10);

        switch(operator){
            case '+':
                result = initiativeNum + passivityNum;
                console.log(`${initiativeNum} + ${passivityNum} = ${result}`);
                break;
            case '-':
                result = initiativeNum - passivityNum;
                console.log(`${initiativeNum} - ${passivityNum} = ${result}`);
                break;
            case '*':
                result = initiativeNum * passivityNum;
                console.log(`${initiativeNum} * ${passivityNum} = ${result}`);
                break;
            case '/':
                result = initiativeNum / passivityNum;
                console.log(`${initiativeNum} / ${passivityNum} = ${result}`);
                break;
            default:;
        }

        return result;
    }
}

function getValue(str){
    let valueStack = new Stack();
    let strArr = str.split('');
    let tmp;
    for(let i=0,len = strArr.length;i<len;i++){
        tmp = Number(strArr[i]);
        //operator
        if(tmp !== tmp){
            valueStack.push(calculate(strArr[i],valueStack.pop(),valueStack.pop()));
        }else{
            valueStack.push(tmp);
        }
    }
    return valueStack.pop();

    function calculate(o,v2,v1){
        let n1 = Number(v1);
        let n2 = Number(v2);
        let result;
        switch(o){
            case '+':
            result = n1 + n2;
            console.log(v1,o,v2,result);
            break;
            case '-':
            result = n1 - n2;
            console.log(v1,o,v2,result);
            break;
            case '*':
            result = n1 * n2;
            console.log(v1,o,v2,result);
            break;
            case '/':
            result = n1 / n2;
            console.log(v1,o,v2,result);
            break;
        }
        return result;
    }
}

console.log(getValue('34+5*6-'));



