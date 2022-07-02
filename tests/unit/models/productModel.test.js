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
  describe('create', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(productModel.create()).to.eventually.be.rejected;
    });
    it('should return an array with object with insertId key', () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      return chai
        .expect(productModel.create(1))
        .to.eventually.be.deep.equal([{ insertId: 1 }]);
    });
  });
  describe('erase', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(productModel.erase()).to.eventually.be.rejected;
    });
    it('should resolve when db resolves', () => {
      sinon.stub(connection, 'query').resolves();
      return chai.expect(productModel.erase()).to.not.be.rejected;
    });
  });
  describe('search', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(productModel.search()).to.eventually.be.rejected;
    });
    it('should resolve with [] when db resolves', () => {
      sinon.stub(connection, 'query').resolves([true]);
      return chai
        .expect(productModel.search())
        .to.eventually.be.deep.equals(true);
    });
  });
  describe('update', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(productModel.update()).to.eventually.be.rejected;
    });
    it('should resolve with [] when db resolves', () => {
      sinon.stub(connection, 'query').resolves(true);
      return chai
        .expect(productModel.update())
        .to.eventually.be.deep.equals(true);
    });
  });
});
