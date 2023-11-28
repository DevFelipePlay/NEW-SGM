import { ToastOptions, toast } from 'react-toastify';

export function errorToast(
  error: {
    [key: string]: any;
    response: { data: string };
  },
  options?: ToastOptions
) {
  toast.error(error.response?.data || 'Ocorreu um erro :/', {
    ...options,
    autoClose: options?.autoClose || false,
  });
}
