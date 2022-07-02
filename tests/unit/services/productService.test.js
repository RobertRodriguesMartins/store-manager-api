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
  describe('erase', () => {
    it('should reject if productService "byId" rejects', async () => {
      sinon.stub(productService, 'byId').rejects();
      sinon.stub(productModel, 'erase').resolves();
      await chai.expect(productService.erase()).to.eventually.be.rejected;
    });
    it('should reject if productModel "erase" rejects', async () => {
      sinon.stub(productService, 'byId').resolves();
      sinon.stub(productModel, 'erase').rejects();
      await chai.expect(productService.erase()).to.eventually.be.rejected;
    });
    it('should resolves without errors and void', async () => {
      sinon.stub(productService, 'byId').resolves();
      sinon.stub(productModel, 'erase').resolves();
      await chai.expect(productService.erase()).to.eventually.not.be.rejected;
    });
  });
  describe('search', () => {
    it('should reject if productModel "search" rejects', async () => {
      sinon.stub(productModel, 'search').rejects();
      sinon.stub(productService, 'all').resolves();
      sinon.stub(productService, 'emptyData').returns([1]);
      await chai.expect(productService.search()).to.eventually.be.rejected;
    });
    it('should reject if productModel "search" resolves without an array', async () => {
      sinon.stub(productModel, 'search').resolves(1);
      sinon.stub(productService, 'all').resolves();
      sinon.stub(productService, 'emptyData').throws();
      await chai.expect(productService.search()).to.eventually.be.rejected;
    });
    it('should resolves with productService all value if productModel search return an empty array', async () => {
      sinon.stub(productModel, 'search').resolves([]);
      sinon.stub(productService, 'all').resolves(1);
      sinon.stub(productService, 'emptyData').returns(true);
      await chai
        .expect(productService.search())
        .to.eventually.be.deep.equals(1);
    });
    it('should resolves with productModel search return', async () => {
      sinon.stub(productModel, 'search').resolves([2]);
      sinon.stub(productService, 'all').resolves();
      sinon.stub(productService, 'emptyData').returns(false);
      await chai
        .expect(productService.search())
        .to.eventually.be.deep.equals([2]);
    });
  });
  describe('update', () => {
    it('should reject if productService "byId" rejects', async () => {
      sinon.stub(productService, 'byId').rejects();
      sinon.stub(productModel, 'update').resolves();
      await chai.expect(productService.update()).to.eventually.be.rejected;
    });
    it('should reject if productModel "update" rejects', async () => {
      sinon.stub(productService, 'byId').resolves();
      sinon.stub(productModel, 'update').rejects();
      await chai.expect(productService.update()).to.eventually.be.rejected;
    });
    it('should resolves with an object', async () => {
      sinon.stub(productService, 'byId').resolves();
      sinon.stub(productModel, 'update').resolves();
      await chai
        .expect(productService.update(1, 'teste'))
        .to.eventually.be.deep.equals({
          id: 1,
          name: 'teste',
        });
    });
  });
});
