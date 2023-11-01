"use client";

import { LegacyRef } from "react";
import { StopType } from "../../../models/Journey";

type StopsContainerProps = {
  data: StopType[];
  render: (data: StopType[]) => React.ReactNode;
  reference: LegacyRef<HTMLUListElement>;
};

function StopsContainer({ data, render, reference }: StopsContainerProps) {
  return (
    <ul
      ref={reference}
      className={`w-[48rem] mx-auto ${data.length ? "my-5" : null}`}
    >
      {render(data)}
    </ul>
  );
}

export default StopsContainer;
