import { useContext, useEffect } from "react";
import { getTickers } from "../services/api";
import { TradesContext } from "../state/TradesProvider";
import MarketButton from "./market/MarketButton";
import MarketStats from "./market/MarketStats";
import { WsManager } from "../utils/ws_manager";
import { Ticker } from "../utils/types";

function MarketBar({ market }: { market: string }) {
  const { setTicker, setTickers } = useContext(TradesContext);

  useEffect(() => {
    getTickers().then((tickers) => {
      const marketTicker = tickers.find((ticker) => ticker.symbol === market);
      setTicker(marketTicker);

      setTickers(tickers);
    });

    WsManager.getInstance().registerCallback<Ticker[]>(
      "tickers",
      (data: Ticker[]) => {
        const marketTicker = data.find(
          (ticker: Ticker) => ticker.symbol === market
        );
        setTicker(marketTicker);
        setTickers(data);
      },
      `tickers`
    );

    WsManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`tickers`],
    });

    return () => {
      WsManager.getInstance().deRegisterCallback("tickers", `tickers`);
      WsManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`tickers`],
      });
    };
  }, [market, setTicker, setTickers]);

  return (
    <div style={{ gridArea: "1 / 1 / 2 / 3" }}>
      <div className="inline-flex items-center justify-center w-full h-[54px] bg-container-bg thin-scroll">
        <MarketButton />
        <MarketStats />
      </div>
    </div>
  );
}

export default MarketBar;
