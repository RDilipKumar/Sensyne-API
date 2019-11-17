Feature: API Testing
  Validate Post, Get, Put, Delete operations for the product

 Scenario: Validate add new product and its response status code 
    Given I delete all the products 
    Then I add a new product and returns status code "201"

Scenario: Verify added product in the list and its status code
    Then I verify added product in the list

Scenario: Verify added product in the list using product code and verify its status code
    Then I verify added product in the list using product code "1"

Scenario: Validate invalid data type for price attribute returns failure response status code
    Then I add a new product with price as String and returns status code "400"

Scenario: Update product in the list using product code and verify its status code
    When I update product in the list using product code "1" and verify in list

Scenario: Validate add new product with duplicate key entries and its status code
  When I add a new product with duplicate key entries it should return status code "400"