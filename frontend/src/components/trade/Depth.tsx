import { useContext, useEffect, useState } from "react";
import { OrderBook } from "./depth/Orderbook";
import { RecentTrades } from "./depth/RecentTrades";
import { TradesContext } from "../../state/TradesProvider";
import { getTrades } from "../../services/api";
import { WsManager } from "../../utils/ws_manager";
import { Trade } from "../../utils/types";
import { DepthData } from "../../utils/ws_types";

export const Depth = ({ market }: { market: string }) => {
  const [activeTab, setActiveTab] = useState("orderbook"); // 'orderbook' or 'recentTrades'
  const { setTrades, setAsks, setBids, setTotalAskSize, setTotalBidSize } =
    useContext(TradesContext);

  useEffect(() => {
    getTrades(market).then((trades) => {
      trades = trades.filter((trade) => parseFloat(trade.qty) !== 0);
      trades = trades.slice(0, 50);
      setTrades(trades);
    });

    WsManager.getInstance().registerCallback<DepthData>(
      "depth",
      (data: DepthData) => {
        setBids(data.bids);
        setAsks(data.asks);
        setTotalBidSize(
          data.bids.reduce(
            (acc: number, bid: [string, string]) => acc + parseFloat(bid[1]),
            0
          )
        );

        setTotalAskSize(
          data.asks.reduce(
            (acc: number, ask: [string, string]) => acc + parseFloat(ask[1]),
            0
          )
        );
      },
      `${market}@depth`
    );

    WsManager.getInstance().registerCallback<Trade>(
      "trades",
      (data: Trade) => {
        const newTrade: Trade = {
          id: data.id,
          price: data.price,
          qty: data.qty,
          quoteQty: data.quoteQty,
          time: data.time,
        };

        setTrades((oldTrades) => {
          const newTrades = [...oldTrades];
          newTrades.unshift(newTrade);
          newTrades.pop();
          return newTrades;
        });
      },
      `${market}@trades`
    );

    WsManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`${market}@depth`],
    });

    WsManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`${market}@trades`],
    });

    return () => {
      WsManager.getInstance().deRegisterCallback("depth", `${market}@depth`);
      WsManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`${market}@depth`],
      });

      WsManager.getInstance().deRegisterCallback("trades", `${market}@trades`);
      WsManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`${market}@trades`],
      });
    };
  }, [market, setAsks, setBids, setTotalAskSize, setTotalBidSize, setTrades]);

  return (
    <div className="h-full min-h-[450px] w-full bg-container-bg border-container-border rounded border overflow-hidden flex">
      <div className="flex flex-col w-full">
        {/* Tabs Section */}
        <div className="relative">
          <div className="flex">
            <div
              onClick={() => setActiveTab("orderbook")}
              className={`py-2 px-3 flex items-center relative hover:cursor-pointer ${
                activeTab === "orderbook"
                  ? "text-text-emphasis bg-container-bg-selected"
                  : "text-text-label"
              } justify-center leading-[14px] flex-1 hover:bg-container-bg-hover`}
            >
              <span className="flex items-center justify-center text-md">
                Orderbook
              </span>
              {activeTab === "orderbook" && (
                <div className="absolute left-0 bottom-0 w-full z-10 h-[1px] bg-[image:var(--color-primary-gradient)]"></div>
              )}
            </div>

            <div
              onClick={() => setActiveTab("recentTrades")}
              className={`py-1 px-2 flex items-center relative hover:cursor-pointer ${
                activeTab === "recentTrades"
                  ? "text-text-emphasis bg-container-bg-selected"
                  : "text-text-label"
              } justify-center leading-[14px] flex-1 hover:bg-container-bg-hover`}
            >
              <span className="flex items-center justify-center text-md">
                Recent Trades
              </span>
              {activeTab === "recentTrades" && (
                <div className="absolute left-0 bottom-0 w-full z-10 h-[1px] bg-[image:var(--color-primary-gradient)]"></div>
              )}
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

        {/* Custom style for WebKit-based browsers to hide scrollbar */}
        <style>{`
          div::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }
        `}</style>

        {/* Tab Content */}
        <div className="flex-grow">
          {activeTab === "orderbook" ? <OrderBook /> : <RecentTrades />}
        </div>
      </div>
    </div>
  );
};
