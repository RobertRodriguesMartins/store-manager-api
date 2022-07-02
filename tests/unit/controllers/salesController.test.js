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
  };
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
