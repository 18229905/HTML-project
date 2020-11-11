/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');
    
        if (!req.body.username || !req.body.password) return res.badRequest();
    
        var user = await User.findOne({ username: req.body.username });
    
        if (!user) return res.status(401).json("User not found");
    
        var match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).json("Wrong Password");
    
        // Reuse existing session 
        if (!req.session.username) {
            req.session.username = user.username; 
            req.session.password = user.password;
            req.session.role = user.role;
            req.session.coin = user.coin;
            req.session.userid = user.id;
            return res.json(user);
        }
        
        // Start a new session for the new login user
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);
    
            req.session.username = user.username; 
            req.session.password = user.password;
            req.session.role = user.role;
            req.session.coin = user.coin;
            req.session.userid = user.id;
            return res.json(user);
        });
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {
        
            if (err) return res.serverError(err);

    if (req.wantsJSON){
        return res.status(204).send();	    // for ajax request
    } else {
        return res.redirect('/');			// for normal request
    }
                  
        });
    },

    populate: async function (req, res) {
        
        var user = await User.findOne(req.params.id).populate("redeemed");
        
        if (!user) return res.notFound();
        //
        return res.json(user);
    },
    redeemed: async function (req, res) {
        var user = await User.findOne(req.session.userid).populate("redeemed");
        return res.view('qpon/redeemed', { users: user });
    },
    

    add: async function (req, res) {

        if (!await User.findOne(req.session.userid)) return res.status(404).json("User not found.");
        
        var thatQpon = await Qpon.findOne(req.params.id).populate("redeemedby", {id: req.session.userid});
    
        if (!thatQpon) return res.status(404).json("Qpon not found.");
            
        if (thatQpon.redeemedby.length > 0)
            return res.status(409).json("Already added.");   // conflict
        
        await User.addToCollection(req.session.userid, "redeemed").members(req.params.id);
        var updatedUser = await User.updateOne(req.session.userid).set({
            coin:req.session.coin-thatQpon.coins
        });
        if (!updatedUser) return res.notFound();
        var updatedQpon = await Qpon.updateOne(thatQpon.id).set({
            quota:thatQpon.quota-1});
        if (!updatedQpon) return res.notFound();
        return res.ok();
    },

    remove: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.status(404).json("User not found.");
        
        var thatQpon = await Qpon.findOne(req.params.fk).populate("redeemedby", {id: req.params.id});
        
        if (!thatQpon) return res.status(404).json("Qpon not found.");
    
        if (thatQpon.redeemedby.length == 0)
            return res.status(409).json("Nothing to delete.");    // conflict
    
        await User.removeFromCollection(req.params.id, "redeemed").members(req.params.fk);
    
        return res.ok();
    },

};

