import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";

// create User
const createUser = async(req: Request, res: Response, next: NextFunction) => {
   try {

        const user = await UserService.createUserService(req.body)

        res.status(httpStatus.CREATED).json({
            message: "User created successfully",
            user
        })

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (err : any) {
        //console.log(err);
        next(err)
    }
}
export const UserControllers = {
    createUser
}