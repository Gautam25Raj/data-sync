import { Button } from "@material-tailwind/react";

import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { clearCurrentSite } from "@/redux/slice/siteSlice";
import ProjectView from "./ProjectView";

const TableauContainer = () => {
  const dispatch = useDispatch();

  const projects = [
    {
      id: "1d93d312-e024-4956-a8e7-67b2d7052a9b",
      name: "default",
      workbooks: [],
    },
    {
      id: "a18083ce-0e4f-4d3d-ae47-9c8b43f1577c",
      name: "Samples",
      workbooks: [
        {
          id: "cc29f485-60e7-48d2-a528-0c4e6bbf3adf",
          name: "Superstore",
          views: [
            {
              id: "ce478edf-4af0-4f65-b2f2-08b8744b2d80",
              name: "Overview",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/Superstore/Overview",
              path: "Samples/Superstore/Overview",
              workbookId: "cc29f485-60e7-48d2-a528-0c4e6bbf3adf",
            },
            {
              id: "5c6fe1c1-1fa0-4587-885c-87bb92b41fdc",
              name: "Product",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/Superstore/Product",
              path: "Samples/Superstore/Product",
              workbookId: "cc29f485-60e7-48d2-a528-0c4e6bbf3adf",
            },
            {
              id: "94aebac8-8260-404c-8991-38a9b5a2a978",
              name: "Customers",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/Superstore/Customers",
              path: "Samples/Superstore/Customers",
              workbookId: "cc29f485-60e7-48d2-a528-0c4e6bbf3adf",
            },
            {
              id: "6264e28c-058b-44ce-996b-1c2f3035f2ec",
              name: "Shipping",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/Superstore/Shipping",
              path: "Samples/Superstore/Shipping",
              workbookId: "cc29f485-60e7-48d2-a528-0c4e6bbf3adf",
            },
            {
              id: "fda09609-36cb-49e4-903a-bb3b8e540210",
              name: "Performance",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/Superstore/Performance",
              path: "Samples/Superstore/Performance",
              workbookId: "cc29f485-60e7-48d2-a528-0c4e6bbf3adf",
            },
            {
              id: "d208b2bb-408d-4cdf-a6b6-418160487b91",
              name: "Commission Model",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/Superstore/CommissionModel",
              path: "Samples/Superstore/Commission Model",
              workbookId: "cc29f485-60e7-48d2-a528-0c4e6bbf3adf",
            },
            {
              id: "5b537a13-fe26-460b-b8ff-b682495943da",
              name: "Order Details",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/Superstore/OrderDetails",
              path: "Samples/Superstore/Order Details",
              workbookId: "cc29f485-60e7-48d2-a528-0c4e6bbf3adf",
            },
            {
              id: "c6f8a30c-fa85-4f0e-931f-71be52aad230",
              name: "Forecast",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/Superstore/Forecast",
              path: "Samples/Superstore/Forecast",
              workbookId: "cc29f485-60e7-48d2-a528-0c4e6bbf3adf",
            },
            {
              id: "03322a95-2ea8-41ec-a444-ee0daf2d5da5",
              name: "What If Forecast",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/Superstore/WhatIfForecast",
              path: "Samples/Superstore/What If Forecast",
              workbookId: "cc29f485-60e7-48d2-a528-0c4e6bbf3adf",
            },
          ],
        },
        {
          id: "cc2c3aa3-5642-470f-99c8-b43d0a7716eb",
          name: "World Indicators",
          views: [
            {
              id: "52a6898d-8ccb-4230-92e5-f06a4038dddc",
              name: "Population",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/WorldIndicators/Population",
              path: "Samples/World Indicators/Population",
              workbookId: "cc2c3aa3-5642-470f-99c8-b43d0a7716eb",
            },
            {
              id: "a932d990-c948-443e-ae17-8bdbc468661a",
              name: "Health Indicators",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/WorldIndicators/HealthIndicators",
              path: "Samples/World Indicators/Health Indicators",
              workbookId: "cc2c3aa3-5642-470f-99c8-b43d0a7716eb",
            },
            {
              id: "2459eb5c-1c54-4943-a10d-4eccc82e1939",
              name: "Care Spend",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/WorldIndicators/CareSpend",
              path: "Samples/World Indicators/Care Spend",
              workbookId: "cc2c3aa3-5642-470f-99c8-b43d0a7716eb",
            },
            {
              id: "9fa7b09e-8ec6-4e47-b30f-06b6f84f9167",
              name: "Technology",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/WorldIndicators/Technology",
              path: "Samples/World Indicators/Technology",
              workbookId: "cc2c3aa3-5642-470f-99c8-b43d0a7716eb",
            },
            {
              id: "9aa0a4e5-120a-4443-8096-7261ab5ee99c",
              name: "Economy",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/WorldIndicators/Economy",
              path: "Samples/World Indicators/Economy",
              workbookId: "cc2c3aa3-5642-470f-99c8-b43d0a7716eb",
            },
            {
              id: "8b8039fe-b91d-4f88-a0dc-a3fd1874dec9",
              name: "Tourism",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/WorldIndicators/Tourism",
              path: "Samples/World Indicators/Tourism",
              workbookId: "cc2c3aa3-5642-470f-99c8-b43d0a7716eb",
            },
            {
              id: "efdb5dfc-ce34-4c48-b692-863f0d6feba6",
              name: "Business",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/WorldIndicators/Business",
              path: "Samples/World Indicators/Business",
              workbookId: "cc2c3aa3-5642-470f-99c8-b43d0a7716eb",
            },
            {
              id: "22080b27-7a21-451a-a4b9-e92b3099afb2",
              name: "Global Indicators",
              embedUrl:
                "https://10ax.online.tableau.com/#/site/noober/views/WorldIndicators/GlobalIndicators",
              path: "Samples/World Indicators/Global Indicators",
              workbookId: "cc2c3aa3-5642-470f-99c8-b43d0a7716eb",
            },
          ],
        },
      ],
    },
  ];

  const handleBack = () => {
    dispatch(clearCurrentSite());
  };

  return (
    <Suspense
      fallback={<AiOutlineLoading3Quarters className="mx-auto animate-spin" />}
    >
      <div className="h-full w-full flex flex-col p-12">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl text-black font-bold">Project Explorer</h2>
          <Button color="gray" onClick={handleBack}>
            Back
          </Button>
        </div>
        <ProjectView projects={projects} />
      </div>
    </Suspense>
  );
};

export default TableauContainer;
