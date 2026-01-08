BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [imageId] INT;

-- CreateTable
CREATE TABLE [dbo].[Image] (
    [id] INT NOT NULL IDENTITY(1,1),
    [image] VARBINARY(max),
    CONSTRAINT [Image_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_imageId_fkey] FOREIGN KEY ([imageId]) REFERENCES [dbo].[Image]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
