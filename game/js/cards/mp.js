MP.prototype = Object.create(Card.prototype);
MP.constructor = MP;

function MP(){};

MP.prototype.clone = function(){
	var tempCard = new MP();
	tempCard.init( this.cardID
		, this.name
		, this.imageID
		, this.imageURL
		, this.imageAlt
		, this.imageHorizontal
		, this.typeID
		, this.typeName
		, this.typeOrder
		, this.costID
		, this.costName
		, this.costURL
		, this.cost
		, this.damage
		, this.resource
		, this.effectText
		, this.flavorText
		, this.secondType
		, ''//inSecondTypeName
		, ''//inSecondTypeURL
		, this.blockAs
		, this.blockAsSecondType
		, this.blockCards
		, ''//blockCardsMinDamage
		, ''//blockCardsMaxDamage
		, this.blockCardsSecondType
		, ''//blockCardsSecondTypeMinDamage
		, ''//blockCardsSecondTypeMaxDamage
		, this.costMods
		, ''//inCostModsPlayedTurnOnly
		, ''//inCostModsEffectOwner
		, ''//inCostModsModInt
		, this.damageMods
		, ''//inDamageModsPlayedTurnOnly
		, ''//inDamageModsModInt
		, this.deffenseMods
		, ''//inDeffenseModsPlayedTurnOnly
		, ''//inDeffenseModsModInt 
	); 
	
	tempCard.setCounter( this.getCounter() );
	
	return tempCard;		
}

MP.prototype.isResource = function(){
	if( counter > 0 ){
		return false;
	} else {
		return resource;
	}
}

MP.prototype.cardOnPlayEffect = function(){
	objGame.addSpellsPlayed( -1 );
	
	return false;
}