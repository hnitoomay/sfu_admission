import { classNames } from "../lib/helper";

interface HeaderParams {
  title: string;
  className?: string;
}

function Header(props: HeaderParams) {
  const { title, className } = props;

  return (
    <h1 className={classNames(
      className ? className : '',
      "text-gray-800 font-bold sm:text-sm md:text-base uppercase mb-[24px]"
    )}>
      {title}
    </h1>
  );
}

export default Header;
