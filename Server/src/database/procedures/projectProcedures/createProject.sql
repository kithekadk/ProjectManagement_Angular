CREATE PROCEDURE createProject (@projectName VARCHAR(200), 
@description VARCHAR(200), @deadline VARCHAR(200) , @userName VARCHAR(200))
AS
BEGIN

	IF EXISTS ( SELECT * FROM dbo.PROJECTS WHERE projectName=@projectName)
		BEGIN
				RAISERROR('Project name taken, try a new name', 11, 1);
				RETURN;
		END
	ELSE 
		BEGIN
				INSERT INTO dbo.PROJECTS (projectName, description, deadline, userName)
				VALUES (@projectName, @description, @deadline, @userName)
		END
END