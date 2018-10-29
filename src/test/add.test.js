//test my tests  - helper fn
const add = (x,y) => {
   return x + y;
};
const substract = (x,y) => {
   return (x > y) ? x-y : y-x;
};

describe('math operators to check test working', () => {
   test('should add two numbers', () => {
      const res = add(4,5);
      expect(res).toBe(9);
   });
   test('should substract smaller number from the larger one', () => {
      const res = substract(4,5);
      expect(res).toBe(1);
   })

});