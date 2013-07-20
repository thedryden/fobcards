<cfoutput>
<cfinclude template="../templates/root_paths.cfm">
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  	<link rel="stylesheet" type="text/css" media="screen" href="css/game.css" />
  	<link rel="stylesheet" type="text/css" media="screen" href="css/cards.css" />
  	<link rel="stylesheet" type="text/css" media="screen" href="#application.pathCss#/general.css" />

	<script src="#application.pathScripts#/jquery-1.7.2.min.js" type="text/javascript"></script>
	<script src="#application.pathScripts#/pathes.js" type="text/javascript"></script>
	<script src="#application.pathScripts#/general.js" type="text/javascript"></script>
	
	<script src="js/game.js" type="text/javascript"></script>
	<script src="js/controls.js" type="text/javascript"></script>
	
	<script src="js/player.js" type="text/javascript"></script>
	<script src="js/players/playerplayer.js" type="text/javascript"></script>
	<script src="js/players/playerai.js" type="text/javascript"></script>
	
	<script src="js/card.js" type="text/javascript"></script>
	<script src="js/cards.js" type="text/javascript"></script>
	
	<script src="js/cards/mp.js" type="text/javascript"></script>	
	<script src="js/cards/tithe.js" type="text/javascript"></script>
	<script src="js/cards/gastrap.js" type="text/javascript"></script>
	<script src="js/cards/arrowtrap.js" type="text/javascript"></script>
	<script src="js/cards/greasetrap.js" type="text/javascript"></script>
	<script src="js/cards/advance.js" type="text/javascript"></script>
	<script src="js/cards/beat.js" type="text/javascript"></script>
	
	<title>Field of Battle (cards)</title>
</head>

