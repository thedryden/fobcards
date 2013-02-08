<cfsilent>
<cfstoredproc procedure="app_get_game_cards" datasource="BF">
	<!---P_game_id---><cfprocparam cfsqltype="cf_sql_int" value="#cf_game_id#" />
	<cfprocresult name="sql_game_cards">
</cfstoredproc>
</cfsilent>
<cfoutput>
<cfloop query="sql_game_cards">
	objGame.getPlayer( #deck_id# ).addCard( #card_id#, '#LCase( location )#', #array_position#, #counter# );
</cfloop>
</cfoutput>