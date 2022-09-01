CREATE PROCEDURE setComplete (@projectName VARCHAR(200))
AS 
BEGIN
	IF EXISTS (SELECT * FROM dbo.PROJECTS WHERE projectName= @projectName AND status='Pending')

	BEGIN
		UPDATE PROJECTS SET status = 'Complete' WHERE projectName= @projectName;
	END
	ELSE

	BEGIN
		RAISERROR('No pending project with that Project Name',11,1);
	END
END