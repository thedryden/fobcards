GreaseTrap.prototype = Object.create(Card.prototype);
GreaseTrap.constructor = GreaseTrap;

function GreaseTrap(){};

GreaseTrap.prototype.clone = function(){
	var tempCard = new GreaseTrap();
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

GreaseTrap.prototype.cardOnPlayEffect = function(){
	if( objGame.isEquipPhase() ){
		objGame.getCurrentPlayer().removeCard( this.cardID, 'field' );
		var fieldLength = objGame.getCurrentPlayer().getField().length;
		objGame.getCurrentPlayer().addCard( 50, 'field', fieldLength, this.cardID )
	} else {
		if( objGame.getReactionPlayer().getDeckID() != objGame.getIsPlayer( true ).getDeckID() ){
			objGame.getReactionPlayer().drawCardShow( 1, 'objGame.blockOnPlayAbility()', '<p>You drew this cards due to Grease Trap.</p>' )
			
			return true;	
		} else {
			objGame.getReactionPlayer().drawCard( 1 );
		}
	}
	return false;
}

GreaseTrap.prototype.getCostID = function(){
	if( !objGame.isEquipPhase() ) return 0;
	
	return this.costID;
}

GreaseTrap.prototype.isBlockLegalHand = function(){
	var damage = objGame.getCardDamage();

	//0 = typeID, 1 = Min Damage, 2 = Max Damage
	for( var i = 0; i < this.blockCards.length; i++ ){
		if( objGame.getCardInPlay().isBlockedAs( this.blockCards[i][0] ) ){
			if( damage >= this.blockCards[i][1] 
				&& ( this.blockCards[i][2] == -1 || damage <= this.blockCards[i][2] ) ) return true;
		}
	}
	for( var i = 0; i < this.blockCardsSecondType.length; i++ ){
		if( objGame.getCardInPlay().isBlockedAsSecondType( this.blockCardsSecondType[i] ) ){
			if( damage >= this.blockCardsSecondType[i][1] 
				&& ( this.blockCardsSecondType[i][2] == -1 || damage <= this.blockCardsSecondType[i][2] ) ) return true;
		}
	}
	return false;
}