const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../db/connection');

chai.use(chaiPromise);

describe('/models/salesModel', () => {
  beforeEach(sinon.restore);
  describe('all', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(salesModel.all()).to.eventually.be.rejected;
    });
    it('should return an array', () => {
      sinon.stub(connection, 'query').resolves([1]);
      return chai.expect(salesModel.all()).to.eventually.be.deep.equals(1);
    });
  });
  describe('byId', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(salesModel.byId()).to.eventually.be.rejected;
    });
    it('should return an array', () => {
      sinon.stub(connection, 'query').resolves([1]);
      return chai.expect(salesModel.byId()).to.eventually.be.deep.equals(1);
    });
  });
  describe('create', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(salesModel.create()).to.eventually.be.rejected;
    });
    it('should return an array', () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      return chai
        .expect(salesModel.create())
        .to.eventually.be.deep.equals([{ insertId: 1 }]);
    });
  });
  describe('createUserSale', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(salesModel.createUserSale()).to.eventually.be.rejected;
    });
    it('should return an array', () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      return chai
        .expect(salesModel.createUserSale())
        .to.eventually.be.deep.equals([{ insertId: 1 }]);
    });
  });
  describe('erase', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(salesModel.erase()).to.eventually.be.rejected;
    });
    it('should resolves when db resolves', () => {
      sinon.stub(connection, 'query').resolves();
      return chai.expect(salesModel.erase()).to.eventually.not.be.rejected;
    });
  });
  describe('update', () => {
    it('should rejects when db rejects', () => {
      sinon.stub(connection, 'query').rejects();
      return chai.expect(salesModel.update()).to.eventually.be.rejected;
    });
    it('should resolves when db resolves', () => {
      sinon.stub(connection, 'query').resolves();
      return chai.expect(salesModel.update()).to.eventually.not.be.rejected;
    });
  });
});
