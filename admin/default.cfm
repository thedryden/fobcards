<cfset cf_header_title = "Admin Menu">

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">

<cfoutput>
#header#

<ul>
<li><a href="card.cfm?cf_action=1">Add a Card</a></li>
<li><a href="show_cards.cfm">Edit/View Cards</a></li>
<li><a href="image.cfm">Add Image</a></li>
<li><a href="select_image.cfm">Edit/View Image</a></li>
</ul>

<script type="text/javascript">
$(document).ready(function(){
	
});
</script>

#footer#
</cfoutput>