const form = document.querySelector("#calc-form")
const buttons = form.querySelectorAll(".tip-button")
const reset = document.querySelector("#reset")

const billError = document.getElementById("bill-error-message")
const peopleError = document.getElementById("people-error-message")

let dataForm = {}

form.addEventListener("input", (event) => {
  if (event.target.type === "number") {
    const title = event.target.name
    const value = parseFloat(event.target.value)
    dataForm[title] = value

    // remove error message
    event.target.classList.remove("error")
    if (title === "bill") {
      billError.style.display = "none"
    }
    if (title === "people") {
      peopleError.style.display = "none"
    }

    // input validation
    if (value < 0) {
      event.target.value = 0
    }
    if (title !== "custom") {
      if (value <= 0 && value !== "") {
        event.target.classList.add("error")
        if (title === "bill") {
          billError.style.display = "block"
        } else if (title === "people") {
          peopleError.style.display = "block"
        }
      }
    }

    // remove button active mode
    if (title === "custom") {
      dataForm.tip = ""
      buttons.forEach((button) => button.classList.remove("active"))
    }

    calc(dataForm)
  }
})

form.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const customInput = form.querySelector("#custom-tip")
    customInput.value = ""
    dataForm.custom = ""

    const buttonString = event.target.innerText
    buttonValue = buttonString.replace(/[^0-9.]/g, "")
    dataForm.tip = parseFloat(buttonValue)

    buttons.forEach((button) => button.classList.remove("active"))

    event.target.classList.add("active")

    calc(dataForm)
  }
})

reset.addEventListener("click", () => {
  form.reset()
  dataForm = {}
  buttons.forEach((button) => button.classList.remove("active"))
  display(0, 0)
})

function calc(data) {
  let bill = data.bill
  let tipPercentage = data.tip
  let people = data.people

  if (data.custom >= 0 && data.custom !== "") {
    tipPercentage = dataForm.custom
  }

  if (bill > 0 && tipPercentage >= 0 && people > 0) {
    let tip = (bill * tipPercentage) / 100

    let total = bill + tip

    let tipPerson = tip / people
    let totalPerson = total / people

    display(tipPerson, totalPerson)
  }
}

function display(tip, total) {
  const tipDisplay = document.querySelector("#tip-amount-value")
  const totalDisplay = document.querySelector("#total-value")

  tipDisplay.innerText = "$" + tip.toFixed(2)
  totalDisplay.innerText = "$" + total.toFixed(2)
}
