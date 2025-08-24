import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

/**
 * Use mongodb memory srever for test env
 * Copy of mongodb in memory
 *
 */

import { app } from '../app'

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