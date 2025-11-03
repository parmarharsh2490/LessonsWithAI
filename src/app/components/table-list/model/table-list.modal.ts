export interface IHeader<T> {
  label: string;
  key: keyof T;
  type?: string;
  hyperlink?: boolean;
}
