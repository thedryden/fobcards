<cfsilent>
<cfset cf_error = false>
	
<cfif isDefined("form.txt_player") AND isDefined("form.txt_password")>
	<cfset cf_person_id = 0>
	
	<cfset cf_hash = #hash( "g7TrUX9" & form.txt_password, "SHA-512" )#>
	
	<cfstoredproc procedure="app_authenticate_player" datasource="BF">
		<!---P_screen_name---><cfprocparam type="in" value="#form.txt_player#" cfsqltype="cf_sql_varchar">
		<!---P_player_password---><cfprocparam type="in" value="#cf_hash#" cfsqltype="cf_sql_varchar">
		<!---P_player_id---><cfprocparam type="out" cfsqltype="cf_sql_varchar" variable="cf_person_id">
	  <cfprocresult name="sql_auth">
	</cfstoredproc>
	
	<cfif cf_person_id EQ 0>
		<cfset cf_error = true>
	<cfelse>
		<cfset session.cfs_player_id = #cf_person_id#>
	
		<cflocation addToken = "no" url = "#Application.pathRoot#/" />
	</cfif>
</cfif>
</cfsilent>

<cfset cf_header_title = "Login">

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">

<cfoutput>
#header#

<h1>Login Form</h1>

<p style="text-align: center;"><a href="signup.cfm">Not a user yet? click here to sign up!</a></p>

<form name="frm_login" id="frm_login" class="small_form" method="post" action="login.cfm">
<cfif cf_error><p class="error">The username and password combination does not match any account</p></cfif>

<p>
	<label>
	<span class="small_form">Username:</span>
	<input name="txt_player" id="txt_player" type="text" class="small_form" maxlength="20" value="" />
	</label>
</p>
<p>
	<label>
	<span class="small_form">Password:</span>
	<input name="txt_password" id="txt_password" type="password" class="small_form" value="" />
	</label>
</p>
<p style="text-align: center;"><input type="submit" value="Contiue"></p>
</form>

<script type="text/javascript">
$(document).ready(function(){
	$('##txt_player').focus();
});
</script>
#footer#
</cfoutput>