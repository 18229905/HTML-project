/**
 * QponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
// action - create
create: async function (req, res) {

    if (req.method == "GET") return res.view('qpon/create');
    
    var qpon = await qpon.create(req.body).fetch();

    return res.status(201).json({ id: qpon.id });

},

// json function
json: async function (req, res) {

    var everyones = await Qpon.find();

    return res.json(everyones);
},

// action - list
list: async function (req, res) {

    var everyones = await Qpon.find();
    
    return res.view('qpon/admin', { qpons: everyones });
},

};

