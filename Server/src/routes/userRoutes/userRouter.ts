import { Router } from "express";
import { allUsers, createNewUser, inactiveUser, loginUser } from "../../controller/userController";


const UserRouter = Router();

UserRouter.post('/create', createNewUser);
UserRouter.get('/idle', inactiveUser);
UserRouter.get('/all', allUsers);
UserRouter.post('/login', loginUser);

export default UserRouter