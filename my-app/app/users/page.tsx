import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersList } from "@/api/users.api";
import { listsLimit } from "@/utils/config";
import { UsersCard } from "@/components/usersCard";
import { IUser } from "@/types/users";


// interface IData {
//   user?: IUser;
// }

export const Users: React.FC = () => {
  const [data, setData] = React.useState<IUser[]>([]);
  const [page, setPage] = React.useState<number>(1);

  const [searchParams] = useSearchParams();

  const users = useQuery({
    queryKey: ["fetching-users", page, searchParams],
    queryFn: () => fetchUsersList({ skip: page * listsLimit - listsLimit }),
  });

  React.useEffect(() => {
    setPage(1);
    // setData([]);
  }, [searchParams]);

  React.useEffect(() => {
    if (!users.isSuccess) return;
    if (!users.data) return;
    // setDataLoading(() => true);
    const newData: IUser[] = [];
    for (const user of users.data.users) {
      newData.push(user);
    }
    // setDataLoading(false);
    setData((prevState) => [...prevState, ...newData]);
  }, [users.isSuccess, users.data]);


  return (
    <>
      <div className="w-full min-h-screen bg-[#030712] px-[200px] pt-8 flex flex-col items-start gap-8">
        <div>
          <h1 className="text-white font-semibold text-[70px]">Users</h1>
          <p className="text-gray-500 font-normal text-[20px]">
            All nice users in our greathest community
          </p>
        </div>
        <div>
          {data.map((el) => (
            <UsersCard key={el.id} {...el} />
          ))}
        </div>
        <button
          // disabled={Number(posts.data?.total || -1) < data.length}
          className="border border-white text-white font-bold text-sm px-2 py-1 rounded-md"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Load More
        </button>
      </div>
    </>
  );
};
