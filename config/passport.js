const  JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const config = require('../config/database');

module.exports = function(passport){
    let opts ={};
    opts.jwtFromRequest =ExtractJwt.fromAuthHeaderWithScheme('jwt');// ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        User.getUserById(jwt_payload._Id, (err, user)=>{
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);}
                else{

                }
            });
    }));
    
}
