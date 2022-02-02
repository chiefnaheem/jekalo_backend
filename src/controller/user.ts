import express, { Request, Response, NextFunction } from "express";
import ResponseStatus from "../middleware/response";
import User from "../model/user";
const ResponseController = new ResponseStatus();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name_prefix = `${req.body.first_name[0]}${req.body.last_name[0]}`.toUpperCase();
    // newUser.name_prefix = name_prefix
    const newUser = new User({
      first_name : req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      name_prefix,
      date_of_birth: req.body.date_of_birth,
    });
    const data: any = await newUser.save()
    ResponseController.setSuccess(201, 'successful', {data})
    return ResponseController.send(res)
  } catch (error: any) {
    ResponseController.setError(400, "There was an error creating user");
    return ResponseController.send(res);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await User.find({}).sort({_id: -1})
    ResponseController.setSuccess(201, "successfully got users", {data});
    return ResponseController.send(res);
  } catch (err: any) {
    ResponseController.setError(400, "There was an error fetching this page");
    return ResponseController.send(res);
  }
};

export const deleteUser = async( req: Request, res: Response, next: NextFunction) => {
    try{
    const data = await User.findOne({username: req.params.username})
    if(!data) {
        ResponseController.setError(400, "User does not exist");
        return ResponseController.send(res);
    }
    await data.delete({})
    ResponseController.setSuccess(201, "You deleted the user successfully", {});
    return ResponseController.send(res);
    }catch(error:any) {
        ResponseController.setError(400, "User does not exist");
        return ResponseController.send(res);
    }
}
