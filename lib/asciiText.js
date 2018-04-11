"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHeader = createHeader;

var _figlet = _interopRequireDefault(require("figlet"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createHeader() {
  return _figlet.default.textSync('Platemail', {
    font: 'Caligraphy'
  });
}
//# sourceMappingURL=asciiText.js.map