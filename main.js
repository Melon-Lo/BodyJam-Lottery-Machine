'use strict'
////////// DATA ////////// 

const BODYJAM_PROCESS = [
  "Warm Up",
  "Cardio 1",
  "Recovery",
  "Cardio 2",
  "Groovedown"
];

const TEACHERS = [
  { name: 'sandy', set: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 'Nina', 'United'] },
  { name: 'momo', set: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 'Nina', 'United'] },
]

// Render Data Panel

function renderDataPanel() {
  const dataPanel = document.querySelector(".data-panel");
  let rawHTML = "";

  for (let i = 0; i < BODYJAM_PROCESS.length; i++) {
    rawHTML += `
      <div class="data-box">
        <p class="data-title data-title-${i % 2}">${BODYJAM_PROCESS[i]}</p>
        <div class="data-number">
        --
        </div>
        <div class="data-function-buttons">
          <button class="function-button function-button-lock">鎖定<i class="fa-solid fa-lock"></i></button>
          <button class="function-button function-button-redraw">重抽<i class="fa-solid fa-rotate-right"></i></button>
          <button class="function-button function-button-custom">自訂<i class="fa-sharp fa-solid fa-pen"></i></button>
        </div>
      </div>
    `;
  }

  dataPanel.innerHTML = rawHTML;
}

renderDataPanel();

////////// Basic Settings //////////

let selectedPerson = ''

const dataNumbers = document.querySelectorAll('.data-number')
const lockButtons = document.querySelectorAll('.function-button-lock')
const redrawButtons = document.querySelectorAll('.function-button-redraw')
const customButtons = document.querySelectorAll('.function-button-custom')

const drawButton = document.querySelector('#draw-button')
const radioButtons = document.querySelectorAll('input[name="person"]')
const personSelector = document.querySelector('#person-selector')

const confirmButton = document.querySelector('#confirm-button')
const copyButton = document.querySelector('.copy-button')

// 抽籤函數
function drawNumber(array) {
  let number = Math.floor(Math.random() * array.length)
  return array[number]
}

// 選擇人物後，所有項目回歸預設
for (const radioButton of radioButtons) {
  radioButton.addEventListener('input', function onRadioButtonsInput() {
    let titles = []
    for (const dataNumber of dataNumbers) {
      if (dataNumber.classList.contains('locked')) {
        const title = dataNumber.parentElement.children[0].textContent
        titles.push(title)
      } else {
        dataNumber.textContent = '--'
      }
    }

    if (titles.length > 0) {
      alert(`請注意！目前${titles.toString()}是鎖定的，換了老師要注意套數是否搭得上哦`)
    }
  })
}

// 全部項目抽套數
drawButton.addEventListener('click', function onDrawButtonClicked() {


  if (selectedPerson === '') {
    alert('請先選擇老師哦！')
  }

  for (const dataNumber of dataNumbers) {
    if (!dataNumber.classList.contains('locked')) {
      for (let i = 0; i < TEACHERS.length; i++) {
        if (selectedPerson === TEACHERS[i].name) {
          dataNumber.textContent = drawNumber(TEACHERS[i].set)
        }
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

    if (target.tagName === 'BUTTON') {
      const parentBox = target
      const numberBox = parentBox.parentElement.parentElement.children[1]
      const number = numberBox.textContent

      if (number.length > 10) {
        return alert('請先抽籤哦！')
      }

      if (!parentBox.classList.contains('locked-button')) {
        parentBox.classList.add('locked-button')
        parentBox.classList.remove('function-button-lock')
        parentBox.innerHTML = `
        解鎖<i class="fa-solid fa-unlock"></i>
        `
      } else {
        parentBox.classList.remove('locked-button')
        parentBox.classList.add('function-button-lock')
        parentBox.innerHTML = `
        鎖定<i class="fa-solid fa-lock">
        `
      }

      if (!numberBox.classList.contains('locked')) {
        numberBox.classList.add('locked')
        numberBox.innerHTML += `<i class="fa-solid fa-lock lock-icon"></i>`
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

    if (target.tagName === 'BUTTON') {
      const numberBox = target.parentElement.parentElement.children[1]

      if (!numberBox.classList.contains('locked')) {
        for (let i = 0; i < TEACHERS.length; i++) {
          if (selectedPerson === TEACHERS[i].name) {
            numberBox.textContent = drawNumber(TEACHERS[i].set)
          }
        }
      } else {
        let title = target.parentElement.parentElement.children[0].textContent
        alert(`想要重抽${title}的話，要先解鎖哦！`)
      }
    }
  })
}

// 自訂套數
for (const customButton of customButtons) {
  customButton.addEventListener('click', function onCustomButtonClicked(e) {
    const target = e.target
    if (target.tagName === 'BUTTON') {

      if (selectedPerson === '') {
        return alert('請先選擇老師哦！')
      }

      let title = target.parentElement.parentElement.children[0].textContent
      let numberBox = target.parentElement.parentElement.children[1]

      if (numberBox.classList.contains('locked')) {
        return alert(`想要自訂${title}的話，要先解鎖哦！`)
      }

      let number = window.prompt(`請輸入你想要的${title}套數`, '')

      if (number === '' || null) {
        alert('沒輸入任何東西哦！')
      } else if (number > 103) {
        alert('你是時空旅人嗎？')
      } else if (number < 41 && number > 0) {
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
confirmButton.addEventListener('click', function onConfirmButtonClicked() {
  if (selectedPerson === '') {
    return alert('請先抽籤哦！')
  }

  const dataPanel = document.querySelector('.data-panel')
  const resultPanel = document.querySelector('#result-panel')
  let titleArray = []
  let numberArray = []

  for (let i = 0; i < 5; i++) {
    titleArray.push(dataPanel.children[i].children[0].textContent)
    numberArray.push(dataPanel.children[i].children[1].textContent)
  }

  let content = ''
  for (let i = 0; i < titleArray.length; i++) {
    content += `${titleArray[i]}: ${numberArray[i]} <br>`
  }

  let rawHTML = ''
  rawHTML += `<span class="results">
  ${content}</span>
  Enjoy! ^_^
  `
  resultPanel.innerHTML = rawHTML

  if (copyButton.classList.contains('hidden')) {
    copyButton.classList.remove('hidden')
  }
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