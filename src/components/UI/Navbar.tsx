import { NavLink } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { isCurrentPage } from "../../utils/helpers";
import IconHome2 from "../icons/IconHome2";
import IconUsers from "../icons/IconUsers";
import IconChartHistogram from "../icons/IconChartHistogram";

type NavbarParams = {
  isAdmin: boolean;
};

function Navbar({ isAdmin }: NavbarParams) {
  const navigate = useNavigate();
  const location = useLocation();

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
        label="Dashboard"
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
        color={dashboardActive && !isAdmin ? "green" : "blue"}
      />
      <NavLink
        active={usersActive}
        onClick={() => navlinkClickHandler("/app/users")}
        label="Users"
        leftSection={<IconUsers size="1rem" stroke={1.5} />}
        color={usersActive && !isAdmin ? "green" : "blue"}
      />
      <NavLink
        active={analyticsActive}
        onClick={() => navlinkClickHandler("/app/analytics")}
        label="Analytics"
        leftSection={<IconChartHistogram size="1rem" stroke={1.5} />}
        color={analyticsActive && !isAdmin ? "green" : "blue"}
      />
    </>
  );
}

export default Navbar;
