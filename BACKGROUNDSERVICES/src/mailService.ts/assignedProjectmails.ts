import ejs from 'ejs'
import mssql from 'mssql'
import { sqlConfig } from '../config/config'
import sendMail from '../helpers/emailhelper';
import dotenv from 'dotenv'
dotenv.config()

interface Task {
    projectId : number;
    projectName: string,
    description: string,
    deadline:string,
    userName:string
    email:string
    sentEmail:number,
    firstName:string
}

const AssignProjectMails = async()=>{
    const pool = await mssql.connect(sqlConfig)
    const projects:Task[]=await(await pool.request()
    .query(`SELECT email FROM dbo.USERS u INNER JOIN dbo.PROJECTS p ON p.userName= u.userName WHERE p.userName IS NOT NULL AND  p.status='Pending' AND p.assigned ='NULL'`)).recordset
    
    console.log(projects);

    for (let project of projects){
        ejs.renderFile('template/templateAssigned.ejs',{name:project.firstName, project:project.projectName}, async(error,data)=>{
            let mailOptions = {
                from: process.env.EMAIL as string,
                to: project.email, 
                subject: "Task Assigned",
                html:data,
                attachment:[
                    {
                    filename: 'task.txt',
                    content: `its an easy project, deadline in 2 weeks from the today`
                }
            ]
            }
    try {
        await sendMail (mailOptions);
        await pool.request().query(`UPDATE dbo.PROJECTS SET assigned='YES' WHERE userName IS NOT NULL`);
        console.log("email sent to user");
    } catch (error) {
        console.log(error)
    }
        })
        
        
    }
    
}
   
    
export default AssignProjectMails