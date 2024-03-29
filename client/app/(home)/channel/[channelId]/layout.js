import SpaceAuthProvider from "@/providers/SpaceProvider";

export const metadata = {
  title: "DataSync | Channel",
  description: "Generated by create next app",
};

export default function ChannelIdLayout({ children }) {
  return <SpaceAuthProvider>{children}</SpaceAuthProvider>;
}
