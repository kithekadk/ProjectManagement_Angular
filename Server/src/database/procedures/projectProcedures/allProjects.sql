CREATE PROCEDURE allProjects 
AS
BEGIN
	SELECT projectId,projectName,description,deadline FROM dbo.PROJECTS 
END