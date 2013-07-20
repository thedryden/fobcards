function Player(){
	this.deckID = 0;
	this.playerName = ''
	this.name = '';
	this.classID = '';
	this.className = '';
	this.handSize = 0;
	this.initiative = 0;
	this.startingGold = 0;
	this.ability = '';
	this.url = '';
	this.alt = '';
	this.oppDeckID = 0;
	
	this.deck = [];
	this.hand = [];
	this.field = [];
	this.discard = [];
	this.removed = [];
	
	this.effectIndex = 0;
	
	this.tempArray1 = [];
	this.tempArray2 = [];
	this.tempArray3 = [];
	
	this.momentum = 0;
	this.momentumMod = 0;
	this.attackDamageMod = 0;
	this.attackDeffenseMod = 0;
	
	this.MP = 0;
	this.MPMod = 0;
	this.magicDamageMod = 0;
	this.magicDeffenseMod = 0;
	
	this.gold = 0;
	
	this.prayer = 0;
	this.prayerAll = 0;
	this.prayerSpent = 0;
}

Player.prototype.init = function( inDeckID, inPlayerName, inName, inClassID, inClassName, inHandSize, inInitiative, inGold, inAbility, inURL, inAlt, inOppDeckID ){
	this.deckID = inDeckID;
	this.playerName = inPlayerName
	this.name = inName;
	this.classID = inClassID;
	this.className = inClassName;
	this.handSize = inHandSize;
	this.initiative = inInitiative;
	this.startingGold = inGold;
	this.ability = inAbility;
	this.url = inURL;
	this.alt = inAlt;
	this.oppDeckID = inOppDeckID;
}	
	
//Other variables, strictly for processing
//var cardTypes = objGame.getCardTypes();

Player.prototype.addCard = function( inCard, inLocation, inPosition, inCounter ){
	var aLocation = '';
	var good = false;
	
	switch ( inLocation ) {
		case 'deck':
			aLocation = this.deck;
			good = true;
			break;
		case 'hand':
			aLocation = this.hand;
			good = true;
			break;
		case 'field':
			aLocation = this.field;
			good = true;
			break;
		case 'discard':
			aLocation = this.discard;
			good = true;
			break;
		case 'removed':
			aLocation = this.removed;
			good = true;
			break;
	}
	
	if( !good )
		return;
	
	aLocation[inPosition] = objGame.getCard( inCard );
	aLocation[inPosition].setCounter( inCounter );
}
	
Player.prototype.getDeckID = function(){
	return this.deckID;
}
	
Player.prototype.getPlayerName = function(){
	return this.playerName;
}
	
Player.prototype.getDeck = function(){
	var outDeck = [];
	for( var i = 0; i < this.deck.length; i++ ){
		outDeck[i] = this.deck[i].clone();
	}
	
	return outDeck;
}

Player.prototype.getHand = function(){
	var outHand = [];
	for( var i = 0; i < this.hand.length; i++ ){
		outHand[i] = this.hand[i].clone();
	}
	
	return outHand;
}

Player.prototype.getField = function(){
	var outField = [];
	for( var i = 0; i < this.field.length; i++ ){
		outField[i] = this.field[i].clone();
	}
	
	return outField;
}

Player.prototype.getDiscard = function(){
	var outDiscard = [];
	for( var i = 0; i < this.discard.length; i++ ){
		outDiscard[i] = this.discard[i].clone();
	}
	
	return outDiscard;
}

Player.prototype.getRemoved = function(){
	var outRemoved = [];
	for( var i = 0; i < this.removed.length; i++ ){
		outRemoved[i] = this.removed[i].clone();
	}
	
	return outRemoved;
}

Player.prototype.sortForPlay = function( array ){
	array = array.sort(
		function(a, b){
			if( a.getTypeOrder() > b.getTypeOrder() ){
				return 1;
			} else if( a.getTypeOrder() < b.getTypeOrder() ) {
				return -1;
			} else {
				if( a.getCost() > b.getCost() ){
					return 1;
				} else if( a.getCost() < b.getCost() ) {
					return -1;
				} else {
					if( a.getName() > b.getName() ){
						return 1;
					} else if ( a.getName() < b.getName() ){
						return -1;
					}
				}
			}
			return 0;
		}
	)
}

