import Link from "next/link";
import Image from "next/legacy/image";

const Logo = ({ width = 60, height = 60, textSize = "text-xl" }) => {
  return (
    <Link
      className="prevent-select flex w-fit items-center mb-4"
      href="/dashboard"
    >
      <Image
        src="/assets/datasync-logo.png"
        alt="Logo"
        width={width}
        height={height}
        className="m-2"
      />

      <span className={`font-bold text-black ${textSize}`}>DataSync</span>
    </Link>
  );
};

export default Logo;
