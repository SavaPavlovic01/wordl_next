import express from 'express'
import init_db from '../models/db'
import { users } from '../models/users'
import { drizzle } from "drizzle-orm/node-postgres";
import bcrypt from 'bcrypt'

const saltRounds = 10;

export default class UserController{
    

    register = async (req:express.Request, res:express.Response) => {
        const db = drizzle(await init_db())
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            if(err){
                console.log(err);
                res.json({status:"error"});
            } else {
                bcrypt.hash(req.body.password, salt, async (err, hash) => {
                    console.log(hash);
                    await db.insert(users).values({email:req.body.email, password:hash})
                    res.json({status:'ok'})
                })
            }
        })
        
        
    }
}