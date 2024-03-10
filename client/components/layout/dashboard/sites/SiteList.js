import { List } from "@material-tailwind/react";
import SiteItems from "./SiteItems";

const SiteList = ({ sites }) => {
  return (
    <List>
      {sites.map((site) => (
        <SiteItems key={site._id} site={site} />
      ))}
    </List>
  );
};

export default SiteList;