<body>
<a href="#application.pathRoot#/"><img src="#application.pathImages#/field_of_battle_cards.png" /></a>
<div name="div_window" id="div_window">
<div name="div_opp" id="div_opp"><div class="relative">
	<span name="sp_opp_class" id="sp_opp_class" class="sp_class">Fighter</span>
	<span name="sp_opp_player" id="sp_opp_player" class="sp_name">HAL</span>
	
	<span name="sp_opp_momentum_container" id="sp_opp_momentum_container" class="sp_momentum" onClick="objGame.getControls().expandCostBox( 'sp_opp_momentum_container' )">
		<img src="#Application.pathImages#\momentum.png" />
		<span name="sp_opp_momentum" id="sp_opp_momentum">0</span>
		<br /><br />
		<b>Mods:</b><br />
		<hr />
		<b>Momentum:</b>
			<span name="sp_opp_momentum_cost_mod" id="sp_opp_momentum_cost_mod" class="right_align">0</span><br />
		<b>Damage:</b>
			<span name="sp_opp_momentum_damage_mod" id="sp_opp_momentum_damage_mod" class="right_align">0</span><br />
		<b>Deffense:</b>
			<span name="sp_opp_momentum_deffense_mod" id="sp_opp_momentum_deffense_mod" class="right_align">0</span><br />
	</span>
	
	<span name="sp_opp_mp_container" id="sp_opp_mp_container" class="sp_mp" onClick="objGame.getControls().expandCostBox( 'sp_opp_mp_container' )">
		<img src="#Application.pathImages#\mp.png" />
		<span name="sp_opp_mp" id="sp_opp_mp">0</span>
		<br /><br />
		<b>Mods:</b><br />
		<hr />
		<b>MP:</b>
			<span name="sp_opp_mp_cost_mod" id="sp_opp_mp_cost_mod" class="right_align">0</span><br />
		<b>Damage:</b>
			<span name="sp_opp_mp_damage_mod" id="sp_opp_mp_damage_mod" class="right_align">0</span><br />
		<b>Deffense:</b>
			<span name="sp_opp_mp_deffense_mod" id="sp_opp_mp_deffense_mod" class="right_align">0</span><br />
	</span>
	
	<span name="sp_opp_gold_container" id="sp_opp_gold_container" class="sp_gold" onClick="objGame.getControls().expandCostBox( 'sp_opp_gold_container' )">
		<img src="#Application.pathImages#\gold.png" />
		<span name="sp_opp_gold" id="sp_opp_gold">0</span>
		<br /><br />
		<b>Calculations:</b><br />
		<hr />
		<b>Starting Gold:</b>
			<span name="sp_opp_gold_start" id="sp_opp_gold_start" class="right_align">0</span><br />
	</span>
	
	<span name="sp_opp_gods_container" id="sp_opp_gods_container" class="sp_good" onClick="objGame.getControls().expandCostBox( 'sp_opp_gods_container' )">
		<img name="img_opp_god_icon" id="img_opp_god_icon" src="#Application.pathImages#\piety.png" />
		<span name="sp_opp_gods" id="sp_opp_gods">0</span>
		<br /><br />
		<b>Calculations:</b><br />
		<hr />
		<b>Total Prayers:</b>
			<span name="sp_opp_gods_total" id="sp_opp_gods_total" class="right_align">0</span><br />
		<b>Spent Prayers:</b>
			<span name="sp_opp_gods_spent" id="sp_opp_gods_spent" class="right_align">0</span><br />
	</span>
	
	<img class="img_deck" src="#Application.pathImages#\deck_icon.png" />
	<div name="div_opp_deck" id="div_opp_deck" class="div_deck">?</div>
	
	<img class="img_hand" src="#Application.pathImages#\hand_icon.png" />
	<div name="div_opp_hand" id="div_opp_hand" class="div_hand">?</div>
	
	<img name="img_opp_field" id="img_opp_field" class="img_field" src="#Application.pathImages#\field_icon.png" onClick="objGame.showCards( false, 'field' );" />
	<div name="div_opp_field" id="div_opp_field" class="div_field"  onClick="objGame.showCards( false, 'field' );">?</div>
	<img name="img_opp_field_return" id="img_opp_field_return" class="img_field" src="#Application.pathImages#\return_icon.png" onClick="objGame.getControls().changePosition( 'return' );objGame.getControls().changePositionAnimate('');" style="display: none;" />
	
	<img name="img_opp_discard" id="img_opp_discard" class="img_discard" src="#Application.pathImages#\discard_icon.png" onClick="objGame.showCards( false, 'discard' )" />
	<div name="div_opp_discard" id="div_opp_discard" class="div_discard" onClick="objGame.showCards( false, 'discard' )">?</div>
	<img name="img_opp_discard_return" id="img_opp_discard_return" class="img_discard" src="#Application.pathImages#\return_icon.png" onClick="objGame.getControls().changePosition( 'return' );objGame.getControls().changePositionAnimate('')" style="display: none;" />
	
	<img name="img_opp_removed" id="img_opp_removed" class="img_removed" src="#Application.pathImages#\removed_icon.png" onClick="objGame.showCards( false, 'removed' )" />
	<div name="div_opp_removed" id="div_opp_removed" class="div_removed" onClick="objGame.showCards( false, 'removed' )">?</div>
	<img name="img_opp_removed_return" id="img_opp_removed_return" class="img_removed" src="#Application.pathImages#\return_icon.png" onClick="objGame.getControls().changePosition( 'return' );objGame.getControls().changePositionAnimate('')" style="display: none;" />
