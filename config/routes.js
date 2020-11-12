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
 'POST /qpon/read/:id': 'UserController.add',
 'DELETE /qpon/read/:id': 'UserController.remove',
 

  '/': { view: 'qpon/homepage' },
  'GET /': 'QponController.show',


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
 
 'Delete /qpon/delete/:id': 'QponController.delete',

 'GET /qpon/search': 'QponController.search',
 //'POST /qpon/search': 'QponController.search',


 'GET /user': 'UserController.login',
 'GET /user/login': 'UserController.login',
 'POST /user/login': 'UserController.login',
 'POST /user/logout': 'UserController.logout',

 'GET /qpon/:id/redeemedby': 'QponController.populate',
 'GET /user/:id/redeemed': 'UserController.populate',
 'POST /user/:id/redeemed/add/:fk': 'UserController.add',
 'POST /user/:id/redeemed/remove/:fk': 'UserController.remove',

 'GET /qpon/list/:id': 'QponController.redeemedby',
 'GET /qpon/redeemed': 'UserController.redeemed',
};
