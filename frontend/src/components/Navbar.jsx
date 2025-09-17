import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");


  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  Univo
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* TODO */}
          <ThemeSelector />

          <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar">
          <div className="w-9 rounded-full">
          <img src={authUser?.profilePic} alt="User Avatar" />
          </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box w-64 p-4 shadow-lg space-y-2"
          >
            <li className="flex flex-col gap-1">
              <span className="text-sm opacity-70">Name: {authUser?.fullName}</span>
              <span className="text-sm opacity-70">Bio: {authUser?.bio}</span>
              <span className="text-sm">Location: {authUser?.location}</span>
              <span className="text-sm">Native: {authUser?.nativeLanguage
                ? authUser.nativeLanguage.charAt(0).toUpperCase() + authUser.nativeLanguage.slice(1).toLowerCase()
                : ""}
              </span>
              <span className="text-sm">Learning: {authUser?.learningLanguage
                ? authUser.learningLanguage.charAt(0).toUpperCase() + authUser.learningLanguage.slice(1).toLowerCase()
                : ""}
              </span>
              <span className="text-sm">Email: {authUser?.email}</span>
            </li>
        </ul>
      </div>
          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
