import { NavLink } from "@mantine/core";
import { IconHome2, IconUsers, IconChartHistogram } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
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

  function isCurrentPage(pathName: string, conditionString: string): boolean {
    return pathName.endsWith(conditionString);
  }

  return (
    <>
      <NavLink
        active={dashboardActive}
        onClick={() => navlinkClickHandler("/app")}
        label="Dashboard"
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        active={usersActive}
        onClick={() => navlinkClickHandler("/app/users")}
        label="Users"
        leftSection={<IconUsers size="1rem" stroke={1.5} />}
      />
      <NavLink
        active={analyticsActive}
        onClick={() => navlinkClickHandler("/app/analytics")}
        label="Analytics"
        leftSection={<IconChartHistogram size="1rem" stroke={1.5} />}
      />
    </>
  );
}

export default Navbar;
