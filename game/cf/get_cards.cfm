<cfsilent>
<cfstoredproc procedure="app_get_cards" datasource="BF">
	<cfprocresult name="sql_card">
</cfstoredproc>
</cfsilent>
<cfoutput>
<cfloop query="sql_card">
<cfif java_class_name NEQ ''>
if( typeof #java_class_name# == 'function' ){
	tempCard = new #java_class_name#()
} else {
	tempCard = new Card()
}
<cfelse>
tempCard = new Card();
</cfif>
tempCard.init( #card_id#
	, '#name#'
	, #image_id#
	, '#image_url#'
	, '#image_description#'
	, #image_horizontal#
	, #card_type_id#
	, '#card_type#'
	, #card_type_order#
	, #cost_type_id#
	, '#cost_type#'
	, '#cost_url#'
	, #cost#
	, #damage#
	, #resource#
	, '#effect_text#'
	, '#flavor_text#'
	, '#card_to_second_type#'
	, '#card_to_second_type_name#'
	, '#card_to_second_type_url#'
	, '#block_as#'
	, '#block_as_second_type#'
	, '#block_cards#'
	, '#block_cards_min_damage#'
	, '#block_cards_max_damage#'
	, '#block_cards_second_type#'
	, '#block_cards_second_type_min_damage#'
	, '#block_cards_second_type_max_damage#'
	, '#card_cost_mods#'
	, '#card_cost_mods_played_turn_only#'
	, '#card_cost_mods_effect_owner#'
	, '#card_cost_mods_mod_int#'
	, '#card_damage_mods#'
	, '#card_damage_mods_played_turn_only#'
	, '#card_damage_mods_mod_int#'
	, '#card_deffense_mods#'
	, '#card_deffense_mods_played_turn_only#'
	, '#card_deffense_mods_mod_int#'
)

objGame.addCard( tempCard );
</cfloop>
</cfoutput>