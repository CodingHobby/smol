const smol = require('./smoldb'),
	fs = require('fs')

let db

beforeEach(() => {
	db = new smol.db('db').init()
})

afterAll(() => {
	fs.unlinkSync('./db.json')
	db = null
})

test('Creates a json file', () => {
	expect(() => {
		fs.readFileSync('./db.json')
	}).not.toThrow()
})

describe('Set', () => {
	test('Puts data in a JSON file', () => {
		expect(db.setSync('/users/corrado', 'me')).toEqual({
			users: {
				corrado: 'me'
			}
		})
	})

	test('Puts arrays in a JSON file', () => {
		expect(db.setSync('/users', [{corrado: 'me'}, {john: 'Doe'}])).toEqual({
			users: [
				{corrado: 'me'},
				{john: 'Doe'}
			]
		})
	})
})


describe('Read', () => {
	test('Reads a value from the db', () => {
		db.setSync('/users/corrado', 'me')
		expect(db.readSync('users/corrado')).toEqual('me')
	})

	test('Throws if path is invalid', () => {
		expect(() => {
			db.readSync('/bananas')
		}).toThrow()
	})
})