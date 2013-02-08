<cfsilent>

<cfset cf_header_title = "Choose Cards in your Deck">

<cfset cf_add_to_head = "">
<cfsavecontent variable="cf_add_to_head"><cfoutput>
	<link rel="stylesheet" type="text/css" media="screen" href="select_cards.css" />
</cfoutput></cfsavecontent>

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">
<cfinclude template="#Application.pathScripts#/gameUdf.cfc">

<cfif Not isDefined("url.cf_action")>
	<cfset url.cf_action = "add">
</cfif>

<cfif url.cf_action NEQ "add" AND Not isDefined("cf_deck_id")>
	<cfset url.cf_deck_id = 0>
	<cfset url.cf_action = "add">
<cfelseif Not isDefined("cf_deck_id")>
	<cfset url.cf_deck_id = 0>
</cfif>

<cfset cf_class = 1>
<cfset cf_equip_max = 4>
<cfset cf_deck_max = 60>

<cfset cf_i = 0 />
<cfset cf_last_card_type = 0 />
<cfset this_card_type_id = 0 />
<cfset cf_first_divine = true />

<cfif url.cf_action EQ "add">
	<cfset cf_action_text = "Create">
<cfelseif url.cf_action EQ "edit">
	<cfset cf_action_text = "Edit">
<cfelseif url.cf_action EQ "copy">
	<cfset cf_action_text = "Copy">
</cfif>

</cfsilent>
<cfoutput>
#header#

<cfquery name="sql_cards" DAtasource="BF">
SELECT c.card_id
	, c.card_type_id
	, CASE WHEN a.alignment_id IS NULL THEN 0 ELSE 1 END AS divine
	, ct.card_type
	, ct.card_type_order
	, c.name
	, c.cost
	, c.cost_type_id
	, co.cost_type
	, ci.url AS cost_icon
	, c.damage
	, c.effect_text
	, c.image_id
	, i.url
	, c.quantity
	, coalesce( dlc.quantity, 0 ) AS selected
