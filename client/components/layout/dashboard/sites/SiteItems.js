import { ListItem } from "@material-tailwind/react";

import { useDispatch } from "react-redux";

import { setCurrentSite } from "@/redux/slice/siteSlice";

import SiteMenuBtn from "./SiteMenuButton";

const SiteItems = ({ site }) => {
  const dispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(setCurrentSite(site));
  };

  return (
    <ListItem className="flex justify-between shadow relative p-0 bg-white">
      <p className="p-3 flex-1" onClick={handleItemClick}>
        {site.name}
      </p>

      <SiteMenuBtn site={site} />
    </ListItem>
  );
};

export default SiteItems;
