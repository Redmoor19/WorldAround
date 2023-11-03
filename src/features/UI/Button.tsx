type ButtonProps = {
  type?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

function Button({
  children,
  type = "primary",
  onClick,
  className,
  disabled,
}: ButtonProps) {
  let typeStyle;
  switch (type) {
    case "primary":
      typeStyle = "bg-blue-500 text-white shadow-blue-600 ring-1 ring-blue-500";
      break;
    case "secondary":
      typeStyle =
        "bg-slate-100 ring-1 ring-gray-400 text-gray-600 font-semibold";
      break;
    case "danger":
      typeStyle =
        "bg-red-600 text-white font-semibold hover:ring-2 hover:ring-red-600 hover:bg-white hover:text-red-600";
  }
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${typeStyle} ${className} py-2 px-4 rounded-xl hover:scale-105 hover:shadow-xl duration-100 transition-all ${
        disabled && "cursor-not-allowed"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
