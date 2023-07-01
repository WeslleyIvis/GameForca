export default class Components {
  createNode(
    tag,
    className = null,
    text = null,
    attribute = { att: null, value: null },
  ) {
    const content = document.createElement(tag);
    className ? content.classList.add(className) : null;
    text ? (content.innerText = text) : null;
    attribute.att && attribute.value
      ? content.setAttribute(attribute.att, attribute.value)
      : null;

    return content;
  }

  createInputText(className, placeholder = 'digit', maxLength = 1) {
    const input = document.createElement('input');
    input.classList.add(className);
    input.placeholder = placeholder;
    input.maxLength = maxLength;

    return input;
  }

  createButton(value, className = null) {
    const button = document.createElement('input');
    button.type = 'button';
    button.value = value;
    button.classList.add(className);

    return button;
  }

  createArrayComponent(word = '', tag = '', className, childTag) {
    const content = this.createNode(tag, className);

    for (let i = 0; i < word.length; i++) {
      let letter = this.createNode(childTag);
      if (childTag.toUpperCase() === 'BUTTON') {
        letter.innerText = word[i];
      } else letter.dataset.value = word[i].toUpperCase();

      content.appendChild(letter);
    }

    return content;
  }

  createFigureComponent(src, alt = 'imagem', className) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');

    figure.classList.add(className);
    img.src = src;
    img.alt = alt;
    figure.appendChild(img);

    return figure;
  }
}
