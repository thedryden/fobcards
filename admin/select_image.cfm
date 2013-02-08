<cfsilent>

<cfset cf_header_title = "***Title Here***">

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">

<cfset cf_i = 0>
</cfsilent>
<cfoutput>
#header#

<cfquery name="sql_images" datasource="BF">
	SELECT image_id
		, name
		, url
	FROM image
</cfquery>

<table>
<cfloop query="sql_images">
	<cfif cf_i MOD 5 EQ 0>
		<cfif cf_i GT 0></tr></cfif>
		<tr>
	</cfif>
	
	<td>
		<a href="image.cfm?cf_action=2&cf_image_id=#image_id#">
		<img src="#Application.pathImages#/#url#"><br />
		#name#
		</a>
	</td>
	<cfset cf_i++>
</cfloop>
</table>

<script type="text/javascript">
$(document).ready(function(){
	
});
</script>

#footer#
</cfoutput>