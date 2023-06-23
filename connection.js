const {MongoClient}=require("mongodb");

async function connectToDb(){
    try{
        const client= new MongoClient(process.env.MONGODB_CONNECTION_URL)
        await client.connect()
        console.log("connection Established")
        const database=  client.db("DailyJournals")
        return database

    }catch(error){
        console.log("Error occured",error)
    }
    
}
module.exports={
    connectToDb
};