const HttpServer = require('../service/HttpServer');
const modelController = require('../controllers/ModelController');
const router = new HttpServer();

router.get('/', modelController.index);

module.exports = router;
