import { ReactElement } from "react";
import { IconType } from "react-icons";

type IconButtonProps = {
  icon: ReactElement<IconType>;
  onClick?: () => void;
  className?: string;
};

function IconButton({ icon, onClick, className }: IconButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {icon}
    </button>
  );
}

export default IconButton;
