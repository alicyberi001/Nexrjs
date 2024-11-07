"use client";

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchPostComments } from "../api/comments.api";
import { FaRegUserCircle } from "react-icons/fa";

export const PostComments: React.FC = () => {
  const { id } = useParams();

  const comments = useQuery({
    queryKey: ["post-comments", id],
    queryFn: () =>
      fetchPostComments({
        postId: Number(id),
      }),
  });

  console.log(comments);

  return (
    <section
      className="text-white bg-gray-800/50 w-[650px] my-4
       px-4 py-3 rounded-md border border-gray-500 flex flex-col justify-between mx-auto"
    >
      {(comments.data?.comments || []).map((el, index) => (
        <div key={index}>
          <div className="flex items-center gap-2 mt-2">
            <FaRegUserCircle className="w-5 h-5"/>
            <span className="font-semibold ">{el.user.username}</span>
          </div>

          <p key={el.id} className="text-sm font-medium text-gray-600 mt-2">
            {el.body}
          </p>
        </div>
      ))}
    </section>
  );
};
