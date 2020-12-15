/**
 * @file 
 * Assumptions : the input is a 2 by 2 array 
 * inputs in terms of row and index are not zero based 
 * To start: 
 * USE BASH SCRIPT: 
 * run bash simulate.js 
 * USE NPM :
 * npm run start 
 */

const GLASS_CAPACITY = 250

class Glass {
  constructor(index, row) {
    this.capacity = GLASS_CAPACITY
    this.volume = 0
    this.index = index
    this.row = row
  }

  pourLiquid = pouredVolume => {
    const overflow = pouredVolume - GLASS_CAPACITY
    if (overflow <= 0) {
      this.volume = pouredVolume
      return 0
    }
    this.volume = GLASS_CAPACITY
    return overflow
  }
}

const stack = (row = 0, arr = []) => ({
  next: null,
  arr,
  row
})

class StackBuilder {
  constructor() {
    this.root = null
  }

  _convertArrayToGlass(arr, row) {
    return arr.map((value, index) => new Glass(index, row))
  }

  _getGlass(row, index) {
    let root = this.root
    while (root && root.row !== row) {
      root = root.next
    }
    if (!root) {
      throw new Error('Row out of range')
    }
    if (index >= root.arr.length) {
      throw new Error('Index out of range')
    }

    return root.arr[index]
  }

  _simulatePour(volume) {
    const pourLiquid = (stackElement, specificVolume) => {
      if (!stackElement || !specificVolume) {
        return
      }
      const arr = stackElement.arr
      const amountToPourInEachCup = Math.ceil(specificVolume / arr.length)
      let overflow = 0
      for (let i = 0; i < arr.length; i++) {
        const cup = arr[i]
        const cupOverflow = cup.pourLiquid(amountToPourInEachCup)
        overflow += cupOverflow
      }

      if (!overflow) {
        return
      }

      return pourLiquid(stackElement.next, overflow)
    }
    pourLiquid(this.root, volume)
  }

  addToStack(arr) {
    if (!this.root) {
      const arrayOfGlass = this._convertArrayToGlass(arr, 0)
      this.root = stack(0, arrayOfGlass)
      return
    }
    let prevElement = this.root
    while (prevElement.next) {
      prevElement = prevElement.next
    }
    const nextArrayOfGlass = this._convertArrayToGlass(
      arr,
      prevElement.row + 1
    )
    prevElement.next = stack(prevElement.row + 1, nextArrayOfGlass)
  }

  pourLiquidAndGetCupVolume(volumePoured, row, index) {
    this._simulatePour(volumePoured * 1000)
    try {
      const glass = this._getGlass(row, index)
      return glass.volume
    } catch (err) {
      throw new Error(`Error - ${err.message}`)
    }
  }
}

module.exports = {
  StackBuilder,
  Glass
}

