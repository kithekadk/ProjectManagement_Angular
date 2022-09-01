CREATE PROCEDURE deleteProject (@projectName VARCHAR(200))
AS
BEGIN
IF EXISTS (SELECT projectId FROM dbo.PROJECTS WHERE projectName=@projectName)
BEGIN
	DELETE FROM dbo.PROJECTS WHERE projectName=@projectName;
	RETURN;
END
BEGIN
	RAISERROR('No Task With That ID', 11,1);
END
END