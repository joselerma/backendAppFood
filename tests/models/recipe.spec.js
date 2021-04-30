const { Recipe} = require('../../src/db.js');
const { expect } = require('chai');
const { uuid } = require('uuidv4')
const { conn} = require('../../src/db.js');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
 describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ id:uuid(),title: 'Milanesa a la napolitana',ingredients:'tomate, rabanos,cebollas' });
      });
    });
  });
});
