const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

chai.use(chaiPromise);

describe('/services/productService', () => {
  beforeEach(sinon.restore);
  describe('all', () => {
    it('should throw when model rejects', () => {
      sinon.stub(productModel, 'all').rejects();
      return chai.expect(productService.all()).to.eventually.be.rejected;
    });
    it('should throw if result isn"t an array', () => {
      sinon.stub(productModel, 'all').resolves();
      sinon.stub(productService, 'emptyData').throws();
      return chai.expect(productService.all()).to.be.rejected;
    });
    it('should return an array with products', () => {
      sinon.stub(productModel, 'all').resolves([
        {
          id: 1,
          name: 'teste',
        },
      ]);
      sinon.stub(productService, 'emptyData').returns(false);
      return chai.expect(productService.all()).to.eventually.be.deep.equals([
        {
          id: 1,
          name: 'teste',
        },
      ]);
    });
    it('should return NotFoundError if data is an empty array', () => {
      sinon.stub(productModel, 'all').resolves([]);
      return chai.expect(productService.all()).to.be.rejected;
    });
  });
  describe('byId', () => {
    it('should throw when model rejects', () => {
      sinon.stub(productModel, 'byId').rejects();
      return chai.expect(productService.byId()).to.eventually.be.rejected;
    });
    it('should throw if result isn"t an array', () => {
      sinon.stub(productModel, 'byId').resolves();
      sinon.stub(productService, 'emptyData').throws();
      return chai.expect(productService.byId()).to.be.rejected;
    });
    it('should return a product', () => {
      sinon.stub(productModel, 'byId').resolves([
        {
          id: 1,
          name: 'teste',
        },
      ]);
      sinon.stub(productService, 'emptyData').returns(false);
      return chai.expect(productService.byId()).to.eventually.be.deep.equals({
        id: 1,
        name: 'teste',
      });
    });
    it('should return NotFoundError if data is an empty array', () => {
      sinon.stub(productModel, 'byId').resolves([]);
      return chai.expect(productService.byId()).to.be.rejected;
    });
  });
  describe('emptyData', () => {
    it('should throw if data isn"t an array', () => {
      chai.expect(productService.emptyData).to.throw();
    });
    it('should return false if input is an array with something', () => {
      return chai.expect(productService.emptyData([1])).to.be.equals(false);
    });
    it('should return true if input is an empty array', () => {
      return chai.expect(productService.emptyData([])).to.be.equals(true);
    });
  });
  describe('create', () => {
    it('should throw if data isn"t an array', async () => {
      sinon.stub(productModel, 'create').resolves(1);
      await chai.expect(productService.create()).to.be.rejected;
    });
    it('should return an object if theres insertId key', async () => {
      sinon.stub(productModel, 'create').resolves([{ insertId: 1 }]);
      await chai
        .expect(productService.create('iphone'))
        .to.eventually.be.deep.equals({ name: 'iphone', id: 1 });
    });
    it('should rejects if model rejects', async () => {
      sinon.stub(productModel, 'create').rejects();
      await chai.expect(productService.create()).to.be.rejected;
    });
  });
});
