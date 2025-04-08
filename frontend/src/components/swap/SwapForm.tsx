import React, { useState, useMemo } from "react";
import "./swapStyles.css";
import OrderDirectionButton from "./components/OrderDirectionButton";
import OrderTypeTab from "./components/OrderTypeTab";
import InputWithCurrency from "./components/InputWithCurrency";
import SlippageButton from "./components/SlippageButton";
import Toggle from "./components/Toggle";
import InfoRow from "./components/InfoRow";
import { InfoIcon } from "../icons/InfoIcon";
import { ChevronIcon } from "../icons/ChevronIcon";
import { DynamicLightningIcon } from "../icons/DynamicLightningIcon";

const SwapForm: React.FC<{ market: string }> = ({ market }) => {
  // State for form values
  const [orderDirection, setOrderDirection] = useState<"long" | "short">(
    "long"
  );
  const [orderType, setOrderType] = useState<"market" | "limit" | "pro">(
    "market"
  );
  const [sizeValue, setSizeValue] = useState("");
  const [dollarValue, setDollarValue] = useState("");
  const [selectedSlippage, setSelectedSlippage] = useState<string>("dynamic");
  const [swiftEnabled, setSwiftEnabled] = useState(false);

  // Currency icons - in a real app these would come from an API or config
  const baseCurrencyIcon = `https://drift-public.s3.eu-central-1.amazonaws.com/assets/icons/markets/${
    market?.split("-")?.[0]?.toLowerCase() || "sol"
  }.svg`;
  const quoteCurrencyIcon =
    "https://drift-public.s3.eu-central-1.amazonaws.com/assets/icons/markets/usdc.svg";

  // Slippage options
  const slippageOptions = [
    { value: "0.1%", type: "percent" },
    { value: "0.5%", type: "percent" },
    { value: "1%", type: "percent" },
    { value: "lightning", type: "lightning" },
    { value: "infinity", type: "infinity" },
  ];

  const orderInfo = useMemo(() => {
    return [
      { label: "Dynamic Slippage", value: "-", withInfo: true },
      { label: "Position", value: `0 ${market?.split("-")?.[0] || ""}` },
      { label: "Fees", value: "0" },
    ];
  }, [market]);

  // Button text based on order direction (long/short)
  const buttonText =
    orderDirection === "long" ? "Deposit & Long" : "Deposit & Short";

  return (
    <form className="relative flex-1">
      <div className="h-full w-full">
        <div className="relative overflow-hidden h-full">
          <div className="h-full w-full overflow-y-auto">
            <div
              id="trade_form"
              className="p-3 relative flex flex-col h-full overflow-auto thin-scroll justify-start"
            >
              <div
                className="flex flex-col h-full justify-start"
                id="trade-form-container"
              >
                <div className="flex flex-col relative z-10">
                  {/* Order Direction Buttons */}
                  <div
                    id="order-direction-input"
                    className="h-[40px] w-full inline-flex"
                  >
                    <OrderDirectionButton
                      type="long"
                      isActive={orderDirection === "long"}
                      onClick={() => setOrderDirection("long")}
                    />
                    <OrderDirectionButton
                      type="short"
                      isActive={orderDirection === "short"}
                      onClick={() => setOrderDirection("short")}
                    />
                  </div>

                  <span className="flex-shrink-0 w-full my-1"></span>

                  {/* Order Type Tabs */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col justify-start">
                      <div className="relative">
                        <div className="flex whitespace-nowrap">
                          <OrderTypeTab
                            type="market"
                            isActive={orderType === "market"}
                            onClick={() => setOrderType("market")}
                          />
                          <OrderTypeTab
                            type="limit"
                            isActive={orderType === "limit"}
                            onClick={() => setOrderType("limit")}
                          />
                          <div className="relative">
                            <OrderTypeTab
                              type="pro"
                              isActive={false}
                              onClick={() => setOrderType("pro")}
                            />
                          </div>
                        </div>
                        <div
                          className="w-full absolute inset-x-0 bottom-0 h-[1px] z-0"
                          style={{
                            background:
                              "linear-gradient(to left, rgba(0,0,0,0), var(--container-border))",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end">
                      <div className="outline-none focus:outline-none flex">
                        <InfoIcon
                          color="var(--text-label)"
                          className="mb-[5px] ml-0.5"
                        />
                      </div>
                    </div>
                  </div>

                  <span className="flex-shrink-0 w-full my-1"></span>

                  {/* Market Price Display */}
                  <div className="flex items-end justify-between space-x-2 mt-2 text-sm">
                    <div className="flex justify-between space-x-2 w-full">
                      <div className="flex flex-col" style={{ flexGrow: 2 }}>
                        <div className="text-text-tertiary font-normal pointer-events-none select-none">
                          <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]"></span>
                        </div>
                        <div className="pointer-events-none bg-input-bg rounded-sm w-full px-2 flex items-center text-text-default h-[32px] select-none">
                          Market Price
                        </div>
                      </div>
                    </div>
                  </div>

                  <span className="flex-shrink-0 w-full my-1"></span>

                  {/* Size Inputs */}
                  <div className="flex items-end justify-between space-x-2">
                    <InputWithCurrency
                      label="Size"
                      value={sizeValue}
                      onChange={setSizeValue}
                      currencyLogo={baseCurrencyIcon}
                      currencySymbol={market?.split("-")?.[0] || "SOL"}
                      className="w-1/2"
                    />
                    <InputWithCurrency
                      value={dollarValue}
                      onChange={setDollarValue}
                      disabled={true}
                      currencyLogo={quoteCurrencyIcon}
                      currencySymbol="USDC"
                      className="w-1/2"
                    />
                  </div>

                  <span className="flex-shrink-0 w-full my-1"></span>

                  {/* Slippage Tolerance */}
                  <div className="block">
                    <div>
                      <div className="text-text-tertiary font-normal mb-0">
                        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] mb-0">
                          <button className="hover:cursor-pointer hover:opacity-70 flex items-center space-x-1">
                            <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
                              Slippage Tolerance (Dynamic)
                            </span>
                            <ChevronIcon
                              className="rotate-180 transition-all"
                              width="16px"
                              height="16px"
                              color="var(--text-label)"
                            />
                          </button>
                        </span>
                      </div>
                      <div className="shrink-0" style={{ height: "auto" }}>
                        <div className="flex justify-between space-x-2">
                          <div className="flex flex-grow space-x-0.5">
                            {slippageOptions.map((option, index) => (
                              <div
                                key={index}
                                className={`flex-grow px-1 py-2 text-xs font-numeral ${
                                  option.type === "lightning" ||
                                  option.type === "infinity"
                                    ? "text-xl"
                                    : ""
                                }`}
                                style={{
                                  width: 0,
                                  lineHeight:
                                    option.type === "lightning" ||
                                    option.type === "infinity"
                                      ? "10px"
                                      : "inherit",
                                }}
                              >
                                <SlippageButton
                                  value={option.value}
                                  isSelected={
                                    option.type === "lightning"
                                      ? selectedSlippage === "dynamic"
                                      : selectedSlippage === option.value
                                  }
                                  onClick={() =>
                                    setSelectedSlippage(
                                      option.type === "lightning"
                                        ? "dynamic"
                                        : option.value
                                    )
                                  }
                                  isLightning={option.type === "lightning"}
                                  isInfinity={option.type === "infinity"}
                                />
                              </div>
                            ))}
                          </div>
                          <span className="w-1/3 mt-2">
                            <InputWithCurrency
                              value={
                                selectedSlippage === "dynamic"
                                  ? "dynamic"
                                  : selectedSlippage
                              }
                              disabled={true}
                              placeholder="Dynamic"
                              currencySymbol=""
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <span className="flex-shrink-0 w-full pb-m"></span>

                  {/* SWIFT Toggle */}
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-1 p-2 hover:cursor-pointer px-0">
                      <div
                        className="outline-none focus:outline-none flex text-xs"
                        aria-expanded="false"
                      >
                        <div className="text-text-tertiary font-normal pointer-events-none select-none items-center">
                          <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] items-center">
                            <div className="flex items-center text-text-label">
                              <span
                                role="img"
                                aria-hidden="true"
                                style={{
                                  display: "inline-flex",
                                  fontSize: "inherit",
                                }}
                              >
                                <DynamicLightningIcon />
                              </span>
                              <span className="text-xs font-semibold">
                                SWIFT
                              </span>
                            </div>
                          </span>
                        </div>
                      </div>
                      <Toggle
                        enabled={swiftEnabled}
                        onChange={() => setSwiftEnabled(!swiftEnabled)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <hr className="my-4 border-container-border" />

                  {/* Trade Details */}
                  <div className="flex flex-col w-full space-y-2 rounded-md advanced-trade-details">
                    {orderInfo.map((item, index) => (
                      <React.Fragment key={index}>
                        {index === 0 ? (
                          <div className="outline-none focus:outline-none flex max-h-[17px]">
                            <InfoRow
                              label={
                                <>
                                  {item.label}
                                  {item.withInfo && (
                                    <InfoIcon
                                      className="relative left-1 "
                                      width="14px"
                                      height="14px"
                                    />
                                  )}
                                </>
                              }
                              value={
                                <div className="text-text-default">
                                  <div className="skeleton-container-dark-theme h-[14px] w-[50px]"></div>
                                </div>
                              }
                            />
                          </div>
                        ) : (
                          <InfoRow label={item.label} value={item.value} />
                        )}

                        {index === 0 && (
                          <>
                            <span className="flex-shrink-0 w-full pb-xxs"></span>
                            <span className="w-full border-b border-container-border"></span>
                            <span className="flex-shrink-0 w-full pb-xs"></span>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <span className="flex-shrink-0 w-full pb-s"></span>
                  <span className="flex-shrink-0 w-full pb-s"></span>
                  <span className="flex-shrink-0 w-full pb-m"></span>

                  {/* Submit Button */}
                  <button
                    className="w-full mt-4 disabled:cursor-not-allowed disabled:bg-button-disabled disabled:text-text-disabled border disabled:border-container-border border-transparent whitespace-nowrap text-text-primary-button rounded-md font-display items-center justify-center py-3 text-lg tracking-normal select-none"
                    disabled={true}
                  >
                    <span className="font-[400] text-[16px] leading-[-0.25px] flex items-center justify-center whitespace-normal">
                      {buttonText}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SwapForm;
