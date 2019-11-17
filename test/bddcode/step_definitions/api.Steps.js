import { Given, When, Then } from 'cucumber';
import api from '../functions/api';
let productRequestBody = {
  "name": "Pendant",
  "price": 14.28
}

Given(/^I add a new product and returns status code "(.*)"$/, async function(statusCode) {
  await api.addProduct({productRequestBody, statusCode});
});

Given(/^I add a new product with price as String and returns status code "(.*)"$/, async function(statusCode) {
  productRequestBody.price = "14.28";
  await api.addProduct({productRequestBody, statusCode});
});

Given(/^I delete all the products$/, async function() {
   await api.deleteAllProduct();
});

Then(/^I verify added product in the list$/, async function() {
  await api.verifyProductInTheList(productRequestBody);
});

Then(/^I verify added product in the list using product code "(.*)"$/, async function(productCode) {
  await api.verifyProductInTheListWithProductCode(productCode,productRequestBody);
});

When(/^I update product in the list using product code "(.*)" and verify in list$/, async function(productCode) {
  productRequestBody.name = "Lavender Heart";
  productRequestBody.price = 2.3;
  await api.updateProductInTheListWithProductCode(productCode,productRequestBody);
  await api.verifyProductInTheListWithProductCode(productCode,productRequestBody);
});

When(/^I add a new product with duplicate key entries it should return status code "(.*)"$/, async function(statusCode) {
  await api.addProductDuplicateKey();
});
