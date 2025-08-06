import useDataFlow, { AnyObject } from "./useDataFlow";
import useLoaderSearchFlow from "./useLoaderSearchFlow";

function useSearchComponent<F>({ form: initForm, onSearch } : { form: F, onSearch: (form: AnyObject<F>) => Promise<void> }) {
  const {
    form,
    changeForm,
  } = useDataFlow<F>({
    form: initForm,
  });

  const {
    data,
  } = useLoaderSearchFlow({
    onSearch: async () => {
      return await onSearch(form);
    }
  });

  return {
    form,
    data,
    changeForm,
  }
}

export default useSearchComponent;