import clsx from "clsx";
import { Link } from "../../UIComponents/Link/Link";
import { Menu, Transition } from "@headlessui/react";
import { useUserStore } from "../../Utils/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";


export default function UserMenu() {

  const userStore = useUserStore();

  if(userStore?.user?.me == null){
    return null
  }
  
    return (
      <div className="fixed top-3 text-right z-10">
      <Menu as="div" className="relative inline-block text-left z-10">
        <div>
        <Menu.Button
          className={clsx("inline-flex w-full justify-center px-4 py-2",
          "text-sm rounded-full font-medium bg-gray-300 shadow-sm",
          "bg-opacity-10 text-black hover:bg-gray-300 hover:bg-opacity-30",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
          "focus-visible:ring-opacity-75")}
        >
          {userStore.user.me.userName}
        </Menu.Button>
        <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        >
         <Menu.Items className={clsx("absolute p-3 flex flex-col right-0 mt-2 w-56",
         "origin-top-right d rounded-md bg-white",
         "shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50")}>
          <Menu.Item disabled>
            <span className={clsx("opacity-75 text-center capitalize font-bold",
            "truncate text-lg p-2 py-5 text-gray-700")}>
                {`${userStore.user.me.firstName} ${userStore.user.me.lastName}`}
            </span>
          </Menu.Item>

          {
            userStore.user?.me?.id && <Menu.Item>
              {({ active }) => (
                <Link
                  className={clsx(active &&"bg-gray-50","py-2 rounded-md p-2")}
                  to={`/Users/User/${userStore.user?.me?.id}`}
                >
                  <div className="flex justify-start w-full items-center space-x-3">
                  <div className={clsx("rounded-full bg-gray-50 items-center",
                  "justify-center p-2 w-8 h-8 leading-none")}>
                    <FontAwesomeIcon
                        className="text-gray-700 text-base mx-auto my-auto"
                      icon={faUser}/>
                  </div>
                    <span className="font-semibold">
                      Profile
                    </span>
                  </div>
                </Link>
              )}
            </Menu.Item>
          }

          <Menu.Item>
            {({ active }) => (
              
              <Link
                className={clsx(active &&"bg-gray-50","py-2 rounded-md p-2")}
                to="/Logout"
              >
                <div className="flex justify-start w-full items-center space-x-3">
                <div className={clsx("rounded-full bg-gray-50 items-center",
                "justify-center p-2 w-8 h-8 leading-none")}>
                  <FontAwesomeIcon
                      className="text-gray-700 text-base mx-auto my-auto"
                    icon={faRightFromBracket}/>
                </div>
                  <span className="font-semibold">
                    Logout
                  </span>
                </div>
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
        </Transition>
        </div>
      </Menu>
      </div>
    )
  }