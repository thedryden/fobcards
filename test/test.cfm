<cfsilent>

<cfset cf_header_title = "Test">

<cfsavecontent variable="cf_add_to_head">
	<script src="/fobcards/game/js/card.js" type="text/javascript"></script>
	<script src="/fobcards/game/js/cards/test.js" type="text/javascript"></script>
</cfsavecontent>

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">

</cfsilent>
<cfoutput>
#header#



<script type="text/javascript">
$(document).ready(function(){
	var test = new Card( 7 , 'Bind' , 14 , 'bind.png' , 'The image for the bind card' , 0 , 1 , 'Attack' , 1 , 'Momentum' , 'momentum.png' , 0 , 4 , 0 , 'When played you must discard a card.' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' )
	var alt = new Test( 7 , 'Bind' , 14 , 'bind.png' , 'The image for the bind card' , 0 , 1 , 'Attack' , 1 , 'Momentum' , 'momentum.png' , 0 , 4 , 0 , 'When played you must discard a card.' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' )
	
	alert( test.cardOnPlayEffect() )
	alert( alt.cardOnPlayEffect() )

});
</script>

#footer#
</cfoutput>