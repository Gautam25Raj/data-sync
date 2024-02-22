import { List } from "@material-tailwind/react";

import SideNavList from "./SideNavList";

const SideNav = () => {
  return (
    <List className="overflow-y-auto hide-scroll">
      <SideNavList />
    </List>
  );
};

export default SideNav;
