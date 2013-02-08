<cfsilent>
	
<cfinclude template="#Application.pathScripts#/udf.cfc">


<cfif form.frm_action EQ "add">
	<cfset cf_action_text = "Created">
<cfelseif form.frm_action EQ "edit">
	<cfset cf_action_text = "Edited">
<cfelseif form.frm_action EQ "copy">
	<cfset cf_action_text = "Copyed">
</cfif>

<cfset cf_header_title = "Deck #cf_action_text#">

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">

<cfset cf_field = "">

<cfset cf_decklist = ArrayNew(1)>
<cfset cf_deckcards = ArrayNew(2)>
<cfset cf_i = 1 />
<cfset cf_max = 0>

<cfset cf_card_count = 0>
<cfset cf_equip_count = 0>

<cfset cf_hash = "">
<cfset cf_hash_array = ArrayNew(1)>
<cfset cf_hi = 1>
<cfset hk = 0>
<cfset charCount = 0>
<cfset changeMade = false>

<cfquery name="sql_equip" datasource="BF">
	SELECT card_id
	FROM card
	WHERE card_type_id = 7;
</cfquery>

</cfsilent>
<cfoutput>
#header#

<cfloop collection="#Form#" item="cf_field">	
	<cfset cf_good = false>
	
	<cfif cf_field EQ "frm_deck_id">
		<cfset cf_decklist[1] = cf_sanitize_numeric( Form[cf_field] )>
	<cfelseif cf_field EQ "frm_name">
		<cfset cf_decklist[2] = Form[cf_field]>
	<cfelseif cf_field EQ "frm_description">
		<cfset cf_decklist[3] = Form[cf_field]>
	<cfelseif cf_field EQ "frm_privacy">
		<cfset cf_decklist[4] = cf_sanitize_numeric( Form[cf_field] )>
	<cfelseif cf_field EQ "frm_class">
		<cfset cf_decklist[5] = cf_sanitize_numeric( Form[cf_field] )>
	<cfelseif cf_field EQ "frm_alignment">
		<cfset cf_decklist[6] = cf_sanitize_numeric( Form[cf_field] )>
	<cfelseif left( cf_field, 4 ) EQ "frm_">
	<cfif isNumeric( Form[cf_field] )>
	<cfif Form[cf_field] GT 0>
		
		<cfif cf_sanitize_numeric( cf_field ) EQ "">
			#cf_field#<br />
		</cfif>
		
		<cfset cf_deckcards[cf_i][1] = cf_sanitize_numeric( cf_field )>
		<cfset cf_deckcards[cf_i][2] = cf_sanitize_numeric( Form[cf_field] )>
		<cfset cf_hash = FormatBaseN( cf_deckcards[cf_i][1] * 10 + cf_deckcards[cf_i][2], 36 )>
		<cfloop index="cf_hi" from="1" to="#len(cf_hash)#">
			<cfsilent>#ArrayAppend( cf_hash_array, mid( cf_hash, cf_hi, 1 ) )#</cfsilent>
		</cfloop>
		<cfsilent>#ArraySort( cf_hash_array, "text", "asc" )#</cfsilent>
		
		<cfset cf_hash = "">
		
		<cfset charCount = 1>
		
		<cfloop index="cf_hi" from="1" to="#ArrayLen( cf_hash_array )#">
			<cfif charCount GT 1>
				<cfset charCount-->
			<cfelse>
				<cfloop index="hk" from="#cf_hi + 1#" to="#ArrayLen( cf_hash_array )#">
					<cfif cf_hash_array[hk] NEQ cf_hash_array[cf_hi]>
						<cfbreak>
					</cfif>
					<cfset charCount++>
				</cfloop>
			
				<cfset cf_hash = #cf_hash# & #cf_hash_array[cf_hi]#>
				<cfif charCount GT 1>
					<cfset cf_hash = #cf_hash# & #charCount#>
				</cfif>
			</cfif>
		</cfloop>
		
		<cfquery name="sql_is_equip" dbtype="query">
			SELECT card_id FROM sql_equip WHERE card_id = #cf_deckcards[cf_i][1]#
		</cfquery>
		
		<cfif sql_is_equip.recordCount GT 0>
			<cfset cf_equip_count += cf_deckcards[cf_i][2]>
		<cfelse>
			<cfset cf_card_count += cf_deckcards[cf_i][2]>
		</cfif>
		<cfset cf_i++>
	</cfif>
	</cfif>
	</cfif>
</cfloop>

<cfset cf_max = cf_i - 1>

<cfset cf_hash = "#cf_hash##cf_decklist[6]##cf_decklist[5]#" />

<cfif cf_equip_count GT 4 OR cf_card_count NEQ 60>
	<cfif cf_equip_count GT 4>
		<p>The deck you submitted has more than 4 Equipment cards. 
			This is not a valid deck.</p>
	</cfif>
	<cfif cf_card_count NEQ 60>
		<p>The deck you submitted has does not have exsactly 60 cards in the deck. 
			This is not a valid deck.</p>
	</cfif>
	#footer#
	<cfabort>
