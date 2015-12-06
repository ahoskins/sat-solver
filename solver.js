// simple SAT solve in ES6

'use strict'

function solve(variables, clauses, assignment) {
	assignment = assignment || {}

	// if every clause is satisfied, found good assignment
	if (clauses.every(clause => satisfied(clause, assignment) === true)) {
		return assignment
	}

	// if any clause is false, then this assignment won't work
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

// check if a clause is satisfied
function satisfied(clause, assignment) {
	// every literal not happy, not satisfied
	if (clause.every(literal => happy(literal, assignment) === false)) {
		return false
	}

	// some literal happy, satisfied
	if (clause.some(literal => happy(literal, assignment) === true)) {
		return true
	}

	// undecided
	return undefined
}

// check if a literal matches its assignment
function happy(literal, assignment) {
	if (literal[0] === '-') {
		var val = assignment[literal.slice(1)]
		return val === undefined ? undefined : !val
	} else {
		return assignment[literal]
	}
}

// expose solve function
module.exports = solve
