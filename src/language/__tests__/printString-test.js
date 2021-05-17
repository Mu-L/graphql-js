import { expect } from 'chai';
import { describe, it } from 'mocha';

import { printString } from '../printString';

describe('printString', () => {
  it('prints a simple string', () => {
    expect(printString('hello world')).to.equal('"hello world"');
  });

  it('escapes quotes', () => {
    expect(printString('"hello world"')).to.equal('"\\"hello world\\""');
  });

  it('does not escape single quote', () => {
    expect(printString("who's test")).to.equal('"who\'s test"');
  });

  it('escapes backslashes', () => {
    expect(printString('escape: \\n')).to.equal('"escape: \\\\n"');
  });

  it('escapes well-known control chars', () => {
    expect(printString('\b\f\n\r\t')).to.equal('"\\b\\f\\n\\r\\t"');
  });

  it('escapes zero byte', () => {
    expect(printString('\x00')).to.equal('"\\u0000"');
  });

  it('does not escape space', () => {
    expect(printString(' ')).to.equal('" "');
  });

  it('escapes all other control chars', () => {
    for (let i = 1; i <= 0x9f; i++) {
      const source = String.fromCharCode(i);
      if (/[\b\f\n\r\t]/.test(source) || (i >= 0x0020 && i <= 0x007e)) {
        continue;
      }
      expect(printString(source)).to.equal(
        `"\\u00${i <= 0x000f ? '0' : ''}${i.toString(16).toUpperCase()}"`,
      );
    }
  });

  it('does not escape non-ascii character', () => {
    expect(printString('\u21BB')).to.equal('"\u21BB"');
  });

  it('does not escape supplementary character', () => {
    expect(printString('\u{1f600}')).to.equal('"\u{1f600}"');
  });
});
