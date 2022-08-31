import { Router } from "express";
import { allProjects, createProject } from "../controller/projectController";

const router = Router()

router.post('/create', createProject)
router.get('/allprojects', allProjects)

export default router