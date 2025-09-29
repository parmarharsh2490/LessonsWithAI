export interface IResponseData<T> {
  data: T;
  dataList: T[];
  responseCode: number;
  responseMessage: string;
  currentPage?: number;
  totalPages?: number;
  totalRecords?: number;
}
