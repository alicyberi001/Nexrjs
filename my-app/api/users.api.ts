import { urls } from "./urls";
import { generateClient } from "./client";
import { IUser } from "../types/users";
import { listsLimit } from "../utils/config";
import { IResDto, IPagination } from "../types/global.type";

// interface IFetchUsersListByIdsResDto extends IResDto {
//   users: IUser[];
// }
type fetchUsersListByIds = (_: Array<number>) => Promise<Array<IUser>>;
export const fetchUsersListByIds: fetchUsersListByIds = async (ids) => {
  const client = generateClient();
  const responses = await Promise.all(
    ids.map((id) => {
      return client.get<IUser>(urls.Users.byId(id));
    })
  );

  const data: IUser[] = [];
  for (const r of responses) {
    data.push(r.data);
  }
  return data;
};

type fetchSingleUserById = (_: number) => Promise<IUser>;
export const fetchSingleUserById: fetchSingleUserById = async (id) => {
  const client = generateClient();
  const response = await client.get<IUser>(urls.Users.byId(id));
  return response.data;
};

interface IFetchUsersResDto extends IResDto {
  users: IUser[];
}
type fetchUsersListType = (_: IPagination) => Promise<IFetchUsersResDto>;
export const fetchUsersList: fetchUsersListType = async (params) => {
  const client = generateClient();
  const response = await client.get<IFetchUsersResDto>(urls.Users.list, {
    params: { limit: params?.limit || listsLimit, skip: params?.skip || 0 },
  });
  return response.data;
};


