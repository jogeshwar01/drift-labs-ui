import ConnectWalletButton from "./navbar/ConnectWalletButton";
import DropdownArrow from "./icons/DropdownArrow";
import Settings from "./icons/Settings";
import Chart from "./icons/Chart";
import NotificationBell from "./icons/NotificationBell";

// Define navigation items
const navigationItems = [
  { id: "overview", label: "Overview", hasDropdown: false },
  { id: "trade", label: "Trade", hasDropdown: true },
  { id: "earn", label: "Earn", hasDropdown: true },
  {
    id: "vaults",
    label: "Vaults",
    hasDropdown: true,
    badge: {
      text: "Hot",
      className:
        "text-[10px] px-1 py-[2px] rounded-sm flex items-center gap-1 pointer-events-none select-none bg-interactive-secondary-bg text-interactive-link",
    },
  },
  { id: "rewards", label: "Rewards", hasDropdown: true },
  {
    id: "stake_drift",
    label: "Stake DRIFT",
    hasDropdown: false,
    icon: "https://drift-public.s3.eu-central-1.amazonaws.com/assets/icons/markets/drift_grey-dark-theme.svg",
  },
  { id: "stats", label: "Stats", hasDropdown: false },
  { id: "more", label: "More", hasDropdown: true },
];

function NavBar() {
  return (
    <nav
      id="topbar"
      className="flex flex-grow px-2 sm:px-4  h-[48px] sm:border-none sm:bg-main-bg"
    >
      <div className="flex justify-between items-center top-0 left-0 w-full font-display">
        <div className="flex justify-between items-center md:space-x-4">
          <a className="mr-6 hover:cursor-pointer">
            <div className="w-full h-full md:hidden">
              <img className="min-w-[28px]" src="/drift.svg" alt="Drift" />
            </div>
            <div className="hidden w-full h-full md:block">
              <img
                sizes="66px"
                alt="Drift"
                className="w-[66px] h-full"
                src="/drift.svg"
                style={{ minWidth: "56px" }}
              />
            </div>
          </a>
          <div data-puppet-tag="desktop_navigation" className="flex">
            {navigationItems.map((item) => (
              <div key={item.id} className="undefined" aria-expanded="false">
                <div
                  id={`desktop_navigation_category_${item.id}`}
                  className={`h-full flex items-center whitespace-nowrap font-medium self-center px-2 md:px-3 py-1 hover:cursor-pointer rounded hover:brightness-125 select-none text-text-label bg-main-bg hover:bg-container-bg-selected ${
                    item.id === "trade" ? "bg-clip-text text-transparent bg-[image:var(--color-primary-gradient)]" : ""
                  }`}
                >
                  <span className="flex items-center space-x-1 pointer-events-none">
                    {item.icon && (
                      <img
                        className="h-[18px] w-[18px]"
                        width="18"
                        height="18"
                        alt={`${item.label} icon`}
                        src={item.icon}
                      />
                    )}
                    <span className="font-[300] text-[13px] leading-[16px]">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className={item.badge.className}>
                        <span>{item.badge.text}</span>
                      </span>
                    )}
                    {item.hasDropdown && (
                      <DropdownArrow className="rotate-180 w-3 transition-all bg-main-bg hover:bg-container-bg-selected" />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center h-full space-x-2 flex-fill max-h-[32px]">
          <div
            className="outline-none focus:outline-none flex rounded-lg"
            aria-expanded="false"
          >
            <a className="hover:opacity-100" href="/fuel">
              <button className="disabled:cursor-not-allowed bg-transparent hover:bg-button-secondary-bg-hover disabled:text-text-disabled rounded-sm font-display justify-center text-text-default text-sm py-[4px] px-[8px] flex items-center h-full gap-2">
                <img alt="Fuel droplet" src="/fuel-droplet.svg" />
                <span className="text-[16px] leading-[-0.25px] hidden font-bold sm:block">
                  Fuel
                </span>
              </button>
            </a>
          </div>
          <button className="space-x-2 disabled:cursor-not-allowed disabled:bg-button-disabled disabled:hover:bg-button-disabled disabled:text-text-disabled rounded-sm font-display items-center justify-center transition-all h-[32px] text-sm py-[4px] bg-button-secondary-bg hover:bg-button-secondary-bg-hover hidden px-1 lg:flex text-text-default">
            <Chart className="w-6 h-6" />
          </button>
          <div className="dialect" data-theme="dark">
            <div className="dt-relative dt-text-[--dt-text-primary]">
              <div className="relative">
                <button
                  className="space-x-2 disabled:cursor-not-allowed disabled:bg-button-disabled disabled:hover:bg-button-disabled disabled:text-text-disabled inline-flex rounded-sm font-display items-center justify-center transition-all text-sm py-[4px] px-[8px] text-text-secondary-button bg-button-secondary-bg hover:bg-button-secondary-bg-hover w-8 h-8"
                  id="dialect-notifications-button"
                >
                  <NotificationBell />
                </button>
              </div>
            </div>
          </div>
          <button className="space-x-2 disabled:cursor-not-allowed disabled:bg-button-disabled disabled:hover:bg-button-disabled disabled:text-text-disabled inline-flex rounded-sm font-display items-center justify-center transition-all h-[32px] text-sm py-[4px] text-text-secondary-button bg-button-secondary-bg hover:bg-button-secondary-bg-hover px-1">
            <Settings className="w-6 h-6 text-text-default" />
          </button>
          <div id="wallet_button" className="items-center h-full">
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
