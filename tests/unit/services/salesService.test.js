const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');
const salesModel = require('../../../models/salesModel');
const productService = require('../../../services/productService');
const salesService = require('../../../services/salesService');

chai.use(chaiPromise);

describe.only('/services/salesService', () => {
  beforeEach(sinon.restore);
  describe('mapProductId', () => {
    it('should throw when arg isn"t an array', () => {
      return chai.expect(salesService.mapProductId).to.throws();
    });
    it('should return an array with mapped productId', () => {
      return chai
        .expect(salesService.mapProductId([{ productId: 1 }]))
        .to.be.deep.equals([1]);
    });
  });
  describe('checkProduct', () => {
    it('should throw when productService byId method rejects', () => {
      sinon.stub(productService, 'byId').rejects();
      sinon.stub(salesService, 'mapProductId').returns([1]);
      return chai.expect(salesService.checkProduct()).to.eventually.be.rejected;
    });
    it('should throw when mapProduct throw', () => {
      sinon.stub(productService, 'byId').resolves();
      sinon.stub(salesService, 'mapProductId').throws();
      return chai.expect(salesService.checkProduct()).to.eventually.be.rejected;
    });
    it('should return true if everything is ok', () => {
      sinon.stub(productService, 'byId').resolves();
      sinon.stub(salesService, 'mapProductId').returns([1]);
      return chai
        .expect(salesService.checkProduct())
        .to.eventually.be.deep.equals(true);
    });
  });
  describe('createSale', () => {
    it('should throw when salesModel rejects', () => {
      sinon.stub(salesModel, 'create').rejects();
      return chai.expect(salesService.createSale()).to.eventually.be.rejected;
    });
    it('should throw if response isn"t an interable', () => {
      sinon.stub(salesModel, 'create').resolves(1);
      return chai.expect(salesService.createSale()).to.eventually.be.rejected;
    });
    it('should return an id', () => {
      sinon.stub(salesModel, 'create').resolves([{ insertId: 1 }]);
      return chai
        .expect(salesService.createSale())
        .to.eventually.be.deep.equals(1);
    });
  });
});
