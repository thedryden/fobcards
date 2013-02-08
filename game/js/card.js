function Card( inID
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

	var cardID = inID;
	var name = inName;
	var imageID = inImageID;
	var imageURL = inImageURL;
	var imageAlt = inImageAlt;
	var imageHorizontal = bitToBool( inImageHorizontal );
	var typeID = inTypeID;
	var typeName = inTypeName;
	var typeOrder = inTypeOrder;
	var costID = inCostID;
	var costName = inCostName;
	var costURL = inCostURL;
	var cost = inCost;
	var costName = inCostName;
	var costURL =  inCostURL;
	var cost =  inCost;
	var damage = inDamage;
	var resource = bitToBool( inResource );
	var effectText = inEffectText;
	var flavorText = inFlavorText;
	
	effectText = effectText.replace( "[momentum]", momentumIcon );
	effectText = effectText.replace( "[mp]", MPIcon );
	effectText = effectText.replace( "[gold]", goldIcon );
	effectText = effectText.replace( "[piety]", pietyIcon );
	effectText = effectText.replace( "[power]", powerIcon );
	effectText = effectText.replace( "[nature]", natureIcon );
	effectText = effectText.replace( "[spell]", spellIcon );
	effectText = effectText.replace( "[chain]", chainIcon );
	effectText = effectText.replace( "[armor]", armorIcon );
	effectText = effectText.replace( "[weapon]", weaponIcon );
	effectText = effectText.replace( "[shield]", shieldIcon );
	effectText = effectText.replace( "[trap]", trapIcon );
	
	var counter = 0;
	
	//Second Type an array containing the cards second type(s)
	//as well as the types names, and url. Empty array means no
	//second type
	if( $.isArray( inSecondType ) ){
		var secondType = inSecondType;
	} else {
		var temp = inSecondType.split(',');
		var temp1 = inSecondTypeName.split(',');
		var temp2 = inSecondTypeURL.split(',');
		
		var secondType = [];
		
		for( var i = 0; i < temp.length; i++ ){
			secondType[i] = [ temp[i], temp1[i], temp2[i] ];
		}
	}
	
	//Block As -- simple array of type ids that the card can 
	//be blocked as in addition to primary
	if( $.isArray( inBlockAs ) ){
		var blockAs = inBlockAs;
	} else {
		var blockAs = inBlockAs.split(',');
	}
	
	//Block As Second Type -- simple array of second type id
	//that the card can be blocked as in addition to primary
	if( $.isArray( inBlockAsSecondType ) ){
		var blockAsSecondType = inBlockAsSecondType;
	} else {
		var blockAsSecondType = inBlockAsSecondType.split(',');
	}
	
	//Block Cards -- lists the card type this card will block (empty
	//array means it blocks no cards) as well as any restritions
	//0 = typeID, 1 = Min Damage, 2 = Max Damage
	if( $.isArray( inBlockCards ) ){
		var blockCards = inBlockCards;
	} else {
		var temp = inBlockCards.split(',');
		var temp1 = inBlockCardsMinDamage.split(',');
		var temp2 = inBlockCardsMaxDamage.split(',');
		
		var blockCards = [];
		
		for( var i = 0; i < temp.length; i++ ){
			blockCards[i] = [ temp[i], temp1[i], temp2[i] ];
		}
	}
	
	//Block Cards -- lists the second card type(s) this card will 
	//block (empty array means it blocks no cards) as well as any restritions
	//0 = Second typeID, 1 = Min Damage, 2 = Max Damage
	if( $.isArray( inBlockCardsSecondType ) ){
		var blockCardsSecondType = inBlockCardsSecondType;
	} else {
		var temp = inBlockCardsSecondType.split(',');
		var temp1 = inBlockCardsSecondTypeMinDamage.split(',');
		var temp2 = inBlockCardsSecondTypeMaxDamage.split(',');
		
		var blockCardsSecondType = [];
		
		for( var i = 0; i < temp.length; i++ ){
			blockCardsSecondType[i] = [ temp[i], temp1[i], temp2[i] ];
		}
	}
	
	//Cost Mods -- lists all cost mods, as well as data about how to apply
	//empty array means no mods
	//0 = typeID, 1 = Played Turn Only, 2 = Effect Owner, 3 = Mod
	if( $.isArray( inCostMods ) ){
		var costMods = inCostMods;
	} else {
		var temp = inCostMods.split(',');
		var temp1 = inCostModsPlayedTurnOnly.split(',');
		var temp2 = inCostModsEffectOwner.split(',');
		var temp3 = inCostModsModInt.split(',');
		
		var costMods = [];
		
		for( var i = 0; i < temp.length; i++ ){
			costMods[i] = [ temp[i], bitToBool( temp1[i] ), bitToBool( temp2[i] ), temp3[i] ];
		}
	}
	
	//Damage Mods -- lists all damage mods, as well as data about how to apply
	//empty array means no mods
	if( $.isArray( inDamageMods ) ){
		var damageMods = inDamageMods;
	} else {
		var temp = inDamageMods.split(',');
		var temp1 = inDamageModsPlayedTurnOnly.split(',');
		var temp2 = inDamageModsModInt.split(',');
		
		var damageMods = [];
		
		for( var i = 0; i < temp.length; i++ ){
			damageMods[i] = [ temp[i], bitToBool( temp1[i] ), temp2[i] ];
		}
	}
	
	//Deffense Mods -- lists all deffense mods, as well as data about how to apply
	//empty array means no mods
	if( $.isArray( inDeffenseMods ) ){
		var deffenseMods = inDeffenseMods;
	} else {
		var temp = inDeffenseMods.split(',');
		var temp1 = inDeffenseModsPlayedTurnOnly.split(',');
		var temp2 = inDeffenseModsModInt.split(',');
		
		var deffenseMods = [];
		
		for( var i = 0; i < temp.length; i++ ){
			deffenseMods[i] = [ temp[i], bitToBool( temp1[i] ), temp2[i] ];
		}
	}

	function clone(){
		var tempCard = new Card( cardID
			, name
			, imageID
			, imageURL
			, imageAlt
			, imageHorizontal
			, typeID
			, typeName
			, typeOrder
			, costID
			, costName
			, costURL
			, cost
			, damage
			, resource
			, effectText
			, flavorText
			, secondType
			, ''//inSecondTypeName
			, ''//inSecondTypeURL
			, blockAs
			, blockAsSecondType
			, blockCards
			, ''//blockCardsMinDamage
			, ''//blockCardsMaxDamage
			, blockCardsSecondType
			, ''//blockCardsSecondTypeMinDamage
			, ''//blockCardsSecondTypeMaxDamage
			, inCostMods
			, ''//inCostModsPlayedTurnOnly
			, ''//inCostModsEffectOwner
			, ''//inCostModsModInt
			, inDamageMods
			, ''//inDamageModsPlayedTurnOnly
			, ''//inDamageModsModInt
			, inDeffenseMods
			, ''//inDeffenseModsPlayedTurnOnly
			, ''//inDeffenseModsModInt 
		); 
		
		tempCard.setCounter( this.getCounter() );
		
		return tempCard;		
	}
	this.clone = clone;
	
	function addCounter( value ){
		counter += value;
	}
	this.addCounter = addCounter;
	
	function setCounter( value ){
		counter = value;
	}
	this.setCounter = setCounter;
	
	function getID(){
		return cardID;
	}
	this.getID = getID;
	
	function getName(){
		return name;
	}
	this.getName = getName;
	
	function getTypeID(){
		return typeID;
	}
	this.getTypeID = getTypeID;
	
	function getTypeName(){
		return typeName;
	}
	this.getTypeName = getTypeName;
	
	function getTypeOrder(){
		return typeOrder;
	}
	this.getTypeOrder = getTypeOrder;
	
	function getBlockTypeOrder(){
		if( typeID == 8 ) return 0;
		return typeOrder;
	}
	this.getBlockTypeOrder = getBlockTypeOrder;
	
	function getCostID(){
		return costID;
	}
	this.getCostID = getCostID;
	
	function getCost(){
		return cost;
	}
	this.getCost = getCost;
	
	function getCostName(){
		return costName;
	}
	this.getCostName = getCostName;
	
	function getCostImg(){
		return '<img src="' + pathImages() + '/' + costURL + '" alt="' + costName + '" />';
	}
	this.getCostImg = getCostImg;
	
	function getDamage(){
		return damage;
	}
	this.getDamage = getDamage;
	
	function getCounter(){
		return counter;
	}
	this.getCounter = getCounter;
	
	function isResource(){
		return resource;
	}
	this.isResource = isResource;
	
	function isSecondType( secondTypeID ){
		if( secondType.indexOf( secondTypeID ) == -1 ){
			return false;
		} else {
			return true;
		}
	}
	this.isSecondType = isSecondType;
	
	function getImage( name, htmlClass, onClick ){
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
		
		return '<img ' + name + htmlClass + onClick + ' src="' + pathImages() + '/' + imageURL + '" alt="' + imageAlt + '" />';
	}
	this.getImage = getImage;
	
	function getImageHorizontal(){
		return imageHorizontal;
	}
	this.getImageHorizontal = getImageHorizontal;
	
	function getSecondTypeImages(){
		var images = '';
		if( secondType[0][0] != '' && secondType[0][0] != undefined ){
			for( var i = 0; i < secondType.length; i++ ){
				images = '<img src="' + pathImages() + '/' + secondType[i][2] + '" alt="' + secondType[i][1] + '" />';
			}	
		}
		return images;
	}
	this.getSecondTypeImages = getSecondTypeImages;
	
	function isBlockedAs( inTypeID ){
		if( typeID == inTypeID ){
			return true;
		} else if ( blockAs.indexOf( inTypeID ) != -1 ){
			return true;
		}
		return false;
	}
	this.isBlockedAs = isBlockedAs;
	
	function isBlockedAsSecondType( inSecondTypeID ){
		for( var i = 0; i < secondType.length; i++ ){
			if( secondType[i][0] == inSecondTypeID ){
				return true;
			}
		}
		
		if ( blockAsSecondType.indexOf( inSecondTypeID ) != -1 ){
			return true;
		}
		return false;
	}
	this.isBlockedAsSecondType = isBlockedAsSecondType;
	
	function blocks( objCard ){
		return false;	
	}
	this.blocks = blocks;
	
	function getEffectText(){
		return effectText;
	}
	this.getEffectText = getEffectText;
	
	function getFlavorText(){
		return flavorText;
	}
	this.getFlavorText = getFlavorText;
	
	function getYourCostMods( typeID ){
		for( var i = 0; i < costMods.length; i++ ){
			if( costMods[i][0] == typeID && !costMods[i][1] && costMods[i][2] ){
				return costMods[i][3];
			}
		}
		return 0;
	}
	this.getYourCostMods = getYourCostMods;
	
	function getYourCostModsThisTurn( typeID ){
		for( var i = 0; i < costMods.length; i++ ){
			if( costMods[i][0] == typeID && costMods[i][1] && costMods[i][2] ){
				return costMods[i][3];
			}
		}
		return 0;
	}
	this.getYourCostModsThisTurn = getYourCostModsThisTurn;
	
	function getOppCostMods( typeID ){
		for( var i = 0; i < costMods.length; i++ ){
			if( costMods[i][0] == typeID && !costMods[i][1] && !costMods[i][2] ){
				return costMods[i][3];
			}
		}
		return 0;
	}
	this.getOppCostMods = getOppCostMods;
	
	function getOppCostModsThisTurn( typeID ){
		for( var i = 0; i < costMods.length; i++ ){
			if( costMods[i][0] == typeID && costMods[i][1] && !costMods[i][2] ){
				return costMods[i][3];
			}
		}
		return 0;
	}
	this.getOppCostModsThisTurn = getOppCostModsThisTurn;
	
	function getDamageMods( typeID ){
		for( var i = 0; i < damageMods.length; i++ ){
			if( damageMods[i][0] == typeID && !damageMods[i][1] ){
				return damageMods[i][2];
			}
		}
		return 0;
	}
	this.getDamageMods = getDamageMods;
	
	function getDamageModsThisTurn( typeID ){
		for( var i = 0; i < damageMods.length; i++ ){
			if( damageMods[i][0] == typeID && damageMods[i][1] ){
				return damageMods[i][2];
			}
		}
		return 0;
	}
	this.getDamageModsThisTurn = getDamageModsThisTurn;
	
	function getDeffenseMods( typeID ){
		for( var i = 0; i < deffenseMods.length; i++ ){
			if( deffenseMods[i][0] == typeID && !deffenseMods[i][1] ){
				return deffenseMods[i][2];
			}
		}
		return 0;
	}
	this.getDeffenseMods = getDeffenseMods;
	
	function getDeffenseModsThisTurn( typeID ){
		for( var i = 0; i < deffenseMods.length; i++ ){
			if( deffenseMods[i][0] == typeID && deffenseMods[i][1] ){
				return deffenseMods[i][2];
			}
		}
		return 0;
	}
	this.getDeffenseModsThisTurn = getDeffenseModsThisTurn;
	
	function isLegal(){
		if( typeID == 8 ) return false;
		
		var available = -1;
		
		switch( costID ){
			case 1: //Momentum
				available = objGame.getCurrentPlayer().getMomentum() + objGame.getCurrentPlayer().getMomentumMod();
				break;
			case 2: //MP
				available = objGame.getCurrentPlayer().getMP() + objGame.getCurrentPlayer().getMPMod();
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
		
		if( available >= cost ){
			return true;
		} else {
			return false;
		}
	}
	this.isLegal = isLegal;
	
	function isBlockLegal(){
		if( typeID != 8 ) return false;
		
		var available = -1;
		
		switch( inCostID ){
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
		
		if( available < cost ) return false;
		
		var damage = objGame.getCardInPlayDamage();

		//0 = typeID, 1 = Min Damage, 2 = Max Damage
		for( var i = 0; i < blockCards.length; i++ ){
			if( objGame.getCardInPlay().isBlockedAs( blockCards[i][0] ) ){
				if( damage >= blockCards[i][1] 
					&& ( blockCards[i][2] == -1 || damage <= blockCards[i][2] ) ) return true;
			}
		}
		for( var i = 0; i < blockCardsSecondType.length; i++ ){
			if( objGame.getCardInPlay().isBlockedAsSecondType( blockCardsSecondType[i] ) ){
				if( damage >= blockCardsSecondType[i][1] 
					&& ( blockCardsSecondType[i][2] == -1 || damage <= blockCardsSecondType[i][2] ) ) return true;
			}
		}
		return false;
	}
	this.isBlockLegal = isBlockLegal;
	
	//When determining resources before picking a card, after oppPlayCardAbilityMods
	function playCardFieldEffectMods(){
		return false;
	}
	this.playCardFieldEffectMods = playCardFieldEffectMods;
	
	//When determining resources before picking a card, after oppPlayCardAbilityMods
	function oppPlayCardFieldEffectMods(){
		return false;
	}
	this.oppPlayCardFieldEffectMods = oppPlayCardFieldEffectMods;
	
	//When determining resources before picking a card, after playCardFieldEffectMods
	function playCardPlayedThisTurnMods(){
		return false;
	}
	this.playCardPlayedThisTurnMods = playCardPlayedThisTurnMods;

	//Directly after the cost is payed
	//Effect of the card played when the cost is payed
	//!!!!!!! This card is in charge of determining where to resume if a interupt is called.
	function payCostEffect(){
		return false;	
	}
	this.payCostEffect = payCostEffect;
	
	//When determining resources before picking a card, after oppPlayCardAbilityMods
	function blockCardFieldEffectMods(){	
		return false;
	}
	this.blockCardFieldEffectMods = blockCardFieldEffectMods;
	
	//When determining resources before picking a card, after oppPlayCardAbilityMods
	function oppBlockCardFieldEffectMods(){
		return false;
	}
	this.oppBlockCardFieldEffectMods = oppBlockCardFieldEffectMods;
	
	//When determining resources before picking a card, after playCardFieldEffectMods
	function blockCardPlayedThisTurnMods(){
		return false;
	}
	this.blockCardPlayedThisTurnMods = blockCardPlayedThisTurnMods;
	
	//Just before you do damage, after ability mods
	function doDamageFieldEffectMods(){
		return false;
	}
	this.doDamageFieldEffectMods = doDamageFieldEffectMods;
	
	//Just before you take damage, after ability mods
	function takeDamageFieldEffectMods(){
		return false;
	}
	this.takeDamageFieldEffectMods = takeDamageFieldEffectMods;
	
	//Just before you do damage, after field effect mods
	function doDamagePlayedThisTurnMods(){
		return false;
	}
	this.doDamagePlayedThisTurnMods = doDamagePlayedThisTurnMods;
	
	//Just before you do damage, after field effect mods
	function takeDamagePlayedThisTurnMods(){
		return false;
	}
	this.takeDamagePlayedThisTurnMods = takeDamagePlayedThisTurnMods;
	
	//Effect of a card that triggers on successful play
	//!!!!!!! This card is in charge of determining where to resume if a interupt is called.
	function cardOnPlayEffect(){
		return false;
	}
	this.cardOnPlayEffect = cardOnPlayEffect;
	
	//Effect of a block that tiggers when played
	function blockOnPlayEffect(){
		return false;
	}
	this.blockOnPlayEffect = blockOnPlayEffect;
}
