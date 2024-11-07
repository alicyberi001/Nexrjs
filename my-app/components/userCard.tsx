"use client";

import { IUser } from "../types/users";

interface IUserCardProps {
  user: IUser;
}

export const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  return (
    <>
      <section className="flex flex-col items-center px-16">
        <h1 className="text-white font-semibold text-[70px]">Personal Info</h1>
        <main>
          <div className="min-w-[670px] mx-auto border-t border-t-gray-500 py-8 flex gap-32 pr-20">
            <img src={user.image} alt="avatar" className="w-32 h-32" />
            <div>
              <h2 className="text-white font-semibold text-2xl mb-4">
                {user.firstName} {user.lastName}
              </h2>

              <span className="text-gray-500 flex gap-3 mb-5 text-xl">
                <span className="text-[#EC4899]">role:</span> {user.role}
              </span>

              <span className="text-gray-500 flex gap-3 mb-5 text-xl">
                <span className="text-[#EC4899]">email:</span> {user.email}
              </span>
              <span className="text-gray-500 flex gap-3 mb-5 text-xl">
                <span className="text-[#EC4899]">location:</span>{" "}
                {user.address.city}
              </span>
              <span className="text-gray-500 flex gap-3 mb-5 text-xl">
                <span className="text-[#EC4899]">birthday:</span>{" "}
                {user.birthDate}
              </span>
              <span className="text-gray-500 flex gap-3 mb-5 text-xl">
                <span className="text-[#EC4899]">gender:</span> {user.gender}
              </span>
              <span className="text-gray-500 flex gap-3 mb-5 text-xl">
                <span className="text-[#EC4899]">phone:</span> {user.phone}
              </span>
              <span className="text-gray-500 flex gap-3 mb-5 text-xl">
                <span className="text-[#EC4899]">userAgent:</span>{" "}
                {user.userAgent}
              </span>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
