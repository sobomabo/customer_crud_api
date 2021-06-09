module.exports = app => {
  const api = require("../controllers/api.js");
  const validationSchemas = require('../middlewares/validation.schema.js');
  const validationMiddleware = require('../middlewares/validation.js');

  var router = require("express").Router();

  // Create a new Customer
  router.post("/add", validationMiddleware(validationSchemas.customerAdd, 'body'), api.customerAdd);

  // Retrieve Customers by post data
  router.post("/find", validationMiddleware(validationSchemas.customersFindAll, 'body'), api.customersFindAll);

  // Retrieve a single Customer by id
  router.get("/find/:id", validationMiddleware(validationSchemas.customerFind, 'params'), api.customerFind);

  // Update a Customer by post data
  router.post("/update", validationMiddleware(validationSchemas.customerUpdate, 'body'), api.customerUpdate);

  // Delete a Customer by id
  router.get("/delete/:id", validationMiddleware(validationSchemas.customerDelete, 'params'), api.customerDelete);

  // Delete a Customer by post data
  router.post("/delete/", validationMiddleware(validationSchemas.customersDeleteAll, 'body'), api.customersDeleteAll);

  app.use("/api/customers", router);
};
