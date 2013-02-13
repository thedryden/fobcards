<cfsilent>
<cfstoredproc procedure="app_get_game" datasource="BF">
	<!---P_game_id---><cfprocparam cfsqltype="cf_sql_int" value="#cf_game_id#" />
	<cfprocresult name="sql_game">
</cfstoredproc>
</cfsilent>
<cfoutput>
<cfloop query="sql_game">
	var objPlayer = new PlayerPlayer( #deck_id_one#
		, '#player_one#'
		, '#name_one#'
		, #class_id_one#
		, '#class_one#'
		, #hand_size_one#
		, #initiative_one#
		, #gold_one#
		, '#ability_one#'
		, '#url_one#'
		, '#alt_one#'
		, #deck_id_two# );
	objGame.addPlayer( objPlayer, 0)
	var objPlayer = new PlayerPlayer( #deck_id_two#
		, '#player_two#'
		, '#name_two#'
		, #class_id_two#
		, '#class_two#'
		, #hand_size_two#
		, #initiative_two#
		, #gold_two#
		, '#ability_two#'
		, '#url_two#'
		, '#alt_two#'
		, #deck_id_one# );
	objGame.addPlayer( objPlayer, 1)
	
	<cfif deck_id_one EQ deck_id_current_turn>
		objGame.setCurrentPlayer( 0 )
	<cfelseif deck_id_one EQ deck_id_current_turn>
		objGame.setCurrentPlayer( 1 )
	<cfelse>
		objGame.setCurrentPlayer( -1 )
	</cfif>
	
	<cfif session.cfs_player_id EQ player_id_one>
		objGame.setIsPlayerIndex( 0 );
		
		$('##sp_player_class').html('#class_one#');
		$('##sp_player_player').html('#player_one#');
		$('##sp_player_gods_container').attr('class', 'sp_#lcase( alignment_one )#');
		$('##img_player_god_icon').attr('src', '#Application.pathImages#/#alignment_image_one#');
		
		$('##sp_opp_class').html('#class_two#');
		$('##sp_opp_player').html('#player_two#');
		$('##sp_opp_gods_container').attr('class', 'sp_#lcase( alignment_two )#');
		$('##img_opp_god_icon').attr('src', '#Application.pathImages#/#alignment_image_two#');
	<cfelse>
		objGame.setIsPlayerIndex( 1 );
		
		$('##sp_player_class').html('#class_two#');
		$('##sp_player_player').html('#player_two#');
		$('##sp_player_gods_container').attr('class', 'sp_#lcase( alignment_two )#');
		$('##img_player_god_icon').attr('src', '#Application.pathImages#/#alignment_image_two#');
		
		$('##sp_opp_class').html('#class_one#');
		$('##sp_opp_player').html('#player_one#');
		$('##sp_opp_gods_container').attr('class', 'sp_#lcase( alignment_one )#');
		$('##img_opp_god_icon').attr('src', '#Application.pathImages#/#alignment_image_one#');
	</cfif>
</cfloop>
</cfoutput>