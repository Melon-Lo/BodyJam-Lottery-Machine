'use strict'

const drawButton = document.querySelector('#draw-button')
const itemNumbers = document.querySelectorAll('.item-number')
const radioButtons = document.querySelectorAll('input[name="person"]')
const personSelector = document.querySelector('#person-selector')

const lockButtons = document.querySelectorAll('.lock-button')
const redrawButtons = document.querySelectorAll('.redraw-button')
const customButtons = document.querySelectorAll('.custom-button')

const confirmButton = document.querySelector('#confirm-button')
const resultPanel = document.querySelector('#result-panel')
const copyButton = document.querySelector('#copy-button')

let selectedPerson = ''

const SANDY = [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 'Nina', 'United']
const MOMO = [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 'Nina', 'United']

// 選擇人物後，所有項目回歸預設
for (const radioButton of radioButtons) {
  radioButton.addEventListener('input', function onRadioButtonsInput() {
    for (const itemNumber of itemNumbers) {
      if (itemNumber.classList.contains('locked')) {
        const title = itemNumber.parentElement.parentElement.children[0].children[0].textContent
        alert(`請注意！目前${title}是鎖定的，換了老師要注意套數是否搭得上哦`)
      } else {
        itemNumber.textContent = '--'
      }
    }
  })
}

// 抽籤函數
function drawNumber(array) {
  let number = Math.floor(Math.random() * array.length)
  return number
}

// 全部項目抽套數
drawButton.addEventListener('click', function onDrawButtonClicked() {
  if (selectedPerson === '') {
    alert('請先選擇老師哦！')
  }

  for (const itemNumber of itemNumbers) {
    if (!itemNumber.classList.contains('locked')) {
      if (selectedPerson === 'momo') {
        itemNumber.textContent = MOMO[drawNumber(MOMO)]
      } else if (selectedPerson === 'sandy') {
        itemNumber.textContent = SANDY[drawNumber(SANDY)]
      }
    }
  }
})

// 人物選擇
personSelector.addEventListener('click', () => {
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedPerson = radioButton.value
    }
  }
})

// 鎖定與解鎖套數
for (const lockButton of lockButtons) {
  lockButton.addEventListener('click', function onLockButtonClicked(e) {
    const target = e.target

    if (target.tagName === 'I' || target.tagName === 'DIV') {
      const parentBox = target.parentElement
      const numberBox = parentBox.parentElement.parentElement.children[0]
      const number = numberBox.textContent

      if (number === '--') {
        return alert('請先抽籤哦！')
      }

      if (!parentBox.classList.contains('locked-button')) {
        parentBox.classList.add('locked-button')
        parentBox.innerHTML = `
        <div>解鎖</div>
        <i class="fa-solid fa-lock-open"></i>
        `
      } else {
        parentBox.classList.remove('locked-button')
        parentBox.innerHTML = `
        <div>鎖定</div>
        <i class="fa-solid fa-lock"></i>
      `
      }

      if (!numberBox.classList.contains('locked')) {
        numberBox.classList.add('locked')
        numberBox.innerHTML += `<i class="fa-solid fa-lock" style="font-size: 10px; margin: 0 0 0 10px;"></i>`
      } else {
        numberBox.classList.remove('locked')
        numberBox.textContent = `${number}`
      }
    }
  })
}

// 重抽套數
for (const redrawButton of redrawButtons) {
  redrawButton.addEventListener('click', function onRedrawButtonClicked(e) {
    const target = e.target

    if (target.tagName === 'I' || target.tagName === 'DIV') {

      let numberBox = target.parentElement.parentElement.parentElement.children[0]

      if (!numberBox.classList.contains('locked')) {
        if (selectedPerson === 'momo') {
          let number = MOMO[drawNumber(MOMO)]
          numberBox.textContent = number
        } else if (selectedPerson === 'sandy') {
          let number = SANDY[drawNumber(SANDY)]
          numberBox.textContent = number
        } else {
          alert('請先選擇老師哦！')
        }
      } else {
        let title = target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent
        alert(`想要重抽${title}的話，要先解鎖${title}哦！`)
      }
    }
  })
}

// 自訂套數
for (const customButton of customButtons) {
  customButton.addEventListener('click', function onCustomButtonClicked(e) {
    const target = e.target
    if (target.tagName === 'I' || target.tagName === 'DIV') {

      if (selectedPerson === '') {
        return alert('請先選擇老師哦！')
      }

      let title = target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent
      let numberBox = target.parentElement.parentElement.parentElement.children[0]

      if (numberBox.classList.contains('locked')) {
        return alert(`想要自訂${title}的話，要先解鎖${title}哦！`)
      }

      let number = window.prompt(`請輸入你想要的${title}套數`, '')

      if (number === '' || null) {
        alert('沒輸入任何東西哦！')
      } else if (number > 103) {
        alert('你是時空旅人嗎？')
      } else if (number < 42 && number > 0) {
        alert('你確定有人能教這個套數？')
      } else if (number <= 0) {
        alert('你可能要再想想')
      } else {
        numberBox.textContent = number
      }
    }
  })
}

// 按下OK顯示結果
confirmButton.addEventListener('click', function onConfirmButtonClicked(e) {
  const target = e.target

  if (!target.tagName === 'BUTTON') {
    return
  }

  if (selectedPerson === '') {
    return alert('請先選擇老師哦！')
  }

  const dataPanel = target.parentElement.parentElement.children[3].children[0]
  let numberArray = []
  for (let i = 0; i < 5; i++) {
    numberArray.push(dataPanel.children[i].children[1].children[0].textContent)
  }

  let rawHTML = ''
  rawHTML += `
  以下是今天要上的課程～<br>
  <br>
  <p class="results">
  Warm Up : ${numberArray[0]}<br>
  Cardio 1 : ${numberArray[1]}<br>
  Recovery : ${numberArray[2]}<br>
  Cardio 2 : ${numberArray[3]}<br>
  Groovedown : ${numberArray[4]}<br>
  </p>
  <br>
  祝您上課愉快 ^____^<br>
  `
  resultPanel.innerHTML = rawHTML

  copyButton.classList.remove('hidden')
})

// 複製抽籤結果
copyButton.addEventListener('click', function onCopyButtonClicked() {

  const text = document.querySelector('.results').textContent
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('複製成功！快拿去分享吧～');
    })
    .catch((err) => {
      console.error(err);
    });
})