const Joi = require('joi-oid');

const now = Date.now();
const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 13)); // go back by 13 years

const validationSchemas = {
  customerAdd: Joi.object({
    first_name: Joi.string().label('First Name').alphanum().min(3).max(30).required(),
    last_name: Joi.string().label('Last Name').alphanum().min(3).max(30).required(),
    email: Joi.string().label('Email').email().min(3).max(30).required(),
    dob: Joi.date().max(cutoffDate).raw().label('Date of Birth').required(),
    gender: Joi.string().valid("Male", "Female", "Other").label('Gender').required(),
    address: Joi.string().label('Address').min(3).max(30).required(),
    city: Joi.string().label('City').min(3).max(30).required(),
    state: Joi.string().label('State').min(3).max(30).required()
  }),
  customerUpdate: Joi.object({
    id: Joi.objectId().label('ID').required(),
    first_name: Joi.string().label('First Name').alphanum().min(3).max(30),
    last_name: Joi.string().label('Last Name').alphanum().min(3).max(30),
    email: Joi.string().label('Email').email().min(3).max(30),
    dob: Joi.date().max(cutoffDate).raw().label('Date of Birth'),
    gender: Joi.string().valid("Male", "Female", "Other").label('Gender'),
    address: Joi.string().label('Address').min(3).max(30),
    city: Joi.string().label('City').min(3).max(30),
    state: Joi.string().label('State').min(3).max(30)
  }),
  customersFindAll: Joi.object({
    first_name: Joi.string().label('First Name').alphanum().min(3).max(30),
    last_name: Joi.string().label('Last Name').alphanum().min(3).max(30),
    email: Joi.string().label('Email').email().min(3).max(30),
    dob: Joi.date().max(cutoffDate).raw().label('Date of Birth'),
    gender: Joi.string().valid("Male", "Female", "Other").label('Gender'),
    address: Joi.string().label('Address').min(3).max(30),
    city: Joi.string().label('City').min(3).max(30),
    state: Joi.string().label('State').min(3).max(30)
  }),
  customerFind: Joi.object({
    id: Joi.objectId().label('ID').required()
  }),
  customerDelete: Joi.object({
    id: Joi.objectId().label('ID').required()
  }),
  customersDeleteAll: Joi.object({
    first_name: Joi.string().label('First Name').alphanum().min(3).max(30),
    last_name: Joi.string().label('Last Name').alphanum().min(3).max(30),
    email: Joi.string().label('Email').email().min(3).max(30),
    dob: Joi.date().max(cutoffDate).raw().label('Date of Birth'),
    gender: Joi.string().valid("Male", "Female", "Other").label('Gender'),
    address: Joi.string().label('Address').min(3).max(30),
    city: Joi.string().label('City').min(3).max(30),
    state: Joi.string().label('State').min(3).max(30)
  })
};

module.exports = validationSchemas;