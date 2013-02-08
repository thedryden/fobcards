function Test( inID
	, inName
	, inImageID
	, inImageURL
	, inImageAlt
	, inImageHorizontal
	, inTypeID
	, inTypeName
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

	function cardOnPlayEffect(){
		return true;
	}
	this.cardOnPlayEffect = cardOnPlayEffect;
}

Test.prototype = Object.create( Card.prototype );
