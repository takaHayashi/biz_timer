function changeFavicon () {
    // 16x16のcanvasを用意
    var canvas = document.createElement("canvas");
    canvas.height = 32;
    canvas.width = 32;

    // favicon.icoの読み込み
    var img = new Image();
    img.onload = function() {
        var c = canvas.getContext('2d');

        // 現在のfaviconをcanvasに貼り付け(画像,x,y)
        c.drawImage(img,0,0);

        // font指定(太さ,サイズ,font)
        c.font ="900 20px serif";

        // 色指定
        c.fillStyle = "#FF0000";

        // 表示文字,表示位置(x),表示位置(y)
        c.fillText( "●", 16, 14)

        // 生成された新しいfaviconを取得
        var f = canvas.toDataURL('image/png');

        // 現在のfaviconを削除
        $('#favicon').remove();

        // headに新しいfaviconを入れる
        var newFav = '<link type="image/x-icon" id="favicon" rel="icon" href="'+ f +'">';
        $('head').append( newFav );
    }

    // 元のfavicon(下地)
    img.src = 'favicon.ico';
}
function returnFavicon () {
    var newFav = '<link type="image/x-icon" id="favicon" rel="icon" href="favicon.ico">';
    $('head').append( newFav );
}
