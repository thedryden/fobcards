<cfcomponent>

<!---Replace icons in text with correct path.--->
<cffunction name="cf_effect_icon" returnType="string" output="No">

	<cfargument name="cf_text" type="string" required="true">
	
	<cfset cf_text = replace( cf_text, "[momentum]", '<img src="#Application.momentumIcon#" alt="Momentum" />', "ALL" ) />
	<cfset cf_text = replace( cf_text, "[mp]", '<img src="#Application.MPIcon#" alt="MP" />', "ALL" ) />
	<cfset cf_text = replace( cf_text, "[gold]", '<img src="#Application.goldIcon#" alt="Gold" />', "ALL" ) />
	<cfset cf_text = replace( cf_text, "[piety]", '<img src="#Application.pietyIcon#" alt="Prayer for Piety" />', "ALL" ) />
	<cfset cf_text = replace( cf_text, "[power]", '<img src="#Application.powerIcon#" alt="Prayer for Power" />', "ALL" ) />
	<cfset cf_text = replace( cf_text, "[nature]", '<img src="#Application.natureIcon#" alt="Nature" />', "ALL" ) />
	<cfset cf_text = replace( cf_text, "[spell]", '<img src="#Application.spellIcon#" alt="Spell" />', "ALL" ) />
	<cfset cf_text = replace( cf_text, "[chain]", '<img src="#Application.chainIcon#" alt="Chain" />', "ALL" ) />
	<cfset cf_text = replace( cf_text, "[armor]", '<img src="#Application.armorIcon#" alt="Armor" />', "ALL" ) />
	<cfset cf_text = replace( cf_text, "[weapon]", '<img src="#Application.weaponIcon#" alt="Weapon" />', "ALL" ) />
	<cfset cf_text = replace( cf_text, "[shield]", '<img src="#Application.shieldIcon#" alt="Shield" />', "ALL" ) />
	<cfset cf_text = replace( cf_text, "[trap]", '<img src="#Application.trapIcon#" alt="Trap" />', "ALL" ) />

	<cfreturn cf_text>
</cffunction>

</cfcomponent>