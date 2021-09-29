import Cookies from 'js-cookie'
import * as QueryString from 'query-string'
import { STAKING_SMART_CONTRACT } from '../../constants'

const cacheRef = 'refv1'

class Tracking {
  constructor() {
    this.company = STAKING_SMART_CONTRACT // The company position
    this.affiliate = null

    this.checkAffiliate()
  }

  getAffiliateUrl() {
    if (this.affiliate === null) {
      return ''
    }

    return `?ref=${this.affiliate}`
  }

  getAffiliate() {
    if (this.affiliate === null) {
      return this.company
    }

    return this.affiliate
  }

  checkAffiliate() {
    let query = QueryString.parse(window.location.hash)
    if (query) {
      query = {
        ref: query[Object.keys(query)[0]],
      }
    }

    const cookie = Cookies.get(cacheRef)

    if (query.ref !== null && this.validateAffiliate(query.ref) === true) {
      // if (query.ref !== this.company && query.ref !== cookie) {
      //   this.createCookie(query.ref)
      // }

      if (query.ref === this.company && cookie !== undefined && query.ref !== cookie) {
        this.affiliate = cookie
      } else {
        this.affiliate = query.ref
      }
    } else if (cookie !== undefined) {
      this.affiliate = cookie
    } else {
      this.affiliate = this.company
      // this.createCookie(this.company)
    }
  }

  createCookie(affiliate) {
    const expire_date = new Date(Date.now() + 86400 * 90 * 1000) // A cookie last 90 days

    Cookies.set(cacheRef, affiliate, { path: '/', expires: expire_date })
  }

  expireCookie() {
    const expire_date = new Date(Date.now() - 86400 * 90 * 1000) // The cookie expired 90 days ago

    Cookies.set(cacheRef, '', { path: '/', expires: expire_date })
  }

  validateAffiliate(affiliate) {
    return /^[A-Za-z0-9-_=]*$/.test(affiliate) // address
    // return /^[tT]?\d+$/.test(affiliate);
  }
}

export default Tracking
