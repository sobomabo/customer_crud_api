const db = require("../models");
const Customer = db.customers;

// Create and Save a new Customer
exports.customerAdd = async (req, res) => {
  var customerExists = false;
  
  // check if customer with specified email already exists
  if(req.body.email){
    await Customer.find({email: req.body.email})
      .then(data => {
        if (data.length){
          customerExists = true;
        }
      }).catch(err => {});
  }

  if(!customerExists){
    // Create a Customer object
    const customer = new Customer({
      first_name: req.body.first_name ? req.body.first_name : "",
      last_name: req.body.last_name ? req.body.last_name : "",
      email: req.body.email ? req.body.email : "",
      dob: req.body.dob ? req.body.dob : "",
      gender: req.body.gender ? req.body.gender : "",
      address: req.body.address ? req.body.address : "",
      city: req.body.city ? req.body.city : "",
      state: req.body.state ? req.body.state : ""
    });

    // Save Customer in the database
    customer
      .save(customer)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      });
  }else{
    res.status(500).send({
      message: `A customer with email "${req.body.email}" already exists`
    });
  }
};

// Retrieve all Customer that satisfy criteria in post data.
exports.customersFindAll = (req, res) => {
  
  // build criteria list to find Customers 
  var condition = {};
  if(req.body) for (const field in req.body) {
    if(req.body[field]){
      condition[field] = { $regex: new RegExp(req.body[field]), $options: "i" }
    }
  }

  // Find Customers by specified criteria
  Customer.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    });
};

// Find a single Customer by id
exports.customerFind = (req, res) => {
  const id = req.params.id;

  Customer.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not Customer found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Customer with id=" + id });
    });
};

// Update a Customer by the id in the request
exports.customerUpdate = (req, res) => {
  
  const id = req.body.id ? req.body.id : null;

  if(id){
    delete req.body.id; // remove id value from post data to reprevent curruption 
    delete req.body.email; // remove email value from post data to reprevent curruption 
    Customer.findByIdAndUpdate(id, req.body, {new: true})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Customer with id=${id}. Customer was not found!`
          });
        } else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Customer with id=" + id
        });
      });
  }else{
    res.status(500).send({
      message: "Bad request, Customer ID is required"
    });
  }
};

// Delete a Customer by the specified id in the request
exports.customerDelete = (req, res) => {
  const id = req.params.id;

  Customer.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Customer with id=${id}. Customer may have already been deleted!`
        });
      } else {
        res.send({
          message: "Customer was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id
      });
    });
};

// Delete all Customers from the database by specified post.
exports.customersDeleteAll = (req, res) => {
  
  // build criteria list to find Customers to delete
  var condition = {};
  if(req.body) for (const field in req.body) {
    if(req.body[field]){
      condition[field] = req.body[field];
    }
  }

  // Delete Customers by specified criteria
  Customer.deleteMany(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing Customers."
      });
    });
};
