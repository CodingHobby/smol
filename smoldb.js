const fs = require('fs'),
	{
		promisify
	} = require('util'),
	readFileAsync = promisify(fs.readFile),
	writeFileAsync = promisify(fs.writeFile)

class db {
	/**
	 * Creates a new db object
	 * @param {String} name The name to be given to the Database
	 * @returns {db}
	 */
	constructor(name) {
		this.name = name
		this.filePath = `./${this.name}.json`
	}

	/**
	 * Initializes the db file
	 * @returns {db} this
	 */
	init() {
		fs.writeFileSync(this.filePath, '{}')
		return this
	}

	/**
	 * Sets a certain element in the db to a value syncronously
	 * @param {String} path The path to the element to be set
	 * @param {*} val The value of the element
	 */
	setSync(path, val) {
		let data = JSON.parse(fs.readFileSync(this.filePath))
		let pathFields = path.split('/').filter(v => v != '')
		pathFields.reduce((tree, field, i) => {
			if (!tree.hasOwnProperty(field)) {
				tree[field] = {}
			}
			if (i == pathFields.length - 1) return tree[field] = val
			else return tree[field]
		}, data)
		fs.writeFileSync(this.filePath, JSON.stringify(data))
		return data
	}

	async set(path, val) {
		let file = await readFileAsync(this.filePath)
		let data = JSON.parse(file)
		let pathFields = path.split('/').filter(v => v != '')
		pathFields.reduce((tree, field, i) => {
			if (!tree.hasOwnProperty(field)) {
				tree[field] = {}
			}
			if (i == pathFields.length - 1) return tree[field] = val
			else return tree[field]
		}, data)
		try {
			return writeFileAsync(this.filePath, JSON.stringify(data))
				.catch(err => {
					console.error(err.stack)
				})
				.then(_ => data)
		} catch (e) {
			console.error(e.stack)
		}
	}

	/**
	 * Reads the value of a node syncronously
	 * @param {String} path The path to the data to read
	 */
	readSync(path) {
		let data = JSON.parse(fs.readFileSync(this.filePath))
		let pathFields = path.split('/').filter(v => v != '')
		pathFields.forEach(field => {
			if (data.hasOwnProperty(field)) {
				data = data[field]
			} else {
				throw new Error('The specified Path does not exist')
			}
		})
		return data
	}

	async read(path) {
		try {
			return readFileAsync(this.filePath).then((file) => {
					let data = JSON.parse(file)
					let pathFields = path.split('/').filter(v => v != '')
					pathFields.forEach(field => {
						if (data.hasOwnProperty(field)) {
							data = data[field]
						} else {
							throw new Error('The specified Path does not exist')
						}
					})
					return data
				})
				.catch(e => {
					console.error(e.stack)
				})
		} catch (e) {
			console.error(e.stack)
		}
	}
}

module.exports.db = db