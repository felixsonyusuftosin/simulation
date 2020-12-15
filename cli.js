const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('inquirer')
const StackBuilder = require('./index').StackBuilder


const initializeCli = input => {
  clear()
  console.log(
    chalk.yellow(figlet.textSync(input, { horizontalLayout: 'full' }))
  )
}

const inquire = {
  askQuestions: () => {
    const questions = [
      {
        name: 'stackArray',
        type: 'input',
        message:
          'Please enter the stack arrangement (Please note we expect a two dimensional array as inputs ): ',
        validate: function (value) {
          const input = JSON.parse(value)
          let valid = true
          if (!input || !input.length || !Array.isArray(input)) {
            console.log(!input, !input.length)
            return 'Please enter a input for the input stack Arrangement :'
          }
          input.forEach(val => {
            if (!Array.isArray(val)) {
              valid = false
            }
          })
          if (valid) {
            return true
          }
          return 'Please make sure you enter a two dimensional array e.g [[i, j] [i, j, k]] :'
        }
      },
      {
        name: 'volume',
        type: 'input',
        message:
          'Enter the volume (K) in (Liters) for the liquid to be poured into the stack (Don"t provide any metric just the input ) : ',
        validate: input => {
          if (!input || !input.length) {
            return 'Please provide a input for the input volume: '
          }
          if (isNaN(parseInt(input))) {
            return 'Please provide a valid number :'
          }
          return true
        }
      },
      {
        name: 'row',
        type: 'input',
        message:
          'Enter the  row(i) you containing the cup you wish to get the volume (not zero indexed): ',
        validate: input => {
          if (!input || !input.length) {
            return 'Please provide a input for the row: '
          }
          if (isNaN(parseInt(input))) {
            return 'Please provide a valid number :'
          }
          return true
        }
      },
      {
        name: 'index',
        type: 'input',
        message:
          'Enter the  index(j) on the row containing the cup you wish to get the volume (not zero indexed ): ',
        validate: input => {
          if (!input || !input.length) {
            return 'Please provide a input for the index: '
          }
          if (isNaN(parseInt(input))) {
            return 'Please provide a valid number :'
          }
          return true
        }
      }
    ]
    return inquirer.prompt(questions)
  }
}

const run = async () => {
  initializeCli('Simulate Overflow')
  const cliValues = await inquire.askQuestions()
  const stackArray = JSON.parse(cliValues.stackArray)
  const volume = parseFloat(cliValues.volume)
  const row = parseInt(cliValues.row)
  const index = parseInt(cliValues.index)

  
  const stack = new StackBuilder()
  for (let i = 0; i < stackArray.length; i++) {
    const item = stackArray[i]
    stack.addToStack(item)
  }
  try {
  const response = stack.pourLiquidAndGetItem(volume, row - 1, index - 1)
  console.log(chalk.green(`On the ${row}th row, on index ${index} column the cup will contain ${response} ML of liquid`))
  } catch (err ) {
    console.log(err.message)
  }
}

run()
