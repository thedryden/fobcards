Tithe.prototype = Object.create(Card.prototype);
Tithe.constructor = Tithe;

function Tithe(){};

Tithe.prototype.clone = function(){
	var tempCard = new Tithe();
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

Tithe.prototype.cardOnPlayEffect = function(){
	objGame.getCurrentPlayer().Tithe();
	return true;
}

Tithe.prototype.titheResolve = function(){
	var position = 'player'
	if( objGame.getCurrentPlayer().getDeckID() != objGame.getIsPlayer( true ).getDeckID() ) position = 'opp';
	
	tempA = objGame.getSelectVal();
	goldVal = 0
	if( tempA.length > 0 && tempA[0][0].getID() == 2 ){
		goldVal = parseInt( tempA[0][1] );
		if( goldVal == NaN ) goldVal = 0;
	}
	
	tempGoldMoved = 0;
	for( var i = 0; i < goldVal; i++ ){
		if( objGame.getCurrentPlayer().moveCard( 2, 'field', 'removed' ) ) tempGoldMoved++;
	}
	
	tempPrayerMoved = 0;
	tempGood = false;
	for( var i = 0; i < Math.floor( tempGoldMoved / 2 ); i++ ){
		if( objGame.getCurrentPlayer().moveCard( 3, 'deck', 'field' ) ){
			tempPrayerMoved++;
			tempGood = true;
		} else {
			if( objGame.getCurrentPlayer().moveCard( 4, 'deck', 'field' ) ) tempPrayerMoved++;
		}
	}
	
	objGame.getControls().resetCardArray();
	objGame.getControls().changePosition( position );
	
	if( position = 'player' ){
		objGame.getControls().prependText( "<p>You" );
	} else {
		objGame.getControls().prependText( '<p>' + objGame.getCurrentPlayer.getPlayerName() );
	}
	
	objGame.getControls().appendText( ' removed ' + tempGoldMoved + ' ' + objGame.getCard( 2 ).getName() + ' from the game in order to move ' + tempPrayerMoved + ' ' );
	if( tempGood ) {
		objGame.getControls().appendText( objGame.getCard( 3 ).getName() );
	} else {
		objGame.getControls().appendText( objGame.getCard( 4 ).getName() );
	}
	
	objGame.getControls().appendText( ' to ' );
	
	if( position = 'player' ){
		objGame.getControls().appendText( "Your" );
	} else {
		objGame.getControls().appendText( objGame.getCurrentPlayer.getPlayerName() );
	}
	
	objGame.getControls().appendText( ' field.</p>' );
	
	objGame.getControls().appendText( '<p><span class="fake_link" onClick="objGame.equipPlayToggle( objGame.getCardInPlay().getID() );">Continue</span>' );
	
	objGame.getControls().changePositionAnimate('');
}
	