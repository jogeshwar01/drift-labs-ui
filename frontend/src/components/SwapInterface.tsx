import SwapForm from "./swap/SwapForm";

const SwapInterface: React.FC<{ market: string }> = ({ market }) => {
  return (
    <div className="h-full max-h-[846px] bg-container-bg border-container-border rounded border overflow-hidden">
      <SwapForm market={market} />
    </div>
  );
};

export default SwapInterface;