Player.prototype.sortForBlock = function( array ){
	array = array.sort(
		function(a, b){
			if( a.getBlockTypeOrder() > b.getBlockTypeOrder() ){
				return 1;
			} else if( a.getBlockTypeOrder() < b.getBlockTypeOrder() ) {
				return -1;
			} else {
				if( a.getCost() > b.getCost() ){
					return 1;
				} else if( a.getCost() < b.getCost() ) {
					return -1;
				} else {
					if( a.getName() > b.getName() ){
						return 1;
					} else if ( a.getName() < b.getName() ){
						return -1;
					}
				}
			}
			return 0;
		}
	)
}
	
Player.prototype.getHandSize = function(){
	return this.handSize;
}

Player.prototype.getStartingGold = function(){
	return this.startingGold;
}

Player.prototype.getMomentum = function(){
	return this.momentum;
}

Player.prototype.getMomentumMod = function(){
	return this.momentumMod;
}

Player.prototype.getAttackDamageMod = function(){
	return this.attackDamageMod;
}

Player.prototype.getAttackDeffenseMod = function(){
	return this.attackDeffenseMod;
}

Player.prototype.getMP = function(){
	return this.MP;
}

Player.prototype.getMPMod = function(){
	return this.MPMod;
}

Player.prototype.getMagicDamageMod = function(){
	return this.magicDamageMod;
}
	
Player.prototype.getMagicDeffenseMod = function(){
	return this.magicDeffenseMod;
}

Player.prototype.getGold = function(){
	return this.gold;
}

Player.prototype.getPrayer = function(){
	return this.prayer;
}

Player.prototype.getPrayerAll = function(){
	return this.prayerAll;
}

Player.prototype.getPrayerSpent = function(){
	return this.prayerSpent;
}

//Draws num cards from top of deck to hand
Player.prototype.drawCard = function( num ){
	var output = [];
	for( var i=0; i < num; i++ ){
		output[i] = this.deck.pop().clone();
		this.hand[this.hand.length] = output[i];			
	}
	return output;
}

/* Moves the top card of the deck array to the discard array and
 * returns a copy of the moved card. Returns undefined if no cards in deck */
Player.prototype.overturnCard = function(){
	if( this.deck.length == 0 ) return undefined;
	var overturned = this.deck.pop();
	
	this.discard[this.discard.length] = overturned;
	
	return overturned.clone();
}

Player.prototype.shuffleDeck = function(){
	for( var i = 0; i < 10; i++ ){
		this.deck.sort( 
			function jv_sort_random( a,b ){
				return (Math.round(Math.random())-0.5);
			}
 		);
	}
}
	
/* removes passed card id from passed array.
 */
Player.prototype.removeCard = function( cardID, array ){
	array = array.toLowerCase();
		
	var aArray = undefined;
	
	switch ( array ) {
		case 'deck':
			aArray = this.deck;
			break;
		case 'hand':
			aArray = this.hand;
			break;
		case 'field':
			aArray = this.field;
			break;
		case 'discard':
			aArray = this.discard;
			break;
		case 'removed':
			aArray = this.removed;
			break;
	}
	
	if( aArray == undefined ) return false;
	
	var found = false;
	
	for( var i = aArray.length - 1; i >= 0; i-- ){
		if( aArray[i].getID() == cardID ){
			aArray.splice( i, 1 );
			return true;
		}
	}
	
	return found;
}

/* moves passed card id from source array to destination array.
 * If either source or destination are deck then the deck is also shuffled
 * search is done end of array to begining. If the card is found true is 
 * returned if not false is returned
 * Possible source and destination values: deck, hand, field, discard, removed
 */
