"use client";

import { Navigate, useNavigate } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike, AiOutlineEye } from "react-icons/ai";
import { IPost } from "../types/posts.type";
import { IUser } from "../types/users";
import { Link } from "react-router-dom";

interface IPostCardProps {
  user: IUser;
  post: IPost;
  extendBody?: boolean;
}

export const PostCard: React.FC<IPostCardProps> = ({
  user,
  post,
  extendBody = false,
}) => {
  return (
    <section
      className={`bg-gray-800/50 w-[650px] ${
        extendBody ? "h-72" : "h-60"
      } px-4 py-3 rounded-md border border-gray-500 flex flex-col justify-between mx-auto`}
    >
      <div className="flex gap-3">
        <img
          className="w-12 h-12 rounded-full"
          src={user.image}
          alt={user.username}
        />
        <div className="text-white flex flex-col">
          <span className="text-lg font-semibold">{user.username}</span>
          <span className="text-sm text-gray-500">{user.email}</span>
        </div>
      </div>
      <h2 className="text-white font-semibold text-2xl">{post.title}</h2>
      <p
        className={`text-justify text-sm font-medium text-gray-600 ${
          extendBody ? "" : "line-clamp-1"
        }`}
      >
        {extendBody ? post.body : post.body.slice(0, 90)}
      </p>
      <div className="text-[#EC4899] flex gap-3  text-xl">
        <div className="flex flex-wrap pt-4 gap-2">
          {post.tags.map((tag, index) => {
            //   const colorHash = stringToColor(tag);
            return (
              <Link key={index} to={`/posts?tag=${tag}`}>
                <div
                  key={index}
                  //   style={{
                  //     backgroundColor: colorHash,
                  //     color: stringToTextColor(colorHash),
                  //   }}
                  className="border border-[#EC4899] px-2 py-1 rounded-xl hover:bg-[#EC4899] hover:text-[#030712] cursor-pointer text-xs font-medium"
                >
                  {tag}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex pt-4 gap-x-3">
        <div className="flex items-center gap-x-1 text-white">
          <AiOutlineLike className="w-5 h-5" />
          <span className="text-xs">{post.reactions.likes}</span>
        </div>
        <div className="flex items-center gap-x-1 text-white">
          <AiOutlineDislike className="w-5 h-5" />
          <span className="text-xs">{post.reactions.dislikes}</span>
        </div>
        <div className="flex items-center gap-x-1 text-white">
          <AiOutlineEye className="w-5 h-5" />
          <span className="text-xs">{post.views}</span>
        </div>
      </div>
    </section>
  );
};
