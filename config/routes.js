/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
 'GET /qpon/create': 'QponController.create',
 'POST /qpon/create': 'QponController.create',
 'GET /qpon/read/:id': 'QponController.read',
 

  '/': { view: 'qpon/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/



 'GET /qpon/homepage': 'QponController.show',
 'GET /qpon/update/:id': 'QponController.update',
 'POST /qpon/update/:id': 'QPonController.update',
 'GET /qpon/admin': 'QponController.list',
 'GET /qpon/json': 'QponController.json',
 
 'POST /qpon/delete/:id': 'QponController.delete',

 'GET /qpon/search': 'QponController.search',
 'POST /qpon/search': 'QponController.search',
 //'GET /qpon/search': 'QponController.paginate',

};
