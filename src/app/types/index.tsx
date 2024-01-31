export interface IData {
  title: string
  uniq_seo_title: boolean
  lines: string
  ways: string
  volatility_rating: string
  hit_rate: string
  payout: string
  devices: string[]
  provider: string
  identifier: string
  seo_title: string
  currencies: Currencies
  categories: string[]
  unfinished_games_for: string[]
}

export interface Currencies {
  BTC: Btc
  ETH: Eth
  LTC: Ltc
  USD: Usd
}

export interface Btc {
  id: number
  jackpot: string
}

export interface Eth {
  id: number
  jackpot: string
}

export interface Ltc {
  id: number
  jackpot: string
}

export interface Usd {
  id: number
  jackpot: string
}