Player.prototype.moveCard = function( cardID, source, destination ){
	source = source.toLowerCase();
	destination = destination.toLowerCase();
	
	if( source == destination ) return false;
	
	tempCard = objGame.getCard( cardID );
	if( tempCard.getTypeID() == 7 && destination == 'discard' ) destination ='removed';
	
	var index = -1;
		
	switch ( destination ) {
		case 'deck':
			index = this.deck.length;
			break;
		case 'hand':
			index = this.hand.length;
			break;
		case 'field':
			index = this.field.length;
			break;
		case 'discard':
			index = this.discard.length;
			break;
		case 'removed':
			index = this.removed.length;
			break;
	}
	
	if( index == -1 ) return false;
	
	if( this.removeCard( cardID, source ) ){
		if( destination == 'field' ){
			var oneOnlyStart = [3,4,5,6];//Weapon,Sheild,Armor,Trap
			var oneOnly = []
			for( var i = 0; i < oneOnlyStart.length; i++ ){
				if( tempCard.isSecondType( oneOnlyStart[i] ) ) oneOnly[oneOnly.length] = oneOnlyStart;	
			}
			if( oneOnly.length > 0 ){
				tempField = getField();
				for( var oo = 0; oo < oneOnly.length; oo++ ){
					for( var i = 0; i < tempField.length; i++ ){
						if( tempField[i].isSecondType( oneOnly[oo] ) ){ 
							moveCard( tempField[i].getID, 'field', 'discard' );
							break;
						}
					}
				}
			}
		}
		
		this.addCard( cardID, destination, index, 0 );
	}
	
	if( source == 'deck' || destination == 'deck' ) this.shuffleDeck();
		
	return true;
}

Player.prototype.regenerateMP = function(){
	for( var i = 0; i < this.field.length; i++ ){
		if( this.field[i].getID() == 1 && !this.field[i].isResource() )
			this.field[i].addCounter( -1 );
	}
}

Player.prototype.getResources = function(){
	this.momentum = 0;
	this.MP = 0;
	this.gold = 0;
	this.prayer = 0;
	this.prayerAll = 0;
	this.prayerSpent = 0;
	this.momentumMod = 0;
	this.attackDamageMod = 0;
	this.attackDeffenseMod = 0;
	this.MPMod = 0;
	this.magicDamageMod = 0;
	this.magicDeffenseMod = 0;
	
	for (var i = 0; i < this.field.length; i++) {
		if (this.field[i].isResource()){
			switch (this.field[i].getTypeID()) {
				case 1:
					this.momentum += 1;
					break;
				case 2:
					this.MP += 1;
					break;
				case 3:
					this.gold += 1;
					break;
				case 4:
					this.prayerAll += 1;
					break;
				case 5:
					this.prayerAll += 1;
					break;
				case 6:
					this.prayerAll += 1;
					break;
			}
		} else if (this.field[i].getTypeID() == 4 &&
			this.field[i].getTypeID() == 5 &&
			this.field[i].getTypeID() == 6) {
			
			this.prayerSpent++;
		}
		
		this.momentumMod += parseInt( this.field[i].getYourCostMods( 1 ) );
		this.MPMod += parseInt( this.field[i].getYourCostMods( 2 ) );
		
		this.attackDamageMod += parseInt( this.field[i].getDamageMods( 1 ) );
		this.magicDamageMod += parseInt( this.field[i].getDamageMods( 2 ) );
		
		this.attackDeffenseMod += parseInt( this.field[i].getDeffenseMods( 1 ) );
		this.magicDeffenseMod += parseInt( this.field[i].getDeffenseMods( 2 ) );
	}
	this.prayer = this.prayerAll - this.prayerSpent;
		
	var cardsPlayedThisTurn = objGame.getCardsPlayedThisTurn();
	
	var opp = objGame.getPlayer( this.oppDeckID );
	if( opp != undefined ){
		var oppField = opp.getField();
		
		for( var i = 0; i < oppField.length; i++ ){
			this.momentumMod += oppField[i].getOppCostMods( 1 );
			this.MPMod += oppField[i].getOppCostMods( 2 );
		}	
	}
	
	if( objGame.getCurrentPlayer() == this.deckID ){
		for( var i = 0; i < cardsPlayedThisTurn.length; i++ ){
			this.momentumMod += cardsPlayedThisTurn[i].getYourCostModsThisTurn( 1 );
			this.MPMod += cardsPlayedThisTurn[i].getYourCostModsThisTurn( 2 );
			
			this.attackDamageMod += cardsPlayedThisTurn[i].getDamageModsThisTurn( 1 );
			this.magicDamageMod += cardsPlayedThisTurn[i].getDamageModsThisTurn( 2 );
			
			this.attackDeffenseMod += cardsPlayedThisTurn[i].getDeffenseModsThisTurn( 1 );
			this.magicDeffenseMod += cardsPlayedThisTurn[i].getDeffenseModsThisTurn( 2 );
		}
	} else {
		for( var i = 0; i < cardsPlayedThisTurn.length; i++ ){
			this.momentumMod += cardsPlayedThisTurn[i].getOppCostModsThisTurn( 1 );
			this.MPMod += cardsPlayedThisTurn[i].getOppCostModsThisTurn( 2 );
		}
	}
}
	
