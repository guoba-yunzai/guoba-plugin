/** 分页器 */
export default class Pager {

  constructor(list, pageNum, pageSize) {
    this.$list = list
    this.$pageNum = pageNum
    this.$pageSize = pageSize
  }

  get pageNum() {
    return this.$pageNum
  }

  set pageNum(pageNum) {
    this.$pageNum = pageNum
  }

  get pageSize() {
    return this.$pageSize
  }

  set pageSize(pageSize) {
    this.$pageSize = pageSize
  }

  /** 根据当前分页条件，计算出的数据 */
  get records() {
    return [...this.$list].splice(this.offset, this.$pageSize)
  }

  /** 计算当前分页偏移量 */
  get offset() {
    let current = this.$pageNum
    if (current <= 1) {
      return 0
    }
    return Math.max((current - 1) * this.$pageSize, 0)
  }

  /** 最大页码 */
  get maxNum() {
    return Math.ceil(this.total / this.$pageSize)
  }

  /** 总行数 */
  get total() {
    return this.$list.length
  }

  toJSON() {
    return {
      pageNum: this.$pageNum,
      pageSize: this.$pageSize,
      total: this.total,
      maxNum: this.maxNum,
      records: this.records,
    }
  }
}
