const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

chai.use(chaiPromise);

describe('/controller/productController', () => {
  beforeEach(sinon.restore);
  const response = {};
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns(response);

  const request = {
    body: [
      {
        productId: 3,
        quantity: 2,
      },
    ],
    params: {
      id: 1,
    },
  };
  describe('all', () => {
    it('should reject when salesService all rejects', () => {
      sinon.stub(salesService, 'all').rejects();
      return chai.expect(salesController.all('', response, '')).to.eventually.be
        .rejected;
    });
    it('should resolves when salesService all resolves', () => {
      sinon.stub(salesService, 'all').resolves();
      return chai.expect(salesController.all('', response, '')).to.eventually
        .not.be.rejected;
    });
    it('should call response with 200 and data', async () => {
      sinon.stub(salesService, 'all').resolves(1);
      await salesController.all('', response, '');

      chai.expect(response.status.calledWith(200)).to.be.true;
      chai.expect(response.json.calledWith(1)).to.be.true;
    });
  });
  describe('byId', () => {
    it('should reject when salesService byId rejects', () => {
      sinon.stub(salesService, 'byId').rejects();
      return chai.expect(salesController.byId(request, response, '')).to
        .eventually.be.rejected;
    });
    it('should reject when joi validation fail', () => {
      sinon.stub(salesService, 'byId').resolves();
      return chai.expect(salesController.byId({ params: 'a' }, response, '')).to
        .eventually.be.rejected;
    });
    it('should resolves when salesService byId resolves', () => {
      sinon.stub(salesService, 'byId').resolves();
      return chai.expect(salesController.byId(request, response, '')).to
        .eventually.not.be.rejected;
    });
    it('should call response with 200 and data', async () => {
      sinon.stub(salesService, 'byId').resolves(1);
      await salesController.byId(request, response, '');

      chai.expect(response.status.calledWith(200)).to.be.true;
      chai.expect(response.json.calledWith(1)).to.be.true;
    });
  });
  describe('create', () => {
    it('should reject when joi throws', () => {
      sinon.stub(salesService, 'checkProduct').resolves();
      sinon.stub(salesService, 'createSale').resolves();
      sinon.stub(salesService, 'createUserSale').resolves();
      return chai.expect(salesController.create('', response, '')).to.eventually
        .be.rejected;
    });
    it('should reject when checkProduct rejects', async () => {
      sinon.stub(salesService, 'checkProduct').rejects();
      sinon.stub(salesService, 'createSale').resolves();
      sinon.stub(salesService, 'createUserSale').resolves();
      return chai.expect(salesController.create(request, response, '')).to
        .eventually.be.rejected;
    });
    it('should reject when createSale rejects', async () => {
      sinon.stub(salesService, 'checkProduct').resolves();
      sinon.stub(salesService, 'createSale').rejects();
      sinon.stub(salesService, 'createUserSale').resolves();
      return chai.expect(salesController.create(request, response, '')).to
        .eventually.be.rejected;
    });
    it('should reject when createUserSale rejects', async () => {
      sinon.stub(salesService, 'checkProduct').resolves();
      sinon.stub(salesService, 'createSale').resolves();
      sinon.stub(salesService, 'createUserSale').rejects();
      return chai.expect(salesController.create(request, response, '')).to
        .eventually.be.rejected;
    });
    it('should respond with status 201 and json with data', async () => {
      sinon.stub(salesService, 'checkProduct').resolves();
      sinon.stub(salesService, 'createSale').resolves();
      sinon.stub(salesService, 'createUserSale').resolves({
        id: 1,
        itemsSold: [],
      });
      await salesController.create(request, response, '');
      chai.expect(response.status.calledWith(201)).to.be.equals(true);
      chai
        .expect(
          response.json.calledWith({
            id: 1,
            itemsSold: [],
          })
        )
        .to.be.equals(true);
    });
  });
});
