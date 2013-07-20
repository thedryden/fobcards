function Card(){
	this.cardID = 0;
	this.name = '';
	this.imageID = 0;
	this.imageURL = '';
	this.imageAlt = '';
	this.imageHorizontal = false;
	this.typeID = 0;
	this.typeName = '';
	this.typeOrder = 0;
	this.costID = 0;
	this.costName = '';
	this.costURL = '';
	this.cost = 0;
	this.costName = '';
	this.costURL =  '';
	this.cost =  0;
	this.damage = 0;
	this.resource = false;
	this.effectText = '';
	this.flavorText = '';
	
	this.counter = 0;	
}

Card.prototype.secondType = [];
Card.prototype.blockAs = [];
Card.prototype.blockAsSecondType = [];
Card.prototype.blockCards = [];
Card.prototype.blockCardsSecondType = [];
Card.prototype.costMods = [];
Card.prototype.damageMods = [];
Card.prototype.deffenseMods = [];

Card.prototype.init = function( inID
	, inName
	, inImageID
	, inImageURL
	, inImageAlt
	, inImageHorizontal
	, inTypeID
	, inTypeName
	, inTypeOrder
	, inCostID
	, inCostName
	, inCostURL
	, inCost
	, inDamage
	, inResource
	, inEffectText
	, inFlavorText
	, inSecondType
	, inSecondTypeName
	, inSecondTypeURL
	, inBlockAs
	, inBlockAsSecondType
	, inBlockCards
	, inBlockCardsMinDamage
	, inBlockCardsMaxDamage
	, inBlockCardsSecondType
	, inBlockCardsSecondTypeMinDamage
	, inBlockCardsSecondTypeMaxDamage
	, inCostMods
	, inCostModsPlayedTurnOnly
	, inCostModsEffectOwner
	, inCostModsModInt
	, inDamageMods
	, inDamageModsPlayedTurnOnly
	, inDamageModsModInt
	, inDeffenseMods
	, inDeffenseModsPlayedTurnOnly
	, inDeffenseModsModInt ){

	this.cardID = inID;
	this.name = inName;
	this.imageID = inImageID;
	this.imageURL = inImageURL;
	this.imageAlt = inImageAlt;
	this.imageHorizontal = bitToBool( inImageHorizontal );
	this.typeID = inTypeID;
	this.typeName = inTypeName;
	this.typeOrder = inTypeOrder;
	this.costID = inCostID;
	this.costName = inCostName;
	this.costURL = inCostURL;
	this.cost = inCost;
	this.costName = inCostName;
	this.costURL =  inCostURL;
	this.cost =  inCost;
	this.damage = inDamage;
	this.resource = bitToBool( inResource );
	this.effectText = inEffectText;
	this.flavorText = inFlavorText;
	
	this.effectText = this.effectText.replace( "[momentum]", momentumIcon );
	this.effectText = this.effectText.replace( "[mp]", MPIcon );
	this.effectText = this.effectText.replace( "[gold]", goldIcon );
	this.effectText = this.effectText.replace( "[piety]", pietyIcon );
	this.effectText = this.effectText.replace( "[power]", powerIcon );
	this.effectText = this.effectText.replace( "[nature]", natureIcon );
	this.effectText = this.effectText.replace( "[spell]", spellIcon );
	this.effectText = this.effectText.replace( "[chain]", chainIcon );
	this.effectText = this.effectText.replace( "[armor]", armorIcon );
	this.effectText = this.effectText.replace( "[weapon]", weaponIcon );
	this.effectText = this.effectText.replace( "[shield]", shieldIcon );
	this.effectText = this.effectText.replace( "[trap]", trapIcon );
	
	//Second Type an array containing the cards second type(s)
	//as well as the types names, and url. Empty array means no
	//second type
	if( $.isArray( inSecondType ) ){
		this.secondType = inSecondType;
	} else {
		var temp = inSecondType.split(',');
		var temp1 = inSecondTypeName.split(',');
		var temp2 = inSecondTypeURL.split(',');
		
		for( var i = 0; i < temp.length; i++ ){
			this.secondType[i] = [ temp[i], temp1[i], temp2[i] ];
		}
	}
	
	//Block As -- simple array of type ids that the card can 
	//be blocked as in addition to primary
	if( $.isArray( inBlockAs ) ){
		this.blockAs = inBlockAs;
	} else {
		this.blockAs = inBlockAs.split(',');
	}
	
	//Block As Second Type -- simple array of second type id
	//that the card can be blocked as in addition to primary
	if( $.isArray( inBlockAsSecondType ) ){
		this.blockAsSecondType = inBlockAsSecondType;
	} else {
		this.blockAsSecondType = inBlockAsSecondType.split(',');
	}
	
	//Block Cards -- lists the card type this card will block (empty
	//array means it blocks no cards) as well as any restritions
	//0 = typeID, 1 = Min Damage, 2 = Max Damage
	if( $.isArray( inBlockCards ) ){
		this.blockCards = inBlockCards;
	} else {
		var temp = inBlockCards.split(',');
		var temp1 = inBlockCardsMinDamage.split(',');
		var temp2 = inBlockCardsMaxDamage.split(',');
		
		for( var i = 0; i < temp.length; i++ ){
			this.blockCards[i] = [ temp[i], temp1[i], temp2[i] ];
		}
	}
	
	//Block Cards -- lists the second card type(s) this card will 
	//block (empty array means it blocks no cards) as well as any restritions
	//0 = Second typeID, 1 = Min Damage, 2 = Max Damage
	if( $.isArray( inBlockCardsSecondType ) ){
		this.blockCardsSecondType = inBlockCardsSecondType;
	} else {
		temp = inBlockCardsSecondType.split(',');
		temp1 = inBlockCardsSecondTypeMinDamage.split(',');
		temp2 = inBlockCardsSecondTypeMaxDamage.split(',');
		
		for( var i = 0; i < temp.length; i++ ){
			this.blockCardsSecondType[i] = [ temp[i], temp1[i], temp2[i] ];
		}
	}
	
	//Cost Mods -- lists all cost mods, as well as data about how to apply
	//empty array means no mods
	//0 = typeID, 1 = Played Turn Only, 2 = Effect Owner, 3 = Mod
	if( $.isArray( inCostMods ) ){
		this.costMods = inCostMods;
	} else {
		temp = inCostMods.split(',');
		temp1 = inCostModsPlayedTurnOnly.split(',');
		temp2 = inCostModsEffectOwner.split(',');
		var temp3 = inCostModsModInt.split(',');
		
		for( var i = 0; i < temp.length; i++ ){
			this.costMods[i] = [ temp[i], bitToBool( temp1[i] ), bitToBool( temp2[i] ), temp3[i] ];
		}
	}
	
	//Damage Mods -- lists all damage mods, as well as data about how to apply
	//empty array means no mods
	if( $.isArray( inDamageMods ) ){
		this.damageMods = inDamageMods;
	} else {
		temp = inDamageMods.split(',');
		temp1 = inDamageModsPlayedTurnOnly.split(',');
		temp2 = inDamageModsModInt.split(',');
		
		for( var i = 0; i < temp.length; i++ ){
			this.damageMods[i] = [ temp[i], bitToBool( temp1[i] ), temp2[i] ];
		}
	}
	
	//Deffense Mods -- lists all deffense mods, as well as data about how to apply
	//empty array means no mods
	if( $.isArray( inDeffenseMods ) ){
		this.deffenseMods = inDeffenseMods;
	} else {
		temp = inDeffenseMods.split(',');
		temp1 = inDeffenseModsPlayedTurnOnly.split(',');
		temp2 = inDeffenseModsModInt.split(',');
		
		for( var i = 0; i < temp.length; i++ ){
			this.deffenseMods[i] = [ temp[i], bitToBool( temp1[i] ), temp2[i] ];
		}
	}
}

