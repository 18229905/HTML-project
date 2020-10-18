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
    
    var qpon = await Qpon.create(req.body).fetch();

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

// action - update
update: async function (req, res) {

    if (req.method == "GET"){    
        var thatQpon = await Qpon.findOne(req.params.id);

        if (!thatQpon) return res.notFound();

        return res.view('qpon/update', { qpon: thatQpon });
    }else{
        var updatedQpon = await Qpon.updateOne(req.params.id).set(req.body);

        if (!updatedQpon) return res.notFound();

        return res.ok();
    }
    

},

// action - read
read: async function (req, res) {

    var thatQpon = await Qpon.findOne(req.params.id);

    if (!thatQpon) return res.notFound();

    return res.view('qpon/read', { qpon: thatQpon });
},

// action - delete 
delete: async function (req, res) {

    var deletedQpon = await Qpon.destroyOne(req.params.id);

    if (!deletedQpon) return res.notFound();

    return res.ok(); 
},


// search function
search: async function (req, res) {
    
    var whereClause = {};
    
    if (req.query.region) whereClause.region = { contains: req.query.region };
    
    var parsedcoins = parseInt(req.query.coins);
    if (!isNaN(parsedcoins)) whereClause.coins = parsedcoins;
    
    var thoseQpons = await Qpon.find({
    	where: whereClause,
    	sort: 'title'
    });
    
    return res.view('qpon/admin', { qpons: thoseQpons });
},

show: async function (req, res) {

    var whereClause = {};

    if(req.query.region) whereClause.region = { contains: req.query.region };

    return res.view('qpon/homepage', { qpons: thoseQpons });


}

};

