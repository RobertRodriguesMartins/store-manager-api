const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');
const productModel = require('../../../models/productModel');
const connection = require('../../../db/connection');

chai.use(chaiPromise);

describe('/models/productModel', () => {
  beforeEach(sinon.restore);
  describe('all', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(productModel.all()).to.eventually.be.rejected;
    });
    it('should return an array', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      return chai.expect(productModel.all()).to.eventually.be.deep.equal([]);
    });
  });
  describe('byId', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(productModel.byId()).to.eventually.be.rejected;
    });
    it('should return an array', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      return chai.expect(productModel.byId()).to.eventually.be.deep.equal([]);
    });
  });
});