</div></div>
<div name="div_player" id="div_player"><div class="relative">
	<span name="sp_player_class" id="sp_player_class" class="sp_class">Fighter</span>
	<span name="sp_player_player" id="sp_player_player" class="sp_name">thedryden</span>
	
		<span name="sp_player_momentum_container" id="sp_player_momentum_container" class="sp_momentum" onClick="objGame.getControls().expandCostBox( 'sp_player_momentum_container' )">
		<img src="#Application.pathImages#\momentum.png" />
		<span name="sp_player_momentum" id="sp_player_momentum">0</span>
		<br /><br />
		<b>Mods:</b><br />
		<hr />
		<b>Momentum:</b>
			<span name="sp_player_momentum_cost_mod" id="sp_player_momentum_cost_mod" class="right_align">0</span><br />
		<b>Damage:</b>
			<span name="sp_player_momentum_damage_mod" id="sp_player_momentum_damage_mod" class="right_align">0</span><br />
		<b>Deffense:</b>
			<span name="sp_player_momentum_deffense_mod" id="sp_player_momentum_deffense_mod" class="right_align">0</span><br />
	</span>
	
	<span name="sp_player_mp_container" id="sp_player_mp_container" class="sp_mp" onClick="objGame.getControls().expandCostBox( 'sp_player_mp_container' )">
		<img src="#Application.pathImages#\mp.png" />
		<span name="sp_player_mp" id="sp_player_mp">0</span>
		<br /><br />
		<b>Mods:</b><br />
		<hr />
		<b>MP:</b>
			<span name="sp_player_mp_cost_mod" id="sp_player_mp_cost_mod" class="right_align">0</span><br />
		<b>Damage:</b>
			<span name="sp_player_mp_damage_mod" id="sp_player_mp_damage_mod" class="right_align">0</span><br />
		<b>Deffense:</b>
			<span name="sp_player_mp_deffense_mod" id="sp_player_mp_deffense_mod" class="right_align">0</span><br />
	</span>
	
	<span name="sp_player_gold_container" id="sp_player_gold_container" class="sp_gold" onClick="objGame.getControls().expandCostBox( 'sp_player_gold_container' )">
		<img src="#Application.pathImages#\gold.png" />
		<span name="sp_player_gold" id="sp_player_gold">0</span>
		<br /><br />
		<b>Calculations:</b><br />
		<hr />
		<b>Starting Gold:</b>
			<span name="sp_player_gold_start" id="sp_player_gold_start" class="right_align">0</span><br />
	</span>
	
	<span name="sp_player_gods_container" id="sp_player_gods_container" class="sp_good" onClick="objGame.getControls().expandCostBox( 'sp_player_gods_container' )">
		<img name="img_player_god_icon" id="img_player_god_icon" src="#Application.pathImages#\piety.png" />
		<span name="sp_player_gods" id="sp_player_gods">0</span>
		<br /><br />
		<b>Calculations:</b><br />
		<hr />
		<b>Total Prayers:</b>
			<span name="sp_player_gods_total" id="sp_player_gods_total" class="right_align">0</span><br />
		<b>Spent Prayers:</b>
			<span name="sp_player_gods_spent" id="sp_player_gods_spent" class="right_align">0</span><br />
	</span>
	
	<img class="img_deck" src="#Application.pathImages#\deck_icon.png" />
	<div name="div_player_deck" id="div_player_deck" class="div_deck">?</div>
	
	<img name="img_player_hand" id="img_player_hand" class="img_hand" src="#Application.pathImages#\hand_icon.png" onClick="objGame.showCards( true, 'hand' );" />
	<div name="div_player_hand" id="div_player_hand" class="div_hand" onClick="objGame.showCards( true, 'hand' );">?</div>
	<img name="img_player_hand_return" id="img_player_hand_return" class="img_hand" src="#Application.pathImages#\return_icon.png" onClick="objGame.getControls().changePosition( 'return' );objGame.getControls().changePositionAnimate('')" style="display: none;" />
	
	<img name="img_player_field" id="img_player_field" class="img_field" src="#Application.pathImages#\field_icon.png" onClick="objGame.showCards( true, 'field' );" />
	<div name="div_player_field" id="div_player_field" class="div_field" onClick="objGame.showCards( true, 'field' );">?</div>
	<img name="img_player_field_return" id="img_player_field_return" class="img_field" src="#Application.pathImages#\return_icon.png" onClick="objGame.getControls().changePosition( 'return' );objGame.getControls().changePositionAnimate('')" style="display: none;" />
	
	<img name="img_player_discard" id="img_player_discard" class="img_discard" src="#Application.pathImages#\discard_icon.png" onClick="objGame.showCards( true, 'discard' );" />
	<div name="div_player_discard" id="div_player_discard" class="div_discard" onClick="objGame.showCards( true, 'discard' );">?</div>
	<img name="img_player_discard_return" id="img_player_discard_return" class="img_discard" src="#Application.pathImages#\return_icon.png" onClick="objGame.getControls().changePosition( 'return' );objGame.getControls().changePositionAnimate('')" style="display: none;" />
	
	<img name="img_player_removed" id="img_player_removed" class="img_removed" src="#Application.pathImages#\removed_icon.png" onClick="objGame.showCards( true, 'removed' );" />
	<div name="div_player_removed" id="div_player_removed" class="div_removed" onClick="objGame.showCards( true, 'removed' );">?</div>
	<img name="img_player_removed_return" id="img_player_removed_return" class="img_removed" src="#Application.pathImages#\return_icon.png" onClick="objGame.getControls().changePosition( 'return' );objGame.getControls().changePositionAnimate('')" style="display: none;" />
