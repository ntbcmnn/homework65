import { IPage } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi.ts';
import { useParams } from 'react-router-dom';
import Loader from '../../Components/UI/Loader/Loader.tsx';

const Content = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams<{ pageName: string }>();
  const [page, setPage] = useState<IPage | null>(null);

  const fetchData: () => Promise<void> = useCallback(async (): Promise<void> => {
    if (params.pageName) {
      try {
        setLoading(true);
        const response: { data: IPage } = await axiosApi.get<IPage>(`/pages/${params.pageName}.json`);
        setPage(response.data);
      } catch (e) {
        setLoading(false);
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  }, [params.pageName]);

  useEffect((): void => {
    void fetchData();
  }, [fetchData]);

  return (
    <>
      {page ?
        <div className="container">
          {loading ? <Loader/> :
            <div className="text-center d-flex flex-column align-items-center">
              <h2 className="mb-4">{page.title}</h2>
              <p className="w-50">{page.content}</p>
            </div>
          }
        </div>
        : <h2 className="text-center">Select a page from the upper menu to see the info</h2>
      }
    </>
  );
};

export default Content;