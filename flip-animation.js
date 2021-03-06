// Generated by CoffeeScript 1.7.1
(function() {
  var FlipAnimation, setGeneral;

  setGeneral = function(div, attribute, value) {
    var prefix, _i, _len, _ref, _results;
    _ref = ['', '-webkit-', '-ms-'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      prefix = _ref[_i];
      if (value != null) {
        _results.push(div.style[prefix + attribute] = value);
      } else {
        _results.push(div.style[prefix + attribute] = '');
      }
    }
    return _results;
  };

  FlipAnimation = (function() {
    FlipAnimation.animationList = [];

    FlipAnimation.frameDuration = 0.01666666667;

    FlipAnimation.isAnimating = function() {
      return this.animationList.length;
    };

    function FlipAnimation(div, sourceAngle, destAngle, duration) {
      this.div = div;
      this.sourceAngle = sourceAngle;
      this.destAngle = destAngle;
      this.duration = duration;
      this.elapsed = 0;
      this.theTimeout = null;
    }

    FlipAnimation.prototype.cancel = function() {
      if (this.theTimeout != null) {
        clearTimeout(this.theTimeout);
        this.theTimeout = null;
      }
      return this.elapsed = 0;
    };

    FlipAnimation.prototype.start = function(initDelay) {
      if (initDelay == null) {
        initDelay = 0;
      }
      this.cancel();
      FlipAnimation.animationList.push(this);
      return this.theTimeout = setTimeout(this._initialize.bind(this), initDelay);
    };

    FlipAnimation.prototype._didEnd = function() {
      var backDiv, frontDiv, list;
      frontDiv = this.div.getElementsByClassName('front')[0];
      backDiv = this.div.getElementsByClassName('back')[0];
      if (this.destAngle > 90) {
        frontDiv.style.display = 'none';
      } else {
        backDiv.style.display = 'none';
      }
      setGeneral(frontDiv, 'transform', null);
      setGeneral(backDiv, 'transform', null);
      setGeneral(this.div, 'transform', null);
      list = FlipAnimation.animationList;
      return list.splice(list.indexOf(this));
    };

    FlipAnimation.prototype._tick = function(x) {
      var angle, msCount, percentage;
      if (x == null) {
        x = true;
      }
      this.theTimeout = null;
      percentage = Math.min(this.elapsed, this.duration) / this.duration;
      angle = this.sourceAngle + (this.destAngle - this.sourceAngle) * percentage;
      setGeneral(this.div, 'transform', 'rotateY(' + angle + 'deg)');
      if (this.elapsed < this.duration) {
        this.elapsed += FlipAnimation.frameDuration;
        msCount = FlipAnimation.frameDuration * 1000;
        return this.theTimeout = setTimeout(this._tick.bind(this), msCount);
      } else if (x) {
        return this._didEnd();
      }
    };

    FlipAnimation.prototype._initialize = function() {
      var backDiv, frontDiv;
      backDiv = this.div.getElementsByClassName('back')[0];
      setGeneral(backDiv, 'transform', 'rotateY(180deg)');
      if (this.destAngle < 90) {
        frontDiv = this.div.getElementsByClassName('front')[0];
        frontDiv.style.display = 'block';
      } else {
        backDiv.style.display = 'block';
      }
      return this._tick();
    };

    return FlipAnimation;

  })();

  window.FlipAnimation = FlipAnimation;

}).call(this);
