const { assert, expect } = require('chai')
const { Glass, StackBuilder }  = require('./index')


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
  beforeEach(() => {
    
  })
  describe('_convertArrayToGlass', () => {

  })
  describe('getGlass', () => {

  })
  describe('simulatePour', () => {

  })
  describe('addToStack', () => {

  })
  describe('pourLiquidAndGetCupVolume', () => {

  })
  

})