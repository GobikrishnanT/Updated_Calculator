//First we have to create a obj :
let displayer = document.querySelector('#output_id');
class calci {
    constructor() {
        this.displayVal = "0";
        this.preVal = null;
        this.secondVar = null;
        this.waitingForSecond = false;
        this.operator = "";
    }
    updateDisplay() {
        displayer.value = +this.displayVal;
    }

    inputDigit(digit) {
        if(this.waitingForSecond === false) {
            this.displayVal = digit === "0" ? digit : this.displayVal + digit;
            this.preVal = +this.displayVal;
            this.updateDisplay();
        }
        else{
            this.displayVal = digit === "0" ? digit : this.displayVal + digit;
            this.secondVar = +this.displayVal;
            this.updateDisplay();
        }
        
    }

    dotHandle() {
        if(!this.displayVal.includes(".")) {
            this.displayVal = this.displayVal + ".";
            this.updateDisplay();
        }
        
    }

    operatorHandle(clickedsymbol) {
       if(this.operator !== "") {
            switch(this.operator) {
                case "+" :
                    this.preVal += +this.displayVal;
                    break;
                case "-" :
                    this.preVal = this.preVal - +this.displayVal;
                    break;
                case "/" :
                    this.preVal = (this.preVal / +this.displayVal).toFixed(5);
                    break;
                case "*" :
                    this.preVal = (this.preVal * +this.displayVal);
                    break;

            }
       }
        this.operator = clickedsymbol;
        this.waitingForSecond = true;
        this.displayVal = "0";
        this.updateDisplay();
        
    }

    equalIt() {
        this.waitingForSecond = false;
        switch(this.operator) {
            case "+" :
                displayer.value = (this.preVal + this.secondVar);
                this.displayVal = "0";
                break;
            case "-" :
                displayer.value = this.preVal - this.secondVar;
                this.displayVal = "0";
                break;
            case "/" :
                displayer.value = (this.preVal / this.secondVar).toFixed(5);
                this.displayVal = "0";
                break;
            case "*" :
                displayer.value = this.preVal * this.secondVar;
                this.displayVal = "0";
                break;

        }
    }
    clearIt() {
        this.displayVal = "0";
        this.updateDisplay();
        this.preVal = null;
        this.secondVar = null;
        this.operator = "";
        this.waitingForSecond = false;
    }

    delPrev() {
        if(this.displayVal !== "") {
            let newVal = (this.displayVal).slice(1 , this.displayVal.length-1);
            console.log(newVal);
            this.displayVal = "0";
            this.inputDigit(newVal);
        }
        
    }
}

let calciObj = new calci();
calciObj.updateDisplay();

let btnKeys = document.querySelectorAll('button');
btnKeys.forEach((item) => {
    item.addEventListener('click' , (event) => {
        if(item.classList[0] === 'number') {
            //console.log("Number : " + item.textContent);
            let val = item.textContent;
            calciObj.inputDigit(val);
        }

        else if(item.classList[0] === "operator") {
            //console.log("Operator : " + item.value);
            
            calciObj.operatorHandle(item.textContent);
           

        }

        else if(item.classList[0] === 'equal'){
            // console.log("Equal : " + item.textContent);
            //console.log(calciObj);
            calciObj.equalIt();
        }

        else if(item.classList[0] === "all_clear") {
            calciObj.clearIt();
        }

        else if(item.classList[0] === "deletePrev") {
            //console.log("Delete : " + "deleted");
            calciObj.delPrev();
            console.log(calciObj);
        }

        else if(item.classList[0] === "dotter") {
            //console.log("Dotter : " + ".");
            calciObj.dotHandle();
        }
    })
})


