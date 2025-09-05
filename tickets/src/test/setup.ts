import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

// global signup function
declare global {
    var signin: () => Promise<string[]>;
}

/**
 * Use mongodb memory srever for test env
 * Copy of mongodb in memory
 *
 */

import { app } from '../app'
import request from "supertest";

let mongo: any
/**
 * run before every test
 * connect mongosse to mongodb in memory
 */
beforeAll(async() =>{
    process.env.JWT_KEY = "asdfasdf"
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});

})


/**
 *  Run before eeach test
 *  clear the db by deleting every collection
 */
beforeEach(async ()=> {
    const collections = await mongoose.connection.db?.collections();
    for(let collection of collections!){
        await collection.deleteMany({});
    }
})

/**
 *  Run after all our test are complete
 */

afterAll(async ()=> {
    await mongo.stop()
    await mongoose.connection.close( )
})

/**
 * Faking authentication
 * - not calling auth api
 * - to ensure test run independently without depedency
 * -
 */
global.signin = async ()=>{
  // Build a JWT payload {email, password
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  }
  // create a jwt!
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  // Build a session object { jwt: MY_JWT}
  const session = { jwt: token}

  // Turn that session to json
  const sessionJson = JSON.stringify(session)

  // Take json and encode it as base64
  const base64 = Buffer.from(sessionJson).toString('base64')

  // return a string i.e. cokkie with encodded data
  return [`session=${base64}`];

}
