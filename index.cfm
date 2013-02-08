<cfset cf_header_title = "Index">

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">

<cfoutput>
#header#

<h1>Hello World!</h1>
<h2>Hello World!</h2>
<h3>Hello World!</h3>
<h4>Hello World!</h4>

<p>Hello World!</p>

<a href="index.cfm">Hello World!</a>
<a href="google.com">Hello World!</a>

<script type="text/javascript">
$(document).ready(function(){
	
});
</script>

#footer#
</cfoutput>