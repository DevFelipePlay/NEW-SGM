import { ToastOptions, toast } from 'react-toastify';
import { IResponseErrorDefault } from '../@types';

export function errorToast(
  error: {
    [key: string]: any;
    response: { data: IResponseErrorDefault };
  },
  options?: ToastOptions
) {
  toast.error(error.response?.data?.message || 'Ocorreu um erro :/', {
    ...options,
    autoClose: options?.autoClose || false,
  });
}
