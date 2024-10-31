import React, { useEffect, useState } from 'react';
import { PagesList } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { useNavigate } from 'react-router-dom';
import Loader from '../UI/Loader/Loader.tsx';

interface Props {
  pages: PagesList;
}

const initialState = {
  title: '',
  content: ''
};

const PagesForm: React.FC<Props> = ({pages}) => {
  const [form, setForm] = useState({...initialState});
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect((): void => {
    if (selectedPage) {
      setForm((prevState) => ({
        ...prevState,
        ...pages[selectedPage]
      }));
    } else {
      setForm({...initialState});
    }
  }, [selectedPage, pages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedPage(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      setLoading(true);

      if (selectedPage) {
        if (form.title.trim().length === 0 || form.content.trim().length === 0) {
          alert('Please fill out all fields.');
          return;
        } else {
          await axiosApi.put(`/pages/${selectedPage}.json`, form);
          navigate(`/pages/${selectedPage}`);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center w-50">
      {loading ? <Loader/> :
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <h2 className="text-center mb-4">Edit Page</h2>
            <select className="form-select" onChange={handleSelectChange} value={selectedPage}>
              <option value="" disabled>Select a page</option>
              {Object.keys(pages).map((page: string) => (
                <option key={page} value={page}>
                  {pages[page].title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-dark">
            Save
          </button>
        </form>
      }
    </div>
  );
};

export default PagesForm;
