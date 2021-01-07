import { request} from "./request.js";

export function getDetail(iid) {
  return request({
    url:"/detail",
    params: {
      iid
    }
  })
}
export class Goods {
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.discount = itemInfo.discountDesc
    this.oldPrice = itemInfo.oldPrice
    this.columns = columns
    this.service = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
