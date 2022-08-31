CREATE PROCEDURE createUser (@userName VARCHAR(200), @firstName VARCHAR(200),@lastName VARCHAR(200),@email VARCHAR(200),@password VARCHAR(200))
AS
BEGIN
	IF EXISTS (SELECT * FROM USERS WHERE email=@email)
		BEGIN 
			RAISERROR ('Email Taken, try a different email',11,1);
		END
	IF EXISTS(SELECT * FROM USERS WHERE userName = @userName)
		BEGIN 
			RAISERROR ('User name Taken, try a different one',11,1);
		END
		
		ELSE

	BEGIN
		INSERT INTO USERS (userName, firstName,lastName,email,password) 
		VALUES(@userName, @firstName,@lastName, @email, @password)
	END
END