import Components from './Components.js';

export default class Forca extends Components {
  constructor(word = '', clue = '', amountClue = 3) {
    super();
    this.word = word;
    this.usedLettersWord = '';
    this.letter = '';
    this.body = 0;
    this.amountClue = amountClue;
    this.maxClue = 0;
    this.countLetters = [];
    this.clue = clue;
    this.mainComponent = this.createTagComponent('main', 'main');
    this.gameComponent = null;
    this.imagens = [
      '../../style/imagens/sr1.jpg',
      '../../style/imagens/sr2.jpg',
      '../../style/imagens/sr2.jpg',
      '../../style/imagens/sr3.png',
      '../../style/imagens/sr4.png',
      '../../style/imagens/sr5.jpg',
      '../../style/imagens/sr6.jpg',
    ];
    this.contentImage = this.createFigureComponent(
      this.imagens[0],
      'srIncrivel',
      'content-img',
    );
    this.usedLetter = this.createTagComponent('p', 'used-letters');
    this.data = './scripts/modules/data.json';
  }

  async getDataWorlds(data) {
    await fetch(data)
      .then((r) => r.json())
      .then((r) => {
        this.data = r;
        this.handleEvents();
      })
      .catch((error) => console.error(error));
  }

  createWord(word, clue) {
    if (word == '' && clue == '') {
      this.clue = clue =
        this.data[Math.floor(Math.random() * this.data.length)].clue;
      this.randomWord(clue);
    }

    if (word == '' && clue !== '') {
      this.randomWord(clue);
    }
  }

  randomWord(category) {
    this.data.forEach((word) => {
      if (word.clue.toUpperCase() === category.toUpperCase()) {
        this.word = word.word[Math.floor(Math.random() * word.word.length)];
        this.maxClue = Math.floor(this.word.length / this.amountClue);
      }
    });
  }

  handleEvents() {
    if (this.word == '') {
      this.createWord(this.word, this.clue);
    }
    this.createInterface();
  }

  createInterface() {
    this.mainComponent.appendChild(
      this.createTagComponent('h2', 'clue', this.clue),
    );

    this.mainComponent.appendChild(this.contentImage);

    this.mainComponent.appendChild(
      (this.gameComponent = this.createArrayComponent(
        this.word,
        'section',
        'box-word',
        'p',
      )),
    );

    this.selectLetterEvent(
      this.mainComponent.appendChild(
        this.createArrayComponent(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ',
          'section',
          'buttons',
          'button',
        ),
      ),
    );

    this.clueEvent(
      this.mainComponent.appendChild(this.createButton('Dica', 'button-clue')),
    );

    this.mainComponent.appendChild(
      this.createArrayComponent('123456', 'div', 'body-forca', 'span'),
    );

    this.mainComponent.appendChild(this.usedLetter);
    document.body.appendChild(this.mainComponent);
  }

  selectLetterEvent(node) {
    let timer = true;

    const interval = (seconds) => {
      let out = setTimeout(() => {
        timer = true;
      }, seconds);
    };

    const setLetter = (letter) => {
      this.letter = letter;
      this.validLetter(this.letter);
    };

    document.addEventListener('keydown', ({ key }) => {
      if (timer) {
        timer = false;
        interval(600);
        setLetter(key);
      }
    });

    node.childNodes.forEach((element) => {
      element.addEventListener(['click'], (event) => {
        setLetter(event.target.innerText.toUpperCase());
      });
    });
  }

  validLetter(letter) {
    letter = letter.toUpperCase();
    this.usedLettersWord = '';

    this.gameComponent.childNodes.forEach((element) => {
      if (element.dataset.value == letter) element.innerText = letter;

      if (element.innerText != '')
        this.usedLettersWord += element.dataset.value;
    });

    if (
      !this.countLetters.includes(letter) &&
      letter !== ' ' &&
      !/[1-9a-z]/.test(letter)
    ) {
      this.countLetters.push(letter);
      this.bodyLife(letter);
    }
  }

  clueEvent(node) {
    node.addEventListener('click', () => {
      const validLetter = () => {
        let randomLetter = 0;

        do {
          let count = 0;
          randomLetter =
            this.word[
              Math.floor(Math.random() * (this.word.length - count)) + count
            ];
          count++;
        } while (this.usedLettersWord.includes(randomLetter));

        if (this.maxClue >= 1) {
          this.validLetter(randomLetter);
        }

        this.maxClue--;
      };

      if (this.maxClue >= 1) validLetter();
      else node.disabled = true;
    });
  }

  bodyLife(letter) {
    const disableInputs = () => {
      this.mainComponent.childNodes.forEach((element) => {
        if (element.nodeName == 'INPUT') {
          element.disabled = true;
        }
      });
    };

    if (!this.usedLettersWord.includes(letter) && this.body < 6) {
      this.body++;
      this.contentImage.firstChild.src = this.imagens[this.body];
    }

    if (this.body == 6) {
      window.alert('Perdeu! a palavra certa é ' + this.word);
      disableInputs();
    }

    if (this.usedLettersWord.length == this.word.length) {
      window.alert('Venceu');
      disableInputs();
    }
  }

  writeUsedLetters() {
    this.usedLetter.innerText = '';

    this.countLetters.forEach((value) => {
      this.usedLetter.innerText += value + ' - ';
    });
  }

  init() {
    this.getDataWorlds(this.data);
  }
}