</cfif>

<cfset cf_deck_list_id = 0>

<cfquery name="sql_hash_match" datasource="BF">
	SELECT deck_list_id
	FROM deck_lists
	WHERE hash = '#cf_hash#';
</cfquery>

<cfset cf_list_exists = false>

<cfloop query="sql_hash_match">
	<cfset cf_list_exists = true>
	<cfset cf_deck_list_id = #deck_list_id#>
	
	<cfquery name="sql_hash_matches" datasource="BF">
		SELECT card_id, quantity
		FROM deck_lists_cards
		WHERE deck_list_id = #cf_deck_list_id#;
	</cfquery>
	
	<cfif sql_hash_matches.recordCount NEQ cf_max>
		<cfset cf_list_exists = false>
	<cfelse>
		<cfloop query="sql_hash_matches">
			<cfset card_id = #card_id#>
			<cfset quant = #quantity#>
			<cfset match = false>
			
			<cfloop from="1" to="#cf_max#" index="cf_hi">
				<cfif cf_deckcards[cf_hi][1] EQ card_id>
					<cfif cf_deckcards[cf_hi][2] EQ quant>
						<cfset match = true>
						<cfbreak>
					</cfif>
				</cfif>
			</cfloop>
			
			<cfif Not match>
				<cfset cf_list_exists = false>
				<cfbreak>		
			</cfif>
		</cfloop>
	</cfif>
</cfloop>

<cfif Not cf_list_exists>
	<cfset changeMade = true>

	<cfstoredproc procedure="app_create_deck_list" datasource="BF">
		<!---P_author_player_id---><cfprocparam type="in" value="#session.cfs_player_id#" cfsqltype="cf_sql_integer">
		<!---P_class_id---><cfprocparam type="in" value="#cf_decklist[5]#" cfsqltype="cf_sql_integer">
		<!---P_alignment_id---><cfprocparam type="in" value="#cf_decklist[6]#" cfsqltype="cf_sql_integer">
		<!---P_alignment_id---><cfprocparam type="in" value="#cf_hash#" cfsqltype="cf_sql_varchar" maxLength="73">
		<!---P_deck_list_id---><cfprocparam type="out" cfsqltype="cf_sql_integer" variable="cf_deck_list_id">
	</cfstoredproc>
	
	<cfquery name="sql_create_list" datasource="BF">
		INSERT INTO deck_lists_cards ( 
			deck_list_id,
			card_id,
			quantity
		)
		VALUES
	<cfloop from="1" to="#cf_max#" index="cf_i">
		( #cf_deck_list_id#, #cf_deckcards[cf_i][1]#, #cf_deckcards[cf_i][2]# )<cfif cf_i NEQ cf_max>,</cfif>
	</cfloop>
	</cfquery>
</cfif>

<cfset cf_deck_name_id = 0>
<cfset cf_name_exists = false>

<cfquery name="sql_create_list" datasource="BF">
	SELECT deck_name_id
	FROM deck_names
	WHERE name = '#cf_decklist[2]#'
		AND description = '#cf_decklist[3]#';
</cfquery>

<cfloop query="sql_create_list">
	<cfset cf_deck_name_id = #deck_name_id#>
	<cfset cf_name_exists = true>
</cfloop>

<cfif cf_deck_name_id EQ 0>
	<cfset changeMade = true>
	
	<cfstoredproc procedure="app_create_deck_names" datasource="BF">
		<!---P_name---><cfprocparam type="in" value="#cf_decklist[2]#" cfsqltype="cf_sql_varchar"  maxLength="15">
		<!---P_description---><cfprocparam type="in" value="#cf_decklist[3]#" cfsqltype="cf_sql_varchar"  maxLength="255">
		<!---P_deck_name_id---><cfprocparam type="out" cfsqltype="cf_sql_integer" variable="cf_deck_name_id">
	</cfstoredproc>
</cfif>

<cfset cf_deck_id = 0>

<cfif changeMade>
	<cfstoredproc procedure="app_create_deck" datasource="BF">
		<!---P_old_deck_id---><cfprocparam type="in" value="#cf_decklist[1]#" cfsqltype="cf_sql_integer">
		<!---P_player_id---><cfprocparam type="in" value="#session.cfs_player_id#" cfsqltype="cf_sql_integer">
		<!---P_deck_list_id---><cfprocparam type="in" value="#cf_deck_list_id#" cfsqltype="cf_sql_integer">
		<!---P_deck_name_id---><cfprocparam type="in" value="#cf_deck_name_id#" cfsqltype="cf_sql_integer">
		<!---P_deck_id---><cfprocparam type="out" cfsqltype="cf_sql_integer" variable="cf_deck_id">
	</cfstoredproc>	
</cfif>

<script type="text/javascript">
$(document).ready(function(){
	
});
</script>

#footer#
</cfoutput>