FROM card c
	INNER JOIN image i ON c.image_id = i.image_id
	INNER JOIN card_type ct ON c.card_type_id = ct.card_type_id
	INNER JOIN cost_type co ON c.cost_type_id = co.cost_type_id
	INNER JOIN image ci ON co.image_id = ci.image_id
	LEFT JOIN alignments a ON c.card_type_id = a.card_type_id
	LEFT JOIN deck_lists_cards dlc 
		ON dlc.deck_list_id = ( SELECT deck_list_id FROM decks WHERE deck_id = #url.cf_deck_id# )
		AND c.card_id = dlc.card_id
WHERE c.system_card = 0
	AND ( c.class_id IS NULL OR c.class_id = #cf_class# )
ORDER BY ct.card_type_order
	, c.cost
	, c.name
</cfquery>

<cfquery name="sql_card_types" dbtype="query">
	SELECT card_type_id
		, card_type
		, divine
	FROM sql_cards
	GROUP BY card_type_id
		, card_type
		, divine
	ORDER BY card_type_order
</cfquery>

<cfquery name="sql_second_card_type" datasource="BF">
	SELECT cts.card_id
		, cts.second_card_type_id
		, sc.second_card_type
		, i.url
	FROM card_to_second_type cts
		INNER JOIN second_card_type sc ON cts.second_card_type_id = sc.second_card_type_id
		INNER JOIN image i ON sc.image_id = i.image_id
	ORDER BY cts.card_id
		, sc.second_card_type_order
</cfquery>

<h1 name="h_card_type_top" id="h_card_type_top">#cf_action_text# a Deck</h1>

<p>You must provide a deck name and description, to help you find your deck latter and descripbe the deck to other users - if you choose to make this deck public.</p>

<p>Next you must choose an alignment.
	The alignment of a deck determine which of the three kind of divine cards you can have in you deck.
	If you are not planning on having any divine cards in you deck it is recomende that you choose a netural alignment as some cards may be more powerful when played against either a Good or Evil alignment.
</p>

<p>Third you choose your decks privacy settings.
	Decks can be set to one of the following privacy settings:
	<ul>
	<li>Public (Default) - anyone can view your deck in the deck repositorty and its stats will be public and its stats such as win/loss ratio and ranking, will be shared.</li>
	<li>Share Stats - the decks stats - such as win/loss ratio and ranking, only will be shared.</li>
	<li>Private - neither the decklist nor its stats will be shared with the comunity.</li>
	</ul>
	Regardless of the privicy settings you select your if you choose to share you deck, such as by posting it on deck discussion forum, it will be shared.
</p>

<p>Finally you may select up two 4 equipment card and must select exsactly #cf_deck_max# other cards from the cards below.
	The cards are broken up by selection and you can add cards to your deck by either clicking on the card - which will increment the number of that card in your deck by one - or you can use the provide controls to select the number of cards.
		Each type of card is given its own section, and next to the section headings is a drop down box you may use to jump to another section.
</p>

<form name="frm_cards" id="frm_cards" method="post" action="create_deck.cfm">
<input name="frm_action" id="frm_action" type="hidden" value="#url.cf_action#" />
<input name="frm_deck_id" id="frm_deck_id" type="hidden" value="#url.cf_deck_id#" />
<input name="frm_class" id="frm_class" type="hidden" value="#cf_class#" />
<label><p>
	<span class="small_form">Deck Name:</span>
	<input name="frm_name" id="frm_name" type="text" class="small_form" />
</p></label>

<p><label>Deck Description: 
	<br /><textarea name="frm_description" id="frm_description" class="small_form"></textarea></label></p>
<label><p>
	<span class="small_form">Privacy Settings:</span>
	<select name="frm_privacy" id="frm_privacy">
	<option value="1">Public</option>
	<option value="2">Stats Only</option>
	<option value="3">Private</option>
	</select>
</p></label>

<cfquery name="sql_alignments" datasource="BF">
	SELECT alignment_id
		, alignment
		, card_type_id
		, cost_type_id
	FROM alignments
	ORDER BY alignment_id;
</cfquery>
<label><p>
	<span class="small_form">Alignment:</span>
	<select name="frm_alignment" id="frm_alignment" onChange="filterAlignment();">
	<cfloop query="sql_alignments">
		<option value="#alignment_id#">#alignment#</option>
	</cfloop>
	</select>
</p></label>

<p>To Jump to a Card Type Section Click a Card Count:
<div name="summary-anchor" id="summary-anchor"></div>
<div name="summary" id="summary">

<b name="b_count" id="b_count">Card<br />Counts:</b>

<div name="equipment" id="equipment" onClick="cardTypeJumpToInt( 7 )">
	<b>Equipment:</b>
	<div name="equipment_value" id="equipment_value">
		<span name="value_7" id="value_7">0</span> (#cf_equip_max#)
	</div>
</div>

<b name="b_deck" id="b_deck">Deck:</b>

<div name="total" id="total" onClick="cardTypeJumpToInt( 'top' )">
	<b>Total:</b>
	<div name="total_value_box" id="total_value_box">
		<span name="total_value" id="total_value">0</span> (#cf_deck_max#)
	</div>
</div>

<div name="attack" id="attack" onClick="cardTypeJumpToInt( 1 )">
	<b>Attacks:</b>
	<div name="attack_value" id="attack_value">
		<span name="value_1" id="value_1">0</span>
	</div>
</div>

<div name="magic" id="magic" onClick="cardTypeJumpToInt( 2 )">
	<b>Magic:</b>
	<div name="magic_value" id="magic_value">
		<span name="value_2" id="value_2">0</span>
	</div>
</div>

<div name="item" id="item" onClick="cardTypeJumpToInt( 3 )">
	<b>Item:</b>
	<div name="item_value" id="item_value">
		<span name="value_3" id="value_3">0</span>
	</div>
</div>

<div name="good" id="good" style="display: none;" onClick="cardTypeJumpToInt( 4 )">
	<b>Good:</b>
	<div name="good_value" id="good_value">
		<span name="value_4" id="value_4">0</span>
	</div>
</div>

<div name="evil" id="evil" style="display: none;" onClick="cardTypeJumpToInt( 5 )">
	<b>Evil:</b>
	<div name="evil_value" id="evil_value">
		<span name="value_5" id="value_5">0</span>
	</div>
</div>

<div name="neutral" id="neutral" style="display: none;" onClick="cardTypeJumpToInt( 6 )">
	<b>Nature:</b>
	<div name="neutral_value" id="neutral_value">
		<span name="value_6" id="value_6">0</span>
	</div>
</div>

<div name="block" id="block" onClick="cardTypeJumpToInt( 8 )">
	<b>Block:</b>
	<div name="block_value" id="block_value">
		<span name="value_8" id="value_8">0</span>
	</div>
</div>

</div>
</p>

<br /><br /><br /><br /><br />

<input type="submit" value="#cf_action_text# Your Deck!" />

<cfloop query="sql_cards">
	<cfif cf_last_card_type NEQ card_type_id>
		<h3 name="h_card_type_#card_type_id#" id="h_card_type_#card_type_id#" class="fake_#cost_type_id#">#card_type#
			(<span name="sp_count_#card_type_id#" id="sp_count_#card_type_id#">0</span>)
			<cfset cf_first_divine = true />
			<select name="sel_#card_type_id#" id="sel_#card_type_id#" onChange="cardTypeJumpTo( 'sel_#card_type_id#' )">
			<option value="">Jump to a Card Type</option>
			<option value="top">Top of Page</option>
			<cfset this_card_type_id = #card_type_id#>
			<cfloop query="sql_card_types">
				<cfif card_type_id NEQ this_card_type_id AND divine EQ 0>
					<option value="#card_type_id#">#card_type#</option>
				<cfelseif cf_first_divine>
					<cfset cf_first_divine = false>
					<option value="0">Divine</option>
				</cfif>
			</cfloop>
			</select>
			<input type="submit" value="#cf_action_text# Your Deck!" />
		</h3>
	</cfif>
	<cfset cf_last_card_type = card_type_id>

	<cfquery name="sql_one_card_second_type" dbtype="query">
		SELECT url
		FROM sql_second_card_type
		WHERE card_id = #card_id#
	</cfquery>
	
	<span class="full_card_wrapper fake_#cost_type_id#">
	<span class="small_card" onClick="increment<cfif quantity GT 4>_select</cfif>( #card_id# )">
		<img class="card" src="#Application.pathImages#/#url#" />
		<cfif sql_one_card_second_type.recordCount GT 0>
			<p class="card">
			<cfloop query="sql_one_card_second_type">
				<img src="#Application.pathImages#/#url#" />
			</cfloop>
			</p>
		</cfif>
		<p class="card"><b>#name#</b></p>
		<p class="card"><b>Cost:</b> #cost#
		<img src="#Application.pathImages#/#cost_icon#" /></p>
		<p class="card"><b>Damage:</b> #damage#</p>
		
		<p class="card"><b>Effect:</b> #cf_effect_icon( effect_text )#</p>
	</span>
	<br />
	<cfif quantity GT 4>
		<select name="frm_#card_id#" id="frm_#card_id#" class="fake_data fake_type_#card_type_id#<cfif divine EQ 1> fake_divine</cfif>" onChange="total();">
		<cfloop from="0" to="#quantity#" index="cf_i">
			<option value="#cf_i#"<cfif selected EQ #cf_i#> selected="true"</cfif>>#cf_i#</option>
		</cfloop>
		</select>
	<cfelse>
		<cfloop from="0" to="#quantity#" index="cf_i">
			<label>#cf_i# <input name="frm_#card_id#" id="frm_#card_id#" type="radio" value="#cf_i#"<cfif selected EQ #cf_i#> checked="true"</cfif> class="fake_data fake_type_#card_type_id#<cfif divine EQ 1> fake_divine</cfif>" onChange="total();" /></label>
		</cfloop>
	</cfif>
	</span>
	
	
</cfloop>
<br /><br />
<input type="submit" value="#cf_action_text# Your Deck!" />
</form>

<script type="text/javascript">
var tableTop = 0;
	
$(document).ready(function(){
	filterAlignment();
});

$(function() { 
	var a = function() { 
		var b = $(window).scrollTop();
		var c = $("##summary");
		var d = $("##summary-anchor").offset().top;
		if (b > d) { 
			c.css({position:"fixed",top:"0px"}) 
		} else { 
			c.css({position:"absolute",top:""}) 
		} 
	};
	$(window).scroll(a);a() 
}); 

function increment( cardID ){
	checkedValue = $("input[id='frm_" + cardID +  "']:checked").val()
	checkedValue++;
	$("input[id='frm_" + cardID +  "']:nth(" + checkedValue + ")").attr( "checked", "true" )
	if( checkedValue != $("input[id='frm_" + cardID +  "']:checked").val() ){
		$("input[id='frm_" + cardID +  "']:nth(0)").attr( "checked", "true" )
	}
	
	total();
}

function increment_select( cardID ){
	var nextIndex = $('##frm_' + cardID).prop( 'selectedIndex' ) + 1;
		
	if( nextIndex >= $('##frm_' + cardID + ' option').length )
		nextIndex = 0;
		
	$('##frm_' + cardID).prop( 'selectedIndex', nextIndex );
	
	total();
}

function total(){
	var cardCount = 0;
	var equipCount = 0;
	var cardTypeCount = 0;

	<cfloop query="sql_card_types">
		cardTypeCount = 0;
		$("input[class~='fake_type_#card_type_id#']:radio:checked").each(function(){
			cardTypeCount += parseInt($(this).val())
		});
		$("select[class~='fake_type_#card_type_id#']").each(function(){
			cardTypeCount += parseInt($(this).val())
		});
		$('##value_#card_type_id#').html( cardTypeCount )
		$('##sp_count_#card_type_id#').html( cardTypeCount );
		<cfif card_type_id EQ 7>
			cardCount -= cardTypeCount;
			equipCount = cardTypeCount;
			
			if( cardTypeCount > #cf_equip_max# ){
				$('###lcase( Card_Type )#_value').css({ 
					'color': 'red',
					'border-color': 'black'
				})
			} else {
				$('###lcase( Card_Type )#_value').css({ 
					'color': 'black'
				})
			}
		</cfif>
	</cfloop>
	
	$("input[type='radio'][class~='fake_data']:checked").each(function(){
		cardCount += parseInt($(this).val())
	});
	$("select[class~='fake_data']").each(function(){
		cardCount += parseInt($(this).val())
	});
	
	$('##total_value').html( cardCount );
	$('##sp_count_total').html( cardCount );
	
	if( cardCount > #cf_deck_max# ){
		$('##total_value').css({ 
			'color': 'red',
			'border-color': 'black'
		})
	} else {
		$('##total_value').css({ 
			'color': 'white'
		})
	}
	
	if( cardCount == #cf_deck_max# && equipCount <= #cf_equip_max# ){
		$('input[type="submit"]').each(function(){
			$(this).removeAttr( 'disabled' );
		});
	} else {
		$('input[type="submit"]').each(function(){
			$(this).attr( 'disabled', 'true' );
		});
	}
}

function cardTypeJumpTo( selectBox ){
	cardTypeJumpToInt( $('##' + selectBox).val() );
	$('##' + selectBox).prop( 'selectedIndex', 0 );
}

function cardTypeJumpToInt( jumpToInt ){
	if( jumpToInt == 0 ){
		var alignment = $('##frm_alignment').val();
		
		switch( parseInt( alignment ) ){
		<cfloop query="sql_alignments">
			case #alignment_id#:
				jumpToInt = #card_type_id#;
				break;
		</cfloop>
		}
	}
	
	jumpTo = 'h_card_type_' + jumpToInt;
	
	scrollTo( jumpTo, 85 );
}

function filterAlignment(){
	var alignment = $('##frm_alignment').val();
	var cost_type = 0;
	var alignment_name = '';
	
	switch( parseInt( alignment ) ){
	<cfloop query="sql_alignments">
		case #alignment_id#:
			cost_type = #cost_type_id#;
			alignment_name = '#lcase( alignment )#';
			break;
	</cfloop>
	}
	
	if( cost_type == 0 ) return;

	<cfloop query="sql_alignments">
		$('.fake_#cost_type_id#').each(function(){
			$(this).hide();
		});
		$('###lcase( alignment )#').hide();
	</cfloop>
	
	$('.fake_divine:radio').each(function(){
		$(this).filter('[value="0"]').attr('checked', true); 
	});
	$('select[class="fake_divine"]').each(function(){
		$(this).prop( 'selectedIndex', 0 );
	});
	
	$('.fake_' + cost_type).each(function(){
		$(this).show();
	});
	
	$('##' + alignment_name ).show();
	
	total();
}
</script>

#footer#
</cfoutput>