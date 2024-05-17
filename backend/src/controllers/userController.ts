import express from 'express'
import init_db from '../models/db'
import { users } from '../models/users'
import { drizzle } from "drizzle-orm/node-postgres";
import bcrypt from 'bcrypt'
import { and, eq, or } from 'drizzle-orm';

const jwt = require('jsonwebtoken')

const saltRounds = 10;
const key = "shhhh";

export default class UserController{

    genToken = (payload:any) =>{
        return jwt.sign(payload, key, {expiresIn:'1h'});
    }

    register = async (req:express.Request, res:express.Response) => {
        const db = drizzle(await init_db())
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            if(err){
                console.log(err);
                res.json({status:"error"});
            } else {
                bcrypt.hash(req.body.password, salt, async (err, hash) => {
                    console.log(hash);
                    try{
                        let payload = await db.insert(users).values({email:req.body.email, password:hash, username:req.body.username}).returning()
                        res.json({status:'ok', token:this.genToken(payload[0])})
                    } catch(error:any) {
                        const error_code:number = error.constraint == 'users_email_unique'? 0:1
                        res.json({status:error_code})
                    }
                    
                })
            }
        })
        
        
    }

    login = async (req:express.Request, res:express.Response) => {
        const db = drizzle(await init_db())
        let data = await db.select().from(users).where(or(eq(users.email, req.body.id), eq(users.username, req.body.id))) 
        if(data.length == 0) {
            res.json({status:'invalid id'});
            return;
        }

        if(await bcrypt.compare(req.body.password, data[0].password)) {
            res.json({status:'ok', token:this.genToken(data[0])})
            return
        } else {
            res.json({status:'invalid password'})
        }
        
    }
}