$(document).ready(function(){
	var dataTooltip, insertHtml;

	// ツールチップ表示処理
//	$('.tgTtip').on('click' , function(e){alert();
	$('body').on('click' , '.tgTtip' , function(e){
		e.preventDefault();		 // hrefが無効になり、画面遷移が行わない

		// クリックされた要素の"data-tooltip"（ツールチップ内容）を取得
		dataTooltip = $(this).attr('data-tooltip');

		// (html最後に挿入する)ツールチップ用pタグを作成
		insertHtml = '<p class="tgToolTip">' + dataTooltip + '</p>';

		// pタグをhtmlの最後に挿入
		$('body').append(insertHtml);

		// クリックされた [?] アイコンの座標を取得
		var position = $(this).position();
		var newPositionTop = position.top +20;	  // +数値で下方向へ移動
		var newPositionLeft = position.left + 0;   // +数値で右方向へ移動

		// 出現するツールチップの位置を調整
		$(".tgToolTip").css({'top': newPositionTop + 'px', 'left': newPositionLeft + 'px'});

		// (ツールチップの非表示処理) 非表示なクリック領域を展開
		$('body').append('<p class="dummy"></p>');
	});

	// "ツールチップ以外の領域"をクリックでツールチップを隠す処理
	$('body').on('click', '.dummy', function(){
		$('p.tgToolTip').remove();
		$('p.dummy').remove();
	});
});
