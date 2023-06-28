# HTML Style Converter

The HTML Style Converter is a utility that provides functions to convert inline styles to CSS classes and vice versa in HTML documents. It offers two main functions: `inline2Class(html)` and `class2Inline(html)`.

## Installation

You can install the HTML Style Converter via npm:

```shell
npm install html-style-converter
```

## Usage

### `inline2Class(html)`

The `inline2Class` function takes an HTML string as input and modifies it to remove all inline styles. The inline styles are extracted and placed in a `<style>` tag at the bottom of the page. The corresponding classes are added to the affected elements.

```javascript
const { inline2Class } = require("html-style-converter");

const htmlString = `
  <html>
    <head>
      <title>Example HTML</title>
    </head>
    <body>
      <div style="color: red;">Hello, world!</div>
    </body>
  </html>
`;

const convertedHTML = inline2Class(htmlString);
console.log(convertedHTML);
```

### `class2Inline(html)`

The `class2Inline` function takes an HTML string as input and modifies it to remove all CSS classes. The classes are converted back to inline styles, applying the original styling to the respective elements.

```javascript
const { class2Inline } = require("html-style-converter");

const htmlString = `
  <html>
    <head>
      <title>Example HTML</title>
    </head>
    <body>
      <div class="class-123" style="font-weight: bold;">Hello, world!</div>
    </body>
  </html>
`;

const convertedHTML = class2Inline(htmlString);
console.log(convertedHTML);
```

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
