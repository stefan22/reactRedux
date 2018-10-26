import { CreateStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expensesReducer';
import filtersReducer from '../reducers/filtersReducer';

// Store
export default () => {
   const store = createStore(
      combineReducers({
         expenses: expensesReducer,
         filters: filtersReducer
      })
   );

   return store;
};



