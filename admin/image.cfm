<cfsilent>
<cfif Not isDefined("cf_action")>
	<cfset cf_action = 1>
</cfif>
<cfif cf_action LT 1 OR cf_action GT 2>
	<cflocation url="/" addToken="no">
</cfif>

<cfif Not isDefined("cf_image_id")>
	<cfset cf_image_id = 0>
</cfif>
<cfif Not isNumeric(cf_image_id)>
	<cflocation url="/" addToken="no">
</cfif>

<cfset cf_header_title = "Image Administration">

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">

</cfsilent>
<cfoutput>
#header#

<cfquery name="sql_image" datasource="BF">
	SELECT i.name
	  , i.url
	  , i.card_img
	  , i.horizontal
	  , i.description
	  , c.card_id
	  , c.name AS card_name
	FROM image i
	  LEFT JOIN card c ON i.image_id = c.image_id
	WHERE i.image_id = #cf_image_id#
	LIMIT 1;
</cfquery>

<cfquery name="sql_cards" datasource="BF">
	SELECT c.card_id
	  , c.name
	FROM card c
	  INNER JOIN card_type ct ON c.card_type_id = ct.card_type_id
	ORDER BY ct.card_type_order
	  , c.name
</cfquery>

<div name="div_cards" id="div_cards" class="filtered_list" style="display: none;">
	
<p>
	<label>
	<span class="small_form">Filter:</span>
	<input name="txt_card_filter" id="txt_card_filter" class="small_form" onKeyUp="jvFilterTbl( 'txt_card_filter', 'tbl_cards', 'td_card' )" value="" />
	</label>
</p>

Click to choose an card...<br />

<table name="tbl_cards" id="tbl_cards" class="filtered_list">
<cfloop query="sql_cards">
	<tr class="no_border">
	<td id="td_card" class="filtered_list" onClick="jvSelectCard( '#card_id#', '#replace( name, "&##39;", "", "all" )#' )">#name#</td>
	</tr>
</cfloop>
</table>
</div>

<form name="frm_image" id="frm_image" class="small_form" action="image_action.cfm?cf_action=#cf_action#&cf_image_id=#cf_image_id#" enctype="multipart/form-data" method="post">
<fieldset>
<legend>Define the Image</legend>

<!---File Name--->
<p>
	<label>
	<span class="small_form">File Name:</span>
	<input name="frm_file_name" id="frm_file_name" class="small_form" value="#sql_image.url#" />
	</label>
</p>

<!---Image Name--->
<p>
	<label>
	<span class="small_form">Image Name:</span>
	<input name="frm_name" id="frm_name" class="small_form" value="#sql_image.name#" />
	</label>
</p>

<!---Card--->
<p>
	<label>
	<span class="small_form">Is Card:</span>
	<input name="chk_card" id="chk_card" type="checkbox" value="1"<cfif sql_image.card_img EQ 1> checked="true"</cfif> />
	</label>
</p>

<!---Horizontal--->
<p>
	<label>
	<span class="small_form">Horizontal:</span>
	<input name="chk_horizontal" id="chk_horizontal" type="checkbox" value="1"<cfif sql_image.horizontal EQ 1> checked="true"</cfif> />
	</label>
</p>

<!---Description--->
<p>
	<label>
	<p class="small_form">Description:</p>
	<textarea name="txt_desc" id="txt_desc" class="small_form">#sql_image.description#</textarea>
	</label>
</p>

<input type="submit" value="Submit">
</fieldset>

<fieldset name="fs_card" id="fs_card">
<legend>Add to Card</legend>

<p name="p_card" id="p_card">
	<a name="a_card" href="##a_card" class="filtered_list" onClick="jvChangeImg()">Change Card...</a>
	<p name="p_card_display" id="p_card_display">
		<cfif sql_image.card_name EQ "">
			No Card Choosen
		<cfelse>
			#sql_image.card_name# (#sql_image.card_id#)
		</cfif>
	</p>
	<input name="hid_card_id" id="hid_card_id" type="hidden" value="#sql_image.card_id#" />
</p>

</fieldset>
</form>

<script type="text/javascript">
	function jvChangeImg(){
		$('[id*="td_card"]').each(function(){
			$(this).show();
		});
		
		$("##div_cards").show("fast", function(){ $("##txt_card_filter").focus() } ); 
	}
	
	function jvSelectCard( jvCardID, jvName ){
		$('##div_cards').hide();
		$('##p_card_display').html( jvName + ' (' + jvCardID + ')' );
		$('##hid_card_id').val( jvCardID );
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
</script>

#footer#
</cfoutput>