function mp( inID
	, inName
	, inImageID
	, inImageURL
	, inImageAlt
	, inImageHorizontal
	, inTypeID
	, inTypeName
	, inTypeOrder
	, inCostID
	, inCostName
	, inCostURL
	, inCost
	, inDamage
	, inResource
	, inEffectText
	, inFlavorText
	, inSecondType
	, inSecondTypeName
	, inSecondTypeURL
	, inBlockAs
	, inBlockAsSecondType
	, inBlockCards
	, inBlockCardsMinDamage
	, inBlockCardsMaxDamage
	, inBlockCardsSecondType
	, inBlockCardsSecondTypeMinDamage
	, inBlockCardsSecondTypeMaxDamage
	, inCostMods
	, inCostModsPlayedTurnOnly
	, inCostModsEffectOwner
	, inCostModsModInt
	, inDamageMods
	, inDamageModsPlayedTurnOnly
	, inDamageModsModInt
	, inDeffenseMods
	, inDeffenseModsPlayedTurnOnly
	, inDeffenseModsModInt ){
	
	Card.call( this, inID
		, inName
		, inImageID
		, inImageURL
		, inImageAlt
		, inImageHorizontal
		, inTypeID
		, inTypeName
		, inTypeOrder
		, inCostID
		, inCostName
		, inCostURL
		, inCost
		, inDamage
		, inResource
		, inEffectText
		, inFlavorText
		, inSecondType
		, inSecondTypeName
		, inSecondTypeURL
		, inBlockAs
		, inBlockAsSecondType
		, inBlockCards
		, inBlockCardsMinDamage
		, inBlockCardsMaxDamage
		, inBlockCardsSecondType
		, inBlockCardsSecondTypeMinDamage
		, inBlockCardsSecondTypeMaxDamage
		, inCostMods
		, inCostModsPlayedTurnOnly
		, inCostModsEffectOwner
		, inCostModsModInt
		, inDamageMods
		, inDamageModsPlayedTurnOnly
		, inDamageModsModInt
		, inDeffenseMods
		, inDeffenseModsPlayedTurnOnly
		, inDeffenseModsModInt )

	function isResource(){
		if( counter > 0 ){
			return false;
		} else {
			return resource;
		}
	}
	this.isResource = isResource;
}

Test.prototype = Object.create( Card.prototype );
