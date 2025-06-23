export const idProductList = [
  { idContent: "35278", module: "Sanpham" },
  { idContent: "35279", module: "Sanpham" },
  { idContent: "35280", module: "Sanpham" },
  { idContent: "35283", module: "Sanpham" },
  { idContent: "35285", module: "Sanpham" },
];
export const idNewsList = [
  { idContent: "35139", module: "tintuc" },
  { idContent: "35142", module: "tintuc" },
];
export type FilterMaster = {
  id: string;
  idquanly: number;
  danhmuc: string;
  idxuly: string;
  tieude: string;
  chonnhieu: boolean;
  chophep: boolean;
  url: string;
};

export interface FilterMasterDetail {
  ten: string;
  ma: string;
  thamso: Array<{
    tengoi: string;
    ma: string;
    url: string;
  }>;
}
