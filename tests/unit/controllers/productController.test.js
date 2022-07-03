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
  response.end = sinon.stub().returns(response);
  const request = {
    params: {
      id: 2,
    },
    body: {
      name: 'teste',
    },
    query: {
      q: '',
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
  describe('erase', () => {
    it('should rejects when productService rejects', async () => {
      sinon.stub(productService, 'erase').rejects();
      await chai.expect(productController.erase(request, response, '')).to
        .eventually.be.rejected;
    });
    it('should rejects when joi throws', async () => {
      sinon.stub(productService, 'erase').resolves();
      await chai.expect(productController.erase({ params: 'a' }, response, ''))
        .to.eventually.be.rejected;
    });
    it('should respond with 204 and end', async () => {
      sinon.stub(productService, 'erase').resolves();
      await productController.erase(request, response, '');
      chai.expect(response.status.calledWith(204)).to.be.true;
      chai.expect(response.end.called).to.be.true;
    });
  });
  describe('search', () => {
    it('should rejects when productService search rejects', async () => {
      sinon.stub(productService, 'search').rejects();
      await chai.expect(productController.search(request, response, '')).to
        .eventually.be.rejected;
    });
    it('should rejects when joi throws', async () => {
      sinon.stub(productService, 'search').resolves();
      await chai.expect(
        productController.search({ query: { q: 1 } }, response, '')
      ).to.eventually.be.rejected;
    });
    it('should respond with 200 and json', async () => {
      sinon.stub(productService, 'search').resolves(1);
      await productController.search(request, response, '');
      chai.expect(response.status.calledWith(200)).to.be.true;
      chai.expect(response.json.calledWith(1)).to.be.true;
    });
  });
  describe('update', () => {
    it('should rejects when productService update rejects', async () => {
      sinon.stub(productService, 'update').rejects();
      await chai.expect(productController.update(request, response, '')).to
        .eventually.be.rejected;
    });
    it('should rejects when joi throws', async () => {
      sinon.stub(productService, 'update').resolves();
      await chai.expect(
        productController.update({ body: { name: 2 } }, response, '')
      ).to.eventually.be.rejected;
    });
    it('should respond with 200 and json', async () => {
      sinon.stub(productService, 'update').resolves(1);
      await productController.update(request, response, '');
      chai.expect(response.status.calledWith(200)).to.be.true;
      chai.expect(response.json.calledWith(1)).to.be.true;
    });
  });
});
