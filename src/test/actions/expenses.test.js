import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

const gasBill = {
		description: 'july gas bill',
		amount: 950,
		note: 'paid half the bill only',
		createdAt: 1000
};

describe('add, remove, edit expense action generators', () => {
   test('addExpense gas bill', () => {
      const bill = addExpense(gasBill);
      expect(bill).toEqual({
         type: 'ADD_EXPENSE',
         expense: {
            ...gasBill,
            id: expect.any(String)
         }
      });
   });
   test('remove a expense', () => {
      const remExpense = removeExpense({id: 'abc123'});
      expect(remExpense).toEqual({
         type: 'REMOVE_EXPENSE',
         id: 'abc123'
      });
   });
   test('edit expense', () => {
      const remExpense = editExpense('abc123', {note: 'paid in full'});
      expect(remExpense).toEqual({
         type: 'EDIT_EXPENSE',
         id: 'abc123',
         updates: {
            note: 'paid in full'
         }
      });
   })
});