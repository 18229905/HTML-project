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
search1: async function (req, res) {
    
    var everyones = await Qpon.find();
    
    return res.view('qpon/search', { qpons: everyones });
},

// search function
search: async function (req, res) {
    
    var whereClause = {};
    
    if (req.query.region) whereClause.region = { contains: req.query.region };
    if (req.query.validdate) whereClause.date = { contains: req.query.validdate };
    var mincoins = parseInt(req.query.mincoin);
    var maxcoins = parseInt(req.query.maxcoin);
    if (!isNaN(mincoins || maxcoins)) whereClause.coins = { contains: (mincoins,maxcoins) };
    
    var thoseQpons = await Qpon.find({
    	where: whereClause,
    	sort: 'restaurant'
    });
    
    return res.view('qpon/search', { qpons: thoseQpons });
},

// action - paginate
paginate: async function (req, res) {

    var limit = Math.max(req.query.limit, 2) || 2;
    var offset = Math.max(req.query.offset, 0) || 0;

    var someQpons = await Qpon.find({
        limit: limit,
        skip: offset
    });

    var count = await Qpon.count();

    return res.view('qpon/search', { qponss: someQpons, numOfRecords: count });
},


show: async function (req, res) {

    var everyones = await Qpon.find();
    
    return res.view('qpon/homepage', { qpons: everyones });
},

};

