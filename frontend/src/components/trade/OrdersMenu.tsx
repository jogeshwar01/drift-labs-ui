export const OrdersMenu = () => {
  return (
    <div className="bg-container-bg border-border border rounded overflow-visible">
      <div
        className="relative flex flex-col h-full"
        id="tutorial_step_positions_table_highlight"
      >
        <div className="relative w-full">
          <div
            id="trade_page_table_tabs"
            className="relative flex items-center justify-between w-full overflow-auto border-b border-container-border thin-scroll"
          >
            <div className="flex border-b bg-container-bg border-container-border border-none whitespace-nowrap [&amp;>div]:py-2">
              <div className="py-2 px-4 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover border-r border-container-border leading-3 bg-container-bg-hover bg-clip-text text-transparent bg-[image:var(--color-primary-gradient)]">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto">
                    <div className="css-1venkuk">
                      <span className="font-normal">Positions</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-2 px-4 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label border-r border-container-border leading-3">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto">
                    <span className="font-normal">Orders</span>
                  </div>
                </div>
              </div>
              <div className="py-2 px-4 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label border-r border-container-border leading-3">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto">
                    <span className="font-normal">Trades</span>
                  </div>
                </div>
              </div>
              <div className="py-2 px-4 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label border-r border-container-border leading-3">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto">
                    <span className="font-normal">Balances</span>
                  </div>
                </div>
              </div>
              <div className="py-2 px-4 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label border-r border-container-border leading-3">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto">
                    <div className="flex flex-row items-center space-x-1">
                      <span>Account</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <span className="flex flex-row items-center text-text-label space-x-2 p-2 whitespace-nowrap">
                <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
                  Order &amp; Position Lines
                </span>
                <div className="flex items-center">
                  <span className="mr-1"></span>
                  <span className="inline-flex overflow-hidden border rounded-full border-container-border">
                    <span className="bg-button-secondary-bg relative inline-flex flex-shrink-0 h-4 w-8 hover:cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none">
                      <button
                        type="button"
                        className="relative inline-flex flex-shrink-0 h-4 w-8 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none hover:cursor-pointer"
                        role="switch"
                        aria-checked="false"
                      >
                        <span className="sr-only"></span>
                        <span
                          aria-hidden="true"
                          className="translate-x-0 bg-text-emphasis absolute pointer-events-none inline-block h-3 w-3 rounded-full shadow transform ring-0 transition ease-in-out duration-200"
                        ></span>
                      </button>
                    </span>
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="overflow-hidden h-[250px]">
          <div
            id="user_balances_portfolio_table"
            className="flex flex-col flex-grow h-full overflow-x-auto thin-scroll"
          >
            <div className="h-full overflow-auto thin-scroll">
              <div className="align-middle inline-block min-w-full h-full">
                <div className="flex flex-col justify-center items-center h-full w-full text-center">
                  <div className="xs:py-8 sm:py-0">
                    <button className="disabled:cursor-not-allowed bg-transparent hover:bg-button-secondary-bg-hover disabled:text-text-disabled font-display text-text-default h-[32px] text-sm py-[8px] px-[12px] flex items-center justify-center">
                      <a className="flex items-center">
                        <span className="text-xs text-text-default">
                          Coming soon...
                        </span>
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
