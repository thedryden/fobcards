<cfsilent>
<cfif Not isDefined("cf_header_title")>
	<cfset cf_header_title = "Field of Battle (cards)">
</cfif>

<cfif Not isDefined("cf_add_to_head")>
	<cfset cf_add_to_head = "">
</cfif>

<cfloop collection="#Form#" item="cf_field">
	<cfset Form[cf_field] = #cf_sanitize_sql( Form[cf_field] )#>
</cfloop>
</cfsilent>

<cfoutput>
<cfsavecontent variable="header">
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  	<link rel="stylesheet" type="text/css" media="screen" href="#application.pathCss#/pages.css" />
  	<link rel="stylesheet" type="text/css" media="screen" href="#application.pathCss#/general.css" />
  	<link rel="stylesheet" type="text/css" media="screen" href="#application.pathCss#/forms.css" />
  	<link rel="stylesheet" type="text/css" media="screen" href="#application.pathCss#/cards.css" />

	<script src="#application.pathScripts#/jquery-1.7.2.min.js" type="text/javascript"></script>
	<script src="#application.pathScripts#/pathes.js" type="text/javascript"></script>
	<script src="#application.pathScripts#/general.js" type="text/javascript"></script>
	#cf_add_to_head#
	
	<title>#cf_header_title#</title>
</head>

<body>
<div class="outer_main">
	<div class="header">
		<div class="header_text">#cf_header_title#</div>
	
		<div id="menu_div">
		<ul id="menu">
			<li><a class="menu" href="#application.pathRoot#/index.cfm"><u>Home</u></a></li>
			<li><a class="menu" href="#application.pathRoot#/game/"><u>Play the Game!</u></a></li>
			<cfif session.cfs_player_id EQ 1><li><a class="menu" href="#application.pathRoot#/admin/">Administration</a></li></cfif>
			<cfif session.cfs_player_id EQ 0>
				<li><a class="menu" href="#application.pathRoot#/login.cfm">Login</a></li>
			<cfelse>
				<li><a class="menu" href="#application.pathRoot#/logout.cfm">Logout</a></li>
			</cfif>
		</ul>
		</div>
	</div>
	
	<div class="main">
</cfsavecontent>
	
<cfsavecontent variable="footer">
	</div>
</div>
<div class="footer">
	Website &##169; Matthew Dryden.
</div>

</body>
</html>
</cfsavecontent>
</cfoutput>