import { NavLink } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { isCurrentPage } from "../utils/helpers";
import IconHomeFilled from "./icons/IconHomeFilled";
import IconListNumbers from "./icons/IconListNumbers";
import IconReportAnalytics from "./icons/IconReportAnalytics";

type NavbarParams = {
  isAdmin: boolean;
};

function NavbarClient({ isAdmin }: NavbarParams) {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(isAdmin);

  const [dashboardActive, usersActive, analyticsActive] = [
    isCurrentPage(location.pathname, "/app"),
    isCurrentPage(location.pathname, "/app/users"),
    isCurrentPage(location.pathname, "/app/analytics"),
  ];

  function navlinkClickHandler(to: string) {
    navigate(to);
  }

  return (
    <>
      <NavLink
        active={dashboardActive}
        onClick={() => navlinkClickHandler("/app")}
        label="Home"
        leftSection={<IconHomeFilled size="1rem" />}
        color={dashboardActive && !isAdmin ? "green" : "blue"}
      />
      <NavLink
        active={usersActive}
        onClick={() => navlinkClickHandler("/app/users")}
        label="Routines"
        leftSection={<IconListNumbers size="1rem" stroke={1.5} />}
        color={usersActive && !isAdmin ? "green" : "blue"}
      />
      <NavLink
        active={analyticsActive}
        onClick={() => navlinkClickHandler("/app/analytics")}
        label="Analysis"
        leftSection={<IconReportAnalytics size="1rem" stroke={1.5} />}
        color={analyticsActive && !isAdmin ? "green" : "blue"}
      />
    </>
  );
}

export default NavbarClient;
