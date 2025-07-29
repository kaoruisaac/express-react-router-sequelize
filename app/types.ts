import JsonEmployee from "~/JsonModels/JsonEmployee";
import JsonUser from "~/JsonModels/JsonUser";

export type ContextType = {
  employee?: JsonEmployee;
  user?: JsonUser;
}