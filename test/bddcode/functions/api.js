import { AssertionError } from 'assert';
import { resolve } from 'path';

const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
let actualStatusCode;

class api {

  apiURL = "http://localhost:5000/v1";
  addProductEndpoint = this.apiURL + "/product";
  getAllProductsEndpoint = this.apiURL + "/products";
  getSingleProductEndpoint = this.apiURL + "/product/";
  deleteProductEndpoint = this.apiURL + "/product/";
  updateSingleProductEndpoint = this.apiURL + "/product/";

  
  async addProduct(options = {}) {
    const { productRequestBody, statusCode } = {
      ...options,
    };
    return await axios.post(this.addProductEndpoint, productRequestBody)
      .then(function(response) {
        console.log("Res", response.status);
        actualStatusCode = response.status
      })
      .catch(function(error) {
        actualStatusCode = error.response.status;
      })
      .then(function(){
        assert.equal(statusCode, actualStatusCode);
      });
    }

    async addProductDuplicateKey() {
       return await axios.post(this.addProductEndpoint, {"name": "A2","name": "Dark Chocolate","price": 14.28})
        .then(function(response) {
          actualStatusCode = response.status
        })
        .catch(function(error) {
          actualStatusCode = error.response.status;
        })
        .then(function(){
          assert.equal(400, actualStatusCode);
        });
      }

    async deleteAllProduct() {
        var deleteEndpoint = this.deleteProductEndpoint;
        return await axios.get(this.getAllProductsEndpoint)
        .then(function(response) {
          response.data.forEach(async (product) => {
            let deleteResponse = await axios.delete(deleteEndpoint+ product.id);
            assert.equal(200, deleteResponse.status);
          })
        })
        .catch(function(error) {
          assert.equal(200, error.response.status);
        })
        .then(function(){
          browser.pause(2000);
        });;
    }

    async verifyProductInTheList(options = {}) {
        return await axios.get(this.getAllProductsEndpoint)
        .then(function(response) {
          let productFiltered = response.data.filter(product => (product.name == options.name));
          assert.equal(productFiltered.length > 0, true);
        })
        .catch(function(error) {
          assert.equal(200, error.response.status);
        });
    }

    async verifyProductInTheListWithProductCode(productCode,options = {},statusCode) {
        return await axios.get(this.getSingleProductEndpoint + productCode)
        .then(function(response) {
          console.log("Res", response.status);
          assert.equal(response.data.name, options.name);
          actualStatusCode = response.status
        })
        .catch(function(error) {
          actualStatusCode = error.response.status;
        })
        .then(function(){
          assert.equal(statusCode, actualStatusCode);
        });
    }

    async updateProductInTheListWithProductCode(productCode,productRequestBody) {
        return await axios.put(this.getSingleProductEndpoint + productCode, productRequestBody)
        .then(function(response) {
          actualStatusCode = response.status;
        })
        .catch(function(error) {
          actualStatusCode = error.response.status;
        })
        .then(function(){
          assert.equal(200, actualStatusCode);
        });
      }
}

export default new api();
