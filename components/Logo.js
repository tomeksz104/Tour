import Link from "next/link";

const Logo = ({ classes, imgClasses }) => {
  return (
    <Link href="/" className={classes} aria-label="logo">
      <img
        src={"/assets/images/tour-logo5.png"}
        className={imgClasses}
        alt="Tour logo"
      />
    </Link>
  );
};

export default Logo;
