Template.prototype = Object.create(Card.prototype);
Template.constructor = Template;

function Template(){};

Template.prototype.clone = function(){
	var tempCard = new Template();
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