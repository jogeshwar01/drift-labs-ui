import { useContext, useState } from "react";
import { TradesContext } from "../../state/TradesProvider";
import SelectTickerTable from "./SelectTickerTable";
import DropdownArrow from "../icons/DropdownArrow";

function MarketButton() {
  const { ticker } = useContext(TradesContext);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  return (
    <div className="h-full bg-container-bg border-container-border overflow-hidden border-0 rounded-none rounded-l-sm flex flex-col justify-center w-[308px] min-w-[308px]">
      <button
        className="z-40 change-market-inner h-full flex flex-fill flex-row w-full items-center justify-between bg-container-bg text-text-default border-container-border relative group hover:cursor-pointer hover:bg-container-bg-hover sm:p-2 border border-r-0"
        aria-expanded={isSelectOpen}
        aria-haspopup="dialog"
        id="marketSelector"
        onClick={toggleSelect}
      >
        <div className="flex flex-row items-center justify-between w-full asset-dropdown-header flex-fill xs:px-4 sm:px-2 sm:pr-0">
          <div className="flex items-center">
            <img
              className="w-[24px] h-[24px] mr-2 mb-0.5"
              width="24"
              height="24"
              alt={`${ticker?.symbol} icon`}
              src={`https://drift-public.s3.eu-central-1.amazonaws.com/assets/icons/markets/${ticker?.symbol
                ?.split("-")[0]
                ?.toLowerCase()}.svg`}
            />
            <span className="text-text-default text-[18px] font-normal whitespace-nowrap">
              {ticker?.symbol}
            </span>
            <span className="pl-1.5">
              <div className="flex flex-row items-center gap-1">
                <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] h-full flex items-center rounded-sm space-x-0.5 py-[3px] px-[4px] bg-chip-default-bg text-chip-default-text opacity-100">
                  20x
                </span>
                <div
                  className="outline-none focus:outline-none flex"
                  aria-expanded="false"
                >
                  <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] h-full flex items-center rounded-sm space-x-0.5 py-[3px] px-[4px] bg-button-secondary-bg text-text-label opacity-50 hover:opacity-100 hover:bg-interactive-secondary-bg cursor-pointer">
                    101x
                  </span>
                </div>
              </div>
            </span>
          </div>
          <span className="flex items-center space-x-2 text-xs text-text-label">
            <span
              role="img"
              aria-hidden="true"
              className={`${
                isSelectOpen ? "" : "rotate-180"
              } mx-1 transition-all`}
              style={{
                color: "var(--text-emphasis)",
                width: "20px",
                height: "20px",
                display: "inline-flex",
                fontSize: "inherit",
              }}
            >
              <DropdownArrow />
            </span>
          </span>
        </div>
      </button>

      {isSelectOpen && <SelectTickerTable setIsSelectOpen={setIsSelectOpen} />}
    </div>
  );
}

export default MarketButton;
