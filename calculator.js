var off = document.querySelector('.js-off');
var on = document.querySelector('.js-on');
var display = document.querySelector('.display');
var screen = document.querySelector('.screen');
var buttons = document.querySelectorAll('.button');
var flag = 0;
var screen_width = getComputedStyle(screen).width;

off.addEventListener('click', function(){
    display.classList.add('none');
    screen.classList.remove('lit');
    display.textContent = '';
    display.style.fontSize = '40px';
    flag = 0;
});

on.addEventListener('click', function(){
    display.classList.remove('none');
    screen.classList.add('lit');
    display.textContent = '';
    display.style.fontSize = '40px';
    flag = 0;
});


buttons.forEach(function(button){
    button.addEventListener('click', function(){
        var value = button.textContent;
        checkScreenWidth();
        if(value === 'On' || value === 'Off'){
            return;
        }
        else if(value === '='){
            flag = 1;
            var postfix = convertToPostfix(display.textContent);
            var answer = postfix_evaluation(postfix);
            display.textContent = '';
            display.textContent = answer;
            checkScreenWidth();
            setInterval(function(){
                flag = 0;
            }, 100);
        }
        if(!display.classList.contains('none') && flag == 0){
            display.textContent += value;    
        }
    })
});


var checkScreenWidth = function() {
    var display_width = display.offsetWidth;
    var float_screen_width = parseFloat(screen_width.slice(0,-2));
    if(display_width > float_screen_width) {
        display.style.fontSize = '20px';
    }
}

var priority = function(operator) {
    switch(operator)
    {
        case '+':
        case '-':
            return(1);
        case '*':
        case '/':
            return(2);
        case '^':
            return(3);
        default:
            return(-1);
    }
}

var calculateValue = function(num1, operator, num2) {
    switch(operator)
    {
        case '+':
            return(num1+num2);
        case '-':
            return(num1-num2);
        case '*':
            return(num1*num2);
        case '/':
            return(num1/num2);
    }
}

var convertToPostfix = function(infix){
    var operators = [];
    var postfix = '';
    for(var i = 0; i < infix.length; i++) {
        if((infix[i] >= '0' && infix[i] <= '9') || infix[i] == '.' ){
            postfix += infix[i];
        }
        else {
            postfix += ' ';
            if(operators.length === 0) {
                operators.push(infix[i]);
            } 
            else {
                if(priority(infix[i]) > priority(operators[operators.length - 1])) {
                    operators.push(infix[i]);
                }
                else {
                    while(!(operators.length === 0) && priority(infix[i]) <= priority(operators[operators.length - 1])) {
                        var ch = operators[operators.length - 1];
                        operators.pop();
                        postfix += ch;
                    }
                    operators.push(infix[i]);
                }
            }
        }
    }
    postfix += ' ';
    while(!(operators.length === 0)) {
        var ch = operators[operators.length - 1];
        postfix += ch;
        operators.pop();
    }
    return(postfix);
}

var postfix_evaluation = function(postfix) {
    var answer = [], n, result;
    for(var i = 0; i < postfix.length; i++) {
        if((postfix[i] >= '0' && postfix[i] <= '9') || postfix[i] == '.') {
            var number = '';
            while(postfix[i] != ' ') {
                number += postfix[i];
                i++;
            }
            n = parseFloat(number);
            answer.push(n);    
        }
        else {
            if(answer.length < 2) {
                result = 'INVALID';
                return(result);
            } else {
                var num2 = answer[answer.length - 1];
                answer.pop();
                var num1 = answer[answer.length - 1];
                answer.pop();
                result = calculateValue(num1, postfix[i], num2);
                answer.push(result);
            }
        }
    }
    var finalAns = answer[answer.length - 1];
    answer.pop();
    if(answer.length === 0) {
        return(finalAns);
    } else {
        return('INVALID');
    }
}