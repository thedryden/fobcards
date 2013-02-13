function Player( inDeckID, inPlayerName, inName, inClassID, inClassName, inHandSize, inInitiative, inGold, inAbility, inURL, inAlt, inOppDeckID ){
	var deckID = inDeckID;
	var playerName = inPlayerName
	var name = inName;
	var classID = inClassID;
	var className = inClassName;
	var handSize = inHandSize;
	var initiative = inInitiative;
	var startingGold = inGold;
	var ability = inAbility;
	var url = inURL;
	var alt = inAlt;
	var oppDeckID = inOppDeckID;
	
	var deck = [];
	var hand = [];
	var field = [];
	var discard = [];
	var removed = [];
	
	var effectIndex = 0;
	
	var tempArray1 = [];
	var tempArray2 = [];
	var tempArray3 = [];
	
	var momentum = 0;
	var momentumMod = 0;
	var attackDamageMod = 0;
	var attackDeffenseMod = 0;
	
	var MP = 0;
	var MPMod = 0;
	var magicDamageMod = 0;
	var magicDeffenseMod = 0;
	
	var gold = 0;
	
	var prayer = 0;
	var prayerAll = 0;
	var prayerSpent = 0;
	
	//Other variables, strictly for processing
	//var cardTypes = objGame.getCardTypes();
	
	function addCard( inCard, inLocation, inPosition, inCounter ){
		var aLocation = '';
		var good = false;
		
		switch ( inLocation ) {
			case 'deck':
				aLocation = deck;
				good = true;
				break;
			case 'hand':
				aLocation = hand;
				good = true;
				break;
			case 'field':
				aLocation = field;
				good = true;
				break;
			case 'discard':
				aLocation = discard;
				good = true;
				break;
			case 'removed':
				aLocation = removed;
				good = true;
				break;
		}
		
		if( !good )
			return;
		
		aLocation[inPosition] = objGame.getCard( inCard );
		aLocation[inPosition].setCounter( inCounter );
	}
	this.addCard = addCard;
	
	function getDeckID(){
		return deckID;
	}
	this.getDeckID = getDeckID;
	
	function getPlayerName(){
		return playerName;
	}
	this.getPlayerName = getPlayerName;
	
	function getDeck(){
		var outDeck = [];
		for( var i = 0; i < deck.length; i++ ){
			outDeck[i] = deck[i].clone();
		}
		
		return outDeck;
	}
	this.getDeck = getDeck;
	
	function getHand(){
		var outHand = [];
		for( var i = 0; i < hand.length; i++ ){
			outHand[i] = hand[i].clone();
		}
		
		return outHand;
	}
	this.getHand = getHand;
	
	function getField(){
		var outField = [];
		for( var i = 0; i < field.length; i++ ){
			outField[i] = field[i].clone();
		}
		
		return outField;
	}
	this.getField = getField;
	
	function getDiscard(){
		var outDiscard = [];
		for( var i = 0; i < discard.length; i++ ){
			outDiscard[i] = discard[i].clone();
		}
		
		return outDiscard;
	}
	this.getDiscard = getDiscard;
	
	function getRemoved(){
		var outRemoved = [];
		for( var i = 0; i < removed.length; i++ ){
			outRemoved[i] = removed[i].clone();
		}
		
		return outRemoved;
	}
	this.getRemoved = getRemoved;
	
	function sortForPlay( array ){
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
	this.sortForPlay = sortForPlay;
	
	function sortForBlock( array ){
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
	this.sortForPlay = sortForPlay;
	
	function getHandSize(){
		return handSize;
	}
	this.getHandSize = getHandSize;
	
	function getStartingGold(){
		return startingGold;
	}
	this.getStartingGold = getStartingGold;
	
	function getMomentum(){
		return momentum;
	}
	this.getMomentum = getMomentum;
	
	function getMomentumMod(){
		return momentumMod;
	}
	this.getMomentumMod = getMomentumMod;
	
	function getAttackDamageMod(){
		return attackDamageMod;
	}
	this.getAttackDamageMod = getAttackDamageMod;
	
	function getAttackDeffenseMod(){
		return attackDeffenseMod;
	}
	this.getAttackDeffenseMod = getAttackDeffenseMod;
	
	function getMP(){
		return MP;
	}
	this.getMP = getMP;
	
	function getMPMod(){
		return MPMod;
	}
	this.getMPMod = getMPMod;
	
	function getMagicDamageMod(){
		return magicDamageMod
;
	}
	this.getMagicDamageMod = getMagicDamageMod;
	
	function getMagicDeffenseMod(){
		return magicDeffenseMod;
	}
	this.getMagicDeffenseMod = getMagicDeffenseMod;
	
	function getGold(){
		return gold;
	}
	this.getGold = getGold;
	
	function getPrayer(){
		return prayer;
	}
	this.getPrayer = getPrayer;
	
	function getPrayerAll(){
		return prayerAll;
	}
	this.getPrayerAll = getPrayerAll;
	
	function getPrayerSpent(){
		return prayerSpent;
	}
	this.getPrayerSpent = getPrayerSpent;
	
	//Draws num cards from top of deck to hand
	function drawCard( num ){
		for( var i=0; i < num; i++ ){
			hand[hand.length] = deck.pop().clone();			
		}
	}
	this.drawCard = drawCard;
	
	/* Moves the top card of the deck array to the discard array and
	 * returns a copy of the moved card. Returns undefined if no cards in deck */
	function overturnCard(){
		if( deck.length == 0 ) return undefined;
		var overturned = deck.pop();
		
		discard[discard.length] = overturned;
		
		return overturned.clone();
	}
	this.overturnCard = overturnCard;
	
	function shuffleDeck(){
		for( var i = 0; i < 10; i++ ){
			deck.sort( 
				function jv_sort_random( a,b ){
					return (Math.round(Math.random())-0.5);
				}
	 		);
		}
	}
	this.shuffleDeck = shuffleDeck;
	
	/* removes passed card id from passed array.
	 */
	function removeCard( cardID, array ){
		array = array.toLowerCase();
			
		var aArray = undefined;
		
		switch ( array ) {
			case 'deck':
				aArray = deck;
				break;
			case 'hand':
				aArray = hand;
				break;
			case 'field':
				aArray = field;
				break;
			case 'discard':
				aArray = discard;
				break;
			case 'removed':
				aArray = removed;
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
	this.removeCard = removeCard;
	
	/* moves passed card id from source array to destination array.
	 * If either source or destination are deck then the deck is also shuffled
	 * search is done end of array to begining. If the card is found true is 
	 * returned if not false is returned
	 * Possible source and destination values: deck, hand, field, discard, removed
	 */
	function moveCard( cardID, source, destination ){
		source = source.toLowerCase();
		destination = destination.toLowerCase();
		
		if( source == destination ) return false;
		
		var index = -1;
			
		switch ( destination ) {
			case 'deck':
				index = deck.length;
				break;
			case 'hand':
				index= hand.length;
				break;
			case 'field':
				index = field.length;
				break;
			case 'discard':
				index = discard.length;
				break;
			case 'removed':
				index = removed.length;
				break;
		}
		
		if( index == -1 ) return false;
		
		if( removeCard( cardID, source ) ){
			addCard( cardID, destination, index, 0 );
		}
		
		if( source == 'deck' || destination == 'deck' ) this.shuffleDeck();
			
		return true;
	}
	this.moveCard = moveCard;
	
	function regenerateMP(){
		for( var i = 0; i < field.length; i++ ){
			if( field[i].getID() == 1 && !field[i].isResource() )
				field[i].addCounter( -1 );
		}
	}
	this.regenerateMP = regenerateMP;
	
	function getResources(){
		momentum = 0;
		MP = 0;
		gold = 0;
		prayer = 0;
		prayerAll = 0;
		prayerSpent = 0;
		momentumMod = 0;
		attackDamageMod = 0;
		attackDeffenseMod = 0;
		MPMod = 0;
		magicDamageMod = 0;
		magicDeffenseMod = 0;
		
		for (var i = 0; i < field.length; i++) {
			if (field[i].isResource()){
				switch (field[i].getTypeID()) {
					case 1:
						momentum += 1;
						break;
					case 2:
						MP += 1;
						break;
					case 3:
						gold += 1;
						break;
					case 4:
						prayerAll += 1;
						break;
					case 5:
						prayerAll += 1;
						break;
					case 6:
						prayerAll += 1;
						break;
				}
			} else if (field[i].getTypeID() == 4 &&
				field[i].getTypeID() == 5 &&
				field[i].getTypeID() == 6) {
				
				prayerSpent++;
			}
			
			momentumMod += parseInt( field[i].getYourCostMods( 1 ) );
			MPMod += parseInt( field[i].getYourCostMods( 2 ) );
			
			attackDamageMod += parseInt( field[i].getDamageMods( 1 ) );
			magicDamageMod += parseInt( field[i].getDamageMods( 2 ) );
			
			attackDeffenseMod += parseInt( field[i].getDeffenseMods( 1 ) );
			magicDeffenseMod += parseInt( field[i].getDeffenseMods( 2 ) );
		}
		prayer = prayerAll - prayerSpent;
		
		var cardsPlayedThisTurn = objGame.getCardsPlayedThisTurn();
		
		var opp = objGame.getPlayer( oppDeckID );
		if( opp != undefined ){
			var oppField = opp.getField();
			
			for( var i = 0; i < oppField.length; i++ ){
				momentumMod += oppField[i].getOppCostMods( 1 );
				MPMod += oppField[i].getOppCostMods( 2 );
			}	
		}
		
		if( objGame.getCurrentPlayer() == deckID ){
			for( var i = 0; i < cardsPlayedThisTurn.length; i++ ){
				momentumMod += cardsPlayedThisTurn[i].getYourCostModsThisTurn( 1 );
				MPMod += cardsPlayedThisTurn[i].getYourCostModsThisTurn( 2 );
				
				attackDamageMod += cardsPlayedThisTurn[i].getDamageModsThisTurn( 1 );
				magicDamageMod += cardsPlayedThisTurn[i].getDamageModsThisTurn( 2 );
				
				attackDeffenseMod += cardsPlayedThisTurn[i].getDeffenseModsThisTurn( 1 );
				magicDeffenseMod += cardsPlayedThisTurn[i].getDeffenseModsThisTurn( 2 );
			}
		} else {
			for( var i = 0; i < cardsPlayedThisTurn.length; i++ ){
				momentumMod += cardsPlayedThisTurn[i].getOppCostModsThisTurn( 1 );
				MPMod += cardsPlayedThisTurn[i].getOppCostModsThisTurn( 2 );
			}
		}
	}
	this.getResources = getResources;
	
	function payCost( objCard ){
		if( objCard.getCost() <= 0 ) return;
		
		//Action is only required if cost is magic or gold
		if( objCard.getCostID() == 2 ){
			var toPay = 0
			if( objCard.getCost() != 0 ) toPay = objCard.getCost() + MPMod;
			for( var i = 0; i < field.length; i++ ){
				if( field[i].getID() == 1 && field[i].isResource() ){
					field[i].setCounter( 2 );
					toPay--;
					if( toPay <= 0 ) return;
				}
			}
		}
		
		if( objCard.getCostID() == 3 ){
			for( var i = 0; i < objCard.getCost(); i++ ){
				moveCard( 2, 'field', 'removed' )
			}
		}
	}
	this.payCost = payCost;
	
	function payCostFixed( costTypeID, cost ){
		if( cost <= 0 ) return;
		
		//Action is only required if cost is magic or gold
		if( costTypeID == 2 ){
			for( var i = 0; i < field.length; i++ ){
				if( field[i].getID() == 1 && field[i].isResource() ){
					field[i].setCounter( 2 );
					cost--;
					if( cost <= 0 ) return;
				}
			}
		}
		
		if( costTypeID == 3 ){
			for( var i = 0; i < objCard.getCost(); i++ ){
				moveCard( 2, 'field', 'removed' )
			}
		}
	}
	this.payCostFixed = payCostFixed;
	
	// ***--------------------------------------------***--------------------------------------------***
	//Game control functions
	function equipPlay( cardID ){
		objGame.getControls().resetCardArray();
		
		if( cardID == -1 ){
			objGame.getControls().changePosition( 'player' );
		} else {
			objGame.getControls().changePosition( 'reaction' );
		}
		
		tempHand = getHand();
		sortForPlay( tempHand );
		
		for( var i = 0; i < tempHand.length; i++ ){
			if( tempHand[i].isLegal() ){
				objGame.getControls().addCardToArray( tempHand[i].clone(), 'objGame.equipPlay( ' + tempHand[i].getID() + ' )' );
			} else {
				objGame.getControls().addCardToArray( tempHand[i].clone(), '' );
			}
		}
		
		if( cardID == 0 ){
			objGame.getControls().prependSubText( objGame.getPlayer( oppDeckID ).getPlayerName() + ' passed his turn.' )
		} else if ( cardID > 0 ) {
			objGame.getControls().prependSubText( objGame.getPlayer( oppDeckID ).getPlayerName() + ' played ' );
			objGame.getControls().addCardSubDiv( cardID );
		}
		
		objGame.getControls().prependText( '<p>Either select a card bellow or press pass</p>' );
		objGame.getControls().appendText( '<span class="fake_link" onClick="objGame.equipPlay( 0 );">Pass</span>' );
		
		objGame.getControls().changePositionAnimate( 'objGame.getControls().addCards()' );
	}
	this.equipPlay = equipPlay;
	
	function chooseCard(){
		objGame.getControls().resetCardArray();
		objGame.getControls().changePosition( 'player' );
		
		tempHand = getHand();
		sortForPlay( tempHand );
		
		for( var i = 0; i < tempHand.length; i++ ){
			if( tempHand[i].isLegal() ){
				objGame.getControls().addCardToArray( tempHand[i].clone(), 'objGame.chooseBlock( ' + tempHand[i].getID() + ' )' );
			} else {
				objGame.getControls().addCardToArray( tempHand[i].clone(), '' );
			}
		}
		
		objGame.getControls().prependText( '<p>Choose a card from bellow, or pass your turn.</p>' );
		objGame.getControls().appendText( '<span class="fake_link" onClick="objGame.endTurn();">Pass Turn</span>' );
		
		objGame.getControls().changePositionAnimate( 'objGame.getControls().addCards()' );
	}
	this.chooseCard = chooseCard;
	
	function chooseBlock(){
		objGame.getControls().resetCardArray();
		objGame.getControls().changePosition( 'reaction' );
		
		tempHand = getHand();
		sortForBlock( tempHand );
		
		for( var i = 0; i < tempHand.length; i++ ){
			if( tempHand[i].isBlockLegalHand( objGame.getCardInPlay(), 'reaction' ) ){
				objGame.getControls().addCardToArray( tempHand[i].clone(), 'objGame.blockPicked( ' + tempHand[i].getID() + ' )' );
			} else {
				objGame.getControls().addCardToArray( tempHand[i].clone(), '' );
			}
		}
		
		objGame.getControls().prependSubText( objGame.getPlayer( oppDeckID ).getPlayerName() + ' choose ' );
		objGame.getControls().addCardSubDiv( objGame.getCardInPlay().getID() );
		objGame.getControls().appendSubText( ' you may attempt to pick a card to block below.' );
		
		objGame.getControls().prependText( '<p>Choose a card from bellow, or pass.</p>' );
		objGame.getControls().appendText( '<span class="fake_link" onClick="objGame.playCardSuccess();">Pass</span>' );
		
		objGame.getControls().changePositionAnimate( 'objGame.getControls().addCards()' );
	}
	this.chooseBlock = chooseBlock;
	
	/* The following all loops through all cards in players field and 
	 * runs function of same name in card object for each card found 
	 * there. If a card requires a descision and thus break from normal 
	 * game play then it will return true which will cause this function
	 * to return true. Once the decision is delt with play should return
	 * to this function starting with the next card in the array
	 */
	function playCardFieldEffectMods(){
		for( ; effectIndex < field.length; effectIndex++ ){
			if( field[effectIndex].playCardFieldEffectMods() ){
				effectIndex++
				return true;
			}
		}
		
		effectIndex = 0;
		return false;
	}
	this.playCardFieldEffectMods = playCardFieldEffectMods;
	
	function oppPlayCardFieldEffectMods(){
		for( ; effectIndex < field.length; effectIndex++ ){
			if( field[effectIndex].oppPlayCardFieldEffectMods() ){
				effectIndex++
				return true;
			}
		}
		
		effectIndex = 0;
		return false;
	}
	this.oppPlayCardFieldEffectMods = oppPlayCardFieldEffectMods;
	
	function playCardPlayedThisTurnMods(){
		var playedThisTurn = objGame.getCardsPlayedThisTurn();
		
		for( ; effectIndex < playedThisTurn.length; effectIndex++ ){
			if( playedThisTurn[effectIndex].blockCardPlayedThisTurnMods() ){
				effectIndex++
				return true;
			}
		}
		
		effectIndex = 0;
		return false;
	}
	this.playCardPlayedThisTurnMods = playCardPlayedThisTurnMods;
	
	function blockCardFieldEffectMods(){
		for( ; effectIndex < field.length; effectIndex++ ){
			if( field[effectIndex].blockCardFieldEffectMods() ){
				effectIndex++
				return true;
			}
		}
		
		effectIndex = 0;
		return false;
	}
	this.blockCardFieldEffectMods = blockCardFieldEffectMods;
	
	function oppBlockCardFieldEffectMods(){
		for( ; effectIndex < field.length; effectIndex++ ){
			if( field[effectIndex].oppBlockCardFieldEffectMods() ){
				effectIndex++
				return true;
			}
		}
		
		effectIndex = 0;
		return false;
	}
	this.oppBlockCardFieldEffectMods = oppBlockCardFieldEffectMods;
	
	function blockCardPlayedThisTurnMods(){
		var playedThisTurn = objGame.getCardsPlayedThisTurn();
		
		for( ; effectIndex < playedThisTurn.length; effectIndex++ ){
			if( playedThisTurn[effectIndex].blockCardPlayedThisTurnMods() ){
				effectIndex++
				return true;
			}
		}
		
		effectIndex = 0;
		return false;
	}
	this.blockCardPlayedThisTurnMods = blockCardPlayedThisTurnMods;
	
	function doDamageFieldEffectMods(){
		for( ; effectIndex < field.length; effectIndex++ ){
			if( field[effectIndex].doDamageFieldEffectMods() ){
				effectIndex++
				return true;
			}
		}
		
		effectIndex = 0;
		return false;
	}
	this.doDamageFieldEffectMods = doDamageFieldEffectMods;
	
	function takeDamageFieldEffectMods(){
		for( ; effectIndex < field.length; effectIndex++ ){
			if( field[effectIndex].takeDamageFieldEffectMods() ){
				effectIndex++
				return true;
			}
		}
		
		effectIndex = 0;
		return false;
	}
	this.takeDamageFieldEffectMods = takeDamageFieldEffectMods;
	
	function takeDamagePlayedThisTurnMods(){
		var playedThisTurn = objGame.getCardsPlayedThisTurn();
		
		for( ; effectIndex < playedThisTurn.length; effectIndex++ ){
			if( playedThisTurn[effectIndex].blockCardPlayedThisTurnMods() ){
				effectIndex++
				return true;
			}
		}
		
		effectIndex = 0;
		return false;
	}
	this.takeDamagePlayedThisTurnMods = takeDamagePlayedThisTurnMods;
	
	// Abilities from this point on
	// * ***__________________________________________***__________________________________________***
	
	
	// Triggers at the begining of the game before the equip phase
	function startGameAbility(){
		return false;
	}
	this.startGameAbility = startGameAbility;
	
	// Triggers after the equip phase
	function postEquipAbility(){
		return false;
	}
	this.postEquipAbility = postEquipAbility;
	
	// Triggers at the just after you draw your hand
	function postHandDrawAbility(){
		return false;
	}
	this.postHandDrawAbility = postHandDrawAbility;
	
	//Start of turn, before you draw your a card
	function startTurnAbility(){
		return false;
	}
	this.startTurnAbility = startTurnAbility;
	
	//Just after you draw a card on your turn
	function postTurnDrawAbility(){
		return false;
	}
	this.postTurnDrawAbility = postTurnDrawAbility;
	
	//When determining resources before picking a card, after running 
	//getResources for both players but first of the effects
	function playCardAbilityMods(){
		return false;
	}
	this.playCardAbilityMods = playCardAbilityMods;
	
	//When determining resources before picking a card, after playCardAbilityMods
	function oppPlayCardAbilityMods(){
		return false;
	}
	this.oppPlayCardAbilityMods = oppPlayCardAbilityMods;
	
	//When determining resources before picking a block, after running getResources 
	//for both players but first of the effects
	function blockCardAbilityMods(){
		return false;
	}
	this.blockCardAbilityMods = blockCardAbilityMods;
	
	//When determining resources before picking a block, after playCardAbilityMods
	function oppBlockCardAbilityMods(){
		return false;
	}
	this.oppBlockCardAbilityMods = oppBlockCardAbilityMods;
	
	//Just before you do damage
	function doDamageAbilityMods(){
		return false;
	}
	this.doDamageAbilityMods = doDamageAbilityMods;
	
	//Just before you take damage
	function takeDamageAbilityMods(){
		return false;
	}
	this.takeDamageAbilityMods = takeDamageAbilityMods;
	
	//Ability that triggers when you successfully play a card
	function cardOnPlayAbility(){
		return false;
	}
	this.cardOnPlayAbility = cardOnPlayAbility;
	
	//Ability that triggers when your opponent successfully plays a card
	function oppCardOnPlayAbility(){
		return false;
	}
	this.oppCardOnPlayAbility = oppCardOnPlayAbility;
	
	//Ability that triggers when your opponent successfully plays a card
	function blockOnPlayAbility(){
		return false;
	}
	this.blockOnPlayAbility = blockOnPlayAbility;
	
	//Ability that triggers when your opponent successfully plays a block
	function oppBlockOnPlayAbility(){
		return false;
	}
	this.oppBlockOnPlayAbility = oppBlockOnPlayAbility;
}
