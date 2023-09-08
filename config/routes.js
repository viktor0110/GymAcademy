
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const defaultController = require('../controllers/defaultController');
const authorizationController = require('../controllers/authorizationController');
const workoutController = require('../controllers/workoutController');
const { hasUser} = require('../middlewares/guards.js');


module.exports = (app) => {
    app.use(homeController);
    app.use('/about', aboutController);
    app.use('/create', hasUser(), createController);
    app.use('/details', detailsController);
    app.use('/auth', authorizationController);
    app.use('/workout', workoutController);
    
    app.all('*', defaultController);
}
// app.use('/accessories',hasRole('admin'), accessoriesController);