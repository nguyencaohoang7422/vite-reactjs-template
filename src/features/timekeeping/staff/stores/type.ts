export type State = {
  list: Staff[];
  isLoading: boolean;
  error: string | null;
  limit: number;
  page: number;
  total: number;
};

export type PaginationPayload = {
  limit: number;
  page: number;
  searchText: string;
};
export type Staff = {
  id: string;
  _id: string;
  index: number;
  imageURL: string;
  name: string;
  email: string;
  timekeepingShiftId: string;
  timekeepingShiftIds: string[];
  note: string;
  status: number;
};
