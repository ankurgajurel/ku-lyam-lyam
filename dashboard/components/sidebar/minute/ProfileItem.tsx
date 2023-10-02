import { useRouter } from "next/navigation";

export default function ProfileItem() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-fit md:w-full gap-3 cursor-pointer items-center bg-[#BA4B32]/90 hover:bg-[#BA4B32] text-white px-5 py-3 rounded-xl">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div className="text flex-col hidden md:flex">
          <div className="email line-clamp-1 flex flex-wrap text-sm">
            Dhiraj Chapagain
          </div>
          <div className="text text-xs text-center">View Profile</div>
        </div>
      </div>
      <div
        className="flex gap-3 w-fit md:w-full px-5 border-[#BA4B32] border-[1px] text-[#BA4B32] hover:bg-[#BA4B32] transition-all duration-300 hover:text-white py-3 rounded-lg cursor-pointer items-center"
        onClick={handleLogout}
      >
        <div className="icon">
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12L13 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text flex-col hidden md:flex">
          <div className="email text-sm">Log Out</div>
        </div>
      </div>
    </div>
  );
}
