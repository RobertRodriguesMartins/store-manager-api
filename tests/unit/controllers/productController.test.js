const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

chai.use(chaiPromise);

describe('/controller/productController', () => {
  beforeEach(sinon.restore);
  const response = {};
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns(response);

  const request = {
    params: {
      id: 2,
    },
    body: {
      name: 'teste',
    },
  };
  describe('all', () => {
    it('should rejects when service rejects', () => {
      sinon.stub(productService, 'all').rejects();
      return chai.expect(productController.all('', response, '')).to.eventually
        .be.rejected;
    });
    it('should return a response object with status 200 and json with data', async () => {
      sinon.stub(productService, 'all').resolves([{ id: 'test' }]);
      await productController.all('', response, '');
      chai.expect(response.status.calledWith(200)).to.be.equals(true);
      chai
        .expect(response.json.calledWith([{ id: 'test' }]))
        .to.be.equals(true);
    });
  });
  describe('byId', () => {
    it('should rejects when service rejects', async () => {
      sinon.stub(productService, 'byId').rejects();
      await chai.expect(productController.byId(request, response, '')).to
        .eventually.be.rejected;
    });
    it('should respond with status 200 and json with data', async () => {
      sinon.stub(productService, 'byId').resolves({ id: 'test' });
      await productController.byId(request, response, '');
      chai.expect(response.status.calledWith(200)).to.be.equals(true);
      chai.expect(response.json.calledWith({ id: 'test' })).to.be.equals(true);
    });
    it('should return an error when joi throws', async () => {
      sinon.stub(productService, 'byId').resolves({ id: 'test' });
      await chai.expect(productController.byId('', request, '')).to.be.rejected;
      await chai.expect(productController.byId({ params: {} })).to.be.rejected;
      return chai.expect(productController.byId({ params: { id: 'a' } })).to.be
        .rejected;
    });
  });
  describe('create', () => {
    it('should rejects when service rejects', async () => {
      sinon.stub(productService, 'create').rejects();
      await chai.expect(productController.create(request, response, '')).to
        .eventually.be.rejected;
    });
    it('should respond with status 201 and json with data', async () => {
      sinon.stub(productService, 'create').resolves({ name: 'test', id: 1 });
      await productController.create(request, response, '');
      chai.expect(response.status.calledWith(201)).to.be.equals(true);
      chai
        .expect(response.json.calledWith({ name: 'test', id: 1 }))
        .to.be.equals(true);
    });
    it('should return an error when joi throws', async () => {
      sinon.stub(productService, 'create').resolves({ id: 'test' });
      await chai.expect(productController.create('', request, '')).to.be
        .rejected;
      await chai.expect(productController.create({ body: {} })).to.be.rejected;
      return chai.expect(productController.create({ body: { name: 'a' } })).to
        .be.rejected;
    });
  });
});
