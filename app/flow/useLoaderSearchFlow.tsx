import { useLoaderData, useNavigate } from "react-router";
import classNames from "classnames";
import queryString from "query-string";
import { HTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonProps, Card, CardBody, Pagination } from '@heroui/react';
import LoadingMask from "~/components/GridSystem/LoadingMask";

type DefaultQuery<T> = Partial<T>;

function useLoaderSearchFlow<T = any, Q = DefaultQuery<T>>({
  onSearch = () => { },
}: {
  onSearch?: () => Promise<Q> | Q | void
} = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    data, pagination, query,
  } = useLoaderData<{ data: T[], pagination: { page, perPage, total }, query: any }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const search = useCallback(async (page = 1) => {
    const newQuery = await onSearch();
    setIsLoading(true);
    navigate({ search: `?${queryString.stringify({ ...newQuery, page })}` });
  }, [navigate, onSearch]);
  
  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  const cRef = useRef({ search, t, navigate });
  cRef.current.search = search;
  cRef.current.t = t;
  cRef.current.navigate = navigate;

  const SearchPageNav = useCallback(() => (
    <Pagination
      isCompact
      size="sm"
      total={Math.ceil(pagination.total / pagination.perPage)}
      page={pagination.page}
      onChange={(page) => cRef.current.search(page)}
    />
  ), [pagination]);
  const SearchButton = useCallback(({ className, ...props } = {} as ButtonProps) =>
    <Button
      {...props}
      variant="bordered"
      className={classNames('SearchButton', className)}
      onPress={() => cRef.current.search()}
      isLoading={isLoading}
    >
      {props?.children || cRef.current.t('Search')}</Button>, [isLoading]);
  const CreateButton = useCallback(({ className, ...props } = {} as ButtonProps) =>
    <Button {...props} variant="flat" className={classNames('CreateButton', className)} onPress={() => cRef.current.navigate('./create')}>{props?.children || cRef.current.t('Create')}</Button>, []);
  const SearchQueryBlock = useCallback(({ className, children, ...props } = {} as HTMLAttributes<HTMLDivElement>) => (
    <div {...props} className={classNames('SearchQueryBlock', className)}>
      <Card className="shadow-sm search-card">
        <CardBody>
          {children}
          <div className="flex gap-2 mt-4">
            <SearchButton />
          </div>
        </CardBody>
      </Card>
    </div>
  ), [SearchButton]);
  const SearchResultBlock = useCallback(({ className, children, ...props } = {} as HTMLAttributes<HTMLDivElement>) =>
    <div
      {...props}
      className={classNames('SearchResultBlock', className)}
      style={{ opacity: isLoading ? 0.5 : 1 }}
    >
      <LoadingMask isLoading={isLoading}>
        <Card className="shadow-sm search-card">
          <CardBody>
            {children}
            <SearchPageNav />
          </CardBody>
        </Card>
      </LoadingMask>
    </div>, [isLoading, SearchPageNav]);

  return ({
    data,
    query: query as Q,
    pagination,
    SearchPageNav,
    SearchButton,
    CreateButton,
    SearchQueryBlock,
    SearchResultBlock,
  })
}

export default useLoaderSearchFlow;
