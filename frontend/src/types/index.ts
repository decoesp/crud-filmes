
export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FormProps<T> extends DialogProps {
  onSubmit: (data: T) => void | Promise<void>;
  initialData?: Partial<T>;
  isLoading?: boolean;
}
