export interface IResponseData<T> {
  data: T;
  dataList: T;
  statusCode: number;
  errorMessage?: string;
  successMessage?: string;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
}
