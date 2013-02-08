<cfsilent>
<cfinclude template = "#Application.pathScripts#/udf.cfc">

<cfset cf_header_title = "Card Administration Action">

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">
<cfinclude template="#Application.pathScripts#/gameUdf.cfc">

<cfif cf_action LT 1 OR cf_action GT 2>
	<cflocation url="/" addToken="no">
</cfif>

<cfif Not isNumeric(cf_card_id)>
	<cflocation url="/" addToken="no">
</cfif>

<cfset cf_cost_icon = "">

<cfset form.txt_effect = #cf_sanitize_sql( form.txt_effect )#>
<cfset form.txt_flavor = #cf_sanitize_sql( form.txt_flavor )#>
<cfset form.txt_dev_notes = #cf_sanitize_sql( form.txt_dev_notes )#>
<cfset form.txt_java_name = #cf_sanitize_sql( form.txt_java_name )#>

<cfif cf_action EQ 1>
	<cfstoredproc procedure="app_update_create_card" datasource="BF">
		<!---P_image_id---><cfprocparam cfsqltype="cf_sql_int" value="#form.hid_img#" />
		<!---P_name---><cfprocparam cfsqltype="cf_sql_varchar" value="#cf_sanitize_sql( form.txt_name )#" />
		<!---P_card_type_id---><cfprocparam cfsqltype="cf_sql_tinyint" value="#form.sel_card_type_id#" />
		<!---P_cost_type_id---><cfprocparam cfsqltype="cf_sql_tinyint" value="#form.sel_cost_type_id#" />
		<!---P_cost---><cfprocparam cfsqltype="cf_sql_tinyint" value="#form.txt_cost#" />
		<!---P_damage---><cfprocparam cfsqltype="cf_sql_tinyint" value="#form.txt_damage#" />
		<cfif form.hid_class EQ 0 OR form.hid_class EQ "">
			<!---P_class_id---><cfprocparam cfsqltype="cf_sql_tinyint" null="yes" />
		<cfelse>
			<!---P_class_id---><cfprocparam cfsqltype="cf_sql_tinyint" value="#form.hid_class#" />
		</cfif>
		<cfif isDefined("form.chk_resource")>
			<!---P_resource---><cfprocparam cfsqltype="cf_sql_bit" value="1" />
		<cfelse>
			<!---P_resource---><cfprocparam cfsqltype="cf_sql_bit" value="0" />
		</cfif>
		<!---P_quantity---><cfprocparam cfsqltype="cf_sql_tinyint" value="#form.txt_quantity#" />
		<cfif isDefined("form.chk_system_card")>
			<!---P_system_card---><cfprocparam cfsqltype="cf_sql_bit" value="1" />
		<cfelse>
			<!---P_system_card---><cfprocparam cfsqltype="cf_sql_bit" value="0" />
		</cfif>
		<!---P_effect_text---><cfprocparam cfsqltype="cf_sql_varchar" value="#form.txt_effect#" />
		<!---P_flavor_text---><cfprocparam cfsqltype="cf_sql_varchar" value="#form.txt_flavor#" />
		<!---P_developer_notes---><cfprocparam cfsqltype="cf_sql_varchar" value="#form.txt_dev_notes#" />
		<!---P_java_class_name---><cfprocparam cfsqltype="cf_sql_varchar" value="#form.txt_java_name#" />
		<!---P_card_id---><cfprocparam type="out" cfsqltype="cf_sql_smallint" variable="cf_card_id" />
	</cfstoredproc>
<cfelse>
	<cfquery name="sql_update_card" datasource="BF">
		UPDATE card
		SET image_id = #form.hid_img#
			, name = '#cf_sanitize_sql( form.txt_name )#'
			, card_type_id = #form.sel_card_type_id#
			, cost_type_id = #form.sel_cost_type_id#
			, cost = #form.txt_cost#
			, damage = #form.txt_damage#
		<cfif form.hid_class EQ 0 OR form.hid_class EQ "">
			, class_id = NULL
		<cfelse>
			, class_id = #form.hid_class#
		</cfif>
		<cfif isDefined("form.chk_resource")>
			, resource = 1
		<cfelse>
			, resource = 0
		</cfif>
			, quantity = #form.txt_quantity#
		<cfif isDefined("form.chk_system_card")>
			, system_card = 1
		<cfelse>
			, system_card = 0
		</cfif>
			, effect_text = '#cf_sanitize_sql( form.txt_effect )#'
			, flavor_text = '#cf_sanitize_sql( form.txt_flavor )#'
			, developer_notes = '#cf_sanitize_sql( form.txt_dev_notes )#'
			, java_class_name = '#cf_sanitize_sql( form.txt_java_name )#'
		WHERE card_id = #cf_card_id#
	</cfquery>
</cfif>

<cfquery name="sql_card_type" datasource="BF">
	SELECT card_type_id
	  , card_type
	FROM BF.card_type
	ORDER BY card_type_order
</cfquery>

