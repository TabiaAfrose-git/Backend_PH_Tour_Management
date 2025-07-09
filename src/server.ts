import { Server } from "http";
import  express, { Request, Response } from "express";
import mongoose from "mongoose";
import app from "./app";
import { promise } from "zod";

let server: Server;

const startServer = async () =>{
    try {
        // DB connecting
        await mongoose.connect("mongodb+srv://mongodb:mongodb@cluster0.v1iv1s8.mongodb.net/tour-management-system?retryWrites=true&w=majority&appName=Cluster0");
        console.log("📊 Connected to DB!!!");

        //server listening
        server =  app.listen(3000, ()=>{
        console.log(`✅ server is listening to port 5000`);
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


