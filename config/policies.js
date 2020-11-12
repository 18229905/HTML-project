/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const { update } = require("../api/controllers/QponController");

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  QponController: {
    create: 'isAdmin',
    list: 'isAdmin',
    update: "isAdmin",
    json: "isAdmin",
    delete: "isAdmin",
    populate: "isAdmin",
  }
  
};
