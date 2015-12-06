// test file for solver.js

'use strict'

let solve = require('./solver.js')

let clauses = [
  ['blue', 'green', '-yellow'],
  ['-blue', '-green', 'yellow'],
  ['pink', 'purple', 'green', 'blue', '-yellow']
];

let variables = ['blue', 'green', 'yellow', 'pink', 'purple'];

let model = solve(variables, clauses);
console.dir(model)
