<cfsilent>
<cfquery datasource="BF">
	TRUNCATE TABLE card_concat;
</cfquery>
	
<cfquery datasource="BF">
	INSERT INTO card_concat ( card_id )
	SELECT card_id
	FROM card;
</cfquery>

<cfquery name="sql_card" datasource="BF">
	SELECT card_id
	FROM card_concat
</cfquery>

<cfquery name="sql_second_type" datasource="BF">
	SELECT st.card_id
		, st.second_card_type_id
	    , sct.second_card_type
	    , i.url
	FROM card_to_second_type st
		INNER JOIN second_card_type sct
	    	ON st.second_card_type_id= sct.second_card_type_id
    INNER JOIN image i ON sct.image_id = i.image_id
</cfquery>
	
<cfquery name="sql_block_as" datasource="BF">
	SELECT card_id
		, card_type_id
	FROM block_as
</cfquery>
	
<cfquery name="sql_block_as_second_type" datasource="BF">
	SELECT card_id
		, second_card_type_id
	FROM block_as_second_type
</cfquery>
	
<cfquery name="sql_block_cards" datasource="BF">
	SELECT card_id
		, card_type_id
	    , min_damage_blocked
	    , max_damage_blocked
	FROM block_cards
</cfquery>
	
<cfquery name="sql_block_cards_second_type" datasource="BF">
	SELECT card_id
		, second_card_type_id
	    , min_damage_blocked
	    , max_damage_blocked
	FROM block_cards_second_type
</cfquery>
	
<cfquery name="sql_cost_mods" datasource="BF">
	SELECT card_id
	  , cost_type_id
	  , played_turn_only
	  , effect_owner
	  , mod_int
	FROM card_cost_mods
</cfquery>
	
<cfquery name="sql_damage_mods" datasource="BF">
	SELECT card_id
	  , card_type_id
	  , played_turn_only
	  , mod_int
	FROM card_damage_mods
</cfquery>
	
<cfquery name="sql_deffense_mods" datasource="BF">
	SELECT card_id
	  , card_type_id
	  , played_turn_only
	  , mod_int
	FROM card_deffense_mods
</cfquery>

