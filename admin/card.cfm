<cfsilent>
<cfif Not isDefined("cf_action")>
	<cfset cf_action = 1>
</cfif>
<cfif cf_action LT 1 OR cf_action GT 2>
	<cflocation url="/" addToken="no">
</cfif>

<cfif Not isDefined("cf_card_id")>
	<cfset cf_card_id = 0>
</cfif>
<cfif Not isNumeric(cf_card_id)>
	<cflocation url="/" addToken="no">
</cfif>

<cfset cf_header_title = "Card Administration">

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">

</cfsilent>
<cfoutput>
#header#

<!---Card Data--->
<cfquery name="sql_card" datasource="BF">
	SELECT card_id
	  , image_id
	  , name
	  , card_type_id
	  , cost_type_id
	  , cost
	  , damage
	  , class_id
	  , resource
	  , quantity
	  , system_card
	  , effect_text
	  , flavor_text
	  , developer_notes
	  , java_class_name
	FROM card
	WHERE card_id = #cf_card_id#;
</cfquery>

<!---Image Div Control--->
<cfquery name="sql_images" datasource="BF">
	SELECT i.image_id
		, i.name
		, i.url
		, c.card_id
	FROM image i
		LEFT JOIN card c
			ON i.image_id = c.image_id
			AND c.card_id = #cf_card_id#
	ORDER BY i.name;
</cfquery>

<div name="div_images" id="div_images" class="filtered_list" style="display: none;">
	
<p>
	<label>
	<span class="small_form">Filter:</span>
	<input name="txt_img_filter" id="txt_img_filter" class="small_form" onKeyUp="jvFilterTbl( 'txt_img_filter', 'tbl_images', 'td_img' )" value="" />
	</label>
</p>

Click to choose an image...<br />

<cfset cf_card_url = "attackTemplate.png">
<table name="tbl_images" id="tbl_images" class="filtered_list">
<cfloop query="sql_images">
	<tr class="no_border">
	<td id="td_img" class="filtered_list" onClick="jvSelectImg( '#image_id#', '#url#' )">#name#</td>
	</tr>
	
	<cfif card_id NEQ ""><cfset cf_card_url = url></cfif>
</cfloop>
</table>
</div>

<!---Class Div Control--->
<cfquery name="sql_class" datasource="BF">
	SELECT class_id
		, name
	FROM class
	ORDER BY name;
</cfquery>

<div name="div_class" id="div_class" class="filtered_list" style="display: none;">
	
<p>
	<label>
	<span class="small_form">Filter:</span>
	<input name="txt_class_filter" id="txt_class_filter" class="small_form" onKeyUp="jvFilterTbl( 'txt_class_filter', 'tbl_class', 'td_class' )" value="" />
	</label>
</p>

Click to choose an class...<br />

<table name="tbl_class" id="tbl_class" class="filtered_list">
<tr class="no_border">
<td id="td_class" class="filtered_list" onClick="$('##sp_class_name').html( 'None' );$('##hid_class').val( 0 );$('##div_class').hide();">None</td>
</tr>
<cfset cf_class_name = "None">
<cfloop query="sql_class">
	<tr class="no_border">
	<td id="td_class" class="filtered_list" onClick="$('##sp_class_name').html( '#name#' );$('##hid_class').val( #class_id# );$('##div_class').hide();">#name#</td>
	</tr>
	
	<cfif class_id EQ sql_card.class_id>
		<cfset cf_class_name = #name#>
	</cfif>
</cfloop>
</table>
</div>

