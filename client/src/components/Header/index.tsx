import React from "react";

type Props = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};

const Header = ({ name, buttonComponent }: Props) => {
  return (
    <div className="mb-5 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};

export default Header;