Card.prototype.clone = function(){
	var tempCard = new Card();
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

Card.prototype.addCounter = function( value ){
	this.counter += value;
}

Card.prototype.setCounter = function( value ){
	this.counter = value;
}

Card.prototype.getID = function(){
	return this.cardID;
}

Card.prototype.getName = function(){
	return this.name;
}

Card.prototype.getTypeID = function(){
	return this.typeID;
}

Card.prototype.getTypeName = function(){
	return this.typeName;
}

Card.prototype.getTypeOrder = function(){
	return this.typeOrder;
}

Card.prototype.getBlockTypeOrder = function(){
	if( this.typeID == 8 ) return 0;
	return this.typeOrder;
}

Card.prototype.getCostID = function(){
	return this.costID;
}

Card.prototype.getCost = function(){
	return this.cost;
}

Card.prototype.getCostName = function(){
	return this.costName;
}

Card.prototype.getCostImg = function(){
	return '<img src="' + pathImages() + '/' + this.costURL + '" alt="' + this.costName + '" />';
}

Card.prototype.getDamage = function(){
	return this.damage;
}

Card.prototype.getCounter = function(){
	return this.counter;
}

Card.prototype.isResource = function(){
	return this.resource;
}

Card.prototype.isSecondType = function( secondTypeID ){
	for( var i = 0; i < this.secondType.length; i++ ){
		if( this.secondType[i][0] == 6 ){
			return true;
		}
	}
	return false;
}

Card.prototype.getImage = function( name, htmlClass, onClick ){
	if( name != undefined && name != '' ){
		name = ' name="' + name + '" id="' + name + '" '
	} else {
		name = '';
	}
	
	if( htmlClass != undefined && htmlClass != '' ){
		htmlClass = ' class="' + htmlClass + '" '
	} else {
		htmlClass = '';
	}
	
	if( onClick != undefined && onClick != '' ){
		onClick = ' onClick="' + onClick + '" '
	} else {
		onClick = '';
	}
	
	return '<img ' + name + htmlClass + onClick + ' src="' + pathImages() + '/' + this.imageURL + '" alt="' + this.imageAlt + '" />';
}

Card.prototype.getImageHorizontal = function(){
	return this.imageHorizontal;
}

Card.prototype.getSecondTypeImages = function(){
	var images = '';
	if( this.secondType[0][0] != '' && this.secondType[0][0] != undefined ){
		for( var i = 0; i < this.secondType.length; i++ ){
			images = '<img src="' + pathImages() + '/' + this.secondType[i][2] + '" alt="' + this.secondType[i][1] + '" />';
		}	
	}
	return images;
}

Card.prototype.isBlockedAs = function( inTypeID ){
	if( this.typeID == inTypeID ){
		return true;
	} else if ( this.blockAs.indexOf( inTypeID ) != -1 ){
		return true;
	}
	return false;
}

Card.prototype.isBlockedAsSecondType = function( inSecondTypeID ){
	for( var i = 0; i < this.secondType.length; i++ ){
		if( this.secondType[i][0] == inSecondTypeID ){
			return true;
		}
	}
	
	if ( this.blockAsSecondType.indexOf( inSecondTypeID ) != -1 ){
		return true;
	}
	return false;
}

Card.prototype.blocks = function( objCard ){
	return false;	
}

Card.prototype.getEffectText = function(){
	return this.effectText;
}

Card.prototype.getFlavorText = function(){
	return this.flavorText;
}

Card.prototype.getYourCostMods = function( typeID ){
	for( var i = 0; i < this.costMods.length; i++ ){
		if( this.costMods[i][0] == typeID && !this.costMods[i][1] && this.costMods[i][2] ){
			return this.costMods[i][3];
		}
	}
	return 0;
}

Card.prototype.getYourCostModsThisTurn = function( typeID ){
	for( var i = 0; i < this.costMods.length; i++ ){
		if( this.costMods[i][0] == typeID && this.costMods[i][1] && this.costMods[i][2] ){
			return this.costMods[i][3];
		}
	}
	return 0;
}

Card.prototype.getOppCostMods = function( typeID ){
	for( var i = 0; i < this.costMods.length; i++ ){
		if( this.costMods[i][0] == typeID && !this.costMods[i][1] && !this.costMods[i][2] ){
			return this.costMods[i][3];
		}
	}
	return 0;
}

Card.prototype.getOppCostModsThisTurn = function( typeID ){
	for( var i = 0; i < this.costMods.length; i++ ){
		if( this.costMods[i][0] == typeID && this.costMods[i][1] && !this.costMods[i][2] ){
			return this.costMods[i][3];
		}
	}
	return 0;
}

Card.prototype.getDamageMods = function( typeID ){
	for( var i = 0; i < this.damageMods.length; i++ ){
		if( this.damageMods[i][0] == typeID && !this.damageMods[i][1] ){
			return this.damageMods[i][2];
		}
	}
	return 0;
}

Card.prototype.getDamageModsThisTurn = function( typeID ){
	for( var i = 0; i < this.damageMods.length; i++ ){
		if( this.damageMods[i][0] == typeID && this.damageMods[i][1] ){
			return this.damageMods[i][2];
		}
	}
	return 0;
}

Card.prototype.getDeffenseMods = function( typeID ){
	for( var i = 0; i < this.deffenseMods.length; i++ ){
		if( this.deffenseMods[i][0] == typeID && !this.deffenseMods[i][1] ){
			return this.deffenseMods[i][2];
		}
	}
	return 0;
}

Card.prototype.getDeffenseModsThisTurn = function( typeID ){
	for( var i = 0; i < this.deffenseMods.length; i++ ){
		if( this.deffenseMods[i][0] == typeID && this.deffenseMods[i][1] ){
			return this.deffenseMods[i][2];
		}
	}
	return 0;
}

Card.prototype.isLegal = function(){
	if( this.typeID == 8 ) return false;
	
	var available = -1;
	var tempCost = this.cost;
	
	switch( this.costID ){
		case 1: //Momentum
			available = objGame.getCurrentPlayer().getMomentum();
			if( this.cost != 0 ) tempCost += objGame.getCurrentPlayer().getMomentumMod();
			break;
		case 2: //MP
			available = objGame.getCurrentPlayer().getMP();
			if( this.cost != 0 ) tempCost += objGame.getCurrentPlayer().getMPMod();
			break;
		case 3: //Gold
			available = objGame.getCurrentPlayer().getGold();
			break;
		case 4: //Prayer for Piety
			available = objGame.getCurrentPlayer().getPrayer();
			break;
		case 5: //Prayer for Power
			available = objGame.getCurrentPlayer().getPrayer();
			break;
		case 6: //Nature
			available = objGame.getCurrentPlayer().getPrayer();
			break;
	}
	
	if( available >= this.cost ){
		return true;
	} else {
		return false;
	}
}

Card.prototype.isBlockLegalHand = function(){
	if( this.typeID != 8 ) return false;
	
	var available = -1;
	
	switch( this.costID ){
		case 1: //Momentum
			available = objGame.getReactionPlayer().getMomentum();
			break;
		case 2: //MP
			available = objGame.getReactionPlayer().getMP();
			break;
		case 3: //Gold
			available = objGame.getReactionPlayer().getGold();
			break;
		case 4: //Prayer for Piety
			available = objGame.getReactionPlayer().getPrayer();
			break;
		case 5: //Prayer for Power
			available = objGame.getReactionPlayer().getPrayer();
			break;
		case 6: //Nature
			available = objGame.getReactionPlayer().getPrayer();
			break;
	}
	
	if( available < this.cost ) return false;
	
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

Card.prototype.isBlockLegalOverturn = function(){
	if( this.typeID != 8 ) return false;
	
	var available = -1;
	if( this.costID == 1 ) available = objGame.getReactionPlayer().getMomentum();
	
	if( available < this.cost ) return false;
	
	var damage = objGame.getCardDamage();

	//0 = typeID, 1 = Min Damage, 2 = Max Damage
	for( var i = 0; i < this.blockCards.length; i++ ){
		if( objGame.getCardInPlay().isBlockedAs( this.blockCards[i][0] ) ){
			if( damage >= this.blockCards[i][1] 
				&& ( this.blockCards[i][2] == -1 || damage <= this.blockCards[i][2] ) ) return true;
		}
	}
	for( var i = 0; i < this.blockCardsSecondType.length; i++ ){
		if( objGame.getCardInPlay().isBlockedAsSecondType( this.blockCardsSecondType[i][0] ) ){
			if( damage >= this.blockCardsSecondType[i][1] 
				&& ( this.blockCardsSecondType[i][2] == -1 || damage <= this.blockCardsSecondType[i][2] ) ) return true;
		}
	}
	return false;
}

//When determining resources before picking a card, after oppPlayCardAbilityMods
Card.prototype.playCardFieldEffectMods = function(){
	return false;
}

//When determining resources before picking a card, after oppPlayCardAbilityMods
Card.prototype.oppPlayCardFieldEffectMods = function(){
	return false;
}

//When determining resources before picking a card, after playCardFieldEffectMods
Card.prototype.playCardPlayedThisTurnMods = function(){
	return false;
}

//Directly after the cost is payed
//Effect of the card played when the cost is payed
//!!!!!!! This card is in charge of determining where to resume if a interupt is called.
Card.prototype.payCostEffect = function(){
	return false;	
}

//When determining resources before picking a card, after oppPlayCardAbilityMods
Card.prototype.blockCardFieldEffectMods = function(){	
	return false;
}

//When determining resources before picking a card, after oppPlayCardAbilityMods
Card.prototype.oppBlockCardFieldEffectMods = function(){
	return false;
}

//When determining resources before picking a card, after playCardFieldEffectMods
Card.prototype.blockCardPlayedThisTurnMods = function(){
	return false;
}

//Just before you do damage, after ability mods
Card.prototype.doDamageFieldEffectMods = function(){
	return false;
}

//Just before you take damage, after ability mods
Card.prototype.takeDamageFieldEffectMods = function(){
	return false;
}

//Just before you do damage, after field effect mods
Card.prototype.doDamagePlayedThisTurnMods = function(){
	return false;
}

//Just before you do damage, after field effect mods
Card.prototype.takeDamagePlayedThisTurnMods = function(){
	return false;
}

//Effect of a card that triggers on successful play
//!!!!!!! This card is in charge of determining where to resume if a interupt is called.
Card.prototype.cardOnPlayEffect = function(){
	return false;
}

//Effect of a block that tiggers when played
Card.prototype.blockOnPlayEffect = function(){
	return false;
}
