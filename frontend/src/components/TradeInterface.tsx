import { Depth } from "./trade/Depth";
import { OrdersMenu } from "./trade/OrdersMenu";
import { TradeView } from "./trade/TradeView";

function TradeInterface({ market }: { market: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-3">
          <TradeView market={market as string} />
        </div>
        <div className="col-span-1">
          <Depth market={market as string} />
        </div>
      </div>
      <div>
        <OrdersMenu />
      </div>
    </div>
  );
}

export default TradeInterface;
