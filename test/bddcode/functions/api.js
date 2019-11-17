import { AssertionError } from 'assert';

const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
let apiResponse;
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
    console.log(productRequestBody);
    try {
     apiResponse = await axios.post(this.addProductEndpoint, productRequestBody)
    } catch(error) {
        apiResponse = error.response;
      } finally {
        console.log("Response status code is : ", apiResponse.status);
        if (statusCode != null){
          assert.equal(statusCode, apiResponse.status);
        }
      }
    }

    async addProductDuplicateKey() {
      try {
       apiResponse = await axios.post(this.addProductEndpoint, {"name": "A2","name": "Dark Chocolate","price": 14.28})
      } catch(error) {
          apiResponse = error.response;
        } finally {
          console.log("Response status code is : ", apiResponse.status);
            assert.equal(400, apiResponse.status);
        }
      }

    async deleteAllProduct() {
      try {
        let deleteResponse;
        apiResponse = await axios.get(this.getAllProductsEndpoint)
        apiResponse.data.forEach(async (product) => {
        deleteResponse = await axios.delete(this.deleteProductEndpoint + product.id);
        assert.equal(200, deleteResponse.status);
      });
    } catch(error) {
        apiResponse = error.response;
    } finally {
        assert.equal(200, apiResponse.status);
      }
    }

    async verifyProductInTheList(options = {}) {
      try {
        apiResponse = await axios.get(this.getAllProductsEndpoint)
        let productFiltered = apiResponse.data.filter(product => (product.name == options.name));
        assert.equal(productFiltered.length > 0, true);
      }catch(error) {
        apiResponse = error.response;
      } finally {
        assert.equal(200, apiResponse.status);
      }
    }

    async verifyProductInTheListWithProductCode(productCode,options = {}) {
      try {
        apiResponse = await axios.get(this.getSingleProductEndpoint + productCode); 
      }catch(error) {
        apiResponse = error.response;
      } finally {
        assert.equal(apiResponse.data.name, options.name);
        assert.equal(200, apiResponse.status);
      }
    }

    async updateProductInTheListWithProductCode(productCode,productRequestBody) {
      try {
        apiResponse = await axios.put(this.getSingleProductEndpoint + productCode, productRequestBody);
      }catch(error) {
        apiResponse = error.response;
      } finally {
        assert.equal(200, apiResponse.status);
      }
    }


  // addProduct(productRequestBody) {
  //   console.log(productRequestBody);
  //   return axios
  //     .post(this.apiURL, productRequestBody)
  //     .then(function(response) {
  //       console.log("Response Status", response.status); //data.detail. status
  //     })
  //     .catch(function(error) {
  //       console.log("Error status", error.response.data.status);
  //     });
  // }

  async deleteStatus() {
    await axios.delete(this.setPackagesEndpoint);
  }

  async performInstructCall(caseId) {
    let instructCallURL = this.instructCallEndpoint + '/' + caseId;
    console.log(instructCallURL);
    await axios.get(instructCallURL);
  }

  async enactGetPackages() {
    await axios.get(this.getPackagesEndpoint);
  }

  async setStubErrorConfig(endPoint, errorCode) {
    this.setErrorConfig.Endpoint = endPoint;
    this.setErrorConfig.StatusCode = errorCode;
    return await axios
      .post(this.setErrorConfigEndpoint, this.setErrorConfig)
      .then(function(response) {
        // console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  async deleteStubErrorConfig() {
    return await axios
      .delete(this.deleteErrorConfigEndpoint)
      .then(function(response) {
        // console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default new api();
