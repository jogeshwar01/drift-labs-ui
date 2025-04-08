import { Depth } from "./trade/Depth";
import { OrdersMenu } from "./trade/OrdersMenu";
import { TradeView } from "./trade/TradeView";

function TradeInterface({ market }: { market: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-1">
        <div style={{ gridArea: "1 / 1 / 2 / 2" }} className="max-w-[682px]">
          <TradeView market={market as string} />
        </div>
        <div style={{ gridArea: "1 / 2 / 2 / 3" }}>
          <Depth market={market as string} />
        </div>
      </div>
      <div style={{ gridArea: "2 / 1 / 3 / 3" }}>
        <OrdersMenu />
      </div>
    </div>
  );
}

export default TradeInterface;
