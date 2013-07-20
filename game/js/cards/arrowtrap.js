ArrowTrap.prototype = Object.create(Card.prototype);
ArrowTrap.constructor = ArrowTrap;

function ArrowTrap(){};

ArrowTrap.prototype.clone = function(){
	var tempCard = new ArrowTrap();
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

ArrowTrap.prototype.cardOnPlayEffect = function(){
	if( objGame.isEquipPhase() ){
		objGame.getCurrentPlayer().removeCard( this.cardID, 'field' );
		var fieldLength = objGame.getCurrentPlayer().getField().length;
		objGame.getCurrentPlayer().addCard( 50, 'field', fieldLength, this.cardID )
	} else {
		var message = objGame.getCurrentPlayer().getPlayerName();
		message += ' overturned these cards due to Arrow Trap.';
		
		objGame.overturnCards( 'current', 3, 'objGame.blockOnPlayAbility()', message );
		
		return true;
	}
	return false;
}

ArrowTrap.prototype.getCostID = function(){
	if( !objGame.isEquipPhase() ) return 0;
	
	return this.costID;
}

ArrowTrap.prototype.isBlockLegalHand = function(){
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