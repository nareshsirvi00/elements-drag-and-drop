(function() {
  // 要素の取得
  var elements = document.getElementsByClassName("drag-and-drop");

  // 要素内のクリックされた位置を取得するグローバル変数
  var x;
  var y;

  // マウスが要素内で押されたt機の、又はタッチされたとき実行
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", mouseDown, false);
    elements[i].addEventListener("touchstart", mouseDown, false);
  }

  // マウスが押された際の関数
  function mouseDown(e) {
    // クラス名に.dragを追加
    this.classList.add("drag");

    // タッチイベントとマウスのイベントの差異を考慮
    if (e.type === "mousedown") {
      var event = e;
    } else {
      var event = e.changeTouches[0];
    }

    // 要素内の相対座標を取得
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;

    // ムーブイベントにコールバック
    document.body.addEventListener("mousemove", mouseMove, false);
    document.body.addEventListener("touchmove", mouseMove, false);
  }

  // マウスカーソルが動いたときに実行
  function mouseMove(e) {
    // ドラッグしている要素を取得
    var drag = document.getElementsByClassName("drag")[0];

    // 同時にマウスとタッチの差異を考慮
    if (e.type === "mousemove") {
      var event = e;
    } else {
      var event = e.changeTouches[0];
    }

    // フリックした時に画面を動かさない様にデフォルト設定
    e.preventDefault();

    // マウスが動いた場所に要素を動かす
    drag.style.top = event.pageY - y + "px";
    drag.style.left = event.pageX - x + "px";

    // マウスボタンがはなされた時、またはカーソルが外れたとき実行
    drag.addEventListener("mouseup", mouseUp, false);
    document.body.addEventListener("mouseleave", mouseUp, false);
    drag.addEventListener("touchend", mouseUp, false);
    document.body.addEventListener("touchleave", mouseUp, false);
  }

  // マウスボタンが上がったら実行
  function mouseUp(e) {
    // ムーブイベントハンドラの消去
    document.body.removeEventListener("mousemove", mouseMove, false);
    this.removeEventListener("mouseup", mouseUp, false);
    document.body.removeEventListener("touchmove", mouseMove, false);
    this.removeEventListener("touchend", mouseUp, false);

    // クラス名.dragも消す
    this.classList.remove("drag");
  }
})();