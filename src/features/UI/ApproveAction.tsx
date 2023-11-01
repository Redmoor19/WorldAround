"use client";

import { useState, useEffect } from "react";
import Button from "./Button";

type ApproveActionProps = {
  children: React.ReactNode;
  onClick?: () => void;
  title: string;
  onClose?: () => void;
  type?: "danger" | "primary" | "secondary";
};

function ApproveAction({
  children,
  onClick,
  title,
  onClose,
  type = "danger",
}: ApproveActionProps) {
  const [counter, setCounter] = useState(3);

  const isDisabled = counter > 0;
  useEffect(() => {
    const interval = setInterval(() => {
      if (counter !== 0) {
        setCounter((prev) => prev - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  return (
    <>
      <h2 className="text-xl">{children}</h2>
      <div className="flex justify-end gap-3 py-3">
        <Button type="secondary" onClick={onClose!}>
          Cancel
        </Button>
        <Button
          className={isDisabled ? "cursor-not-allowed" : ""}
          disabled={isDisabled}
          onClick={onClick}
          type={type}
        >
          {isDisabled ? `...${counter}` : title}
        </Button>
      </div>
    </>
  );
}

export default ApproveAction;
