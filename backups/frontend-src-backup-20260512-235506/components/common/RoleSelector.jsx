import React from "react";
import { ACCOUNT_TYPE } from "../../utils/constants";

export default function RoleSelector({ selectedRole, setSelectedRole }) {
  const roles = [
    {
      id: 1,
      type: ACCOUNT_TYPE.STUDENT,
      name: "Student"
    },
    {
      id: 2,
      type: ACCOUNT_TYPE.INSTRUCTOR,
      name: "Instructor"
    }
  ];

  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max mx-auto"
    >
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => setSelectedRole(role.type)}
          className={`${
            selectedRole === role.type
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
        >
          {role.name}
        </button>
      ))}
    </div>
  );
}
