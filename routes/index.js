var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/default');

/* GET home page. */
router.get('/', controller.index);

router.get('/page/:page/:skip', controller.page);

module.exports = router;
