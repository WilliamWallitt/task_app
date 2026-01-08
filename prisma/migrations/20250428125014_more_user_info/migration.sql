BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [codingStyle] NVARCHAR(1000) NOT NULL CONSTRAINT [User_codingStyle_df] DEFAULT 'functional',
[learningGoals] NVARCHAR(1000) NOT NULL CONSTRAINT [User_learningGoals_df] DEFAULT 'None',
[objective] NVARCHAR(1000) NOT NULL CONSTRAINT [User_objective_df] DEFAULT 'None',
[personalityType] NVARCHAR(1000) CONSTRAINT [User_personalityType_df] DEFAULT 'creative',
[preferredDifficulty] NVARCHAR(1000) NOT NULL CONSTRAINT [User_preferredDifficulty_df] DEFAULT 'comfort',
[preferredTopics] NVARCHAR(1000) NOT NULL CONSTRAINT [User_preferredTopics_df] DEFAULT 'None',
[prefersCodeQuality] BIT NOT NULL CONSTRAINT [User_prefersCodeQuality_df] DEFAULT 0,
[pythonVersion] NVARCHAR(1000) NOT NULL CONSTRAINT [User_pythonVersion_df] DEFAULT '3.8',
[riskTolerance] NVARCHAR(1000) CONSTRAINT [User_riskTolerance_df] DEFAULT 'low',
[strengths] NVARCHAR(1000) NOT NULL CONSTRAINT [User_strengths_df] DEFAULT 'None',
[taskTypePreference] NVARCHAR(1000) NOT NULL CONSTRAINT [User_taskTypePreference_df] DEFAULT 'puzzle',
[timePerTaskMinutes] INT,
[weaknesses] NVARCHAR(1000) NOT NULL CONSTRAINT [User_weaknesses_df] DEFAULT 'None';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
