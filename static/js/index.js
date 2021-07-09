// Generated by CoffeeScript 1.12.7
(function() {
  var Hs, keyAction, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Hs || (root.Hs = {});

  Hs = root.Hs;

  keyAction = {
    "ArrowDown": "down",
    "ArrowUp": "up",
    "ArrowLeft": "left",
    "ArrowRight": "right"
  };

  $(function() {
    var ax, ay, current_action, current_key, current_train_id, setp_base, step;
    current_train_id = 0;
    console.log("this is pull train");
    root.game_init = function() {
      load_map();
      return load_train();
    };
    root.load_map = function() {
      return console.log("load map");
    };
    root.load_train = function() {
      var x, y;
      console.log("load train");
      y = 0;
      x = parseInt($(".game_area").width() / 2.0);
      return $(".game_area").append("<div class=\"game_train\" data-train-id=\"" + current_train_id + "\" style=\"left:" + x + "px;top:" + y + "px;\"></div>");
    };
    current_key = null;
    current_action = "down";
    setp_base = $(".game_step").val();
    step = 0;
    ax = 0;
    ay = 0;
    $(window).on("keydown", function(evt) {
      console.log("key:", evt.key);
      console.log("keyAction", keyAction[evt.key]);
      current_key = keyAction[evt.key];
      current_action = current_key;
      ax = 0;
      ay = 0;
      step = parseInt($(".game_step").val());
      return setp_base = parseInt($(".game_step").val());
    });
    $(window).on("keyup", function(evt) {
      return step = 0;
    });
    game_init();
    root.render = function() {
      var x, y;
      x = parseInt($(".game_train[data-train-id=" + current_train_id + "]").css("left"));
      y = parseInt($(".game_train[data-train-id=" + current_train_id + "]").css("top"));
      console.log(x, y, step);
      console.log(current_action);
      if (current_action === "down") {
        ax = 0;
        ay = ay + step;
        if (ay === 0) {
          ay = 1 * setp_base;
        }
      } else if (current_action === "right") {
        ax = ax + step;
        ay = 0;
        if (ax === 0) {
          ax = 1 * setp_base;
        }
      } else if (current_action === "up") {
        ax = 0;
        ay = ay - step;
        if (ay === 0) {
          ay = -1 * setp_base;
        }
      } else if (current_action === "left") {
        ax = ax - step;
        ay = 0;
        if (ax === 0) {
          ax = -1 * setp_base;
        }
      }
      x = x + ax;
      y = y + ay;
      console.log(x, y, ax, ay);
      return $(".game_train[data-train-id=" + current_train_id + "]").css({
        left: x + "px",
        top: y + "px"
      });
    };
    return setInterval(function() {
      return render();
    }, 100);
  });

}).call(this);
