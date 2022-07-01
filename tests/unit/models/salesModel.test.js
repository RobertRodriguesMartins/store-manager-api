const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../db/connection');

chai.use(chaiPromise);

describe('/models/salesModel', () => {
  beforeEach(sinon.restore);
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
});
