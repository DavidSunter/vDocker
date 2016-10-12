var express = require('express');
var router = express.Router();

var usersController = require('../controllers/users');
var sessionController = require('../controllers/sessions');
var gamesController = require('../controllers/games');

// Session routes
router.route('/users/login')
      .post(sessionController.create)
      .delete(sessionController.delete);

router.route('/sessions/new')
      .get(sessionController.new);

// User routes
router.route('/users')
      .post(usersController.create);

router.route('/users/:id')
      .patch(usersController.update);

// Game routes
router.route('/games')
      .post(gamesController.control);

router.route('/games/new')
      .post(gamesController.join);

// Test routes
router.route('/games/:id/test')
      .post(gamesController.test);

router.route('/games/test/winner')
      .post(gamesController.checkWinner);

module.exports = router;
