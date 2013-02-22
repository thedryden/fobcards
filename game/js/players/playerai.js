PlayerAI.prototype = new Player();
PlayerAI.constructor = PlayerAI;

function PlayerAI(){};

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
}