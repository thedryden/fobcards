Advance.prototype = Object.create(Card.prototype);
Advance.constructor = Advance;

function Advance(){};

Advance.prototype.clone = function(){
	var tempCard = new Advance();
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

Advance.prototype.cardOnPlayEffect = function(){
	var message = objGame.getCurrentPlayer().getPlayerName();
	message += ' overturned this card when playing Advance.';
	
	objGame.overturnCards( 'current', 1, 'objGame.playCardSuccessAbility();', message );
	
	return true;
}