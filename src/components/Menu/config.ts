import { MenuEntry } from "doeswap-libs-uikit"

/**
 * label: string
 * icon: svg
 * href: https || /path
 * calloutClass: 'rainbow' || className => background rainbow and custom css
 * initialOpenState: true || false
 * items: array sample parent
 * att: attach => text || icon.png
 */

export const config: MenuEntry[] = [
  {
    label: "Home",
    icon: "HomeIcon",
    href: "/",
    calloutClass: 'rainbow',
  },
  {
    label: "Trade",
    icon: "TradeIcon",
    initialOpenState: true,
    items: [ 
      {
        label: "Exchange",
        href: "/swap",
      },
      {
        label: "Liquidity",
        href: "/pool",
      },
    ],
  },
  {
    label: "Info",
    icon: "InfoIcon",
    href: 'https://info.doeswap.com',
  },
  {
    label: "Earning",
    icon: "EarningIcon",
    att: "SOON",
    href: "#",
  },
  {
    label: "NFT Marketplace",
    icon: "NftIcon",
    att: "SOON",
    // att: "iconHot",
    href: "#",
  },
  {
    label: "Sport NFT",
    icon: "SpotIcon",
    att: "SOON",
    href: "#",
  },
  {
    label: "Launchpad",
    icon: "LaunchpadIcon",
    att: "SOON",
    href: "#",
  },
  {
    label: "Gamification",
    icon: "GamificationIcon",
    att: "SOON",
    href: "#",
  }, 
  {
    label: "ETH2.0",
    icon: "ETH2Icon",
    att: "SOON",
    href: "#",
  },
  {
    label: "Binance",
    icon: "GroupsIcon",
    items: [ 
      {
        label: "Twitter",
        href: '#',
        target: '_blank',
      },
      {
        label: "Medium",
        href: '#',
        target: '_blank',
      },
      {
        label: "Telegram",
        href: '#',
        target: '_blank',
      },
    ],
  },
];

export default config
