const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');
const salesModel = require('../../../models/salesModel');
const productService = require('../../../services/productService');
const salesService = require('../../../services/salesService');

chai.use(chaiPromise);

describe('/services/salesService', () => {
  beforeEach(sinon.restore);
  describe('all', () => {
    it('should throw when salesModel all method rejects', () => {
      sinon.stub(salesModel, 'all').rejects();
      return chai.expect(salesService.all()).to.eventually.be.rejected;
    });
    it('should resolves with salesModel all resolved value', () => {
      sinon.stub(salesModel, 'all').resolves(1);
      return chai.expect(salesService.all()).to.eventually.be.deep.equals(1);
    });
  });
  describe('byId', () => {
    it('should reject when salesModel byId method rejects', () => {
      sinon.stub(salesModel, 'byId').rejects();
      return chai.expect(salesService.byId()).to.eventually.be.rejected;
    });
    it('should reject when salesModel byId return an empty array', () => {
      sinon.stub(salesModel, 'byId').resolves([]);
      return chai.expect(salesService.byId()).to.eventually.be.rejected;
    });
    it('should resolves with salesModel byId resolved value', () => {
      sinon.stub(salesModel, 'byId').resolves([1]);
      return chai.expect(salesService.byId()).to.eventually.be.deep.equals([1]);
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
  describe('createUserSale', () => {
    it('should reject if productSales arg isn"t an array', () => {
      sinon.stub(salesModel, 'createUserSale').resolves();
      return chai.expect(salesService.createUserSale(1, 1)).to.eventually.be
        .rejected;
    });
    it('should throw if productSales arg is an array with undefined ', () => {
      sinon.stub(salesModel, 'createUserSale').resolves([undefined]);
      return chai.expect(salesService.createUserSale()).to.eventually.be
        .rejected;
    });
    it('should reject if salesModel rejects', () => {
      sinon.stub(salesModel, 'createUserSale').rejects();
      return chai.expect(salesService.createUserSale()).to.eventually.be
        .rejected;
    });
    it('should returns an specific object', () => {
      sinon.stub(salesModel, 'createUserSale').resolves();
      return chai
        .expect(salesService.createUserSale(1, [{ productId: 1, quantity: 2 }]))
        .to.eventually.be.deep.equals({
          id: 1,
          itemsSold: [{ productId: 1, quantity: 2 }],
        });
    });
  });
  describe('update', () => {
    it('should reject when salesModel update method rejects', () => {
      sinon.stub(salesModel, 'update').rejects();
      sinon.stub(Promise, 'all').rejects();
      return chai.expect(salesService.update(1, [])).to.eventually.be.rejected;
    });
    it('should reject if input isn"t an array', () => {
      sinon.stub(salesModel, 'update').resolves(1);
      return chai.expect(salesService.update(1, 2)).to.eventually.be.rejected;
    });
    it('should resolve with an object', () => {
      sinon.stub(salesModel, 'update').resolves(1);
      sinon.stub(Promise, 'all').resolves();
      return chai
        .expect(salesService.update(1, ['a']))
        .to.eventually.be.deep.equals({
          saleId: 1,
          itemsUpdated: ['a'],
        });
    });
  });
  describe('erase', () => {
    it('should reject when salesModel erase method rejects', () => {
      sinon.stub(salesModel, 'erase').rejects();
      return chai.expect(salesService.erase()).to.eventually.be.rejected;
    });
    it('should resolves if salesModel erase method resolves', () => {
      sinon.stub(salesModel, 'erase').resolves(1);
      return chai.expect(salesService.erase(1)).to.eventually.not.be.rejected;
    });
  });
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
});
