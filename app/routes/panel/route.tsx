import { LoaderFunction, redirect } from "react-router";
import PanelLayout from "./PanelLayout";
import { ContextType } from "~/types";

export const loader: LoaderFunction<ContextType> = async ({ context }) => {
  const { employee } = context;
  if (!employee) {
    throw redirect("/panel/login");
  }
}

export default PanelLayout;
