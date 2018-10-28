import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
// redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
// action gen
import { addExpense } from './actions/expenses';
import { editExpense } from './actions/expenses';
import { removeExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
// selectors
import getVisibleExpenses from './selectors/getVisibleExpenses';
// styles
import 'normalize.css/normalize.css';
import './styles/styles.scss';

// new store
const store = configureStore();

// dispatch
store.dispatch(addExpense({description: 'Water bill'}));
store.dispatch(addExpense({description: 'Gas bill'}));
store.dispatch(setTextFilter('water'));

const state = store.getState();
const visibleXpenses = getVisibleExpenses(state.expenses, state.filters);
console.log('visible expenses: \n',visibleXpenses);



ReactDOM.render(
   <AppRouter />,
   document.getElementById('app')
);

