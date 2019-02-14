const smol = require('./smoldb'),
	fs = require('fs')

let db

beforeEach(() => {
	db = new smol.db('db').init()
})

afterAll(() => {
	db = null
	fs.unlinkSync('./db.json')
})

describe('Set', () => {
	test('Puts data in the JSON file', () => {
		db.set('/users/corrado', 'me').then((data) => {
			expect(data).toEqual({
				users: {
					corrado: 'me'
				}
			})
		})
	})

	test('Puts arrays in the JSON file', () => {
		db.set('/users', [{
			corrado: 'me'
		}, {
			john: 'Doe'
		}]).then(data => expect(data).toEqual({
			users: [{
				corrado: 'me'
			}, {
				john: 'Doe'
			}]
		}))
	})
})

describe('Read', () => {
	test('Reads the content of a path', () => {
		db.set('/users', [{
			corrado: 'me'
		}]).then(() => {
			db.read('/users').then(data => expect(data).toEqual({
				users: [{
					corrado: 'me'
				}]
			}))
		})
	})
})