Player.prototype.payCost = function( objCard ){
	if( objCard.getCost() <= 0 ) return;
	
	//Action is only required if cost is magic or gold
	if( objCard.getCostID() == 2 ){
		var toPay = 0
		if( objCard.getCost() != 0 ) toPay = objCard.getCost() + MPMod;
		for( var i = 0; i < this.field.length; i++ ){
			if( this.field[i].getID() == 1 && this.field[i].isResource() ){
				this.field[i].setCounter( 2 );
				toPay--;
				if( toPay <= 0 ) return;
			}
		}
	}
	
	if( objCard.getCostID() == 3 ){
		for( var i = 0; i < objCard.getCost(); i++ ){
			this.moveCard( 2, 'field', 'removed' )
		}
	}
}

Player.prototype.payCostFixed = function( costTypeID, cost ){
	if( cost <= 0 ) return;
	
	//Action is only required if cost is magic or gold
	if( costTypeID == 2 ){
		for( var i = 0; i < field.length; i++ ){
			if( this.field[i].getID() == 1 && this.field[i].isResource() ){
				this.field[i].setCounter( 2 );
				cost--;
				if( cost <= 0 ) return;
			}
		}
	}
	
	if( costTypeID == 3 ){
		for( var i = 0; i < objCard.getCost(); i++ ){
			this.moveCard( 2, 'field', 'removed' )
		}
	}
}

/* The following all loops through all cards in players field and 
 * runs function of same name in card object for each card found 
 * there. If a card requires a descision and thus break from normal 
 * game play then it will return true which will cause this function
 * to return true. Once the decision is delt with play should return
 * to this function starting with the next card in the array
 */
Player.prototype.playCardFieldEffectMods = function(){
	for( ; this.effectIndex < this.field.length; this.effectIndex++ ){
		if( this.field[this.effectIndex].playCardFieldEffectMods() ){
			this.effectIndex++
			return true;
		}
	}
	
	this.effectIndex = 0;
	return false;
}

Player.prototype.oppPlayCardFieldEffectMods = function(){
	for( ; this.effectIndex < this.field.length; this.effectIndex++ ){
		if( this.field[this.effectIndex].oppPlayCardFieldEffectMods() ){
			this.effectIndex++
			return true;
		}
	}
	
	effectIndex = 0;
	return false;
}

Player.prototype.playCardPlayedThisTurnMods = function(){
	var playedThisTurn = objGame.getCardsPlayedThisTurn();
	
	for( ; this.effectIndex < playedThisTurn.length; this.effectIndex++ ){
		if( playedThisTurn[this.effectIndex].blockCardPlayedThisTurnMods() ){
			this.effectIndex++
			return true;
		}
	}
	
	this.effectIndex = 0;
	return false;
}

