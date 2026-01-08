BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Task] (
    [id] INT NOT NULL IDENTITY(1,1),
    [task] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [comments] NVARCHAR(1000) NOT NULL,
    [difficulty] INT NOT NULL CONSTRAINT [Task_difficulty_df] DEFAULT 0,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Task_status_df] DEFAULT 'DRAFT',
    [completed] BIT NOT NULL CONSTRAINT [Task_completed_df] DEFAULT 0,
    [attempts] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Task_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Task_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Hint] (
    [id] INT NOT NULL IDENTITY(1,1),
    [hint] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Hint_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Hint_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Hint_Bullet] (
    [id] INT NOT NULL IDENTITY(1,1),
    [bullet] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Hint_Bullet_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [hintId] INT NOT NULL,
    CONSTRAINT [Hint_Bullet_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Hint_Bullet_hintId_fkey] ON [dbo].[Hint_Bullet]([hintId]);

-- AddForeignKey
ALTER TABLE [dbo].[Hint_Bullet] ADD CONSTRAINT [Hint_Bullet_hintId_fkey] FOREIGN KEY ([hintId]) REFERENCES [dbo].[Hint]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
