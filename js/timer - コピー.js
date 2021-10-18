/*
トーストを表示する Javascriptライブラリ「Toastr」を利用
*/
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
/*このsetIntervalのfunctionを、最後の行「現在では },180000);」で
指定されたミリ秒ごとに以下の処理を繰り返す。
*/
		var now = new Date();
		var y = now.getFullYear();
		var m = now.getMonth() + 1;
		var d = now.getDate();
		var w = now.getDay();
		var wd = ['日', '月', '火', '水', '木', '金', '土'];
		var h = ("0"+ now.getHours()).slice(-2);
		var mi = ("0"+ now.getMinutes()).slice(-2);
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

//現在時間を変数「now_time」に入れる
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
/*
jsonのプロパティ「startTime」を「startDate」に変更して格納し、
現在時間「now_time」と比較。以下２条件が TRUE なら
トースト通知と音が出る
（１）「startDate」が「now_time」より前の時刻
（２）チェックボックスOFF

また、「window.sessionStorage.setItem(['check' + n],'●●●');」を
使うことで、作業済みチェックボックスがtrueかfalseかをセッションにセットする
*/
							var startDate = y + '/' + m + '/' + d + ' ' + startTime;
							if (startDate < now_time && $('#box-' + n).prop("checked") == false) {

								toastr["error"](list[i].set[j].toasterBody , list[i].set[j].toasterTitle);
								$('#warning' + n).css( 'color', 'red' );
								$("#sound")[0].play();
								window.sessionStorage.setItem(['check' + n],'false');
								c = c + 1;
							}else if($('#box-' + n).prop("checked") == true){
								window.sessionStorage.setItem(['check' + n],'true');
								$('#warning' + n).css( 'color', '#000' );
							}else{
								$('#warning' + n).css( 'color', '#000' );
								window.sessionStorage.setItem(['check' + n],'false');
							}
						}
					n = n + 1;
					}
					if (c != 0){
						changeFavicon(0);
					}else{
						returnFavicon ();
					}
				}
			});
			$.ajaxSetup({async: true});
		}
		setToast();
	},180000);
};
