CREATE TABLE PROJECTS
(projectId INT NOT NULL PRIMARY KEY IDENTITY (1,1), projectName VARCHAR(200) NOT NULL UNIQUE, 
description VARCHAR(200) NOT NULL, deadline VARCHAR(200) NOT NULL ,
userName VARCHAR(200), status VARCHAR(200) DEFAULT 'Pending', issent VARCHAR(200) DEFAULT 0)