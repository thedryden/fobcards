<cfsilent>
<cfif Not isDefined("cf_sanitize_numeric")>
	<cfinclude template="#Application.pathScripts#/udf.cfc">
</cfif>
<cfset cf_deck_id_one = #cf_sanitize_numeric( cf_deck_id_one )#>
<cfset cf_deck_id_two = #cf_sanitize_numeric( cf_deck_id_two )#>
<cfset cf_game_id = 0>
<cfset cf_index = 0>

<cfset cf_query = "">
<cfset cf_first = true>

<cfstoredproc procedure="app_create_game" datasource="BF">
	<!---P_deck_id_one---><cfprocparam type="in" value="#cf_deck_id_one#" cfsqltype="cf_sql_integer">
	<!---P_deck_id_two---><cfprocparam type="in" value="#cf_deck_id_two#" cfsqltype="cf_sql_integer">
	<!---P_game_id---><cfprocparam type="out" cfsqltype="cf_sql_integer" variable="cf_game_id">
</cfstoredproc>
</cfsilent>
<cfoutput>
<cfif cf_game_id GT -1>
	<cfloop list="#cf_deck_id_one#,#cf_deck_id_two#" index="cf_index">
		<cfquery name="sql_decks" datasource="BF">
			SELECT d.deck_id
			  , dlc.card_id
			  , dlc.quantity
			FROM deck_lists_cards dlc
			  INNER JOIN decks d ON dlc.deck_list_id = d.deck_list_id
			WHERE d.deck_id = #cf_index#
		</cfquery>
		
		<cfset cf_i = 0>
		<cfset cf_position = 0>
		<cfloop query="sql_decks">
			<cfloop from="1" to="#quantity#" index="cf_i">
				<cfsavecontent variable="cf_query">
					#cf_query#<cfif cf_first><cfset cf_first = false><cfelse>, </cfif>
					( #cf_game_id#, #deck_id#, 1, #cf_position#, #card_id#, 0 )
				</cfsavecontent>
				<cfset cf_position++>
			</cfloop>
		</cfloop>
	</cfloop>
	
	<cfquery name="sql_add_cards" datasource="BF">
		INSERT INTO game_cards (
			game_id,
			deck_id,
			location_id,
			array_position,
			card_id,
			counter
		)
		VALUES #cf_query#
	</cfquery>
</cfif>
#cf_game_id#
</cfoutput>