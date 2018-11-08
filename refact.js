let translations,
    matchKey = 'Betslip.Hello kitty',
objTran = window.fdjGamingWidgetTranslations = {
   "Betslip. You have no bets at the moment.": "No tienes ninguna apuesta",
   "Betslip. Hello Guess": "Hola chico",
   "Betslip.Hello kitty":"test one two three"
};

const objProps = {
   values: 'values',
   keys: 'keys',
   translations: 'translations',
   fnValues: function() {
      return Object.values(objTran);
   },
   fnKeys: function() {
      return Object.keys(objTran);
   }
},

findMatch = (obj) => {
   let isTranslation;
   for (var i=0; i < obj.length; i++) {
      if(matchKey == obj[i]) {
         isTranslation = objTran[matchKey];
         return isTranslation;
      }
   }
},

getObjProp = (op) => {
   let tranKeys, tranValues;
   if(op == 'values') {
      tranValues = objProps.fnValues();
      return translations;
   } else if(op == 'keys') {
      tranKeys = objProps.fnKeys();
   }
    else if(op == 'translations') {
      tranKeys = objProps.fnKeys();
      translations = findMatch(tranKeys);
      console.log(' translations: \n ' + translations);
      return translations;
   }
};

getObjProp.call(objProps, 'translations');









======================================================================









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
