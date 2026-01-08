BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UserDevice] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [device] NVARCHAR(1000) NOT NULL,
    [location] NVARCHAR(1000),
    [lastAccess] DATETIME2 NOT NULL CONSTRAINT [UserDevice_lastAccess_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [UserDevice_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserDevice_userId_device_key] UNIQUE NONCLUSTERED ([userId],[device])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserDevice] ADD CONSTRAINT [UserDevice_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
