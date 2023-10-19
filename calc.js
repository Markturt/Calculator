function Calculator(previousOperandTextElement,currentOperandTextELement){
    this.previousOperandTextElement=previousOperandTextElement;
    this.currentOperandTextELement=currentOperandTextELement;


    this.clear=function(){
        this.previousOperand="";
        this.currentOperand="";
        this.operation="";
    }
    
    this.append=function(number){
        if(this.currentOperand.includes('.') && number==".") return ;
        this.currentOperand+=  number.toString();
    }
    this.chooseOperation=function(operation){
        if(this.currentOperand =="") return ;
        if(this.previousOperand !==""){
            this.compute();
        }
        this.operation=operation;
        this.previousOperand=this.currentOperand ;
        this.currentOperand="";
        
    }
    this.compute=function(){
        let computation;
        let prev=parseFloat(this.previousOperand);
        let current=parseFloat(this.currentOperand);
        if(isNaN(prev) ||isNaN(current)) return;
        switch(this.operation){
            case "+":
                computation=prev+current;
                break;
            case "-":
                computation=prev-current;
                break;
            case "*":
                computation=prev*current;
                break;
            case "/":
                computation=prev/current;
                break;
            default:
                return;
        }
        this.currentOperand=computation;
        this.previousOperand="";
        this.operation="";
    }
    this.updateDisplay=function(){
       this.currentOperandTextELement.textContent=this.currentOperand;
       this.previousOperandTextElement.textContent=this.previousOperand+this.operation;
    }
    
}


let previousOperandTextElement=document.querySelector("#previous");
let currentOperandTextELement=document.querySelector("#current");

let clearButton=document.querySelector("#clear");
let deleteButton=document.querySelector("#delete");
let equalsButton=document.querySelector("#equals")


let numberButtons=document.querySelectorAll(".dataNumber");
let operationsButtons=document.querySelectorAll(".operation");

const calculate=new Calculator(previousOperandTextElement,currentOperandTextELement);

calculate.clear();
numberButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        calculate.append(button.textContent);
        calculate.updateDisplay();
    })
});
operationsButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        calculate.chooseOperation(button.textContent);
        calculate.updateDisplay();
    })
})
equalsButton.addEventListener("click",()=>{
    calculate.compute();
    calculate.updateDisplay();
})

clearButton.addEventListener("click",()=>{
    calculate.clear();
    calculate.updateDisplay();
})

deleteButton.addEventListener("click",()=>{
    calculate.currentOperand=calculate.currentOperand.slice(0,-1);
    calculate.updateDisplay();
})