Player.prototype.blockCardFieldEffectMods = function(){
	for( ; this.effectIndex < this.field.length; this.effectIndex++ ){
		if( this.field[this.effectIndex].blockCardFieldEffectMods() ){
			this.effectIndex++
			return true;
		}
	}
	
	this.effectIndex = 0;
	return false;
}

Player.prototype.oppBlockCardFieldEffectMods = function(){
	for( ; this.effectIndex < this.field.length; this.effectIndex++ ){
		if( this.field[this.effectIndex].oppBlockCardFieldEffectMods() ){
			this.effectIndex++
			return true;
		}
	}
	
	this.effectIndex = 0;
	return false;
}

Player.prototype.blockCardPlayedThisTurnMods = function(){
	var playedThisTurn = objGame.getCardsPlayedThisTurn();
	
	for( ; this.effectIndex < playedThisTurn.length; this.effectIndex++ ){
		if( playedThisTurn[this.effectIndex].blockCardPlayedThisTurnMods() ){
			this.effectIndex++
			return true;
		}
	}
	
	this.effectIndex = 0;
	return false;
}

Player.prototype.doDamageFieldEffectMods = function(){
	for( ; this.effectIndex < this.field.length; this.effectIndex++ ){
		if( this.field[this.effectIndex].doDamageFieldEffectMods() ){
			this.effectIndex++
			return true;
		}
	}
	
	this.effectIndex = 0;
	return false;
}

Player.prototype.takeDamageFieldEffectMods = function(){
	for( ; this.effectIndex < this.field.length; this.effectIndex++ ){
		if( this.field[this.effectIndex].takeDamageFieldEffectMods() ){
			this.effectIndex++
			return true;
		}
	}
	
	this.effectIndex = 0;
	return false;
}

Player.prototype.takeDamagePlayedThisTurnMods = function(){
	var playedThisTurn = objGame.getCardsPlayedThisTurn();
	
	for( ; this.effectIndex < playedThisTurn.length; this.effectIndex++ ){
		if( playedThisTurn[this.effectIndex].blockCardPlayedThisTurnMods() ){
			this.effectIndex++
			return true;
		}
	}
	
	this.effectIndex = 0;
	return false;
}

// Abilities from this point on
// * ***__________________________________________***__________________________________________***


// Triggers at the begining of the game before the equip phase
Player.prototype.startGameAbility = function(){
	return false;
}

// Triggers after the equip phase
Player.prototype.postEquipAbility = function(){
	return false;
}

// Triggers at the just after you draw your hand
Player.prototype.postHandDrawAbility = function(){
	return false;
}

//Start of turn, before you draw your a card
Player.prototype.startTurnAbility = function(){
	return false;
}

//Just after you draw a card on your turn
Player.prototype.postTurnDrawAbility = function(){
	return false;
}

//When determining resources before picking a card, after running 
//getResources for both players but first of the effects
Player.prototype.playCardAbilityMods = function(){
	return false;
}

//When determining resources before picking a card, after playCardAbilityMods
Player.prototype.oppPlayCardAbilityMods = function(){
	return false;
}

//When determining resources before picking a block, after running getResources 
//for both players but first of the effects
Player.prototype.blockCardAbilityMods = function(){
	return false;
}

//When determining resources before picking a block, after playCardAbilityMods
Player.prototype.oppBlockCardAbilityMods = function(){
	return false;
}

//Just before you do damage
Player.prototype.doDamageAbilityMods = function(){
	return false;
}

//Just before you take damage
Player.prototype.takeDamageAbilityMods = function(){
	return false;
}

//Ability that triggers when you successfully play a card
Player.prototype.cardOnPlayAbility = function(){
	return false;
}

//Ability that triggers when your opponent successfully plays a card
Player.prototype.oppCardOnPlayAbility = function(){
	return false;
}

//Ability that triggers when your opponent successfully plays a card
Player.prototype.blockOnPlayAbility = function(){
	return false;
}

//Ability that triggers when your opponent successfully plays a block
Player.prototype.oppBlockOnPlayAbility = function(){
	return false;
}
