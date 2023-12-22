import Image from "next/image";
import Link from "next/link";

const Logo = ({ classes, imgClasses }) => {
  return (
    <Link href="/" className={classes} aria-label="logo">
      <Image
        width={233}
        height={83}
        objectFit="contain"
        className={imgClasses}
        src={"/logo.png"}
        alt="Tour logo"
      />
    </Link>
  );
};

export default Logo;