<form name="frm_card" id="frm_card" class="small_form" action="card_action.cfm?cf_action=#cf_action#&cf_card_id=#cf_card_id#" method="post">
	<input type="submit" value="Submit" />
	<fieldset>
	<legend>Card Basics</legend>
	
	<img name="img_img" id="img_img" src="#Application.pathImages#/#cf_card_url#" />
	
	<p name="p_img" id="p_img">
		<a name="a_image" href="##a_image" class="filtered_list" onClick="jvChangeImg()">Change Image...</a>
		<input name="hid_img" id="hid_img" type="hidden" value="<cfif sql_card.image_id NEQ "">#sql_card.image_id#<cfelse>1</cfif>" />
	</p>
	
	<!---Name--->
	<p>
		<label>
		<span class="small_form">Name:</span>
		<input name="txt_name" id="txt_name" class="small_form" value="#sql_card.name#" />
		</label>
	</p>
	<!---Card Type--->
	<p>
		<label>
		<span class="small_form">Card Type:</span>
		<cfsilent>
		<cfquery name="sql_card_type" datasource="BF">
			SELECT ct.card_type_id
				, ct.card_type
				, ba.card_id AS block_as
				, bc.card_id AS block
				, coalesce( bc.min_damage_blocked, 0 ) AS min_damage_blocked
				, coalesce( bc.max_damage_blocked, -1 ) AS max_damage_blocked
				, dm.played_turn_only AS damage_played_turn_only
				, coalesce( dm.mod_int, 0 ) AS damage_mod
				, deff.played_turn_only AS deffense_played_turn_only
				, coalesce( deff.mod_int, 0 ) AS deffense_mod
			FROM BF.card_type ct
				LEFT JOIN BF.block_as ba
					ON ct.card_type_id = ba.card_type_id
					AND ba.card_id = #cf_card_id#
				LEFT JOIN BF.block_cards bc
					ON ct.card_type_id = bc.card_type_id
					AND bc.card_id = #cf_card_id#
				LEFT JOIN BF.card_damage_mods dm
					ON ct.card_type_id = dm.card_type_id
					AND dm.card_id = #cf_card_id#
				LEFT JOIN BF.card_deffense_mods deff
					ON ct.card_type_id = deff.card_type_id
					AND deff.card_id = #cf_card_id#
			ORDER BY ct.card_type_order
		</cfquery>
		</cfsilent>
		<select name="sel_card_type_id" id="sel_card_type_id" class="small_form" onChange="setCostDefault()">
			<cfloop query="sql_card_type">
				<option value="#card_type_id#"<cfif sql_card.card_type_id EQ card_type_id> selected="true"</cfif>>#card_type#</option>
			</cfloop>
		</select>
		</label>
	</p>
	<cfquery name="sql_secondary_card_type" datasource="BF">
		SELECT st.second_card_type_id
			, st.second_card_type
			, cst.card_id
			, bc.card_id AS block
			, coalesce( bc.min_damage_blocked, 0 ) AS min_damage_blocked
			, coalesce( bc.max_damage_blocked, -1 ) AS max_damage_blocked
			, ba.card_id AS block_as
		FROM second_card_type st
			LEFT JOIN card_to_second_type cst
		        ON st.second_card_type_id = cst.second_card_type_id
		        AND cst.card_id = #cf_card_id#
			LEFT JOIN block_cards_second_type bc
				ON st.second_card_type_id = bc.second_card_type_id
				AND bc.card_id = #cf_card_id#
			LEFT JOIN block_as_second_type ba
				ON st.second_card_type_id = ba.second_card_type_id
				AND ba.card_id = #cf_card_id#
		ORDER BY second_card_type_order;
	</cfquery>
	<!---Secondary Card Type--->
	<p>Secondary Card Type:
	<cfset cf_i = 0>
	<table class="no_border" width="100%">
	<cfloop query="sql_secondary_card_type">
		<cfif cf_i mod 3 EQ 0>
			<cfif cf_i NEQ 0></tr></cfif>
			<tr>
		</cfif>
		<td>
			<label>
			<input name="chk_second_type" id="chk_second_type" type="checkbox" value="#second_card_type_id#"<cfif card_id NEQ ""> checked="true"</cfif> />
			#second_card_type#
			</label>
		</td>
		<cfset cf_i += 1>
	</cfloop>
		</tr>
	</table>
	</p>
	<!---Cost Type--->
	<p>
		<label>
		<span class="small_form">Cost Type:</span>
		<cfsilent>
		<cfquery name="sql_cost_type" datasource="BF">
			SELECT ct.cost_type_id
				, ct.cost_type
				, played_turn_only
				, coalesce( m.effect_owner, 0 ) AS effect_owner
				, coalesce( m.mod_int, 0 ) AS mod_int
			FROM BF.cost_type ct
				LEFT JOIN BF.card_cost_mods m
					ON ct.cost_type_id = m.cost_type_id
					AND m.card_id = #cf_card_id#
			ORDER BY cost_type_order
		</cfquery>
		</cfsilent>
		<select name="sel_cost_type_id" id="sel_cost_type_id" class="small_form">
			<cfloop query="sql_cost_type">
				<option value="#cost_type_id#"<cfif cost_type_id EQ sql_card.cost_type_id> selected="true"</cfif>>#cost_type#</option>
			</cfloop>
		</select>
		</label>
	</p>
	<!---Cost--->
	<p>
		<label>
		<span class="small_form">Cost:</span>
		<input name="txt_cost" id="txt_cost" class="small_form right" onBlur="jvEnsureNum( 'txt_cost' );" value="<cfif sql_card.cost EQ "">0<cfelse>#sql_card.cost#</cfif>" />
		</label>
	</p>
	<!---Damage--->
	<p>
		<label>
		<span class="small_form">Damage:</span>
		<input name="txt_damage" id="txt_damage" class="small_form right" onBlur="jvEnsureNum( 'txt_damage' );" value="<cfif sql_card.cost EQ "">0<cfelse>#sql_card.damage#</cfif>" />
		</label>
	</p>
	<!---Quantity--->
	<p>
		<label>
		<span class="small_form">Quantity:</span>
		<input name="txt_quantity" id="txt_quantity" class="small_form right" onBlur="jvEnsureNum( 'txt_quantity' );" value="<cfif sql_card.cost EQ "">3<cfelse>#sql_card.quantity#</cfif>" />
		</label>
	</p>
	<!---Class--->
	<p>
		<label name="lbl_class" id="lbl_class">
		<span class="small_form">Class:</span>
		<span name="sp_class_name" id="sp_class_name">#cf_class_name#</span>
		<input name="hid_class" id="hid_class" type="hidden" value="#sql_card.class_id#" />
		<a name="a_class" href="##a_class" onClick="$('##div_class').show();$('##txt_class_filter').focus();">Change Class</a>
		</label>
	</p>
	<!---Resource--->
	<p>
		<label>
		<span class="small_form">Resource:</span>
		<input name="chk_resource" id="chk_resource" type="checkbox" value="1"<cfif sql_card.resource EQ 1> checked="true"</cfif> />
		</label>
	</p>
	<!---System Card--->
	<p>
		<label>
		<span class="small_form">System Card:</span>
		<input name="chk_system_card" id="chk_system_card" type="checkbox" value="1"<cfif sql_card.system_card EQ 1> checked="true"</cfif> />
		</label>
	</p>
	<!---Effect--->
	<p>
		<label>
		<p class="small_form">Effect Text:</p>
		<textarea name="txt_effect" id="txt_effect" class="small_form">#sql_card.effect_text#</textarea>
		</label>
	</p>
	<!---Flavor--->
	<p>
		<label>
		<p class="small_form">Flavor Text:</p>
		<textarea name="txt_flavor" id="txt_flavor" class="small_form">#sql_card.flavor_text#</textarea>
		</label>
	</p>
	<!---Developer--->
	<p>
		<label>
		<p class="small_form">Developer Notes:</p>
		<textarea name="txt_dev_notes" id="txt_dev_notes" class="small_form">#sql_card.developer_notes#</textarea>
		</label>
	</p>
	<!---Java Class Name--->
	<p>
		<label>
		<span class="small_form">Java Class Name:</span>
		<input name="txt_java_name" id="txt_java_name" class="small_form" value="#sql_card.java_class_name#" />
		</label>
	</p>
	
	</fieldset>
	
	<fieldset>
	<legend>Block Cards</legend>
	
	<table width="100%">
	<tr>
	<th width="20%">Seconday<br />Card Type</th>
	<th width="20%">Block</th>
	<th width="20%">Min Damage</th>
	<th width="20%">Max Damage</th>
	</tr>
	<cfloop query="sql_card_type">
	<tr>
	<th>#card_type#</th>
	<th>
		<input name="chk_block" id="chk_block" value="#card_type_id#" type="checkbox"<cfif block NEQ ""> checked="true"</cfif> />
	</th>
	<td>
		<input name="txt_block_min_dmg_#card_type_id#" id="txt_block_min_dmg_#card_type_id#" class="small_form_third right" onBlur="jvEnsureNum( 'txt_block_min_dmg_#card_type_id#' );" value="#min_damage_blocked#" />
	</td>
	<td>
		<input name="txt_block_max_dmg_#card_type_id#" id="txt_block_max_dmg_#card_type_id#" class="small_form_third right" onBlur="jvEnsureNum( 'txt_block_max_dmg_#card_type_id#' );" value="#max_damage_blocked#" />
	</td>
	</tr>
	</cfloop>
	</table>
	
	</fieldset>
	
	<fieldset>
	<legend>Block Cards Second Type</legend>
	
	<table width="100%">
	<tr>
	<th width="20%">Card Type</th>
	<th width="20%">Block</th>
	<th width="20%">Min Damage</th>
	<th width="20%">Max Damage</th>
	</tr>
	<cfloop query="sql_secondary_card_type">
	<tr>
	<th>#second_card_type#</th>
	<th>
		<input name="chk_block_sec" id="chk_block_sec" value="#second_card_type_id#" type="checkbox"<cfif block NEQ ""> checked="true"</cfif> />
	</th>
	<th>
		<input name="txt_block_sec_min_dmg_#second_card_type_id#" id="txt_block_sec_min_dmg_#second_card_type_id#" class="small_form_third right" onBlur="jvEnsureNum( 'txt_block_sec_min_dmg_#second_card_type_id#' );" value="#min_damage_blocked#" />
	</th>
	<th>
		<input name="txt_block_sec_max_dmg_#second_card_type_id#" id="txt_block_sec_max_dmg_#second_card_type_id#" class="small_form_third right" onBlur="jvEnsureNum( 'txt_block_sec_max_dmg_#second_card_type_id#' );" value="#max_damage_blocked#" />
	</th>
	</tr>
	</cfloop>
	</table>
	
	</fieldset>
	
	<fieldset>
	<legend>Damage Mods</legend>
	
	<table width="100%">
	<tr>
	<th width="30%">Card Type</th>
	<th width="10%">Played Turn Only</th>
	<th width="25%">Damage Mods</th>
	<th width="10%">Played Turn Only</th>
	<th width="25%">Deffense Mods</th>
	</tr>
	<cfloop query="sql_card_type">
	<tr>
	<th>#card_type#</th>
	<th>
		<input name="chk_damage_played" id="chk_damage_played" value="#card_type_id#" type="checkbox"<cfif damage_played_turn_only NEQ ""> checked="true"</cfif> />
	</th>
	<th>
		<input name="txt_damage_mod_#card_type_id#" id="txt_damage_mod_#card_type_id#" class="small_form_third right" onBlur="jvEnsureNum( 'txt_damage_mod_#card_type_id#' );" value="#damage_mod#" />
	</th>
	<th>
		<input name="chk_deffense_played" id="chk_deffense_played" value="#card_type_id#" type="checkbox"<cfif deffense_played_turn_only NEQ ""> checked="true"</cfif> />
	</th>
	<th>
		<input name="txt_deffense_#card_type_id#" id="txt_deffense_#card_type_id#" class="small_form_third right" onBlur="jvEnsureNum( 'txt_deffense_#card_type_id#' );" value="#deffense_mod#" />
	</th>
	</tr>
	</cfloop>
	</table>
	
	</fieldset>
	
	<fieldset>
	<legend>Cost Mods</legend>
	
	<table width="100%">
	<tr>
	<th width="35%">Card Type</th>
	<th width="15%">Played Turn Only</th>
	<th width="15%">Effect Owner</th>
	<th width="35%">Cost Mods</th>
	</tr>
	<cfloop query="sql_cost_type">
	<tr>
	<th>#cost_type#</th>
	<th>
		<input name="chk_cm_played" id="chk_cm_played" class="small_form_third right" type="checkbox" value="#cost_type_id#"<cfif played_turn_only NEQ ""> checked="true"</cfif> />
	</th>
	<th>
		<input name="chk_cm_effect_owner" id="chk_cm_effect_owner" class="small_form_third right" type="checkbox" value="#cost_type_id#"<cfif toString(effect_owner) EQ "1"> checked="true"</cfif> />
	</th>
	<th>
		<input name="txt_cost_mod_#cost_type_id#" id="txt_cost_mod_#cost_type_id#" class="small_form_third right" onBlur="jvEnsureNum( 'txt_cost_mod_#cost_type_id#' );" value="#mod_int#" />
	</th>
	</tr>
	</cfloop>
	</table>
	
	</fieldset>
	
	<fieldset>
	<legend>Block As</legend>
	
	<!---Block As Card Type--->
	<p>Block As Card Type:
	<cfset cf_i = 0>
	<table class="no_border" width="100%">
	<cfloop query="sql_card_type">
		<cfif cf_i mod 3 EQ 0>
			<cfif cf_i NEQ 0></tr></cfif>
			<tr>
		</cfif>
		<td>
			<label>
			<input name="chk_block_as_type" id="chk_block_as_type" type="checkbox" value="#card_type_id#"<cfif block_as NEQ ""> checked="true"</cfif> />
			#card_type#
			</label>
		</td>
		<cfset cf_i += 1>
	</cfloop>
		</tr>
	</table>
	</p>
	<!---Block As Second Card Type--->
	<p>Block As Second Card Type:
	<cfset cf_i = 0>
	<table class="no_border" width="100%">
	<cfloop query="sql_secondary_card_type">
		<cfif cf_i mod 3 EQ 0>
			<cfif cf_i NEQ 0></tr></cfif>
			<tr>
		</cfif>
		<td>
			<label>
			<input name="chk_block_as_sec_type" id="chk_block_as_sec_type" type="checkbox" value="#second_card_type_id#"<cfif block_as NEQ ""> checked="true"</cfif> />
			#second_card_type#
			</label>
		</td>
		<cfset cf_i += 1>
	</cfloop>
		</tr>
	</table>
	</p>
	
