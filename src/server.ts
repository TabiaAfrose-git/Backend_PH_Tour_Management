/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";


let server: Server;

const startServer = async () =>{
    try {
        // DB connecting
        //console.log(envVars.NODE_ENV);
        await mongoose.connect(envVars.DB_URL);
        console.log("📊 Connected to DB!!!");

        //server listening
        server =  app.listen(envVars.PORT, ()=>{
        console.log(`✅ server is listening to port ${envVars.PORT}`);
        });


    } catch (error) {
        console.log(error);
    }

}
startServer();

// 1. unhandledRejection handling
process.on("unhandledRejection",(err)=>{
    console.log("Unhandled Rejection detected... sever shutting down.",err);

    if(server){
        server.close(()=>{
            process.exit(1)
        });
    }
    process.exit(1);
})

//2. uncaughtException handel
process.on("uncaughtException",(err)=>{
    console.log("uncaught Exception detected... sever shutting down.",err);

    if(server){
        server.close(()=>{
            process.exit(1)
        });
    }
    process.exit(1);
})

// 3.1 SIGTERM handel [server owner handel it]
process.on("SIGTERM",()=>{
    console.log("SIGTERM Exception received... sever shutting down...");

    if(server){
        server.close(()=>{
            process.exit(1)
        });
    }
    process.exit(1);
})

// 3.2 SIGINT handel [ (command + c) => press ]
process.on("SIGINT",()=>{
    console.log("SIGINT Exception received... sever shutting down...");

    if(server){
        server.close(()=>{
            process.exit(1)
        });
    }
    process.exit(1);
})

//Promise.reject(new Error("I forgot to catch this Promise"))
//throw new Error("I forgot to handel this local error")


