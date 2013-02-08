<cfcomponent>

<!---Sanatizes data for SQL insert
Replace the following with their  the following characters <>()|'{} with their ASCII html equilvilant, i.e. &#60;
--->
<cffunction name="cf_sanitize_sql" returnType="string" output="No">

	<cfargument name="cf_text" type="string" required="true">

    <cfset cf_text = reReplace( cf_text, "\<", "&##60;", "ALL" ) />
    <cfset cf_text = reReplace( cf_text, "\>", "&##62;", "ALL" ) />
    <cfset cf_text = reReplace( cf_text, "\(", "&##40;", "ALL" ) />
    <cfset cf_text = reReplace( cf_text, "\)", "&##41;", "ALL" ) />
    <cfset cf_text = reReplace( cf_text, "\|", "&##124;", "ALL" ) />
    <cfset cf_text = reReplace( cf_text, "\'", "&##39;", "ALL" ) />
    <cfset cf_text = reReplace( cf_text, '\"', '&##34;', 'ALL' ) />
    <cfset cf_text = reReplace( cf_text, "\{", "&##123;", "ALL" ) />
    <cfset cf_text = reReplace( cf_text, "\}", "&##125;", "ALL" ) />

	<cfreturn cf_text>
</cffunction>

<!---Searches one dimensional array for passed search term--->
<cffunction name="cf_indexOf" returnType="numeric" output="No">
	
	<cfargument name="cf_a" type="array" required="true">
	<cfargument name="cf_search" type="string" required="true">
	<cfset cf_i = 1>
	<cfloop from="1" to="#ArrayLen( cf_a )#" index="cf_i">
		<cfif cf_a[cf_i] EQ cf_search>
			<cfreturn cf_i>
		</cfif>
	</cfloop>
	<cfreturn 0>
</cffunction>

<!---Sanatizes data to numeric characters only--->
<cffunction name="cf_sanitize_numeric" returnType="string" output="No">

	<cfargument name="cf_text" type="string" required="true">
	
	<cfset cf_text = reReplace( cf_text, "[^0-9.]", "", "ALL" ) />

	<cfreturn cf_text>
</cffunction>

</cfcomponent>