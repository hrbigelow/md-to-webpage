// Override function
const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
                ${text}
              </a>
            </h${level}>`;

    return `
            <a name="${escapedText}" class="anchor" href="#${escapedText}">
              <h${level}>
                ${text}
              </h${level}>
            </a>
            `;

  }
}

export default renderer;

