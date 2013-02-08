<cfcomponent
displayname="Application"
output="true"
hint="FoB Primary Application.">

<cfset THIS.name = "indexApp">
<cfset THIS.applicationTimeout = #CreateTimeSpan(0, 0, 20, 0)#>
<cfset THIS.clientManagement = "no">
<cfset THIS.scriptProtect = "all">
<cfset THIS.SessionManagement = "yes">
<cfset THIS.sessionTimeout = #CreateTimeSpan(0, 0, 20, 0)#>
<cfset THIS.setClientCookies = "yes">
<cfset THIS.setDomainCookies = "no">

<!---Application Start--->
<cffunction
name="OnApplicationStart"
access="public"
returntype="boolean"
output="false"
hint="Fires when the application is first created.">
	
	<cfinclude template="/fobcards/templates/root_paths.cfm">
	<cfoutput><cfinclude template="#Application.pathScripts#/udf.cfc"></cfoutput>

	<!--- Return out. --->
	<cfreturn true />

</cffunction>

<!---Session Start--->
<cffunction
name="OnSessionStart"
access="public"
returntype="void"
output="false"
hint="Fires when the session is first created.">
	
	<cfif Not isDefined("session.cfs_player_id")>
		<cflock timeout=20 scope="Session" type="Exclusive">
		    <cfset session.cfs_player_id = 1>
		</cflock>
	</cfif>

	<!--- Return out. --->
	<cfreturn />

</cffunction>

<!---Session End--->
<cffunction
name="OnSessionEnd"
access="public"
returntype="void"
output="false"
hint="Fires when the session is terminated.">

	<cflock timeout=20 scope="Session" type="Exclusive">
		<cfset StructDelete(Session, "cfs_player_id")>
	</cflock>

	<!--- Return out. --->
	<cfreturn />
</cffunction>

<!---Application End--->
<cffunction
name="OnApplicationEnd"
access="public"
returntype="void"
output="false"
hint="Fires when the application is terminated.">

	<!--- Return out. --->
	<cfreturn />
</cffunction>

</cfcomponent>