<cfquery name="sql_cost_type" datasource="BF">
	SELECT ct.cost_type_id
	  , ct.cost_type
	  , i.url
	FROM BF.cost_type ct
		INNER JOIN BF.image i ON ct.image_id = i.image_id
	ORDER BY ct.cost_type_order
</cfquery>

<!---Simple Checkbox Lists--->
<!---Second Card Type---->
<cfif isDefined("form.chk_second_type")>
	<cfif cf_action EQ 2>
		<cfquery name="sql_delete_second_type" datasource="BF">
			DELETE FROM card_to_second_type
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	<cfset cf_i = 0>
	<cfloop list="#form.chk_second_type#" index="cf_i">
		<cfquery name="sql_insert_second_type" datasource="BF">
			INSERT INTO card_to_second_type( card_id, second_card_type_id )
			VALUES( #cf_card_id#, #cf_i# );
		</cfquery>		
	</cfloop>
</cfif>

<!---Block As--->
<cfif isDefined("form.chk_block_as_type")>
	<cfif cf_action EQ 2>
		<cfquery name="sql_delete_block_as_type" datasource="BF">
			DELETE FROM block_as
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	<cfset cf_i = 0>
	<cfloop list="#form.chk_block_as_type#" index="cf_i">
		<cfquery name="sql_insert_block_as_type" datasource="BF">
			INSERT INTO block_as( card_id, card_type_id )
			VALUES( #cf_card_id#, #cf_i# );
		</cfquery>		
	</cfloop>
</cfif>

<!---Block as Second Type--->
<cfif isDefined("form.chk_block_as_sec_type")>
	<cfif cf_action EQ 2>
		<cfquery name="sql_delete_block_as_type" datasource="BF">
			DELETE FROM block_as_second_type
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	<cfset cf_i = 0>
	<cfloop list="#form.chk_block_as_sec_type#" index="cf_i">
		<cfquery name="sql_insert_block_as_second_type" datasource="BF">
			INSERT INTO block_as_second_type( card_id, second_card_type_id )
			VALUES( #cf_card_id#, #cf_i# );
		</cfquery>		
	</cfloop>
</cfif>

<!---Complex Check Lists--->
<!---Block Cards---->
<cfif isDefined("form.chk_block")>
	<cfif cf_action EQ 2>
		<cfquery name="sql_delete_block" datasource="BF">
			DELETE FROM block_cards
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	<cfset cf_i = 0>
	<cfloop list="#form.chk_block#" index="cf_i">
		<cfquery name="sql_insert_block" datasource="BF">
			INSERT INTO block_cards( 
				card_id,
				card_type_id,
				min_damage_blocked,
				max_damage_blocked
			)
			VALUES( #cf_card_id#
				, #cf_i#
				, #evaluate( "form.txt_block_min_dmg_" & cf_i )#
				, #evaluate( "form.txt_block_max_dmg_" & cf_i )#
			);
		</cfquery>
	</cfloop>
</cfif>

<!---Block Cards Second Type--->
<cfif isDefined("form.chk_block_sec")>
	<cfif cf_action EQ 2>
		<cfquery name="sql_delete_block_second" datasource="BF">
			DELETE FROM block_cards_second_type
			WHERE card_id = #cf_card_id#
		</cfquery>
	</cfif>
	<cfset cf_i = 0>
	<cfloop list="#form.chk_block_sec#" index="cf_i">
		<cfquery name="sql_insert_block_second" datasource="BF">
			INSERT INTO block_cards_second_type( 
				card_id,
				second_card_type_id,
				min_damage_blocked,
				max_damage_blocked
			)
			VALUES( #cf_card_id#
				, #cf_i#
				, #evaluate( "form.txt_block_min_dmg_" & cf_i )#
				, #evaluate( "form.txt_block_max_dmg_" & cf_i )#
			);
		</cfquery>
	</cfloop>
</cfif>

<!---Damage Mods--->
<cfif cf_action EQ 2>
	<cfquery name="sql_delete_damage_mods" datasource="BF">
		DELETE FROM card_damage_mods
		WHERE card_id = #cf_card_id#
	</cfquery>
</cfif>
<cfloop query="sql_card_type">
	<cfif isDefined("form.txt_damage_mod_" & card_type_id)>
		<cfif evaluate("form.txt_damage_mod_" & card_type_id) NEQ 0>
			<cfset cf_current_card_type_id = #card_type_id#>
			<cfset cf_played_turn_only = 0>
			<cfif isDefined("form.chk_damage_played")>
				<cfloop list="#form.chk_damage_played#" index="cf_i">
					<cfif cf_i EQ cf_current_card_type_id>
						<cfset cf_played_turn_only = 1>
					</cfif>
				</cfloop>
			</cfif>
			
			<cfquery name="sql_add_damage_mods" datasource="BF">
				INSERT INTO card_damage_mods( card_id, card_type_id, played_turn_only, mod_int )
				VALUES( #cf_card_id#, #card_type_id#, #cf_played_turn_only#, #evaluate("form.txt_damage_mod_" & card_type_id)# );
			</cfquery>
		</cfif>
	</cfif>
</cfloop>

<!---Deffense Mods--->
<cfif cf_action EQ 2>
	<cfquery name="sql_delete_deffense_mods" datasource="BF">
		DELETE FROM card_deffense_mods
		WHERE card_id = #cf_card_id#
	</cfquery>
</cfif>
<cfloop query="sql_card_type">
	<cfif isDefined("form.txt_deffense_" & card_type_id)>
		<cfif evaluate("form.txt_deffense_" & card_type_id) NEQ 0>
			<cfset cf_current_card_type_id = #card_type_id#>
			<cfset cf_played_turn_only = 0>
			<cfif isDefined("form.chk_deffense_played")>
				<cfloop list="#form.chk_deffense_played#" index="cf_i">
					<cfif cf_i EQ cf_current_card_type_id>
						<cfset cf_played_turn_only = 1>
					</cfif>
				</cfloop>
			</cfif>
			
			<cfquery name="sql_add_deffense_mods" datasource="BF">
				INSERT INTO card_deffense_mods( card_id, card_type_id, played_turn_only, mod_int )
				VALUES( #cf_card_id#, #card_type_id#, #cf_played_turn_only#, #evaluate("form.txt_deffense_" & card_type_id)# );
			</cfquery>
		</cfif>
	</cfif>
</cfloop>

<!---Cost Mods--->
<cfif cf_action EQ 2>
	<cfquery name="sql_delete_cost_mods" datasource="BF">
		DELETE FROM card_cost_mods
		WHERE card_id = #cf_card_id#
	</cfquery>
</cfif>
<cfloop query="sql_cost_type">
	<cfif isDefined("form.txt_cost_mod_" & cost_type_id)>
		<cfif evaluate("form.txt_cost_mod_" & cost_type_id) NEQ 0>
			<cfset cf_i = 0>
			<cfset cf_owner = 0>
			<cfset cf_current_cost_type_id = #cost_type_id#>
			<cfif isDefined("form.chk_cm_effect_owner")>
				<cfloop list="#form.chk_cm_effect_owner#" index="cf_i">
					<cfif cf_i EQ cf_current_cost_type_id>
						<cfset cf_owner = 1>
					</cfif>
				</cfloop>
			</cfif>
			
			<cfset cf_played_turn_only = 0>
			<cfif isDefined("form.chk_cm_played")>
				<cfloop list="#form.chk_cm_played#" index="cf_i">
					<cfif cf_i EQ cf_current_cost_type_id>
						<cfset cf_played_turn_only = 1>
					</cfif>
				</cfloop>
			</cfif>
			
			<cfquery name="sql_add_cost_mods" datasource="BF">
				INSERT INTO card_cost_mods( card_id, cost_type_id, played_turn_only, effect_owner, mod_int )
				VALUES( #cf_card_id#, #cost_type_id#, #cf_played_turn_only#, #cf_owner#, #evaluate("form.txt_cost_mod_" & cost_type_id)# );
			</cfquery>
		</cfif>
	</cfif>
	
	<cfif cost_type_id EQ form.sel_cost_type_id>
		<cfset cf_cost_icon = #url#>
	</cfif>
</cfloop>

</cfsilent>
<cfoutput>
#header#

<p>Card <cfif cf_action EQ 1>Added<cfelse>Edited</cfif></p>

<cfquery name="sql_image" datasource="BF">
	SELECT url
	FROM image
	WHERE image_id = #form.hid_img#
</cfquery>

<cfif isDefined("form.chk_second_type")>
	<cfquery name="sql_second_type_image" datasource="BF">
		SELECT url
		FROM image i
		WHERE image_id IN (
			SELECT image_id FROM second_card_type WHERE second_card_type_id IN ( <cfoutput>#form.chk_second_type#</cfoutput> )
		)
	</cfquery>
</cfif>

<span class="small_card">
	<img class="card" src="#Application.pathImages#/#sql_image.url#" />
	<cfif isDefined("form.chk_second_type")>
	<cfif sql_second_type_image.recordCount GT 0>
		<p class="card">
		<cfloop query="sql_second_type_image">
			<img src="#Application.pathImages#/#url#" />
		</cfloop>
		</p>
	</cfif>
	</cfif>
	<p class="card"><b>Name:</b> #form.txt_name#</p>
	<p class="card"><b>Cost:</b> #form.txt_cost#
	<img src="#Application.pathImages#/#cf_cost_icon#" /></p>
	<p class="card"><b>Damage:</b> #form.txt_damage#</p>
	<p class="card"><b>Effect:</b> #cf_effect_icon( form.txt_effect )#</p>
</span>

<p><a href="default.cfm">Return to main menu.</a></p>

<cfinclude template="create_concat_table.cfm">

<script type="text/javascript">
$(document).ready(function(){
	
});
</script>

#footer#
</cfoutput>