/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const{ conn } = require('../../src/db.js');
const { uuid } = require('uuidv4')
const { Recipe}=require('../../src/db.js');

//const agent = session(app);
const recipe = {
  id:uuid(),title: 'Milanesa a la napolitana',ingredients:'tomate, rabanos,cebollas' 
};

xdescribe('Recipe routes', () => {
  
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', async(done) =>{
      return await agent.get('/recipes?name=Milanesa a la napolitana').expect(200)
      done()
    });
  });
});
