export enum EMPLOYEE_ROLES {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
}
export const ROLES = [...Object.values(EMPLOYEE_ROLES)] as string[];