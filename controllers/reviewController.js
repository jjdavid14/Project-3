const db = require('../models');

// Defining methods for the reviewController
module.exports = {
  findAll: function(req, res) {
    db.Review.findAll(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Review.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Review.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Review.update(req.body, {
      where: {id: req.params.id},
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Review.destroy({
      where: {id: req.params.id},
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getReviewWithin: function(req, res) {
    db.Review.findAll({
      where: {
        updatedAt: {
          $between: [req.params.start, req.params.end],
        },
      },
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getReviewWithinByEmployee: function(req, res) {
    db.Review.findAll({
      where: {
        EmployeeId: req.params.employeeId,
        updatedAt: {
          $between: [req.params.start, req.params.end],
        },
      },
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getEmployeeReviews: function(req, res) {
    db.Review.findAll({
      where: {
        EmployeeId: req.params.id,
      },
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
