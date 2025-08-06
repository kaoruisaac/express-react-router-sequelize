import { useTranslation } from "react-i18next";
import { Styled } from "remix-component-css-loader";
import { 
  Input,
  Select,
  SelectItem
} from "@heroui/react";
import useLoaderSearchFlow from "~/flow/useLoaderSearchFlow";
import JsonEmployee from "~/JsonModels/JsonEmployee";
import useDataFlow from "~/flow/useDataFlow";
import EmployeesTable from "./components/EmployeesTable/EmployeesTable";

interface SearchParams {
  name: string;
  email: string;
  role: string;
}

// 角色選項
const roleOptions = [
  { label: "全部角色", value: "" },
  { label: "管理員", value: "admin" },
  { label: "員工", value: "employee" }
];

const EmployeesSearchPage = () => {
  const { t } = useTranslation();

  const {
    form: {
      name,
      email,
      role,
    },
    valid: {
      Vname,
      Vemail,
      Vrole
    },
    changeForm,
  } = useDataFlow({
    form: {
      name: "",
      email: "",
      role: ""
    },
  })
  
  const {
    data,
    CreateButton,
    SearchQueryBlock,
    SearchResultBlock,
  } = useLoaderSearchFlow<JsonEmployee, SearchParams>({
    onSearch: () => {
      return {
        name: name,
        email: email,
        role: role
      }
    }
  });

  return (
    <Styled>
      <div className="p-6 space-y-6 employees-search-page">
        {/* 頁面標題 */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("employees")}
          </h1>
          <CreateButton />
        </div>
        {/* 查詢條件區塊 */}
        <SearchQueryBlock>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="姓名"
              value={name}
              errorMessage={Vname}
              onChange={(e) => changeForm({ name: e.target.value })}
            />
            <Input
              label="電子郵件"
              value={email}
              errorMessage={Vemail}
              onChange={(e) => changeForm({ email: e.target.value })}
            />
            <Select
              label="角色"
              errorMessage={Vrole}
              selectedKeys={role ? [role] : []}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                changeForm({ role: selectedKey || "" });
              }}
            >
              {roleOptions.map((role) => (
                <SelectItem key={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </SearchQueryBlock>
        {/* 查詢結果清單 */}
        <SearchResultBlock>
          <EmployeesTable data={data} />
        </SearchResultBlock>
      </div>
    </Styled>
  );
}

export default EmployeesSearchPage;