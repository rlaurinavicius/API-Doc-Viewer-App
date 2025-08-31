-- CreateTable
CREATE TABLE "ApiEndpoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "apiDocumentId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ApiEndpoint_apiDocumentId_fkey" FOREIGN KEY ("apiDocumentId") REFERENCES "ApiDocument" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiEndpoint_path_method_apiDocumentId_key" ON "ApiEndpoint"("path", "method", "apiDocumentId");
