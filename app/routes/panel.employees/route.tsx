import { LoaderFunction } from "react-router";
import EmployeesSearchPage from "./EmployeesSearchPage";
import { searchParamsLoader } from "server/services/loaders";
import Employee from "server/db/models/Employee";
import { Op } from "sequelize";

export const loader: LoaderFunction = async (req) => {
  const { data, pagination, query } = await searchParamsLoader<Employee>(req, async (query, pagiOptions) => {
    const { name, email, role } = query;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(query);
    return Employee.findAndCountAll({
      where: {
        ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
        ...(email ? { email: { [Op.like]: `%${email}%` } } : {}), 
        ...(role ? { roles: { [Op.like]: `%${role}%` } } : {}),
      },
      ...pagiOptions,
    });
  });
  return { data, pagination, query };
}

export default EmployeesSearchPage;
