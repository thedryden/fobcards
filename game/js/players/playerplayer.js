PlayerPlayer.prototype = new Player();
PlayerPlayer.constructor = PlayerPlayer;

function PlayerPlayer(){};
	
// ***--------------------------------------------***--------------------------------------------***
//Game control functions
PlayerPlayer.prototype.equipPlay = function( cardID ){
	objGame.getControls().resetCardArray();
	
	if( cardID == -1 ){
		objGame.getControls().changePosition( 'player' );
	} else {
		objGame.getControls().changePosition( 'reaction' );
	}
	
	tempHand = this.getHand();
	this.sortForPlay( tempHand );
	
	for( var i = 0; i < tempHand.length; i++ ){
		if( tempHand[i].isLegal() ){
			objGame.getControls().addCardToArray( tempHand[i].clone(), 'objGame.equipPlay( ' + tempHand[i].getID() + ' )' );
		} else {
			objGame.getControls().addCardToArray( tempHand[i].clone(), '' );
		}
	}
	
	if( cardID == 0 ){
		objGame.getControls().prependSubText( objGame.getPlayer( this.oppDeckID ).getPlayerName() + ' passed his turn.' )
	} else if ( cardID > 0 ) {
		objGame.getControls().prependSubText( objGame.getPlayer( this.oppDeckID ).getPlayerName() + ' played ' );
		objGame.getControls().addCardSubDiv( cardID );
	}
	
	objGame.getControls().prependText( '<p>Either select a card bellow or press pass</p>' );
	objGame.getControls().appendText( '<span class="fake_link" onClick="objGame.equipPlay( 0 );">Pass</span>' );
	
	objGame.getControls().changePositionAnimate( 'objGame.getControls().addCards()' );
}

PlayerPlayer.prototype.chooseCard = function(){
	objGame.getControls().resetCardArray();
	objGame.getControls().changePosition( 'player' );
	
	tempHand = this.getHand();
	this.sortForPlay( tempHand );
	
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

PlayerPlayer.prototype.chooseBlock = function(){
	objGame.getControls().resetCardArray();
	objGame.getControls().changePosition( 'reaction' );
	
	tempHand = this.getHand();
	this.sortForBlock( tempHand );
	
	for( var i = 0; i < tempHand.length; i++ ){
		if( tempHand[i].isBlockLegalHand() ){
			objGame.getControls().addCardToArray( tempHand[i].clone(), 'objGame.blockPicked( ' + tempHand[i].getID() + ' )' );
		} else {
			objGame.getControls().addCardToArray( tempHand[i].clone(), '' );
		}
	}
	
	objGame.getControls().prependSubText( objGame.getPlayer( this.oppDeckID ).getPlayerName() + ' choose ' );
	objGame.getControls().addCardSubDiv( objGame.getCardInPlay().getID() );
	objGame.getControls().appendSubText( ' you may attempt to pick a card to block below.' );
	
	objGame.getControls().prependText( '<p>Choose a card from bellow, or pass.</p>' );
	objGame.getControls().appendText( '<span class="fake_link" onClick="objGame.playCardSuccess();">Pass</span>' );
	
	objGame.getControls().changePositionAnimate( 'objGame.getControls().addCards()' );
}