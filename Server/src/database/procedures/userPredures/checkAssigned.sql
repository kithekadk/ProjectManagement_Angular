CREATE PROCEDURE checkAssigned
AS
BEGIN
	SELECT p.userName, projectId, projectName, description,deadline FROM dbo.PROJECTS p INNER JOIN dbo.USERS u ON u.userName = p.userName WHERE status= 'pending'
END