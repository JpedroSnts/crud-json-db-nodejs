const router = require('./routes');
const PORT = process.env.PORT || 3000;
router.listen(3000, () => console.log(`SERVER RUNNING IN http://localhost:${PORT}`));
