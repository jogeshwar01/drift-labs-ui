import { useContext, useEffect, useState, useMemo } from "react";
import { TradesContext } from "../../../state/TradesProvider";
import { OrderbookIcon } from "../../icons/OrderbookIcon";
import { ChevronIcon } from "../../icons/ChevronIcon";

export const OrderBook = () => {
  const { bids, asks, totalBidSize, totalAskSize } = useContext(TradesContext);

  const [spreadPercentage, setSpreadPercentage] = useState<number>(0);

  const calculateCumulativeWidth = (
    cumulativeSize: number,
    totalSize: number
  ): string => {
    return totalSize ? `${(cumulativeSize * 100) / totalSize}%` : "0%";
  };

  // Calculate the highest bid and lowest ask, and then calculate the spread
  const { highestBid, lowestAsk } = useMemo(() => {
    const highestBid = bids && bids[0] ? parseFloat(bids[0][0]) : 0;
    const lowestAsk = asks && asks[0] ? parseFloat(asks[0][0]) : 0;
    return { highestBid, lowestAsk };
  }, [bids, asks]);

  // Update spread whenever highestBid or lowestAsk changes
  useEffect(() => {
    if (highestBid && lowestAsk) {
      const newSpread = lowestAsk - highestBid;
      setSpreadPercentage(
        newSpread && highestBid ? (newSpread / highestBid) * 100 : 0
      );
    } else {
      setSpreadPercentage(0);
    }
  }, [highestBid, lowestAsk]);

  // Display logic - centered around the spread
  const ordersToShow = 10; // Show 10 orders on each side

  // Process asks and bids for display
  const processedAsks = asks?.slice(0, ordersToShow) || [];
  const processedBids = bids?.slice(0, ordersToShow) || [];

  // Cumulative calculation for bids and asks
  let cumulativeBidSize = 0;
  let cumulativeAskSize = 0;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between text-xs px-2 py-1 text-text-tertiary">
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-center">
          Price
        </span>
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-left">
          Size
        </span>
      </div>

      <div className="flex-grow flex flex-col relative">
        <div className="absolute inset-0 w-full h-full overflow-auto thin-scroll flex flex-col">
          {/* Asks (sell orders) */}
          <div data-puppet-tag="sell" className="flex flex-col-reverse w-full">
            {processedAsks.map((order, index) => {
              const size = parseFloat(order[1]);
              cumulativeAskSize += size;

              return (
                <div key={index} className="relative w-full mb-[1px]">
                  <div className="w-full h-6 flex relative box-border text-xs leading-7 justify-between font-display mr-0">
                    <div className="flex flex-row mx-2 justify-between w-full">
                      <div className="z-10 hover:brightness-125 hover:cursor-pointer text-xs leading-6 text-text-negative-red-button">
                        {parseFloat(order[0]).toFixed(4)}
                      </div>
                      <div className="z-10 text-xs leading-6 text-static-default hover:brightness-125 hover:cursor-pointer items-center inline-flex">
                        {parseFloat(order[1]).toFixed(2)}
                      </div>
                    </div>
                    <div className="absolute opacity-20 w-full h-full flex justify-start">
                      <div
                        className="bg-negative-red brightness-100 h-full"
                        style={{
                          width: calculateCumulativeWidth(
                            cumulativeAskSize,
                            totalAskSize
                          ),
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spread indicator */}
          <div className="w-full px-2 inline-flex justify-between items-center py-1 min-h-[26px] space-x-2 bg-container-bg-hover hover:cursor-pointer text-text-default">
            <div className="flex items-center space-x-2">
              <div className="outline-none focus:outline-none flex">
                <div className="flex flex-col">
                  <span className="font-[300] text-[13px] leading-[16px] text-text-emphasis">
                    {lowestAsk.toFixed(4)}
                  </span>
                </div>
              </div>
              <div className="outline-none focus:outline-none flex">
                <div className="flex flex-col">
                  <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-text-label">
                    {highestBid.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Bids (buy orders) */}
          <div data-puppet-tag="buy" className="flex flex-col w-full">
            {processedBids.map((order, index) => {
              const size = parseFloat(order[1]);
              cumulativeBidSize += size;

              return (
                <div key={index} className="relative w-full mb-[1px]">
                  <div className="w-full h-6 flex relative box-border text-xs leading-7 justify-between font-display ml-0">
                    <div className="flex flex-row mx-2 justify-between w-full">
                      <div className="z-10 hover:brightness-125 hover:cursor-pointer text-xs leading-6 text-text-positive-green-button">
                        {parseFloat(order[0]).toFixed(4)}
                      </div>
                      <div className="z-10 text-xs leading-6 text-static-default hover:brightness-125 hover:cursor-pointer items-center inline-flex">
                        {parseFloat(order[1]).toFixed(2)}
                      </div>
                    </div>
                    <div className="absolute opacity-20 w-full h-full flex justify-start">
                      <div
                        className="bg-positive-green brightness-100 h-full"
                        style={{
                          width: calculateCumulativeWidth(
                            cumulativeBidSize,
                            totalBidSize
                          ),
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer with controls */}
      <div className="flex items-center justify-between px-3 py-2 text-text-secondary">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center cursor-pointer">
            <span
              role="img"
              aria-hidden="true"
              style={{
                color: "currentcolor",
                width: "24px",
                height: "24px",
                display: "inline-flex",
                fontSize: "inherit",
              }}
            >
              <OrderbookIcon />
            </span>
          </span>
        </div>
        <div className="outline-none focus:outline-none flex ml-3 text-xs font-display">
          <div>Spread: {spreadPercentage.toFixed(2)}%</div>
        </div>
        <div className="inline-flex items-center mr-1 text-xs font-display text-darkBlue-30">
          <div
            className="rounded px-1 relative"
            aria-expanded="false"
            aria-haspopup="dialog"
          >
            <button className="disabled:cursor-not-allowed disabled:bg-button-disabled disabled:hover:bg-button-disabled disabled:text-text-disabled font-display justify-center transition-all text-sm py-[4px] px-[8px] bg-button-secondary-bg hover:bg-button-secondary-bg-hover flex items-center gap-1 text-text-secondary rounded-sm space-x-0 border-none h-auto">
              <span className="font-[300] text-[13px] leading-[16px]">
                $0.0001
              </span>
              <span
                role="img"
                aria-hidden="true"
                className="rotate-180 h-5 w-5 transition-all"
                style={{
                  color: "currentcolor",
                  width: "16px",
                  height: "16px",
                  display: "inline-flex",
                  fontSize: "inherit",
                }}
              >
                <ChevronIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
