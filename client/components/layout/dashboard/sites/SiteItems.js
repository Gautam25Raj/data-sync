import { ListItem } from "@material-tailwind/react";
import SiteMenuBtn from "./SiteMenuButton";
import { useDispatch } from "react-redux";
import { setCurrentSite } from "@/redux/slice/siteSlice";

const SiteItems = ({ site }) => {
  const dispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(setCurrentSite(site));
  };

  return (
    <ListItem
      className="flex justify-between shadow relative"
      onClick={handleItemClick}
    >
      <p>{site.name}</p>

      <SiteMenuBtn siteId={site._id} />
    </ListItem>
  );
};

export default SiteItems;
