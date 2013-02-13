function PlayerPlayer( inDeckID, inPlayerName, inName, inClassID, inClassName, inHandSize, inInitiative, inGold, inAbility, inURL, inAlt, inOppDeckID ){
	Player.call( this, inDeckID, inPlayerName, inName, inClassID, inClassName, inHandSize, inInitiative, inGold, inAbility, inURL, inAlt, inOppDeckID );
	
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
}

PlayerPlayer.prototype = Object.create( Player.prototype );