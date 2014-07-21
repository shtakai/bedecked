/*global describe, it, before, beforeEach */
/*jshint -W030 */

'use strict';

var join = require('path').join
  , fs = require('fs')
  , expect = require('chai').expect
  , cheerio = require('cheerio')
  , bd = require('../lib/bedecked');

// Fixtures dir
var fxd = join(__dirname, 'fixtures');

describe('bedecked', function() {
  describe('api basics', function() {
    var err, $;
    before(function(done) {
      bd(join(fxd, '001.md'), function(e, html) {
        err = e;
        $ = cheerio.load(html);
        done();
      });
    });

    it('should not generate an error', function() {
      expect(err).to.not.be.ok;
    });

    it('should split into slides', function() {
      expect($('.slides > section').length).to.equal(4);
    });

    it('should nest indented slides', function() {
      expect($('.slides > section').eq(2).find('section').length).to.equal(2);
    });

    it('should add styles and scripts to the page', function() {
      expect($('link#reveal-core').length).to.equal(1);
      expect($('link#reveal-theme').length).to.equal(1);
      expect($('script#reveal-core').length).to.equal(1);
      expect($('script#reveal-init').length).to.equal(1);
    });

    it('should not leave any mustache templates', function() {
      expect($.html()).to.not.match(/{{[^}]+}}/g);
    });
  });

  describe('api custom opts', function() {
    /**
     * @todo
     */
  });
});
