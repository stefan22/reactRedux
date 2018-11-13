// for the kids

let myCalc = {
   addRemark: 'So Addition uh?',
   subsRemark:'So you\'d like to substract eh?',
   multiRemark: 'So you think you can Multiply?',
   divRemark: 'You like Division eh?',
   getId(id) {
      return document.getElementById(id);
   },
   getClass(clas) {
      return document.querySelector(clas);
   },
   init() {
     const whichOp = (e) => {
			let op = e.target.textContent;
         switch (op) {
            case 'Addition':
               this.addition();
               this.getId('hello').innerHTML = this.addRemark
               break;
            case 'Substraction':
               this.substraction();
               this.getId('hello').innerHTML = this.subsRemark;
               break;
            case 'Multiplication':
               this.multiplication();
               this.getId('hello').innerHTML = this.multiRemark;
               break;
            case 'Division':
               this.division();
               this.getId('hello').innerHTML = this.divRemark;
            default:
               break;
         };
		};
     this.getId('hello').innerHTML = 'What do you want to do now?';
     this.getId('multi').addEventListener('click', whichOp, false);
   },
   helper: {
      opEle() {
         let opEle = document.createElement('div');
         opEle.id = 'opele',
         opEle.innerHTML = `
            <div class='twobox'>
               <p>Enter number one: <input type='number' class='num'  /></p>
               <p>Enter number two: <input type='number' class='num'  /></p>
            </div>
         `;
         myCalc.getId('multi').innerHTML = opEle.innerHTML;
         return opEle;
      }

   },
   addition() {
      console.log('from addition op');
      this.helper.opEle();
   },
   substraction() {
      console.log('from substraction op');
   },
   multiplication() {
      console.log('from multiplication op');
   },
   division() {
      console.log('from division op');
   },





};


myCalc.init();
