export interface User {
  jwt: string;
  userId: string;
  userRole: "ADMIN" | "USER" | "SUPERADMIN";
}
