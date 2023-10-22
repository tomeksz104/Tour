import Link from "next/link";

const Logo = ({ classes, imgClasses }) => {
  return (
    <Link href="/" className={classes} aria-label="logo">
      <img src={"/logo.png"} className={imgClasses} alt="Tour logo" />
    </Link>
  );
};

export default Logo;
