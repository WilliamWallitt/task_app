BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [lastSignedIn] DATETIME2 NOT NULL CONSTRAINT [User_lastSignedIn_df] DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE [dbo].[Comment] (
    [id] INT NOT NULL IDENTITY(1,1),
    [text] NVARCHAR(4000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Comment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [userId] INT NOT NULL,
    [taskId] INT NOT NULL,
    CONSTRAINT [Comment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Comment_taskId_fkey] ON [dbo].[Comment]([taskId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Comment_userId_fkey] ON [dbo].[Comment]([userId]);

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_taskId_fkey] FOREIGN KEY ([taskId]) REFERENCES [dbo].[Task]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
