"use client";

import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostCard } from "@/components/postCard";
import { fetchPostByUser } from "@/api/posts";
import { fetchSingleUserById } from "@/api/users.api";
import { UserCard } from "@/components/userCard";
import { useRouter } from "next/router";
import Link from "next/link";


export const UserById: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const validId = !isNaN(Number(id));
  const user = useQuery({
    queryKey: ["fetching-user-by-id"],
    queryFn: () => fetchSingleUserById(Number(id)),
  });

  const userPosts = useQuery({
    queryKey: ["fetching-user-by-user"],
    queryFn: () => fetchPostByUser(Number(id)),
  });

  if (!validId || (user.error as AxiosError)?.status === 404) {
    return <Link href="/404" />;
  }

  if (!user.isSuccess) {
    return (
      <section className="mx-auto max-w-[500px] w-full py-10">
        {/* <PostCardSkeleton /> */}
      </section>
    );
  }

  const test = userPosts.data?.posts.find((el) => {return Number(el.userId) === Number(id)})
  

  return (
    <div className="w-full min-h-screen bg-[#030712] pt-8">
      <UserCard  user={user.data}  />
      {userPosts.data?.posts.map((el, index) => (
        <div className="my-3">
        <PostCard key={index} user={user.data} post={el}/>
        </div>
      ))}
      {!router.pathname.includes("comments") && (
        <div className="w-full flex justify-center pt-5">
          {/* <Link to={`/post-info/${post.data.id}/comments`}>
            <button className=" text-white font-bold text-sm px-2 py-1 rounded-md">
              Show Comments
            </button>
          </Link> */}
        </div>
      )}
    </div>
  );
};

// export const fetchPostByIdLoader = async (data: LoaderFunctionArgs) => {
//   let post: IPost | undefined = undefined;
//   try {
//     post = await fetchPostById(Number(data.params.id));
//   } catch (error) {
//     console.log("error", error);
//   }
//   return { post };
// };
