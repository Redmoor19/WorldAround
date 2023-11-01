"use client";

import { useState } from "react";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

type FallingListProps = {
  title: string;
  data: any[];
  render: (data: any[]) => React.ReactNode;
  classTitle?: string;
  classWrapper?: string;
};

function FallingList({
  title,
  data,
  render,
  classTitle,
  classWrapper,
}: FallingListProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((prev) => !prev);
  }

  return (
    <li className={classWrapper}>
      <div
        className={`${classTitle} cursor-pointer`}
        onClick={() => toggleOpen()}
      >
        {title}
        <div className="flex items-center justify-center">
          {isOpen ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
        </div>
      </div>
      {isOpen && (
        <ul className="flex flex-col gap-1 justify-start items-stretch mt-1">
          {render(data)}
        </ul>
      )}
    </li>
  );
}

export default FallingList;
