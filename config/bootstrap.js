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
  sails.bcrypt = require('bcryptjs');
  var salt = await sails.bcrypt.genSalt(10);
  
  return generateUsers();
  
  async function generateUsers() {
  
    if (await User.count() > 0) {
      return;
    }
    
    //await User.createEach([
    //  { username: "admin", password: '123456' },
    //  { username: "boss", password: '123456' },
      // etc.
    //]);
    var hash = await sails.bcrypt.hash('123456', salt);

    await User.createEach([
    { username: "admin", password: hash, role:"admin",coin:9999,id:1},
    { username: "boss", password: hash,role:"member",coin:2000,id:2},
    { username: "Ken", password: hash,role:"member",coin:500,id:3},
    { username: "Ben", password: hash,role:"member",coin:1000,id:4},
    { username: "Ann", password: hash,role:"member",coin:1,id:5},
    // etc.
]);




  
  if (await Qpon.count() > 0) {
    return;
}
  await Qpon.createEach([
    { title: "50% off", restaurant: "ABC restaurant",region:"Kowloon",mall:"Elements", image:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/ElementsLogo.svg/1200px-ElementsLogo.svg.png" ,quota:3,coins:100,date:"2020-10-28",detail:"abc",id:1},
    { title: "40% off", restaurant: "XYZ restaurant", region:"NT",mall:"New Town Plaza",image:"https://www.ciaogogo.com/image/cache/data/brand/newtownplaza%20logo-278x278_0.JPG",quota:5,coins:50,date:"2020-10-28",detail:"xyz", id:2},
    { title: "30% off", restaurant: "XYZ restaurant", region:"HKIsland",mall:"IFC Mall",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS11861AzIJC5_roP5IM2E4zGoAsTbWW-nbhg&usqp=CAU",quota:7,coins:70,date:"2020-10-28",detail:"XYZ", id:5},
    { title: "20% off", restaurant: "XYZ restaurant", region:"HKIsland",mall:"IFC Mall",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS11861AzIJC5_roP5IM2E4zGoAsTbWW-nbhg&usqp=CAU",quota:7,coins:70,date:"2020-10-27",detail:"XYZ", id:4}
    // etc.
  ]);

  
  
}};
