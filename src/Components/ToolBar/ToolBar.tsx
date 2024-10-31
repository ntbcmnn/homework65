import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IPageApi, PagesList } from '../../types';
import axiosApi from '../../axiosApi.ts';

const ToolBar = () => {
  const [pages, setPages] = useState<IPageApi[]>([]);

  const fetchData: () => Promise<void> = useCallback(async (): Promise<void> => {
    try {
      const response: { data: PagesList } = await axiosApi.get<PagesList>('/pages.json');
      if (response.data) {
        const pagesApi: IPageApi[] = Object.keys(response.data).map((pageKey: string) => {
          return {
            ...response.data[pageKey],
            id: pageKey,
          };
        });
        setPages(pagesApi);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect((): void => {
    void fetchData();
  }, [fetchData]);

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container py-3 d-flex gap-3">
          {pages.map((page) => (
            <NavLink
              key={page.id}
              to={`/pages/${page.id}`}
              className="nav-item nav-link text-light px-3"
            >
              {page.title}
            </NavLink>
          ))}
          <NavLink to="/pages/admin" className="nav-item nav-link text-light px-3">
            Admin
          </NavLink>
      </div>
    </nav>
  );
};

export default ToolBar;