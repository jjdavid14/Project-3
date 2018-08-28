const db = require('../models');
const sequelize = require('sequelize');

// Defining methods for the employeeController
module.exports = {
  findAll: function(req, res) {
    db.Employee.findAll(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Employee.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByName: function(req, res) {
    let fname = req.params.first.toLowerCase();
    let lname = req.params.last.toLowerCase();
    db.Employee.findAll({
      where: {
        firstname: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('firstname')),
          'LIKE',
          '%' + fname + '%'
        ),
        lastname: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('lastname')),
          'LIKE',
          '%' + lname + '%'
        ),
      },
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function(req, res) {
    db.Employee.findAll({
      where: {
        UserId: req.params.id,
      },
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Employee.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Employee.update(req.body, {
      where: {id: req.params.id},
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Employee.destroy({
      where: {id: req.params.id},
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findWithin: function(req, res) {
    db.Employee.findAll({
      where: {
        updatedAt: {
          $between: [req.params.start, req.params.end],
        },
      },
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getGoals: function(req, res) {
    db.Employee.getGoals({
      where: {
        EmployeeId: req.params.id,
      },
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
