-- CreateTable
CREATE TABLE "ContentDomain" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "WeaponSystem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Analyst" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contentDomainId" TEXT NOT NULL,
    "weaponSystemId" TEXT NOT NULL,
    "analystId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_contentDomainId_fkey" FOREIGN KEY ("contentDomainId") REFERENCES "ContentDomain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_weaponSystemId_fkey" FOREIGN KEY ("weaponSystemId") REFERENCES "WeaponSystem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_analystId_fkey" FOREIGN KEY ("analystId") REFERENCES "Analyst" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentDomain_name_key" ON "ContentDomain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WeaponSystem_name_key" ON "WeaponSystem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Analyst_name_key" ON "Analyst"("name");
