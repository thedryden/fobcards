<cfsilent>
<cfinclude template = "#Application.pathScripts#/udf.cfc">

<cfset cf_header_title = "Image Administration">

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">

<cfset cf_card = 0>
<cfif isDefined("form.chk_card")>
	<cfset cf_card = 1>
</cfif>
<cfset cf_horizontal = 0>
<cfif isDefined("form.chk_horizontal")>
	<cfset cf_horizontal = 1>
</cfif>

</cfsilent>
<cfoutput>
#header#

<cfstoredproc procedure="app_update_image" datasource="BF">
	<cfif cf_action EQ 1>
		<!---P_image_id---><cfprocparam cfsqltype="cf_sql_int" value="0" />
	<cfelse>
		<!---P_image_id---><cfprocparam cfsqltype="cf_sql_int" value="#url.cf_image_id#" />
	</cfif>
	<!---P_name---><cfprocparam cfsqltype="cf_sql_varchar" value="#form.frm_name#" />
	<!---P_url---><cfprocparam cfsqltype="cf_sql_varchar" value="#form.frm_file_name#" />
	<!---P_desc---><cfprocparam cfsqltype="cf_sql_varchar" value="#form.txt_desc#" />
	<!---P_card---><cfprocparam cfsqltype="cf_sql_bit" value="#cf_card#" />
	<!---P_horizontal---><cfprocparam cfsqltype="cf_sql_bit" value="#cf_horizontal#" />
	<!---P_card_id---><cfprocparam cfsqltype="cf_sql_integer" value="#form.hid_card_id#" />
</cfstoredproc>
<img src="#Application.pathImages#/#form.frm_file_name#">

<p>
<a href="image.cfm">Add Another Image</a><br />
<a href="default.cfm">Return to Admin Menu</a>
</p>

#footer#
</cfoutput>
<!---
<cfoutput>
<cffile action="upload" 
destination="#Application.pathImages#/#form.frm_file_name#"
fileField="form.frm_file"
accept="image/png"
nameConflict="Error">
</cfoutput>
--->