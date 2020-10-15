/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */



module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  if (await Qpon.count() > 0) {
    return;
}
  await Qpon.createEach([
    { title: "50%", restaurant: "ABC",region:"Kowloon",mall:"Elements", image:"www.hkbu.edu.com" ,quota:3,coins:100,date:"2020-10-28",detail:"abc",id:1},
    { title: "40%", restaurant: "XYZ", region:"NT",mall:"New Town Plaza",image:"www.hkbu.edu.com",quota:5,coins:50,date:"2020-10-28",detail:"xyz", id:2},
    { title: "30%", restaurant: "XYZ", region:"HKIsland",mall:"IFC Mall",image:"www.hkbu.edu.com",quota:7,coins:70,date:"2020-10-28",detail:"XYZ", id:5}
    // etc.
  ]);
  
};
