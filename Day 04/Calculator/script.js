let display = document.getElementById("display");

function append(value){

display.value += value;

}

function clearDisplay(){

display.value = "";

}

function deleteLast(){

display.value = display.value.slice(0,-1);

}

function calculate(){

try{

let expression = display.value.replace(/%/g,"/100");

display.value = eval(expression);

}

catch{

display.value="Error";

setTimeout(()=>{

display.value="";

},1000);

}

}

document.addEventListener("keydown",function(event){

let key = event.key;

if((key>='0' && key<='9') || ['+','-','*','/','.','%'].includes(key)){

append(key);

}

else if(key==="Enter"){

calculate();

}

else if(key==="Backspace"){

deleteLast();

}

else if(key==="Escape"){

clearDisplay();

}

});