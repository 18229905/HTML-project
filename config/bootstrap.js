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
    { title: "50% off", restaurant: "ABC restaurant",region:"Kowloon",mall:"Elements", image:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/ElementsLogo.svg/1200px-ElementsLogo.svg.png" ,quota:3,coins:100,date:"2021-6-4",detail:"abc",id:1},
    { title: "40% off", restaurant: "DEF restaurant", region:"NT",mall:"New Town Plaza",image:"https://www.ciaogogo.com/image/cache/data/brand/newtownplaza%20logo-278x278_0.JPG",quota:5,coins:50,date:"2021-10-1",detail:"def", id:2},
    { title: "30% off", restaurant: "HIJ restaurant", region:"HKIsland",mall:"IFC Mall",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS11861AzIJC5_roP5IM2E4zGoAsTbWW-nbhg&usqp=CAU",quota:7,coins:300,date:"2021-7-21",detail:"hij", id:3},
    { title: "20% off", restaurant: "XYZ restaurant", region:"HKIsland",mall:"IFC Mall",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS11861AzIJC5_roP5IM2E4zGoAsTbWW-nbhg&usqp=CAU",quota:7,coins:500,date:"2021-8-31",detail:"XYZ", id:4},
    { title: "70% off", restaurant: "123 restaurant", region:"Kowloon",mall:"APM",image:"https://www.hkapm.com.hk/lib/img/apm/header/apm.png",quota:7,coins:900,date:"2021-10-10",detail:"123", id:5}
    // etc.
  ]);

  const admin = await User.findOne({username: "admin"});
  const boss = await User.findOne({username: "boss"});
  const Ken = await User.findOne({username: "Ken"});
  const Ben = await User.findOne({username: "Ben"});
  const Ann = await User.findOne({username: "Ann"});
  const qpon1 = await Qpon.findOne({title: "50% off"});
  const qpon2 = await Qpon.findOne({title: "40% off"});
  const qpon3 = await Qpon.findOne({title: "30% off"});
  const qpon4 = await Qpon.findOne({title: "20% off"});

  await User.addToCollection(boss.id, 'redeemed').members([qpon1.id,qpon2.id,qpon3.id,qpon4.id]);
  await User.addToCollection(Ken.id, 'redeemed').members([qpon2.id,qpon3.id]);
  await User.addToCollection(Ben.id, 'redeemed').members([qpon3.id,qpon4.id]);
  await User.addToCollection(Ann.id, 'redeemed').members([qpon4.id,qpon1.id]);
  
}};
