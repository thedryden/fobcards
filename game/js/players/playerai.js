PlayerAI.prototype = new Player();
PlayerAI.constructor = PlayerAI;

function PlayerAI(){};

// ***--------------------------------------------***--------------------------------------------***
//Easy of use "core" functions
PlayerAI.prototype.discardCard = function( num, manditory, nextMethod ){
	objGame.clearSelectVal();
	tempA = objGame.getSelectVal();
	
	if( num <= 0){
		eval(nextMethod);
		return;
	}
	
	if( !manditory ){
		discardResolve( nextMethod );
		return;
	}
	
	if( num > hand.length ) num = hand.length;
	
	for( var i = 0; i < num; i++ ){
		tempA = hand[i];
	}
}

PlayerAI.prototype.discardResolve = function( nextMethod ){
	
}

// ***--------------------------------------------***--------------------------------------------***
//Game control functions
PlayerAI.prototype.equipPlay = function( cardID ){
	tempHand = this.getHand();
	
	var found = false;
	cardID = 0;
	tempField = this.getField();
	for( var i = 0; i < tempField.length; i++ ){
		if( tempField[i].isSecondType( 6 ) ){
			found = true;
			break;
		}
	}
	
	if( !found ){
		var tempHand = this.getHand();
		for( var i = 0; i < tempHand.length; i++ ){
			if( tempHand[i].isLegal() && tempHand[i].isSecondType( 6 ) ){
				cardID = tempHand[i].getID();
				break;
			}
		}
	}
	
	objGame.equipPlay( cardID );
}

PlayerAI.prototype.chooseCard = function(){
	tempHand = this.getHand();
	this.sortForPlay( tempHand );
	
	for( var i = 0; i < tempHand.length; i++ ){
		if( tempHand[i].isLegal() && tempHand[i].isResource() && tempHand[i].getDamage() == 0 ){
			objGame.chooseBlock( tempHand[i].getID() );
			return;
		}
	}
	
	var max = -1;
	var maxDamage = -1;
	
	for( var i = 0; i < tempHand.length; i++ ){
		if( tempHand[i].isLegal() && tempHand[i].getDamage() > maxDamage ){
			maxDamage = tempHand[i].getDamage();
			max = i;
		}
	}
	
	if( max > -1 ) {
		objGame.chooseBlock( tempHand[max].getID() );
	} else {
		objControls.resetCardArray();
		objControls.changePosition( 'player' );
		objControls.prependText( '<p>Your opponet has choosen to end their turn.<p>' );
		objGame.getControls().appendText( '<span class="fake_link" onClick="objGame.endTurn();">Continue</span>' );
		objControls.changePositionAnimate( 'objGame.getControls().addCards()' );
	}
}

PlayerAI.prototype.chooseBlock = function(){
	tempHand = this.getHand();
	this.sortForBlock( tempHand );
	
	for( var i = 0; i < tempHand.length; i++ ){
		if( tempHand[i].isBlockLegalHand() ){
			objGame.blockPicked( tempHand[i].getID() );
			return;
		}
	}
	
	objGame.playCardSuccess();
}

/*	Card specific logic below here.
 * 	The following functions are called by cards when a non-standard decision needs to be made
 * 	that will have to be different depending on if a player or AI is making it.
 */
PlayerAI.prototype.Tithe = function(){
	objGame.clearSelectVal();
	tempA = objGame.getSelectVal();
	
	tempA[0] = [ objGame.getCard( 2 ), 0 ];
	
	objGame.getCardInPlay().titheResolve();
}