</div></div>
<div name="div_p1" id="div_p1">
	<div name="div_p1_text" id="div_p1_text" class="main_content_text"></div>
	<div name="div_p1_cards" id="div_p1_cards" class="main_content_cards"></div>
</div>
<div name="div_p1_non_game" id="div_p1_non_game">
	<div name="div_p1_non_game_text" id="div_p1_non_game_text" class="main_content_text"></div>
	<div name="div_p1_non_game_cards" id="div_p1_non_game_cards" class="main_content_cards"></div>
</div>
<div name="div_p1_card_details" id="div_p1_card_details" style="display: none;">
	<span class="full_card">
		<span name="sp_img_p1" id="sp_img_p1"></span>
		<p class="card" name="p_p1_second_type" id="p_p1_second_type"></p>
		<b><p class="card" name="p_p1_name" id="p_p1_name"></p></b>
		<p class="card"><b>Cost:</b> <span name="sp_p1_cost" id="sp_p1_cost"></span>	
		<p class="card"><b>Damage:</b> <span name="sp_p1_damage" id="sp_p1_damage"></span></p>
		<p class="card"><b>Effect:</b> <span name="sp_p1_effect" id="sp_p1_effect"></span></p>
	</span>
	<br />
	<button name="bt_p1_commit" id="bt_p1_commit">Confrim</button>
	<button name="bt_p1_cancel" id="bt_p1_cancel" onClick="objGame.getControls().hideCardDetails()">Cancel</button>
</div>
<div name="div_p2" id="div_p2">
	<div name="div_p2_text" id="div_p2_text" class="main_content_text"></div>
	<div name="div_p2_cards" id="div_p2_cards" class="main_content_cards"></div>
</div>
<div name="div_p2_sub" id="div_p2_sub"></div>
<div name="div_p3" id="div_p3">
	<div name="div_p3_text" id="div_p3_text" class="main_content_text"></div>
	<div name="div_p3_cards" id="div_p3_cards" class="main_content_cards"></div>
</div>
<div name="div_p2_card_details" id="div_p2_card_details" style="display: none;">
	<span class="full_card">
		<span name="sp_img_p2" id="sp_img_p2"></span>
		<p class="card" name="p_p2_second_type" id="p_p2_second_type"></p>
		<b><p class="card" name="p_p2_name" id="p_p2_name"></p></b>
		<p class="card"><b>Cost:</b> <span name="sp_p2_cost" id="sp_p2_cost"></span></p>
		<p class="card"><b>Damage:</b> <span name="sp_p2_damage" id="sp_p2_damage"></span></p>
		<p class="card"><b>Effect:</b> <span name="sp_p2_effect" id="sp_p2_effect"></span></p>
	</span>
	<br />
	<button name="bt_p2_commit" id="bt_p2_commit">Confrim</button>
	<button name="bt_p2_cancel" id="bt_p2_cancel" onClick="objGame.getControls().hideCardDetails()">Cancel</button>
</div>
<div name="div_p3_non_game" id="div_p3_non_game">
	<div name="div_p3_non_game_text" id="div_p3_non_game_text" class="main_content_text"></div>
	<div name="div_p3_non_game_cards" id="div_p3_non_game_cards" class="main_content_cards"></div>
</div>
<div name="div_p3_card_details" id="div_p3_card_details" style="display: none;">
	<span class="full_card">
		<span name="sp_img_p3" id="sp_img_p3"></span>
		<p class="card" name="p_p3_second_type" id="p_p3_second_type"></p>
		<b><p class="card" name="p_p3_name" id="p_p3_name"></p></b>
		<p class="card"><b>Cost:</b> <span name="sp_p3_cost" id="sp_p3_cost"></span>
		<p class="card"><b>Damage:</b> <span name="sp_p3_damage" id="sp_p3_damage"></span></p>
		<p class="card"><b>Effect:</b> <span name="sp_p3_effect" id="sp_p3_effect"></span></p>
	</span>
	<br />
	<button name="bt_p3_commit" id="bt_p3_commit">Confrim</button>
	<button name="bt_p3_cancel" id="bt_p3_cancel" onClick="objGame.getControls().hideCardDetails()" />Cancel</button>
</div>
<div name="div_screen" id="div_screen"></div>
</div>

<script type="text/javascript">
$(document).ready(function(){
	objGame = new Game( 11 );
});
</script>

</body>
</cfoutput>