function Cards(){
	var cards = [];
	
	function addCard( objCard ){
		cards[ objCard.getID() ] = objCard;
	}
	this.addCard = addCard;
	
	function getCard( cardID ){
		if( cards[cardID] != undefined ){
			return cards[cardID].clone();
		}
	}
	this.getCard = getCard;
	
	function getCardTypes(){
		return cardTypes.slice();
	}
}
