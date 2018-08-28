import axios from 'axios';

export default {
  // Gets the user with the given firebase id
  getUser: function(firebaseUser) {
    return axios.post('/api/user/fid', firebaseUser);
  },
  // Updates a User to the database
  updateUser: function(id, userData) {
    return axios.post('/api/user/' + id, userData);
  },

  // Gets all employees
  getAllEmployee: function() {
    return axios.get('/api/employee');
  },
  // Gets all employees from User
  getAllEmployeeFromUser: function(userId) {
    return axios.get('/api/employee/user/' + userId);
  },
  // Saves an employee to the database
  saveEmployee: function(employeeData) {
    return axios.post('/api/employee', employeeData);
  },
  // Gets the employee with the given id
  getEmployee: function(id) {
    return axios.get('/api/employee/' + id);
  },
  // Gets the employee with the given id
  getEmployeeByName: function(first, last) {
    return axios.get('/api/employee/name/' + first + '/' + last);
  },
  // Updates an employee to the database
  updateEmployee: function(id, employeeData) {
    return axios.post('/api/employee/' + id, employeeData);
  },
  // Deletes the employee with the given id
  deleteEmployee: function(id) {
    return axios.delete('/api/employee/' + id);
  },
  // Gets all Reviews by Employee
  getEmployeeReviews: function(id) {
    return axios.get('/api/review/employee/' + id);
  },
  // Gets all Goals by Employee
  getEmployeeGoals: function(id) {
    return axios.get('/api/goal/employee/' + id);
  },
  // Gets all Achieved Goals by Employee
  getEmployeeAchieved: function(id) {
    return axios.get('/api/achieved/employee/' + id);
  },
  // Gets all goals
  getAllGoal: function() {
    return axios.get('/api/goal');
  },
  // Saves a goal to the database
  saveGoal: function(goalData) {
    return axios.post('/api/goal', goalData);
  },
  // Gets the goal with the given id
  getGoal: function(id) {
    return axios.get('/api/goal/' + id);
  },
  // Updates a goal to the database
  updateGoal: function(id, goalData) {
    return axios.post('/api/goal/' + id, goalData);
  },
  // Deletes the goal with the given id
  deleteGoal: function(id) {
    return axios.delete('/api/goal/' + id);
  },
  // Gets all achieved goals within a specified date range
  getAchievedWithin: function(startDate, endDate) {
    return axios.get('/api/achieved/within/' + startDate + '/' + endDate);
  },
  // Gets all achieved goals within a specified date range by an Employee Id
  getAchievedWithinByEmployee: function(startDate, endDate, employeeId) {
    return axios.get('/api/achieved/within/' + startDate + '/'
      + endDate + '/' + employeeId);
  },
  // Saves an achieved goal to the database
  saveAchieved: function(achievedData) {
    return axios.post('/api/achieved', achievedData);
  },
  // Deletes the achieved goal with the given id
  deleteAchieved: function(id) {
    return axios.delete('/api/achieved/' + id);
  },
  // Gets all reviews
  getAllReviews: function() {
    return axios.get('/api/review');
  },
  // Gets the review with the given id
  getReview: function(id) {
    return axios.get('/api/review/' + id);
  },
  // Gets all reviews within a specified date range
  getReviewsWithin: function(startDate, endDate) {
    return axios.get('/api/review/within/' + startDate + '/' + endDate);
  },
  // Gets all reviews within a specified date range by an Employee Id
  getReviewsWithinByEmployee: function(startDate, endDate, employeeId) {
    return axios.get('/api/review/within/' + startDate
      + '/' + endDate + '/' + employeeId);
  },
  // Saves a review to the database
  saveReview: function(reviewData) {
    return axios.post('/api/review', reviewData);
  },
  // Deletes the review with the given id
  deleteReview: function(id) {
    return axios.delete('/api/review/' + id);
  },
};
