import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespons";

// create User
const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const user = await UserService.createUserService(req.body)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: user
    })

})

// get user
const getAllUsers =  catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const users = await UserService.getAllUserService()

     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All users Retrieved successfully",
        data: users.data,
        meta: users.meta,
    })
})


export const UserControllers = {
    createUser,
    getAllUsers

}