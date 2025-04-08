import { useContext } from "react";
import { TradesContext } from "../../state/TradesProvider";
import MarketStatItem from "./MarketStatItem";
import PythOracleIcon from "../icons/PythOracleIcon";

function MarketStats() {
  const { ticker } = useContext(TradesContext);
  const isPositiveChange = parseFloat(ticker?.priceChangePercent || "0") >= 0;

  return (
    <div className="relative  flex items-center justify-center w-full border-y sm:border border-container-border bg-container-bg h-full hidden-scroll sm:thin-scroll rounded-rl-sm overflow-x-auto">
      <div className="flex items-stretch w-full justify-between sm:justify-start font-display sm:divide-x divide-container-border whitespace-nowrap">
        {/* Mark Price */}
        <div className="flex flex-row items-center justify-between px-4 py-2 space-x-3 xl:space-x-4 xl:px-6 sm:py-0">
          <div className="outline-none focus:outline-none flex">
            <div className="flex flex-col">
              <div
                className={`block h-2 w-2 rounded-full ${
                  isPositiveChange ? "bg-positive-green" : "bg-negative-red"
                } mr-1`}
              ></div>
            </div>
          </div>
          <div className="outline-none focus:outline-none flex mr-0 sm:mr-0">
            <div className="flex flex-col">
              <div className="overflow-hidden text-lg font-semibold text-text-default font-numeral">
                <span>{ticker?.markPrice}</span>
              </div>
            </div>
          </div>
          <div className="outline-none focus:outline-none flex mr-20 ml-4 sm:mr-0">
            <div className="flex flex-col left-10">
              <div className="block overflow-hidden">
                <span className="font-[300] text-[13px] leading-[16px]">
                  <div>
                    <span
                      className={
                        isPositiveChange
                          ? "text-positive-green flex items-center"
                          : "text-negative-red flex items-center"
                      }
                    >
                      {isPositiveChange ? "+" : ""}
                      {ticker?.priceChangePercent}%
                    </span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Oracle Price */}
        <MarketStatItem label="Oracle Price">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div>
                <span className="font-[300] text-[13px] leading-[16px] text-text-default">
                  <span>{ticker?.indexPrice}</span>
                </span>
              </div>
              <div className="w-6 h-3">
                <PythOracleIcon />
              </div>
            </div>
          </div>
        </MarketStatItem>

        {/* Open Interest */}
        <MarketStatItem label="Open Interest">
          <div className="flex items-center justify-start space-x-1 text-text-default shrink-0">
            <span className="font-[300] text-[13px] leading-[16px] inline-flex overflow-hidden font-numeral text-text-default">
              <span>849K {ticker?.symbol?.split("-")[0]}</span>
            </span>
          </div>
        </MarketStatItem>

        {/* 24h Volume */}
        <MarketStatItem label="24h Volume">
          <div className="flex flex-col text-text-default-2">
            <div className="flex space-x-2">
              <div className="flex w-full space-x-1">
                <span className="font-[300] text-[13px] leading-[16px] overflow-hidden text-text-default">
                  $90.3M
                </span>
              </div>
            </div>
          </div>
        </MarketStatItem>

        {/* About Market */}
        <MarketStatItem label="About Market">
          <button className="flex flex-row items-center cursor-pointer">
            <div className="select-none flex flex-col items-start leading-2">
              <div className="flex text-interactive-link">
                <span className="font-[300] text-[13px] leading-[16px]">
                  View Details
                </span>
              </div>
            </div>
          </button>
        </MarketStatItem>
      </div>
    </div>
  );
}

export default MarketStats;
