<cfsilent>

<cfset cf_header_title = "Show Cards">

<cfinclude template="#Application.pathTemplates#/head_foot.cfm">
<cfinclude template="#Application.pathScripts#/gameUdf.cfc">

</cfsilent>
<cfoutput>
#header#

<cfquery name="sql_cards" DAtasource="BF">
SELECT c.card_id
	, c.name
	, c.cost
	, co.cost_type
	, ci.url AS cost_icon
	, c.damage
	, c.effect_text
	, c.image_id
	, i.url
FROM card c
	INNER JOIN image i ON c.image_id = i.image_id
	INNER JOIN card_type ct ON c.card_type_id = ct.card_type_id
	INNER JOIN cost_type co ON c.cost_type_id = co.cost_type_id
	INNER JOIN image ci ON co.image_id = ci.image_id
ORDER BY ct.card_type_order
	, c.cost
	, c.name
</cfquery>

<cfquery name="sql_second_card_type" datasource="BF">
	SELECT cts.card_id
		, cts.second_card_type_id
		, sc.second_card_type
		, i.url
	FROM card_to_second_type cts
		INNER JOIN second_card_type sc ON cts.second_card_type_id = sc.second_card_type_id
		INNER JOIN image i ON sc.image_id = i.image_id
	ORDER BY cts.card_id
		, sc.second_card_type_order
</cfquery>

<cfloop query="sql_cards">
	<cfquery name="sql_one_card_second_type" dbtype="query">
		SELECT url
		FROM sql_second_card_type
		WHERE card_id = #card_id#
	</cfquery>
	
	<span class="small_card">
		<a href="card.cfm?cf_card_id=#card_id#&cf_action=2">
			<img class="card" src="#Application.pathImages#/#url#" />
		</a>
		<cfif sql_one_card_second_type.recordCount GT 0>
			<p class="card">
			<cfloop query="sql_one_card_second_type">
				<img src="#Application.pathImages#/#url#" />
			</cfloop>
			</p>
		</cfif>
		<p class="card"><b>#name#</b></p>
		<p class="card"><b>Cost:</b> #cost#
		<img src="#Application.pathImages#/#cost_icon#" /></p>
		<p class="card"><b>Damage:</b> #damage#</p>
		<p class="card"><b>Effect:</b> #cf_effect_icon( effect_text )#</p>
	</span>
</cfloop>

<script type="text/javascript">
$(document).ready(function(){
	
});
</script>

#footer#
</cfoutput>