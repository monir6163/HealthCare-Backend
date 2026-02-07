-- CreateIndex
CREATE INDEX "idx_patient_email" ON "patient"("email");

-- CreateIndex
CREATE INDEX "idx_patient_contact_number" ON "patient"("contactNumber");

-- CreateIndex
CREATE INDEX "idx_patient_is_deleted" ON "patient"("isDeleted");
