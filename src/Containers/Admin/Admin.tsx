import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi.ts';
import { PagesList } from '../../types';
import PagesForm from '../../Components/PagesForm/PagesForm.tsx';
import Loader from '../../Components/UI/Loader/Loader.tsx';

const Admin = () => {
  const [pages, setPages] = useState<PagesList>({});
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData: () => Promise<void> = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response: { data: PagesList } = await axiosApi.get<PagesList>('/pages.json');
      if (response.data) setPages(response.data);
    } catch (e) {
      setLoading(false);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect((): void => {
    void fetchData();
  }, [fetchData]);

  return (
    <div>
      {loading ? <Loader/> : <PagesForm pages={pages}/>}
    </div>
  );
};

export default Admin;
