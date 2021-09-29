import { MenuEntry } from 'horaswap-libs-uikit'

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
    label: "Earning",
    icon: "EarningIcon",
    att: "SOON",
    href: "#",
  },
  {
    label: "NFT Marketplace",
    icon: "NftIcon",
    att: "iconHot",
    href: "#",
  },
  {
    label: "HORA Gallery",
    icon: "GalleryIcon",
    att: "SOON",
    href: "#",
  },
  {
    label: "Sport NFT",
    icon: "SpotIcon",
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
    att: "iconHot",
    href: "#",
  }, 
  {
    label: "ETH2.0",
    icon: "ETH2Icon",
    att: "SOON",
    href: "#",
  },
  {
    label: "Info",
    icon: "InfoIcon",
    // att: "SOON",
    href: "https://info.horaswap.com", 
  },
  {
    label: "Contact",
    icon: "GroupsIcon",
    items: [ 
      {
        label: "Twitter",
        href: 'https://twitter.com/os_hora',
        target: '_blank',
      },
      {
        label: "Medium",
        href: "http://horaos.medium.com/",
        target: '_blank',
      },
      {
        label: "Telegram",
        href: 'https://t.me/horaos',
        target: '_blank',
      },
    ],
  },
];

export default config
