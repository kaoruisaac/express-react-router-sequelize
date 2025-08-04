import { LoaderFunction } from "react-router";
import EmployeesSearchPage from "./EmployeesSearchPage";
import { searchParamsLoader } from "server/services/loaders";
import Employee from "server/db/models/Employee";

export const loader: LoaderFunction = async (req) => {
  const { data, pagination, query } = await searchParamsLoader<Employee>(req, (query, pagiOptions) => {
    return Employee.findAndCountAll({
      where: query,
      ...pagiOptions,
    });
  });
  return { data, pagination, query };
}

export default EmployeesSearchPage;
