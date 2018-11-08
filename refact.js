debugger;
objTran = window.fdjGamingWidgetTranslations = {
   "Betslip. You have no bets at the moment.": "No tienes ninguna apuesta",
   "Betslip. Hello Guess": "Hola chico"
};

const objProps = {
   values: 'values',
   keys: 'keys',
   fnValues: function() {
      return Object.values(objTran);
   },
   fnKeys: function() {
      return Object.keys(objTran);
   }
};

const getObjProp = (op) => {
   if(op == 'values') {
      console.log(op + ':\n-------\n' + objProps.fnValues());
   } else if(op == 'keys') {
      console.log(op + ':\n--------\n' + objProps.fnKeys());
   }

};

getObjProp.call(objProps, 'keys');
