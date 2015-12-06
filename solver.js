// simple SAT solve in ES6

'use strict'

function solve(variables, clauses, assignment) {
	assignment = assignment || {}

	// if every clause is satisfied, then return this assignment
	if (clauses.every(clause => satisfied(clause, assignment) === true)) {
		return assignment
	}

	// if any clause is false, then return false because it won't work
	if (clauses.some(clause => satisfied(clause, assignment) === false)) {
		return false
	}

	// find a literal not yet decided in the assignment
	let chosen_one = null
	for (let variable of variables) {
		if (assignment[variable] === undefined) {
			chosen_one = variable
			break
		}
	}

	// recursively solve with this literal either true or false
	return solve(variables, clauses, copy(assignment, chosen_one, true)) ||
		   solve(variables, clauses, copy(assignment, chosen_one, false))
}

// make a copy of assignment with the new literal
function copy(assignment, literal, value) {
	let o = {}
	o[literal] = value 
	return Object.assign({}, assignment, o)
}

// function to check if a clause is satisfied
function satisfied(clause, assignment) {
	// every literal false wrt to the assignment, then return false
	if (clause.every(literal => happy(literal, assignment) === false)) {
		return false
	}

	// some variable true, then true
	if (clause.some(literal => happy(literal, assignment) === true)) {
		return true
	}

	// undecided
	return undefined
}

function happy(literal, assignment) {
	// if literal unnegated, return value of assignment
	if (literal[0] === '-') {
		var val = assignment[literal.slice(1)]
		return val === undefined ? undefined : !val
	} else {
		return assignment[literal]
	}
}

let clauses = [
  ['blue', 'green', '-yellow'],
  ['-blue', '-green', 'yellow'],
  ['pink', 'purple', 'green', 'blue', '-yellow']
];

let variables = ['blue', 'green', 'yellow', 'pink', 'purple'];

let model = solve(variables, clauses);
console.dir(model)
