-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "viewToken" TEXT NOT NULL,
    "editTokenHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduleUpdatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oddWeekAnchor" DATETIME
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "groupId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "teacher" TEXT,
    "location" TEXT,
    "link" TEXT,
    "weekType" TEXT NOT NULL DEFAULT 'ALL',
    "subgroup" TEXT NOT NULL DEFAULT 'ALL',
    "note" TEXT,
    CONSTRAINT "Lesson_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_viewToken_key" ON "Group"("viewToken");

-- CreateIndex
CREATE INDEX "Lesson_groupId_idx" ON "Lesson"("groupId");
