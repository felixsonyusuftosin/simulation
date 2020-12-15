const { assert, expect } = require('chai')
const { Glass, StackBuilder } = require('./index')

describe('Glass', () => {
  let glass
  describe('Pour liquid', () => {
    beforeEach(() => {
      glass = new Glass(0, 0)
    })
    it('Should not overflow when the volume is less than the capacity of the cup ', () => {
      const overflow = glass.pourLiquid(200)
      expect(glass.volume).to.equal(200)
      expect(overflow).to.equal(0)
    })
    it('should overflow when volume exceeds capacity', () => {
      const overflow = glass.pourLiquid(300)
      expect(glass.volume).to.equal(250)
      expect(overflow).to.equal(50)
    })
  })
})

describe('Stack Builder', () => {
  let stack = new StackBuilder()
  beforeEach(() => {
    glass = new Glass(0, 0)
    stack.addToStack([1])
    stack.addToStack([2, 4])
    stack.addToStack([5, 6, 7])
  })
  describe('addToStack', () => {
    it('should add to stack', () => {
      expect(stack.length).to.equal(3)
      expect(stack.root.row).to.equal(0)
    })
  })
  describe('_convertArrayToGlass', () => {
    it ('should return an array of glass ', () => { 
      const glasses = stack._convertArrayToGlass([1,2,3])
      expect(glasses[0] instanceof Glass).to.be.true
      expect(glasses[1] instanceof Glass).to.be.true
      expect(glasses[2] instanceof Glass).to.be.true
    })
  })
  describe('getGlass', () => {})
  describe('simulatePour', () => {})
  describe('pourLiquidAndGetCupVolume', () => {})
})
