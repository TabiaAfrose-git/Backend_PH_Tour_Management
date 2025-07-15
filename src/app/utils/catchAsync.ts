import { NextFunction, Request, Response } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AsuncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>


export const catchAsync = (fn: AsuncHandler) => (req: Request, res: Response, next: NextFunction) =>{
    Promise.resolve(fn(req, res, next)).catch((err:any)=>{
        console.log(err);
        next(err)
    })
}