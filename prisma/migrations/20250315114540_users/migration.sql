BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Note] (
    [id] INT NOT NULL IDENTITY(1,1),
    [note] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [Note_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [pin] INT NOT NULL,
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [User_role_df] DEFAULT 'USER',
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TaskUser] (
    [taskId] INT NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [TaskUser_pkey] PRIMARY KEY CLUSTERED ([taskId],[userId])
);

-- CreateTable
CREATE TABLE [dbo].[HintUser] (
    [hintId] INT NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [HintUser_pkey] PRIMARY KEY CLUSTERED ([hintId],[userId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Note] ADD CONSTRAINT [Note_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TaskUser] ADD CONSTRAINT [TaskUser_taskId_fkey] FOREIGN KEY ([taskId]) REFERENCES [dbo].[Task]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TaskUser] ADD CONSTRAINT [TaskUser_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[HintUser] ADD CONSTRAINT [HintUser_hintId_fkey] FOREIGN KEY ([hintId]) REFERENCES [dbo].[Hint]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[HintUser] ADD CONSTRAINT [HintUser_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
