"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHeader = createHeader;

var _figlet = _interopRequireDefault(require("figlet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createHeader() {
  return _figlet.default.text('Platemail', {
    font: 'Caligraphy'
  });
}
//# sourceMappingURL=asciiText.js.map