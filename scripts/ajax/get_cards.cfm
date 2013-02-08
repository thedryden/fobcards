<cfsilent>
<cfquery name="sql_card" datasource="BF">
	SELECT c.card_id
	  , c.image_id
	  , i.url AS image_url
	  , i.description AS image_description
	  , i.horizontal AS image_horizontal
	  , c.name
	  , c.card_type_id
	  , ct.card_type
	  , c.cost_type_id
	  , cost.cost_type
	  , ci.url AS cost_url
	  , c.cost
	  , c.damage
	  , c.resource
	  , c.effect_text
	  , c.flavor_text
	  , c.java_class_name 
	  , cc.card_to_second_type
	  , cc.card_to_second_type_name
	  , cc.card_to_second_type_url
	  , cc.block_as
	  , cc.block_as_second_type
	  , cc.block_cards
	  , cc.block_cards_min_damage
	  , cc.block_cards_max_damage
	  , cc.block_cards_second_type
	  , cc.block_cards_second_type_min_damage
	  , cc.block_cards_second_type_max_damage
	  , cc.card_cost_mods
	  , cc.card_cost_mods_played_turn_only
	  , cc.card_cost_mods_effect_owner
	  , cc.card_cost_mods_mod_int
	  , cc.card_damage_mods
	  , cc.card_damage_mods_played_turn_only
	  , cc.card_damage_mods_mod_int
	  , cc.card_deffense_mods
	  , cc.card_deffense_mods_played_turn_only
	  , cc.card_deffense_mods_mod_int 
	FROM card c
	  INNER JOIN card_concat cc ON c.card_id = cc.card_id
	  INNER JOIN image i ON c.image_id = i.image_id
	  INNER JOIN card_type ct ON ct.card_type_id = c.card_type_id
	  INNER JOIN cost_type cost ON cost.cost_type_id = c.cost_type_id
	  INNER JOIN image ci ON cost.image_id = ci.image_id;
</cfquery>
</cfsilent>
<cfoutput>
<cfloop query="sql_card">
objGame.addCard( new Card( #card_id#
	, '#name#'
	, #image_id#
	, '#image_url#'
	, '#image_description#'
	, #image_horizontal#
	, #card_type_id#
	, '#card_type#'
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
	, '#card_deffense_mods_mod_int#' )
);
</cfloop>
</cfoutput>