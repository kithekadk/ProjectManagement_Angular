import { Router } from "express";
import { allUsers, checkAssigned, checkUserRole, createNewUser, inactiveUser, loginUser } from "../../controller/userController";
import { verifyToken } from "../../middleware/verifyToken";


const UserRouter = Router();

UserRouter.post('/create', createNewUser);
UserRouter.get('/idle', inactiveUser);
UserRouter.get('/all', allUsers);
UserRouter.post('/login', loginUser);
UserRouter.get('/check', verifyToken, checkUserRole);
UserRouter.get('/assigned', checkAssigned);

export default UserRouter