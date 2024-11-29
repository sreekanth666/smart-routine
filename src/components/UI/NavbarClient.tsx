import { NavLink } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { isCurrentPage } from "../../utils/helpers";
import IconHomeFilled from "./icons/IconHomeFilled";
import IconListNumbers from "./icons/IconListNumbers";
import IconWalk from "./icons/IconWalk";
import IconToolsKitchen2 from "./icons/IconToolsKitchen2";
import IconUsersGroup from "./icons/IconUsersGroup";

type NavbarClientParams = {
  isAdmin: boolean;
};

function NavbarClient({ isAdmin }: NavbarClientParams) {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(isAdmin);

  const [
    homeActive,
    routinesActive,
    activityActive,
    dietActive,
    communityActive,
  ] = [
    isCurrentPage(location.pathname, "/"),
    isCurrentPage(location.pathname, "/routines"),
    isCurrentPage(location.pathname, "/activity"),
    isCurrentPage(location.pathname, "/diet"),
    isCurrentPage(location.pathname, "/community"),
  ];

  function navlinkClickHandler(to: string) {
    navigate(to);
  }

  return (
    <>
      <NavLink
        active={homeActive}
        onClick={() => navlinkClickHandler("/")}
        label="Home"
        leftSection={<IconHomeFilled size="1rem" />}
        color={homeActive && !isAdmin ? "green" : "blue"}
      />
      <NavLink
        active={routinesActive}
        onClick={() => navlinkClickHandler("/routines")}
        label="Routines"
        leftSection={<IconListNumbers size="1rem" stroke={1.5} />}
        color={routinesActive && !isAdmin ? "green" : "blue"}
      />
      <NavLink
        active={activityActive}
        onClick={() => navlinkClickHandler("/activity")}
        label="Activity"
        leftSection={<IconWalk size="1rem" stroke={1.5} />}
        color={activityActive && !isAdmin ? "green" : "blue"}
      />
      <NavLink
        active={dietActive}
        onClick={() => navlinkClickHandler("/diet")}
        label="Diet"
        leftSection={<IconToolsKitchen2 size="1rem" stroke={1.5} />}
        color={dietActive && !isAdmin ? "green" : "blue"}
      />
      <NavLink
        active={communityActive}
        onClick={() => navlinkClickHandler("/community")}
        label="Community"
        leftSection={<IconUsersGroup size="1rem" stroke={1.5} />}
        color={communityActive && !isAdmin ? "green" : "blue"}
      />
    </>
  );
}

export default NavbarClient;
