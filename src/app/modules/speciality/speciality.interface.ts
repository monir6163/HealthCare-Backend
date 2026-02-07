export interface Speciality {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
