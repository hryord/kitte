//----------------------------------------------------------------
//
// kitte.js
// Summary: 切手組み合わせ作成JavaScript
// Author : Ayumi Tagawa
//
//----------------------------------------------------------------

//---------------------------------------------------------------
// 初期画面
//---------------------------------------------------------------
$(document).on("pageinit", "#topPage", function()
{
	$("#searchButton").click( function()
	{
		var input_num = $("#input_number").val();
		if( input_num.match( /[^0-9]+/ ) )
		{
			alert("半角数値を入力しください");
			return false; // リンク先に飛ばさない
		}
	});

	//XXX	$("#search_form").validate();
});

//---------------------------------------------------------------
// 設定画面
//---------------------------------------------------------------
$(document).on("pageinit", "#settingPage", function()
{
	// 動的に設定画面を生成する場合は、別htmlにする必要がある。
	/*
	$("#settingPage").on("pageshow", function()
	{
		for( var i=0; stampSet.length; i++ )
		{
			$("#kitte_list").append(
				$("<div/>").attr("data-role", "fieldcontain").append(
					$("<label/>").attr("for", "kitte"+i).text(stampSet[i][0] + "円切手"),
					$("<input/>").attr({"type":"text", "id":"kitte"+i, "value":stampSet[i][1]})
				)
			).trigger('create');
		}
	});
	*/
	
	// TODO:OKボタンをタップした時に設定をlocalstorageに保存する
	/*
	$("#okButton").on("tap", function()
	{
		// 設定のチェックボックスの状態を取得
		var stampList=[];
		$('[name="stamp"]:checked').each( function()
		{
			stampList.push($(this).val());
		});
		
		// ローカルストレージにJSONで保存
		localstorage.setItem("stampList", JSON.stringfy(stampList));
	});
	*/
});

//---------------------------------------------------------------
// 計算結果画面
//---------------------------------------------------------------
$(document).on('pageinit', '#resultPage', function()
{
	$('#resultPage').on('pageshow', function()
	{
		// 切手の計算をする（最小枚数計算）
		// 1) 使用する切手を配列に格納
		// 2)
		var amount = $('#input_number').val();

		// 使用する切手の情報を配列に入れる
		var stampList = [];
		$('[name="stamp"]:checked').each(function() 
		{
			stampList.push($(this).val());
		});

		// 金額の大きい切手から順番に割って、商と余りを計算する
		// 最後の切手まで計算して余りがある場合には「計算できません」と表示
		stampList.sort(desc);
		var resultList = new Array();
		for (var i = 0; i < stampList.length; i++) 
		{
			var sho = Math.floor(amount / stampList[i]);
			if (sho != 0) 
			{
				resultList.push([stampList[i], sho]);
				amount = amount % stampList[i];
				if (amount == 0) break;
			}
		}

		if (amount != 0) 
		{
			alert("組合せがありません");
		}
		else
		{
			$("#resultList").empty();
			resultList.sort(asc);
			for (var i = 0; i < resultList.length; i++) 
			{
				$("#resultList").append(
					$("<tr>").append(
						$("<td>").text(resultList[i][0] + "円切手"),
						$("<td>").text("× " + resultList[i][1] + "枚")
					)
				);
			}
		}

	});
});


//---------------------------------------------------------------
// 共通関数

// 配列昇順ソート
function asc( a, b )
{
	return ( a - b );
}

// 配列降順ソート
function desc( a, b )
{
	return ( b - a );
}



//------------------------------------------------------------------
// バリデーション
jQuery.extend( jQuery.validator.messages, 
{
	required: "必須項目です",
});