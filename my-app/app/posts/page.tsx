import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PostCard } from "../../components/postCard";
import { fetchPostsList } from "../../api/posts";
import { fetchUsersListByIds, fetchSingleUserById } from "../../api/users.api";
import { IUser } from "../../types/users";
import { IPost } from "../../types/posts.type";
import { Link, useSearchParams } from "react-router-dom";
import { listsLimit } from "../../utils/config";

interface IData {
  user: IUser;
  post: IPost;
}

export const Posts: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [data, setData] = React.useState<IData[]>([]);
  const [dataLoading, setDataLoading] = React.useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const posts = useQuery({
    queryKey: ["fetching-posts", page, searchParams.get("tag")],
    queryFn: () =>
      fetchPostsList({
        skip: page * listsLimit - listsLimit,
        tag: searchParams.get("tag"),
      }),
    refetchOnWindowFocus: false,
  });

  const users = useQuery({
    queryKey: [
      "fetching-usesr-by-ids",
      (posts.data?.posts || []).map((el) => String(el.userId)).join(""),
    ],
    queryFn: () =>
      fetchUsersListByIds(
        (posts.data?.posts || []).map((el) => Number(el.userId))
      ),
    enabled: posts.isSuccess,
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    setPage(1);
    setData([]);
  }, [searchParams]);

  React.useEffect(() => {
    if (!posts.error || !posts.isError) return;
    throw new Error("Something went wrong");
    // passing error message to error boundary
  }, [posts.error, posts.isError]);

  React.useEffect(() => {
    if (!posts.isSuccess || !users.isSuccess) return;
    if (!posts.data || !users.data) return;
    setDataLoading(() => true);
    const newData: IData[] = [];
    for (const post of posts.data.posts) {
      const user = users.data.find(
        (el) => Number(el.id) === Number(post.userId)
      ) as IUser;
      newData.push({ user, post });
    }
    setDataLoading(false);
    setData((prevState) => [...prevState, ...newData]);
  }, [posts.isSuccess, users.isSuccess, posts.data, users.data]);

  return (
    <div className="w-full min-h-screen bg-[#030712] px-[200px] pt-8 flex flex-col items-start gap-y-10">
      <div className="">
        <h1 className="text-white font-semibold text-[70px]">Posts</h1>
        <p className="text-gray-500 font-normal text-[20px] ">
          All users posts in our greathest community
        </p>
      </div>
      <div className="flex flex-col gap-5 gap-x-4 mx-auto">
        {data.map((el, index) => (
          <Link key={index} to={`/post-info/${el.post.id}`}>
            <PostCard user={el.user} post={el.post} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          disabled={Number(posts.data?.total || -1) < data.length}
          className="border border-white text-white font-bold text-sm px-2 py-1 rounded-md"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
};