<cfloop query="sql_card">
	<cfset cf_card_id = #card_id#>
	
	<!---Second Card Type--->
	<cfquery name="sql_card_second_type" dbtype="query">
		SELECT second_card_type_id
			, second_card_type
		    , url
		FROM sql_second_type
		WHERE card_id = #cf_card_id#
	</cfquery>
	
	<cfset cf_first = true>
	<cfloop query="sql_card_second_type">
		<cfif cf_first>
			<cfset cf_concat = #second_card_type_id#>
			<cfset cf_concat2 = #second_card_type#>
			<cfset cf_concat3 = #url#>
			<cfset cf_first = false>
		<cfelse>
			<cfset cf_concat = "#cf_concat#,#second_card_type_id#">
			<cfset cf_concat2 = "#cf_concat2#,#second_card_type#">
			<cfset cf_concat3 = "#cf_concat3#,#url#">
		</cfif>
	</cfloop>
	
	<cfif Not cf_first>
		<cfquery datasource="BF">
			UPDATE card_concat
			SET card_to_second_type = '#cf_concat#'
				, card_to_second_type_name = '#cf_concat2#'
				, card_to_second_type_url = '#cf_concat3#'
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	
	<!---Block As--->
	<cfquery name="sql_card_block_as" dbtype="query">
		SELECT card_type_id
		FROM sql_block_as
		WHERE card_id = #cf_card_id#
	</cfquery>
	
	<cfset cf_first = true>
	<cfloop query="sql_card_block_as">
		<cfif cf_first>
			<cfset cf_concat = #card_type_id#>
			<cfset cf_first = false>
		<cfelse>
			<cfset cf_concat = "#cf_concat#,#card_type_id#">	
		</cfif>
	</cfloop>
	
	<cfif Not cf_first>
		<cfquery datasource="BF">
			UPDATE card_concat
			SET block_as = '#cf_concat#'
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	
	<!---Block As Second Type--->
	<cfquery name="sql_card_block_as_second_type" dbtype="query">
		SELECT second_card_type_id
		FROM sql_block_as_second_type
		WHERE card_id = #cf_card_id#
	</cfquery>
	
	<cfset cf_first = true>
	<cfloop query="sql_card_block_as_second_type">
		<cfif cf_first>
			<cfset cf_concat = #second_card_type_id#>
			<cfset cf_first = false>
		<cfelse>
			<cfset cf_concat = "#cf_concat#,#second_card_type_id#">	
		</cfif>
	</cfloop>
	
	<cfif Not cf_first>
		<cfquery datasource="BF">
			UPDATE card_concat
			SET block_as_second_type = '#cf_concat#'
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	
	<!---Block Cards--->
	<cfquery name="sql_card_block_cards" dbtype="query">
		SELECT card_type_id
		    , min_damage_blocked
		    , max_damage_blocked
		FROM sql_block_cards
		WHERE card_id = #cf_card_id#
	</cfquery>
	
	<cfset cf_first = true>
	<cfloop query="sql_card_block_cards">
		<cfif cf_first>
			<cfset cf_concat = #card_type_id#>
			<cfset cf_concat2 = #min_damage_blocked#>
			<cfset cf_concat3 = #max_damage_blocked#>
			<cfset cf_first = false>
		<cfelse>
			<cfset cf_concat = "#cf_concat#,#card_type_id#">
			<cfset cf_concat2 = "#cf_concat2#,#min_damage_blocked#">
			<cfset cf_concat3 = "#cf_concat3#,#max_damage_blocked#">
		</cfif>
	</cfloop>
	
	<cfif Not cf_first>
		<cfquery datasource="BF">
			UPDATE card_concat
			SET block_cards = '#cf_concat#'
				, block_cards_min_damage = '#cf_concat2#'
				, block_cards_max_damage = '#cf_concat3#'
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	
	<!---Block Cards Second Type--->
	<cfquery name="sql_card_block_cards_second_type" dbtype="query">
		SELECT second_card_type_id
		    , min_damage_blocked
		    , max_damage_blocked
		FROM sql_block_cards_second_type
		WHERE card_id = #cf_card_id#
	</cfquery>
	
	<cfset cf_first = true>
	<cfloop query="sql_card_block_cards_second_type">
		<cfif cf_first>
			<cfset cf_concat = #second_card_type_id#>
			<cfset cf_concat2 = #min_damage_blocked#>
			<cfset cf_concat3 = #max_damage_blocked#>
			<cfset cf_first = false>
		<cfelse>
			<cfset cf_concat = "#cf_concat#,#second_card_type_id#">
			<cfset cf_concat2 = "#cf_concat2#,#min_damage_blocked#">
			<cfset cf_concat3 = "#cf_concat3#,#max_damage_blocked#">
		</cfif>
	</cfloop>
	
	<cfif Not cf_first>
		<cfquery datasource="BF">
			UPDATE card_concat
			SET block_cards_second_type = '#cf_concat#'
				, block_cards_second_type_min_damage = '#cf_concat2#'
				, block_cards_second_type_max_damage = '#cf_concat3#'
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	
	<!---Cost Mods--->
	<cfquery name="sql_card_cost_mods" dbtype="query">
		SELECT cost_type_id
		  , played_turn_only
		  , effect_owner
		  , mod_int
		FROM sql_cost_mods
		WHERE card_id = #cf_card_id#
	</cfquery>
	
	<cfset cf_first = true>
	<cfloop query="sql_card_cost_mods">
		<cfif cf_first>
			<cfset cf_concat = #cost_type_id#>
			<cfset cf_concat2 = #played_turn_only#>
			<cfset cf_concat3 = #effect_owner#>
			<cfset cf_concat4 = #mod_int#>
			<cfset cf_first = false>
		<cfelse>
			<cfset cf_concat = "#cf_concat#,#cost_type_id#">
			<cfset cf_concat2 = "#cf_concat2#,#played_turn_only#">
			<cfset cf_concat3 = "#cf_concat3#,#effect_owner#">
			<cfset cf_concat4 = "#cf_concat4#,#mod_int#">
		</cfif>
	</cfloop>
	
	<cfif Not cf_first>
		<cfquery datasource="BF">
			UPDATE card_concat
			SET card_cost_mods = '#cf_concat#'
				, card_cost_mods_played_turn_only = '#cf_concat2#'
				, card_cost_mods_effect_owner = '#cf_concat3#'
				, card_cost_mods_mod_int = '#cf_concat4#'
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	
	<!---Damage Mods--->
	<cfquery name="sql_card_damage_mods" dbtype="query">
		SELECT card_type_id
		  , played_turn_only
		  , mod_int
		FROM sql_damage_mods
		WHERE card_id = #cf_card_id#
	</cfquery>
	
	<cfset cf_first = true>
	<cfloop query="sql_card_damage_mods">
		<cfif cf_first>
			<cfset cf_concat = #card_type_id#>
			<cfset cf_concat2 = #played_turn_only#>
			<cfset cf_concat3 = #mod_int#>
			<cfset cf_first = false>
		<cfelse>
			<cfset cf_concat = "#cf_concat#,#card_type_id#">
			<cfset cf_concat2 = "#cf_concat2#,#played_turn_only#">
			<cfset cf_concat3 = "#cf_concat3#,#mod_int#">
		</cfif>
	</cfloop>
	
	<cfif Not cf_first>
		<cfquery datasource="BF">
			UPDATE card_concat
			SET card_damage_mods = '#cf_concat#'
				, card_damage_mods_played_turn_only = '#cf_concat2#'
				, card_damage_mods_mod_int = '#cf_concat3#'
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	
	<!---Deffense Mods--->
	<cfquery name="sql_card_deffense_mods" dbtype="query">
		SELECT card_type_id
		  , played_turn_only
		  , mod_int
		FROM sql_deffense_mods
		WHERE card_id = #cf_card_id#
	</cfquery>
	
	<cfset cf_first = true>
	<cfloop query="sql_card_deffense_mods">
		<cfif cf_first>
			<cfset cf_concat = #card_type_id#>
			<cfset cf_concat2 = #played_turn_only#>
			<cfset cf_concat3 = #mod_int#>
			<cfset cf_first = false>
		<cfelse>
			<cfset cf_concat = "#cf_concat#,#card_type_id#">
			<cfset cf_concat2 = "#cf_concat2#,#played_turn_only#">
			<cfset cf_concat3 = "#cf_concat3#,#mod_int#">
		</cfif>
	</cfloop>
	
	<cfif Not cf_first>
		<cfquery datasource="BF">
			UPDATE card_concat
			SET card_deffense_mods = '#cf_concat#'
				, card_deffense_mods_played_turn_only = '#cf_concat2#'
				, card_deffense_mods_mod_int = '#cf_concat3#'
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
</cfloop>

</cfsilent>