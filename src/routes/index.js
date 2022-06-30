const HttpServer = require('../service/HttpServer');
const productController = require('../controllers/ProductController');
const pagesController = require('../controllers/PagesController');
const router = new HttpServer();

// Pages Routes
router.get('/', pagesController.index);
router.get('/search', pagesController.search);
router.get('/prod', pagesController.product);
router.get('/create', pagesController.create);
router.get('/update', pagesController.update);

// Product Routes
router.get('/product', productController.get);
router.post('/product', productController.post);
router.put('/product', productController.update);
router.delete('/product', productController.delete);

module.exports = router;
