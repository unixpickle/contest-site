// Generated by CoffeeScript 1.7.1
(function() {
  var FlipAnimation, Manager, addClass, removeClass,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  FlipAnimation = window.FlipAnimation;

  addClass = function(div, aClass) {
    var names, _ref;
    names = ((_ref = div.className) != null ? _ref : '').split(' ');
    if (__indexOf.call(names, aClass) >= 0) {
      return;
    }
    names.push(aClass);
    return div.className = names.join(' ');
  };

  removeClass = function(div, aClass) {
    var names, _ref;
    names = ((_ref = div.className) != null ? _ref : '').split(' ');
    if (!(__indexOf.call(names, aClass) >= 0)) {
      return;
    }
    names.splice(names.indexOf(aClass), 1);
    return div.className = names.join(' ');
  };

  Manager = (function() {
    function Manager() {
      this.numFlipped = null;
      this.container = document.getElementById('container');
      this.challenges = [document.getElementById('challenge1'), document.getElementById('challenge2'), document.getElementById('challenge3'), document.getElementById('challenge4')];
      this.submit = document.getElementById('submit');
      this.leaderboard = document.getElementById('leaderboard');
      this.description = document.getElementById('description');
    }

    Manager.prototype.setup = function() {
      var challenge, i, _i, _len, _ref, _results;
      _ref = this.challenges;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        challenge = _ref[i];
        _results.push((function(_this) {
          return function(i) {
            return challenge.onclick = function() {
              return _this.itemClicked(i);
            };
          };
        })(this)(i));
      }
      return _results;
    };

    Manager.prototype.getContentRect = function() {
      var contentRect;
      contentRect = {
        width: Math.min(1100, Math.max(700, window.innerWidth - 20)),
        height: Math.min(700, Math.max(600, window.innerHeight - 20))
      };
      contentRect.x = (window.innerWidth - contentRect.width) / 2;
      contentRect.y = (window.innerHeight - contentRect.height) / 2;
      return contentRect;
    };

    Manager.prototype.handleResize = function() {
      var cellHeight, cellWidth, challenge, i, image, imageSize, minSize, rect, x, y, _i, _j, _len, _len1, _ref, _ref1, _results;
      rect = this.getContentRect();
      cellWidth = (Math.ceil(rect.width / 2)) - 10;
      cellHeight = (Math.ceil(rect.height / 2)) - 10;
      minSize = Math.min(cellWidth, cellHeight);
      imageSize = Math.min(minSize - 100, 200);
      _ref = document.getElementsByClassName('challenge-image');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        image = _ref[_i];
        image.style.width = imageSize + 'px';
        image.style.height = imageSize + 'px';
        image.style.left = ((cellWidth - imageSize) / 2) + 'px';
        image.style.top = ((cellHeight - imageSize) / 2) + 'px';
      }
      _ref1 = this.challenges;
      _results = [];
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        challenge = _ref1[i];
        x = rect.x + ((i % 2) * (cellWidth + 20));
        y = rect.y + (i < 2 ? 0 : cellHeight + 20);
        challenge.style.width = cellWidth + 'px';
        challenge.style.height = cellHeight + 'px';
        challenge.style.left = x + 'px';
        _results.push(challenge.style.top = y + 'px');
      }
      return _results;
    };

    Manager.prototype.itemClicked = function(number) {
      var challenge, delay, end, i, start, _i, _len, _ref, _ref1, _ref2;
      if (FlipAnimation.isAnimating()) {
        return;
      }
      if (this.numFlipped != null) {
        if (this.numFlipped !== number) {
          return;
        }
        _ref = [180, 0], start = _ref[0], end = _ref[1];
        removeClass(this.challenges[number], 'challenge-selected');
      } else {
        _ref1 = [0, 180], start = _ref1[0], end = _ref1[1];
        this.moveDivs(number);
        addClass(this.challenges[number], 'challenge-selected');
      }
      delay = 0;
      _ref2 = this.challenges;
      for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
        challenge = _ref2[i];
        if (i === number) {
          continue;
        }
        if (this.numFlipped == null) {
          addClass(challenge, 'challenge-deselected');
        } else {
          removeClass(challenge, 'challenge-deselected');
        }
        new FlipAnimation(challenge, start, end, 0.8).start(delay);
        delay += 200;
      }
      if (this.numFlipped != null) {
        return this.numFlipped = null;
      } else {
        return this.numFlipped = number;
      }
    };

    Manager.prototype.moveDivs = function(idx) {
      var challenge, divs, i, index, x, _i, _len, _ref, _results;
      divs = [this.description, this.submit, this.leaderboard];
      index = 0;
      _ref = this.challenges;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        challenge = _ref[i];
        if (i === idx) {
          continue;
        }
        x = divs[index++];
        if (x.parentElement != null) {
          x.parentElement.removeChild(x);
        }
        x.style.display = 'block';
        _results.push(challenge.getElementsByClassName('back')[0].appendChild(x));
      }
      return _results;
    };

    return Manager;

  })();

  window.Manager = Manager;

}).call(this);
