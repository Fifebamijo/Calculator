const current = document.getElementById('current');
const zero = document.getElementById('zero');
const clr = document.getElementById('clr');
const del = document.getElementById('del');
const point = document.getElementById('point');
const equals = document.getElementById('equals');
const moosic = document.getElementById('moosic');


let object = {
}



let numButtons = document.getElementsByClassName("button-number");
        for (let i = 0; i < numButtons.length; i++) {
        numButtons[i].addEventListener("click", (e) => {
            addNumber(e.target.textContent);
        })
    }


let operatorButtons = document.getElementsByClassName("button-operator");
        for (let i = 0; i < operatorButtons.length; i++) {
        operatorButtons[i].addEventListener("click", (e) => {
            addOperator(e.target.textContent);
        })
    }


zero.addEventListener('click', addZero);

function addZero() {
    if (('product' in object) && !('operand' in object)) {
        return false;
    } else if (!('operand' in object) && !('numOne' in object)) {
    object["numOne"] = [0];
    current.textContent = object.numOne;
    } else if (!('operand' in object)) {
        if(!(object.numOne[0] == 0) && (object.numOne.length < 10)) {
        object["numOne"] += [0];
        current.textContent = object.numOne;
    }
    }
  if (!('numTwo' in object) && ('operand' in object)){
        object["numTwo"] = [0];
        current.textContent = object.numTwo;
    } else if ('numTwo' in object){
        if(!(object.numTwo[0] == 0) && (object.numTwo.length < 10)) { 
        object["numTwo"] += [0];
        current.textContent = object.numTwo;
    }
    }
  }

function addNumber(e) {
    if (('product' in object) && !('operand' in object)) {
        return false;
    } else if (!('operand' in object) && !('numOne' in object)) {
    object["numOne"] = [e];
    current.textContent = object.numOne;
    } else if (!('operand' in object) && (object.numOne.length < 10)) {
        object["numOne"] += [e];
        current.textContent = object.numOne;
    }
  if (!('numTwo' in object) && ('operand' in object)){
        object["numTwo"] = [e];
        current.textContent = object.numTwo;
    } else if (('numTwo' in object) && (object.numTwo.length < 10)){
         object["numTwo"] += [e];
         current.textContent = object.numTwo;
    }
  }
  

function addOperator(e) {
    if (('product' in object) && ('operand' in object) && ('numTwo' in object)) {
        operate(object.product, object.operand, object.numTwo);
        current.textContent = object.product + e;
        object['operand'] = e;
    } else if (('numOne' in object) && ('operand' in object) && ('numTwo' in object)) {
        operate(object.numOne, object.operand, object.numTwo);
        current.textContent = object.product + e;
        object['operand'] = e;
    }
    else if(!('numOne' in object) && !('product' in object)) {
        return false;
    } else {
    if('numOne' in object) {
       object['operand'] = e;
       current.textContent = object.numOne + e; 
    } else {
        current.textContent = object.product + e;
        object['operand'] = e;
    } 
}
}


point.addEventListener('click', addPoint)

function addPoint() {
    if (!('numOne' in object) && !('product' in object)) {
        object["numOne"] = "0.";
        current.textContent = object.numOne;
    } else if (('numOne' in object) && (!('operand' in object))) {
        if(!(object.numOne.includes('.'))) {
            object["numOne"] += ["."];
            current.textContent = object.numOne;
        }      
    } else if(('numOne' in object) && ('operand' in object) && (!('numTwo' in object))) {
        object["numTwo"] = "0.";
        current.textContent = object.numTwo;
    } else if ('numTwo' in object) {
        if(!(object.numTwo.includes('.'))) {
        object["numTwo"] += ["."];
        current.textContent = object.numTwo;
        }
    } else if(('product' in object) && ('operand' in object) && (!('numTwo' in object))) {
        object["numTwo"] = "0.";
        current.textContent = object.numTwo; 
    } 
    }


del.addEventListener('click', deleteLast)

function deleteLast() {
    if (('numOne' in object) && (!('operand' in object))) {
        let newString = object.numOne.slice(0, -1); 
        object.numOne = newString;
        current.textContent = object.numOne;
    } else if (('numOne' in object) && ('operand' in object) && (!('numTwo' in object))) {
        delete object.operand;
        current.textContent = object.numOne;
    } else if (('operand' in object) && ('numTwo' in object)) {
        let newString = object.numTwo.slice(0, -1); 
        object.numTwo = newString;
        current.textContent = object.numTwo;
    }  
    }


clr.addEventListener('click', clearAll)

function clearAll() {
    delete object.numOne;
    delete object.operand;
    delete object.numTwo;
    delete object.product;
    current.textContent = "";
}


equals.addEventListener('click', selectEquals);

function selectEquals () {
    if (!('numTwo' in object)) {
        return false;
    } else if (!('product' in object)) {
        operate(object.numOne, object.operand, object.numTwo);
        playMoosic();
    } else {
        operate(object.product, object.operand, object.numTwo);
        playMoosic();
    }
}


function operate(a, operator, b) {
    if (operator == "+") {
        addition(a, b);
    } else if (operator == "-") {
        subtraction(a, b);
    } else if (operator == "*") {
        multiplication(a, b);
    } else if (operator == "/" && a == 0 || b == 0) {
        current.textContent = "lulz nice try";
    } else if (operator == "/") {
        division(a, b);
    }
    }

function addition (a, b) {
    let result = Number(a) + Number(b);
    current.textContent = result.toFixed(2).replace(/\.?0+$/, "");
    object['product'] = result.toFixed(2).replace(/\.?0+$/, "");
    delete object.numOne;
    delete object.numTwo;
    delete object.operand;
}

function subtraction (a, b) {
    let result = Number(a) - Number(b);
    current.textContent = result.toFixed(2).replace(/\.?0+$/, "");
    object['product'] = result.toFixed(2).replace(/\.?0+$/, "");
    delete object.numOne;
    delete object.numTwo;
    delete object.operand;
}

function multiplication (a, b) {
    let result = Number(a) * Number(b);
    current.textContent = result.toFixed(2).replace(/\.?0+$/, "");
    object['product'] = result.toFixed(2).replace(/\.?0+$/, "");
    delete object.numOne;
    delete object.numTwo;
    delete object.operand;
}

function division (a, b) {
    let result = Number(a) / Number(b);
    current.textContent = result.toFixed(2).replace(/\.?0+$/, "");
    object['product'] = result.toFixed(2).replace(/\.?0+$/, "");
    delete object.numOne;
    delete object.numTwo;
    delete object.operand;
}