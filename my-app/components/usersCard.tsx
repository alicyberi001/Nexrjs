"use client";

import { IUser } from "../types/users";
import { Link } from "react-router-dom";

export const UsersCard: React.FC<IUser> = ({
  firstName,
  lastName,
  username,
  id,
  image,
  role,
  userAgent,
}) => {
  return (
    <div className="w-[900px] min-w-[670px] mx-auto border-y border-y-gray-500 py-8 flex gap-32 pr-20">
      <img src={image} alt="avatar" />
      <div>
        <Link to={`/users/${id}`}>
          <h2 className="text-white font-semibold text-2xl">
            {firstName} {lastName}
          </h2>
        </Link>
        <div className="text-[#EC4899] flex gap-3 mb-5 text-xl">
          <span>{role}</span>
        </div>
        <p className="text-gray-500 ">{userAgent}</p>
      </div>
    </div>
  );
};
