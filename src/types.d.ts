export interface IPage {
  title: string;
  content: string;
}

export interface IPageApi extends IPage {
  id: string;
}

export interface PagesList {
  [key: string]: IPage;
}