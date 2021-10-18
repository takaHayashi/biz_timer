/* ----------------------------------------------------
setInterval＝一定時間ごとに特定の処理を繰り返す。
参考URL：https://techacademy.jp/magazine/5537
最後の行の「  },180000);」で
指定されたミリ秒ごとに以下の処理を繰り返す。
この値は変更可能で現在の180000は3分
------------------------------------------------------ */
function setinterval(){
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": true,
		"progressBar": false,
		"positionClass": "toast-bottom-right",
		"preventDuplicates": false,
		"showDuration": "200",
		"hideDuration": "3000",
		"timeOut": "10000",
		"extendedTimeOut": "5000",
		"position":"absolute",
		"zIndex":"1000"
	}
	setInterval(function(){
		var now = new Date();
		var y = now.getFullYear();
		var m = now.getMonth() + 1;
		var d = now.getDate();
		var w = now.getDay();
		var wd = ['日', '月', '火', '水', '木', '金', '土'];
		var h = ("0"+ now.getHours()).slice(-2);
		var mi = ("0"+ now.getMinutes()).slice(-2);
//		var s = now.getSeconds();
/*
現在の時間がAM0-6:00の時は、24を足す。例：AM2:00は26:00になる。
そうしないと、翌朝2:00の仕事があったとき、単にAM2:00で
判定してしまうと一日中アラートが鳴り続けるため。
*/
    var open = '00';
    var end = '06';
		if(h >= open && h < end){
			 h = Number(h) + 24;
		}
		var now_time = y + '/' + m + '/' + d + ' ' + h + ':' +mi;

		function setToast(){
			$.ajaxSetup({async: false});//同期通信(json取ってくるまで待つ)
			var params = (new URL(document.location)).searchParams;
			var queryVal = params.get('list');
			var url = queryVal+".json";
			$.getJSON(url, function(list){
				var n =1;
				var c =0;
				for(var i in list){
					for(var j in list[i].set){
						var startTime = $('.view_timer' + n).attr('startTime' + n);
						if(startTime){
							var startDate = y + '/' + m + '/' + d + ' ' + startTime;
/*
if (startDate < now_time && $('#box-' + n).prop("checked") == false)で
「now_time」と「startDate」を比較。以下２条件が TRUE なら
（１）「startDate」が「now_time」より前の時刻（作業予定時刻が過ぎている）
（２）チェックボックスOFF

以下の４つの警告が出る
（1）トースト通知
（2）アラート音
（3）作業の文字色が赤くなる
（4）ファビコンに赤丸が追加される
*/
							if (startDate < now_time && $('#box-' + n).prop("checked") == false) {
/* 
・toastr[error]で、jsonにある「toasterTitle」「toasterBody」を表示 
・$('#warning' + n).css( 'color', 'red' )でサービス画面の該当作業の文字を赤く
・$("#sound")[0].play()で「./sound/timer.mp3」の音を鳴らす
・window.sessionStorageでセッションに格納された該当のチェックボックスをfalseに
・変数「c」に１を足す（changeFaviconの判定に使う）
*/
								toastr["error"](list[i].set[j].toasterBody , list[i].set[j].toasterTitle);
								$('#warning' + n).css( 'color', 'red' );
								$("#sound")[0].play();
								window.sessionStorage.setItem(['check' + n],'false');
								c = c + 1;

/* 
「now_time」が「startDate」より前（作業予定前）で、チェックボックスがONの時
・window.sessionStorage.setItemをtrueに
・$('#warning' + n).css( 'color', '#000' )でサービス画面の該当作業の文字を黒
*/
							}else if($('#box-' + n).prop("checked") == true){
								window.sessionStorage.setItem(['check' + n],'true');
								$('#warning' + n).css( 'color', '#000' );
							}else{
/* 
「now_time」が「startDate」より前（作業予定前）で、チェックボックスがOFFの時
・window.sessionStorage.setItemをfalseに
・$('#warning' + n).css( 'color', '#000' )でサービス画面の該当作業の文字を黒
*/
								window.sessionStorage.setItem(['check' + n],'false');
								$('#warning' + n).css( 'color', '#000' );
							}
						}
					n = n + 1;
					}
/*
cが0でなければ（アラートが一つでもあれば）ファビコンに赤丸を出して、ブラウザの違うページでも問題をわかりやすくする。
「fav.js」のfunction「changeFavicon(0)」に飛ぶ
*/
					if (c != 0){
						changeFavicon(0);
					}else{
						returnFavicon ();
					}
				}
			});
			$.ajaxSetup({async: true});
		}
		setToast(); // 43行目の「function setToast(){ 」に飛ぶ
	},180000); // 以下の数字を変えると、ツールのクローリング時間が変わる
};
