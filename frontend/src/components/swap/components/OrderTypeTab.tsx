import React from "react";
import { ChevronIcon } from "../../icons/ChevronIcon";

interface OrderTypeTabProps {
  type: "market" | "limit" | "pro";
  isActive: boolean;
  onClick: () => void;
}

const OrderTypeTab: React.FC<OrderTypeTabProps> = ({
  type,
  isActive,
  onClick,
}) => {
  // Base classes for all tabs
  const baseClasses =
    "py-2 px-3 text-sm flex relative hover:cursor-pointer grow text-center text-[14px] leading-[16px] items-center justify-center hover:bg-container-bg-hover";

  let content;
  let additionalClasses = "";

  if (type === "market" || type === "limit") {
    additionalClasses = isActive ? "text-text-emphasis" : "text-text-label";
    content = (
      <>
        <span
          className={`flex items-center justify-center ${
            isActive && type === "market" ? "bg-clip-text text-transparent text-md bg-[image:var(--color-primary-gradient)]" : ""
          }`}
        >
          {type === "market" ? "Market" : "Limit"}
        </span>
        {isActive && (
          <div className="absolute left-0 bottom-0 h-0.5 w-full z-10 bg-[image:var(--color-primary-gradient)]"></div>
        )}
      </>
    );
  } else {
    // Pro orders tab with dropdown
    additionalClasses = "text-text-label";
    content = (
      <div className="flex items-center justify-between w-full">
        <div className="inline-flex items-center truncate overflow-ellipsis mt-[1px]">
          Pro Orders
        </div>
        <ChevronIcon
          className="rotate-180 w-3 h-3 ml-1 transition-all"
          color="var(--text-label)"
        />
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${additionalClasses}`} onClick={onClick}>
      {content}
    </div>
  );
};

export default OrderTypeTab;
