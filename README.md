# SMOL

Smol is a smol database library, which lets you set up a local db (basically just a glorified JSON file) and read and modify the data stored in it

## Installation

To install Smol simply type in your console
```
npm i smol --save
```
At this point you can require `smol` in your code:
```
const smol = require('smol')
```
And then just go wild!

## Quickstart

After you require `Smol`, you'll need to create and initialize your `db` object:
```
const smol = require('smol')
let db = new smol.db('myCoolDatabase').init()
```
At this point you can start storing data in it (for now the library only supports syncronous operations):
```
db.setSync('/users/john', 'John Doe')
```
The result will be
```
{
	users: {'John': 'John Doe'}
}
```
To read the data stored in the db you can use the `readSync` function, which works just the same way:
```
let john = db.readSync('/users/john') // john = 'John Doe'
```