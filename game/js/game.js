function Game( inGameID ){
	var game = inGameID;
	
	var cardsPlayedThisTurn = [];//An array storing all cards played on the current turns
	var cardInPlay = undefined;//Stores the choosen card to play so all subsequent functions have access
	var blockInPlay = undefined;//Stores the choosen card to block so all subsequent functions have access
	var activatedAbilityUsed = false;//Simply tells the endTurn function NOT to draw a card. Set to true if an activated ability is called
	
	var players = [];//Store all players
	var currentPlayer = -1;//Stores the index of the player who's turn it is
	var isPlayerIndex = -1;//Stores which player "owns" the game
	
	var skipTurns = 0;//Indicates how many turns to skip
	var spellsPlayed = 0;//If this gets set to 1, end current players turn
	
	var playerLoopIndex = 0;//Used to allows many function to be resumed from where they left off if an interup is called
	
	var objControls = new Controls();//Stores the controls object used to manipulate the UI
	var objCards = new Cards();//Stores the cards object, used to get any cardID as an object
	
	//AJAX call to used to popule objCards
	$.ajax({ url: "cf/get_cards.cfm", cache: false }).done( function( html ){
		eval(html);
		objGame.addPlayerAjax();
	});
	
	//Used to add cards to objCards, only called in the above AJAX function
	function addCard( objCard ){
		objCards.addCard( objCard );
	}
	this.addCard = addCard;
	
	//AJAX called to the DB to get the players of the game
	function addPlayerAjax(){
		$.ajax({ url: "cf/get_game.cfm?cf_game_id=" + game, cache: false }).done( function( html ){
			eval(html);
			objGame.addPlayerCardsAjax();
		});
	} 
	this.addPlayerAjax = addPlayerAjax;
	
	//Used to populate players array, only called by above AJAX code
	function addPlayer( objPlayer, inPosition ){
		players[inPosition] = objPlayer;
	}
	this.addPlayer = addPlayer;
	
	//Used to set isPlayer variable, only called by addPlayerAjax() 
	function setIsPlayerIndex( index ){
		isPlayerIndex = index;
	}
	this.setIsPlayerIndex = setIsPlayerIndex;
	
	//AJAX call to the DB to set up each player with their cards
	function addPlayerCardsAjax(){
		$.ajax({ url: "cf/get_players.cfm?cf_game_id=" + game, cache: false }).done( function( html ){
			eval(html);
			startGame();
		});
	}
	this.addPlayerCardsAjax = addPlayerCardsAjax;

	function getControls(){
		return objControls;
	}
	this.getControls = getControls;
	
	function getCard( cardID ){
		return objCards.getCard( cardID );
	}
	this.getCard = getCard;
	
	//returns a copy of cardsPlayedThisTurn array
	function getCardsPlayedThisTurn(){
		out = [];
		for( var i = 0; i < cardsPlayedThisTurn.length; i++ ){
			out[i] = cardsPlayedThisTurn[i].clone();
		}
		return out;
	}
	this.getCardsPlayedThisTurn = getCardsPlayedThisTurn;
	
	function setCurrentPlayer( index ){
		currentPlayer = index;
	}
	this.setCurrentPlayer = setCurrentPlayer;
	
	function toggleCurrentPlayer(){
		currentPlayer++;
		if( currentPlayer > players.length - 1 )
			currentPlayer = 0;
	}
	
	function getCurrentPlayer(){
		return players[currentPlayer];
	}
	this.getCurrentPlayer = getCurrentPlayer;
	
	//Get the player who turn it is not
	function getReactionPlayer(){
		tempCurrent = currentPlayer; 
		tempCurrent++;
		if( tempCurrent > players.length - 1 )
			tempCurrent = 0;
			
		return players[tempCurrent];
	}
	this.getReactionPlayer = getReactionPlayer;
	
	//Get any player by their deckID
	function getPlayer( inDeckID ){
		for( var i = 0; i < players.length; i++ ){
			if( players[i].getDeckID() == inDeckID ){
				return players[i]
			}
		}
		return undefined;
	}
	this.getPlayer = getPlayer;
	
	/*	Takes a boolean, if true is passed returns player at isPlayerIndex otherwise
	 * 	returns the other player
	 */
	function getIsPlayer( isPlayer ){
		if( isPlayer ){
			return players[isPlayerIndex];
		} else {
			returnIndex = ( isPlayerIndex + 1 > players.length - 1 ) ? 0 : isPlayerIndex + 1;
			return players[returnIndex];
		}
	}
	this.getIsPlayer = getIsPlayer;
	
	function getCardInPlay(){
		return cardInPlay;	
	}
	this.getCardInPlay = getCardInPlay;
	
	/*	Calculates the damage that will be done by the card in play.
	 * 	This is done in the game as it relys on using the modifiers
	 * 	from both players.
	 */
	function getCardDamage(){
		var damageMod = 0;
		var deffMod = 0;
		
		switch( cardInPlay.getTypeID() ){
			case 1:
				damageMod = getCurrentPlayer().getAttackDamageMod();
				deffMod = getReactionPlayer().getAttackDeffenseMod();
				break;
			case 2:
				damageMod = getCurrentPlayer().getMagicDamageMod();
				deffMod = getReationPlayer().getMagicDeffenseMod();
				break;
		}
		
		var out = cardInPlay.getDamage() + damageMod - deffMod;
		if( out < 0 ) out = 0;
		
		return out;	
	}
	this.getCardDamage = getCardDamage;
	
	// First function called to starts the game
	function startGame(){
		//If this is the first turn of the game
		if (currentPlayer == -1) {
			for (var i = 0; i < players.length; i++) {
				//Add gold to field
				for (var j = 0; j < players[i].getStartingGold(); j++) {
					players[i].addCard(2, 'field', j, 0);
				}
				//Move equipment to hand
				tempDeck = players[i].getDeck();
				for (var j = 0; j < tempDeck.length; j++) {
					if (tempDeck[j].getTypeID() == 7) {
						players[i].moveCard(tempDeck[j].getID(), 'deck', 'hand')
					}
				}
				players[i].shuffleDeck();
			}
				
			getResources();
			setValues();
			
			startGameAbility();
		} else {
			//If the game is in progress
			getResources();
			setValues();
			
			getCurrentPlayer().chooseCard();
		}
	}
	
	/*	Runs start game abilities for both players
	 * 	IF INTERUPTED: return to this function
	 */
	function startGameAbility(){
		//Allows return if an interupt is called
		if( playerLoopIndex > players.length ){
			playerLoopIndex = 0;			
		} else {
			playerLoopIndex++;
		}
			
		for( ; playerLoopIndex < players.length; playerLoopIndex++ ){
			if( players[playerLoopIndex].startGameAbility() ) return true;
		}
		
		equipPlay( 1 );
	}
	this.startGameAbility = startGameAbility;
	
	//Runs players equip code, if the last player passed the pass parameter will be true
	function equipPlay( cardID ){
		//Game start, no player has played anything
		if( currentPlayer == -1 ){
			cardInPlay = getCard( 2 );
			toggleCurrentPlayer();
			getCurrentPlayer().equipPlay( -1 );
			return;	
		} 
		
		//Two passes in a row - move to regular game phase
		if( cardID == 0 && cardInPlay == undefined ){
			cardInPlay = undefined;
			postEquipAbility();
			return;
		}
		
		//Previous player passed - one pass
		if( cardID == 0 ){
			cardInPlay = undefined;
			equipPlayToggle( 0 );
		} else {
		//Previous player played a card
			cardInPlay = getCard( cardID );
			getCurrentPlayer().moveCard( cardID, 'hand', 'field' );
			getCurrentPlayer().payCost( cardInPlay );
			if( cardInPlay.payCostEffect() ) return true;
			
			equipPlayEffect();
		}
	}
	this.equipPlay = equipPlay;
	
	/* Runs cardOnPlayEffect code
	 * 	IF INTERUPTED: return to this equipPlayToggle
	 */
	function equipPlayEffect(){
		if( cardInPlay.cardOnPlayEffect() ) return true;
		
		equipPlayToggle( cardInPlay.getID() );
	}
	this.equipPlayEffect = equipPlayEffect;
	
	/* Runs post equip abilites for both players
	 * 	IF INTERUPTED: return to this equipPlayToggle
	 */
	function equipPlayToggle( cardID ){
		toggleCurrentPlayer();
			
		getResources();
		setValues();
		
		getCurrentPlayer().equipPlay( cardID );
	}
	this.equipPlayToggle = equipPlayToggle;
	
	/*Runs post equip abilites for both players
	 * 	IF INTERUPTED: return to this function
	 */
	function postEquipAbility(){
		//Allows return if an interupt is called
		if( playerLoopIndex > players.length ){
			playerLoopIndex = 0;			
		} else {
			playerLoopIndex++;
		}
			
		for( ; playerLoopIndex < players.length; playerLoopIndex++ ){
			if( players[playerLoopIndex].postEquipAbility() ) return true;
		}
		
		startGamePlay()
	}
	this.postEquipAbility = postEquipAbility;
	
	//Resets hands for normal play
	function startGamePlay(){
		//Sets current player
		currentPlayer = 0;
		
		for( var j = 0; j < players.length; j++ ){
			var tempHand = players[j].getHand();
			
			//move equipment to removed
			for( var i = 0; i < tempHand.length; i++ ){
				if( tempHand[i].getTypeID() == 7 ){
					players[j].moveCard( tempHand[i].getID(), 'hand', 'removed' );
				}
			}
			
			//Draw hand
			players[j].drawCard( players[j].getHandSize() );	
		}
		
		postHandDrawAbility();
	}
	
	/*	runs postHandDrawAbilities for both players
	 * 	IF INTERUPTED: return to this function
	 */
	function postHandDrawAbility(){
		//Allows return if an interupt is called
		if( playerLoopIndex > players.length ){
			playerLoopIndex = 0;			
		} else {
			playerLoopIndex++;
		}
			
		for( ; playerLoopIndex < players.length; playerLoopIndex++ ){
			if( players[playerLoopIndex].postHandDrawAbility() ) return true;
		}
		
		startTurn();
	}
	this.postHandDrawAbility = postHandDrawAbility;
	
	/*	Bookeeping to start turn and Runs pre-draw ability for current player
	 *  IF INTERUPTED: return to startTurnCardDraw
	 */
	function startTurn(){
		cardsPlayedThisTurn.length = 0;
		activatedAbilityUsed = false;
		spellsPlaye = 0;
		
		if( getCurrentPlayer().startTurnAbility() ) return true;
		
		startTurnCardDraw();
	}
	
	/* Draws card
	 * IF INTERUPTED: return to postTurnDrawAbility
	 */
	function startTurnCardDraw(){
		getCurrentPlayer().drawCard( 1 );
		
		postTurnDrawAbility();
	}
	this.startTurnCardDraw = startTurnCardDraw;
	
	/* runs postTurnDrawAbility for current player
	 * IF INTERUPTED: return to startPlay
	 */
	function postTurnDrawAbility(){
		if( getCurrentPlayer().postTurnDrawAbility() ) return true;
		
		startPlay();
	}
	this.postTurnDrawAbility = postTurnDrawAbility;
	
	/*	Starts chain required set resources required for choosing a card.
	 * 	if a card is played but the turn does not end, this is the re-entry point
	 * 	IF INTERUPTED: return to oppPlayCardFieldEffectMods
	 */
	function startPlay(){
		cardInPlay = undefined;
		blockInPlay = undefined;
		getResources();
		
		if( getCurrentPlayer().playCardFieldEffectMods() ) return true;
		oppPlayCardFieldEffectMods();
	}
	this.startPlay = startPlay;
	
	/* runs oppPlayCardFieldEffectMods for reaction player
	 * IF INTERUPTED: return to playCardPlayedThisTurnMods
	 */
	function oppPlayCardFieldEffectMods(){
		if( getReactionPlayer().oppPlayCardFieldEffectMods() ) return true;
		
		playCardPlayedThisTurnMods();
	}
	this.oppPlayCardFieldEffectMods = oppPlayCardFieldEffectMods;
	
	/* runs playCardPlayedThisTurnMods for current player
	 * IF INTERUPTED: return to playCardAbilityMods
	 */
	function playCardPlayedThisTurnMods(){
		if( getCurrentPlayer().playCardPlayedThisTurnMods() ) return true;
		
		playCardAbilityMods()	
	}
	this.playCardPlayedThisTurnMods = playCardPlayedThisTurnMods;
	
	/* runs playCardAbilityMods for current player
	 * IF INTERUPTED: return to oppPlayCardAbilityMods
	 */
	function playCardAbilityMods(){
		if( getCurrentPlayer().playCardAbilityMods() ) return true;
		
		oppPlayCardAbilityMods()
	}
	this.playCardAbilityMods = playCardAbilityMods;
	
	/* 	runs oppPlayCardAbilityMods for reaction player
	 * 	IF INTERUPTED: RUN setValues() !!! then return with
	 * 	getCurrentPlayer().chooseCard();
	 */
	function oppPlayCardAbilityMods(){
		if( getReactionPlayer().oppPlayCardAbilityMods() ) return true;
		
		setValues();
			
		getCurrentPlayer().chooseCard();
	}
	this.oppPlayCardAbilityMods = oppPlayCardAbilityMods;

	/* 	sets cardInPlay resets resources and then calls
	 * 	blockCardFieldEffectMods for current player 
	 * 	IF INTERUPTED: return with oppBlockCardFieldEffectMods()
	 */
	function chooseBlock( cardID ){
		cardInPlay = getCard( cardID );
		getCurrentPlayer().removeCard( cardID, 'hand' );
		
		getCurrentPlayer().payCost( cardInPlay );
		if( cardInPlay.payCostEffect() ) return true;
		
		blockCardFieldEffectMods();
	}
	this.chooseBlock = chooseBlock;
	
	function blockCardFieldEffectMods(){
		getResources();
		
		if( getCurrentPlayer().blockCardFieldEffectMods() ) return true;
		
		oppBlockCardFieldEffectMods();
	}
	
	/* runs oppBlockCardFieldEffectMods for reaction player
	 * IF INTERUPTED: return to blockCardPlayedThisTurnMods
	 */
	function oppBlockCardFieldEffectMods(){
		if( getReactionPlayer().oppBlockCardFieldEffectMods() ) return true;
		
		blockCardPlayedThisTurnMods();
	}
	this.oppBlockCardFieldEffectMods = oppBlockCardFieldEffectMods;
	
	/* runs blockCardPlayedThisTurnMods for current player
	 * IF INTERUPTED: return to blockCardAbilityMods
	 */
	function blockCardPlayedThisTurnMods(){
		if( getCurrentPlayer().blockCardPlayedThisTurnMods() ) return true;
		
		blockCardAbilityMods();
	}
	this.blockCardPlayedThisTurnMods = blockCardPlayedThisTurnMods;
	
	/* runs blockCardAbilityMods for current player
	 * IF INTERUPTED: return to blockCardPlayedThisTurnMods
	 */
	function blockCardAbilityMods(){
		if( getCurrentPlayer().blockCardAbilityMods() ) return true;
		
		oppBlockCardAbilityMods();
	}
	this.blockCardAbilityMods = blockCardAbilityMods;
	
	/* 	runs oppBlockCardAbilityMods for reaction player
	 * 	IF INTERUPTED: RUN setValues() !!! then return with
	 * 	getReactionPlayer().chooseBlock();
	 */
	function oppBlockCardAbilityMods(){
		if( getReactionPlayer().oppBlockCardAbilityMods() ) return true;
		
		setValues();
		
		getReactionPlayer().chooseBlock();
	}
	this.oppBlockCardAbilityMods = oppBlockCardAbilityMods;
	
	function playCardSuccess(){
		getCurrentPlayer().addCard( cardInPlay.getID(), 'field', getCurrentPlayer().getField().length, 0 );
		
		if( cardInPlay.cardOnPlayEffect() ) return true;
		
		playCardSuccessAbility();
	}
	this.playCardSuccess = playCardSuccess;
	
	function playCardSuccessAbility(){
		if( getCurrentPlayer().cardOnPlayAbility() ) return true;
		
		doDamage();
	}
	this.playCardSuccessAbility = playCardSuccessAbility;
	
	function doDamage(){
		getCurrentPlayer().doDamageFieldEffectMods();
		
		takeDamageFieldEffectMods();
	}
	this.doDamage = doDamage;
	
	function takeDamageFieldEffectMods(){
		getReactionPlayer().takeDamageFieldEffectMods();
		
		doDamageFinal();
	}
	this.takeDamageFieldEffectMods = takeDamageFieldEffectMods;
	
	function doDamageFinal(){
		var damage = getCardDamage();
		if( damage == 0 ) {
			playCardSuccessEnd();
			return;
		}
		
		getReactionPlayer().moveCard( 1, 'field', 'deck' )
		
		var blocked = false;
		
		var position = 'player'
		if( getReactionPlayer().getDeckID() != getIsPlayer( true ).getDeckID() ) position = 'opp';
		
		objControls.resetCardArray();
		objControls.changePosition( position );
		
		for( var i = 0; i < damage; i++ ){
			var tempCard = getReactionPlayer().overturnCard();
			if( tempCard == undefined ) break;
			objControls.addCardToArray( tempCard, '' );
			if( tempCard.isBlockLegalOverturn() ){
				blocked = true;
				break;
			}
		}
		
		var pronoun = "you"
		if( position == "opp" ) pronoun = "your opponent"
		
		
		if( !blocked ){
			objControls.prependText( '<p>The following cards where overturned as ' + pronoun + ' took damage, but the card was not blocked.</p>' );
			objControls.appendText( '<span class="fake_link" onClick="objGame.playCardSuccessEnd();">Continue the Game</span>' );
		} else {
			objControls.prependText( '<p>The following cards where overturned as ' + pronoun + ' took damage, and ' + pronoun + ' blocked the card.</p>' );
			objControls.appendText( '<span class="fake_link" onClick="objGame.endTurn();">Continue the Game</span>' );
		}
		
		setValues();
		objControls.changePositionAnimate( 'objGame.getControls().addCards()' );
	}
	this.doDamageFinal = doDamageFinal;
	
	function playCardSuccessEnd(){
		cardsPlayedThisTurn[cardsPlayedThisTurn.length] = cardInPlay;
		
		if( cardInPlay.isSecondType( 1 ) ) spellsPlayed++;
		
		if( spellsPlayed > 0 ){
			endTurn();
		} else {
			startPlay();
		}		
	}
	this.playCardSuccessEnd = playCardSuccessEnd;
	
	function blockPicked( cardID ){
		getCurrentPlayer().addCard( cardInPlay.getID(), 'discard', getCurrentPlayer().getDiscard().length, 0 );
		
		blockInPlay = getCard( cardID );
		getReactionPlayer().moveCard( cardID, 'hand', 'field' );
		
		getReactionPlayer().payCost( blockInPlay );
		if( blockInPlay.payCostEffect() ) return true;
		
		blockOnPlayEffect();
	}
	this.blockPicked = blockPicked;
	
	function blockOnPlayEffect(){
		if( blockInPlay.cardOnPlayEffect() ) return true;
		
		blockOnPlayAbility();
	}
	
	function blockOnPlayAbility(){
		if( getReactionPlayer().blockOnPlayAbility() ) return true;
		
		oppBlockOnPlayAbility();
	}
	this.blockOnPlayAbility = blockOnPlayAbility;
	
	function oppBlockOnPlayAbility(){
		if( getCurrentPlayer().oppBlockOnPlayAbility() ) return true;
		
		 blockEnd();
	}
	this.oppBlockOnPlayAbility = oppBlockOnPlayAbility;
	
	function blockEnd(){
		if( blockInPlay.getDamage() == 0 ){
			if( getReactionPlayer().getDeckID() == getIsPlayer( false ).getDeckID() ){
				objControls.resetCardArray();
				objControls.changePosition( 'opp' );
				objControls.prependText('<p>Your ' + getCurrentPlayer().getPlayerName() + ' has blocked you card with the following.</p>' );
				objControls.appendText( '<span class="fake_link" onClick="objGame.endTurn();">Continue the Game</span>' );
				objControls.addCardToArray( blockInPlay, '' );
				setValues();
				objControls.changePositionAnimate( 'objGame.getControls().addCards()' );
			} else {
				endTurn();	
			}
		} else {
			getCurrentPlayer().moveCard( 1, 'field', 'deck' );
			var out = ''
			var reactionOut = undefined;
			
			if( getReactionPlayer().getDeckID() == getIsPlayer( true ).getDeckID() ){
				out = "<p>Your block ended your " + getCurrentPlayer().getPlayerName() + "'s turn and did the following damage.</p>"
				out += '<span class="fake_link" onClick="objGame.endTurn();">Continue the Game</span>'
			} else {
				out = "<p>" + getCurrentPlayer().getPlayerName() + " blocked your card, ended your turn and did the following damage.</p>"
				out += '<span class="fake_link" onClick="objGame.endTurn();">Continue the Game</span>'
				reactionOut = getCurrentPlayer().getPlayerName() + " blocked your card with ";
			}
			
			overturnCards( 'current', blockInPlay.getDamage(), 'objGame.endTurn()', out, reactionOut, blockInPlay.getID() )
		}
	}
	
	//Calls to endTurn and (typically) change the current player
	function endTurn(){
		//If the player simply passed their turn, they get to draw a card
		if( cardInPlay == undefined && cardsPlayedThisTurn.length == 0 && activatedAbilityUsed == false ){
			getCurrentPlayer().drawCard( 1 );
		}
			
		for( var i = 0; i < players.length; i++ ){
			players[i].regenerateMP();
		}
		
		//toogles current player, if the next players turn is not supposed to be skipped
		if( skipTurns > 0 ){
			skipTurns--;
		} else {
			toggleCurrentPlayer();
		}
	
		startTurn();
	}
	this.endTurn = endTurn;
	
	/* This function is called when someone clicks on one 
	 * of the card location buttons in the game. It displays 
	 * the contents of the passed location
	 */
	function showCards( isPlayer, location ){
		if( isPlayer ){
			objGame.getControls().changePosition( 'player', location );
		} else {
			objGame.getControls().changePosition( 'opp', location );
		}
		
		var aShow = [];
		
		switch( location ){
			case 'deck':
				aShow = getIsPlayer( isPlayer ).getDeck();
				break;
			case 'field':
				aShow = getIsPlayer( isPlayer ).getField();
				break;
			case 'hand':
				aShow = getIsPlayer( isPlayer ).getHand();
				getIsPlayer( isPlayer ).sortForPlay( aShow ); 
				break;
			case 'discard':
				aShow = getIsPlayer( isPlayer ).getDiscard();
				break;
			case 'removed':
				aShow = getIsPlayer( isPlayer ).getRemoved();
				break;
		}
		
		for( var i = 0; i < aShow.length; i++ ){
			var tempCard = aShow[i].clone();
			objControls.addCardToArray( tempCard, '' );	
		}
		
		objControls.changePositionAnimate( 'objGame.getControls().addCards();' );
		
	}
	this.showCards = showCards;
	
	/* Non specific timing functions
	 */
	function setValues(){
		$('#sp_opp_momentum').html( getIsPlayer( false ).getMomentum() );
		$('#sp_opp_momentum_cost_mod').html( getIsPlayer( false ).getMomentumMod() );
		$('#sp_opp_momentum_damage_mod').html( getIsPlayer( false ).getAttackDamageMod() );
		$('#sp_opp_momentum_deffense_mod').html( getIsPlayer( false ).getAttackDeffenseMod() );
		
		$('#sp_opp_mp').html( getIsPlayer( false ).getMP() );
		$('#sp_opp_mp_cost_mod').html( getIsPlayer( false ).getMPMod() );
		$('#sp_opp_mp_damage_mod').html( getIsPlayer( false ).getMagicDamageMod() );
		$('#sp_opp_mp_deffense_mod').html( getIsPlayer( false ).getMagicDeffenseMod() );
		
		$('#sp_opp_gold').html( getIsPlayer( false ).getGold() );
		$('#sp_opp_gold_start').html( getIsPlayer( false ).getStartingGold() );
		
		$('#sp_opp_gods').html( getIsPlayer( false ).getPrayer() );
		$('#sp_opp_gods_total').html( getIsPlayer( false ).getPrayerAll() );
		$('#sp_opp_gods_spent').html( getIsPlayer( false ).getPrayerSpent() );
		
		$('#div_opp_deck').html( getIsPlayer( false ).getDeck().length );
		$('#div_opp_hand').html( getIsPlayer( false ).getHand().length );
		$('#div_opp_field').html( getIsPlayer( false ).getField().length );
		$('#div_opp_discard').html( getIsPlayer( false ).getDiscard().length );
		$('#div_opp_removed').html( getIsPlayer( false ).getRemoved().length );

		$('#sp_player_momentum').html( getIsPlayer( true ).getMomentum() );
		$('#sp_player_momentum_cost_mod').html( getIsPlayer( true ).getMomentumMod() );
		$('#sp_player_momentum_damage_mod').html( getIsPlayer( true ).getAttackDamageMod() );
		$('#sp_player_momentum_deffense_mod').html( getIsPlayer( true ).getAttackDeffenseMod() );
		
		$('#sp_player_mp').html( getIsPlayer( true ).getMP() );
		$('#sp_player_mp_cost_mod').html( getIsPlayer( true ).getMPMod() );
		$('#sp_player_mp_damage_mod').html( getIsPlayer( true ).getMagicDamageMod() );
		$('#sp_player_mp_deffense_mod').html( getIsPlayer( true ).getMagicDeffenseMod() );
		
		$('#sp_player_gold').html( getIsPlayer( true ).getGold() );
		$('#sp_player_gold_start').html( getIsPlayer( true ).getStartingGold() );
		
		$('#sp_player_gods').html( getIsPlayer( true ).getPrayer() );
		$('#sp_player_gods_total').html( getIsPlayer( true ).getPrayerAll() );
		$('#sp_player_gods_spent').html( getIsPlayer( true ).getPrayerSpent() );
		
		$('#div_player_deck').html( getIsPlayer( true ).getDeck().length );
		$('#div_player_hand').html( getIsPlayer( true ).getHand().length );
		$('#div_player_field').html( getIsPlayer( true ).getField().length );
		$('#div_player_discard').html( getIsPlayer( true ).getDiscard().length );
		$('#div_player_removed').html( getIsPlayer( true ).getRemoved().length );
	}
	
	//Game running functions
	function getResources(){
		for( var i = 0; i < players.length; i++ ){
			players[i].getResources()
		}
	}
	
	/*	Overturns num cards from the target player, and then provides a contiue
	 * 	button linked to the nextMethod. Optional text may be provided. Optional
	 * 	if target is not the player, reaction text may be provided. Optional
	 * 	if target is not the player, a card may be added to reaction window
	 */
	function overturnCards( target, num, nextMethod, text, reactionText, reactionCard ){
		if( num == 0 ){
			eval(nextMethod);
			return;
		}
		
		var tempPlayer;
		if( target == 'current' ){
			tempPlayer = getCurrentPlayer();
		} else {
			tempPlayer = getReactionPlayer();
		}
		
		var position = 'player'
		if( tempPlayer.getDeckID() != getIsPlayer( true ).getDeckID() ) position = 'opp';
		if( position == 'opp' && reactionText != undefined ){
			position = 'reaction'
		}
		
		objControls.resetCardArray();
		objControls.changePosition( position );
		
		var tempCard;
		
		for( var i = 0; i < num; i++ ){
			tempCard = getReactionPlayer().overturnCard();
			if( tempCard == undefined ) break;
			objControls.addCardToArray( tempCard, '' );
		}
		
		/*
		if( tempCard == undefined ){
			endGame();
		}
		*/
		
		if( text == undefined ){
			objControls.prependText( '<p>The following cards where overturned.</p>' );
		} else {
			objControls.prependText( text );
		}
		
		if( position == 'reaction' ){
			objControls.prependSubText( reactionText );
			if( reactionCard != undefined ){
				objControls.addCardSubDiv( reactionCard );
			}
		}
		
		setValues();
		objControls.changePositionAnimate( 'objGame.getControls().addCards()' );
	}
}