</fieldset>

<input type="submit" value="Submit" />
</form>

<script type="text/javascript">
	$(document).ready(function(){
		var positionImg = $("##p_img").offset();
		$("##div_images").offset({ top: positionImg.top + 20, left: positionImg.left });
		
		var positionClass = $("##lbl_class").offset();
		$("##div_class").offset({ top: positionClass.top + 20, left: positionClass.left });
	});
	
	function jvChangeImg(){
		$('[id*="td_img"]').each(function(){
			$(this).show();
		});
		
		$("##div_images").show("fast", function(){ $("##txt_img_filter").focus() } ); 
	}
	
	function jvSelectImg( jvImgID, jvURL ){
		$('##div_images').hide();
		$('##hid_img').val( jvImgID );
		
		jvURL = "#Application.pathImages#/" + jvURL;
		
		$('##img_img').attr( "src", jvURL )
	}
	
	function jvFilterTbl( jvFilterID, jvTblID, jvTd ){
		var filterText = $("##" + jvFilterID ).val().toUpperCase();
		
		$('[id*="' + jvTd + '"]').each(function(){
			var tbText = $(this).html().toUpperCase();
			if( tbText.substring( 0, filterText.length ) != filterText ){
				$(this).hide();
			} else {
				$(this).show();
			}
		}); 
	}
	
	function checkSpell( jvProperty ){
		$('[id*="chk_second_type"]').each(function(){
			if( $(this).val() == "1" ){
				$(this).attr( "checked", jvProperty );
			}
		});
	}
	
	function setCostDefault(){
		var jvCostType = 0;
		
		var jvCardType = $("##sel_card_type_id option:selected").val();
		
		checkSpell( false );
		
		if( jvCardType == 1 ) jvCostType = 1;
		if( jvCardType == 2 ){ 
			jvCostType = 2;
			checkSpell( true );
		}
		if( jvCardType == 3 ) jvCostType = 3;
		if( jvCardType == 4 ){
			jvCostType = 4;
			checkSpell( true );
		}
		if( jvCardType == 5 ){
			jvCostType = 5;
			checkSpell( true );
		}
		if( jvCardType == 6 ){
			jvCostType = 6;
			checkSpell( true );
		}
		if( jvCardType == 7 ) jvCostType = 3;
		
		for( var jvi = 0; jvi < $('##sel_cost_type_id option').size(); jvi++ ){
			if( $('##sel_cost_type_id option').eq( jvi ).val() == jvCostType ){
				$('##sel_cost_type_id option').eq( jvi ).attr( 'selected', 'selected' );
				break;
			}
		}
	}
	
	function jvEnsureNum( jvID ){
		if( !$.isNumeric( $("##" + jvID).val() ) ){
			alert("Value provided was not numeric.");
			$("##" + jvID).val( 0 );
		}
	}
</script>

#footer#
</cfoutput>