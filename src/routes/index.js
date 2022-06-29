const HttpServer = require('../service/HttpServer');
const productController = require('../controllers/ProductController');
const pagesController = require('../controllers/PagesController');
const router = new HttpServer();

// Pages Routes
router.get('/', pagesController.index);

// Product Routes
router.get('/product', productController.get);
router.post('/product', productController.post);
router.put('/product', productController.update);
router.delete('/product', productController.delete);

// Product routes to html pages
router.post('/product/update', productController.update);
router.post('/product/delete', productController.delete);

module.exports = router;
