import axios, { AxiosError, Method } from "axios";
import { useState, ReactNode } from "react";

interface ApiError {
  message: string;
  field?: string;
}

interface UseRequestProps {
  method: Method;
  url: string;
  body?: any;
  onSuccess: (data:any)=> void
}

export default function useRequest({ method, url, body, onSuccess }: UseRequestProps) {
  const [errors, setErrors] = useState<ReactNode>(null);

  const doRequest = async <T = any>(): Promise<T | null> => {
    setErrors(null);
    try {
      const resp = await axios.request<T>({
        method, url,
        data: body,
      });

      if(onSuccess){
        onSuccess(resp.data)
      }
      return resp.data;
    } catch (err) {
      const axiosErr = err as AxiosError<{ errors: ApiError[] }>;

      if (axiosErr.response?.data?.errors) {
        setErrors(
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-2 rounded-md">
            {axiosErr.response.data.errors.map((e, i) => (
              <p key={i}>• {e.message}</p>
            ))}
          </div>
        );
      } else {
        setErrors(
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-2 rounded-md">
            <p>Something went wrong. Please try again.</p>
          </div>
        );
      }
      return null;
    }
  };

  return { doRequest, errors };
}
