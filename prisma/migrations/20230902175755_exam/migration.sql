/*
  Warnings:

  - You are about to drop the column `testAvailabilityStart` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `totalTime` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `examSubjectId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `examTopicId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `ExamSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExamTopic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `negativeMarks` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passPercentage` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testDuration` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExamSubject" DROP CONSTRAINT "ExamSubject_examId_fkey";

-- DropForeignKey
ALTER TABLE "ExamSubject" DROP CONSTRAINT "ExamSubject_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "ExamTopic" DROP CONSTRAINT "ExamTopic_examSubjectId_fkey";

-- DropForeignKey
ALTER TABLE "ExamTopic" DROP CONSTRAINT "ExamTopic_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_examSubjectId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "testAvailabilityStart",
DROP COLUMN "totalTime",
ADD COLUMN     "negativeMarks" INTEGER NOT NULL,
ADD COLUMN     "passPercentage" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "testDuration" INTEGER NOT NULL,
ADD COLUMN     "testEndDate" TEXT NOT NULL DEFAULT 'undefined',
ADD COLUMN     "testEndTime" TEXT NOT NULL DEFAULT 'undefined',
ADD COLUMN     "testStartDate" TEXT NOT NULL DEFAULT 'undefined',
ADD COLUMN     "testStartTime" TEXT NOT NULL DEFAULT 'undefined',
ALTER COLUMN "testAvailabilityEnd" SET DEFAULT 'undefined',
ALTER COLUMN "testAvailabilityEnd" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "examSubjectId",
DROP COLUMN "examTopicId",
ADD COLUMN     "examId" INTEGER;

-- DropTable
DROP TABLE "ExamSubject";

-- DropTable
DROP TABLE "ExamTopic";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
