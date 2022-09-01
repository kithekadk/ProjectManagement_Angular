import { Router } from "express";
import { allProjects, createProject, projectDelete, updateComplete } from "../controller/projectController";

const router = Router()

router.post('/create', createProject)
router.get('/allprojects', allProjects)
router.get('/delete/:projectname', projectDelete)
router.get('/complete/:projectname', updateComplete)

export default router