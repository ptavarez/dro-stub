import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errorNode, setErrorNode] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrorNode(null);
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (responseError) {
      setErrorNode(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {responseError.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { errorNode, doRequest };
};

export default useRequest;
