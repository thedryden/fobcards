function Controls(){
	var animating = false; //If set to true animating functions will not start
	
	var position = ''; //Stores the current location of the opp and player bars
	var nextPosition = ''; //Stores the next position for when changePositionAnimate is called
	var activeDiv = ''; //Stores the name of the div where new contents should be placed
	var subDiv = ''; //If there is more than 1 available div for contents this is the second type
	
	var returnActiveDiv = ''; //Stores where to return to when done look away from the game 
	var returnSubDiv = ''; //Stores where to return to when done look away from the game
	var returnCards = [];//Stores the cards array so it can be restored.
	
	var oppMomentumToggle = false; //if true opp momentum window is open
	var oppMPToggle = false; //if true opp MP window is open
	var oppGoldToggle = false; //if true opp gold window is open
	var oppGodsToggle = false; //if true opp gods window is open
	
	var playerMomentumToggle = false;  //if true player momentum window is open
	var playerMPToggle = false; //if true player MP window is open
	var playerGoldToggle = false; //if true player gold window is open
	var playerGodsToggle = false; //if true player gods window is open
	
	var hideDetailID = ''; //Stores the array index in cards having their details displayed are 
	var hideDetailTop = 0; //Stores the former position of the card being displayed so it can be returned
	var hideDetailLeft = 0; //Stores the former position of the card being displayed so it can be returned
		
	var cards = []; //2d Array 1st position is card objects, 2nd position is either text to be evaled as next
	//method (standard) or a count of the cards available (select)
	var cardSub = undefined; 
	
	var cardsSelect = false; //Indicates cards is being used by a select.
	var selectCount = 0; //Indicates number of cards selected
	var selectMandatory = false; //Indicates if you must select exactly selectQuantity or just under
	var selectQuantity = 0 //The number of cards to be selected
	var selected = []; //A 2d array containing selected card, 1 position card object 2nd position quantity
	
	//colors used for controls
	var blank = '#ffffff';
	var felt = '#347936';
	var discard = '#d0d0d0';
	var removed = '#303030';
	var defaultFont = '#000000'
	var lightFont = '#ffffff'
	
	//Allows outside of object access to animating
	function removeAnimating(){
		animating = false;
	}
	this.removeAnimating = removeAnimating;
	
	//Gives the name of the current active card details div
	function detailsDiv(){
		return activeDiv.substr( 0, 6 ) + '_card_details';
	}
	this.detailsDiv = detailsDiv;
	
	/*	Changes the position of the player bars, and sets the active div for
	 * 	insertion:
	 * 	newPosition valid values and descriptions:
	 * 	player is both to top,
	 * 	reaction is opp to top, with a card sized gap between opp and player
	 * 	opp is Opp to top, player to bottom
	 *  return returns to the selected div before showLocation was used
	 * 
	 * 	nextMethod: This is a string that will be evaluated, so build
	 *  from the golbal space down (usually from objGame).
	 *  
	 *  showLocation (optional): if used the selected container will be displayed
	 *  in a non-interactive format in the correct non_game divs. Since the non_game
	 *  divs will be used you will be able to return to the game divs, which will be
	 *  unchanged.
	 *  Valid Values and description:
	 *  hand: white background hand will be displayed
	 *  field: felt green background, field will be displayed
	 *  discard: light grey background, discard will be displayed
	 *  removed: dark grey background, removed cards will be displayed  
	 */
	function changePosition( newPosition, showLocation ){
		if( animating ) return;
		
		nextPosition = newPosition.toLowerCase(); //normalize newPosition
		
		this.hideDivs();
		
		//Processing for if showLocation is available
		nextBackground = blank;
		nextFontColor = defaultFont; 
		
		if (showLocation != undefined && showLocation != '') {
			toggleIcons( nextPosition, showLocation );
			
			if( returnActiveDiv == '' ){
				returnActiveDiv = activeDiv;
				returnSubDiv = subDiv;
				returnCards = cards;
			}
			cards = [];
			
			this.clearDivs('div_p1_non_game');
			this.clearDivs('div_p3_non_game');
			
			showLocation = showLocation.toLowerCase();
			
			if (showLocation == 'field') {
				nextBackground = felt;
			} else if (showLocation == 'discard') {
				nextBackground = discard;
			} else if (showLocation == 'removed') {
				nextBackground = removed;
				nextFontColor = lightFont 
			}
		} else if (nextPosition != 'return') {
			this.clearDivs();
		} else if (nextPosition == 'return') {
			if (returnActiveDiv == 'div_p1') 
				nextPosition = 'player';
			if (returnActiveDiv == 'div_p2') 
				nextPosition = 'reaction';
			if (returnActiveDiv == 'div_p3') 
				nextPosition = 'opp';
				
			toggleIcons( '', '' );
			
			returnActiveDiv = '';
			returnSubDiv = '';
			cards = returnCards;
			returnCards = [];
		}
		
		if( nextPosition== 'player' ){			
			activeDiv = 'div_p1';
			subDiv = '';
			
			if( showLocation != undefined && showLocation != '' )
				activeDiv += '_non_game';
		}  else if( nextPosition == 'reaction' ){
			activeDiv = 'div_p2';
			subDiv = 'div_p2_sub';
		} else {//Opp
			activeDiv = 'div_p3';
			subDiv = '';
			
			if( showLocation != undefined && showLocation != '' )
				activeDiv += '_non_game';
		}
	}
	this.changePosition = changePosition;
	
	function changePositionAnimate( nextMethod ){
		if( animating ) return;
		
		if( nextPosition== 'player' ){			
			var topOpp = -1;
			var topPlayer = 99;
		}  else if( nextPosition == 'reaction' ){
			var topOpp = -1;
			var topPlayer = 229;
		} else {//Opp
			var topOpp = -1;
			var topPlayer = 501;
		}
		
		if( position == nextPosition ){
			$('#' + activeDiv).css({
				'z-index': '10',
				'background-color': nextBackground,
				'color': nextFontColor
			});
			if (subDiv != '') {
				$('#' + subDiv).css('z-index', 10);
			}
			$('#' + objGame.getControls().detailsDiv()).css({ 'background-color': nextBackground })
			
			if (nextMethod != undefined && nextMethod != '') {
				eval(nextMethod);
			}
		} else {
			position = nextPosition;
			animating = true;
			
			$('#div_opp').animate( { top: topOpp + 'px' }
				, 500
			);
			
			$('#div_player').animate( { top: topPlayer + 'px' }
				, 500
				, (function( divToFormat, subDivToFormat ){
					return function(){
						objGame.getControls().removeAnimating();
						
						$('#' + divToFormat).css({
							'z-index': '10',
							'background-color': nextBackground,
							'color': nextFontColor
						});
						if (subDivToFormat != '') {
							$('#' + subDivToFormat).css('z-index', 10);
						}
						$('#' + objGame.getControls().detailsDiv()).css({ 'background-color': nextBackground });
						
						if (nextMethod != undefined && nextMethod != '') {
							eval(nextMethod);
						}
					}
				})( activeDiv, subDiv )
			);	
		}
	}
	this.changePositionAnimate = changePositionAnimate;
	
	//Outputs cards array to the active div
	function addCards(){
		if( animating ) return;
		
		if( cards.length == 0 ) return;
		
		animating = true;
	
		for( var i = 0; i < cards.length; i++ ){
			var card = cards[i][0];
			
			if (card != undefined) {
				jv_img = '<span name="sp_' + activeDiv + '_' + i + '" id="sp_' + activeDiv + '_' + i + '" class="card" onClick="objGame.getControls().cardDetails( ' + i + ' );">';
				if( cards[i][1] == '' || cards[i][1] == undefined || cardsSelect ){
					if( card.getImageHorizontal() ){
						jv_img += '	' + card.getImage('img_' + activeDiv + '_' + i, 'card_hor_greyed_out');
						jv_img += '	<img name="imgb_' + activeDiv + '_' + i + '" id="imgb_' + activeDiv + '_' + i + '" class="card_hor_greyed_out_back" src="' + pathImages() + '/blank-horizontal.png" />';						
					} else {
						jv_img += '	' + card.getImage('img_' + activeDiv + '_' + i, 'card_greyed_out');
						jv_img += '	<img name="imgb_' + activeDiv + '_' + i + '" id="imgb_' + activeDiv + '_' + i + '" class="card_greyed_out_back" src="' + pathImages() + '/blank.png" />';
					}
				} else {
					if ( card.getImageHorizontal() ) {
						jv_img += '	' + card.getImage('img_' + activeDiv + '_' + i, 'card_normal');
					} else {
						jv_img += '	' + card.getImage('img_' + activeDiv + '_' + i, 'card_normal');						
					}
				}
				jv_img += '</span>';
				
				$('#' + activeDiv + '_cards').html($('#' + activeDiv + '_cards').html() + jv_img);
				
				$('#sp_' + activeDiv + '_' + i).css({
					position: 'absolute',
					top: '5px',
					left: '450px'
				})
				$('#img_' + activeDiv + '_' + i).css({
					'z-index': 50 + i
				});
				if (cards[i][1] == '' || cards[i][1] == undefined || cardsSelect ) {
					$('#imgb_' + activeDiv + '_' + i).css({
						'z-index': 49 + i
					});
				}
			}
		}
		
		var jvTop = 0; 
		var jvLeft = 0;
		var jvRow = 0;
		var jvCol = 0;
		var jvCardCount = 1;
		
		for( var i = 0; i < cards.length; i++ ){
			var card = cards[i][0];
			
			if (card != undefined) {
				if ( jvCardCount % 12 == 0 || ( card.getImageHorizontal() && ( jvCardCount + 1 ) % 12 == 0 ) ) {
					jvRow++;
					jvCol = 0;
					jvCardCount = 1;
				}
				
				jvTop = (126 * jvRow) + 5;
				jvLeft = (jvCol * 80) + 5;
				
				$('#sp_' + activeDiv + '_' + i).animate({
					position: 'relative',
					top: jvTop + 'px',
					left: jvLeft + 'px'
				}, 500, function(){
					objGame.getControls().removeAnimating();
				});
				
				if( card.getImageHorizontal() ){
					jvCol++;
					jvCardCount++;
				}
				jvCol++;
				jvCardCount++;
			}
		}
	}
	this.addCards = addCards;
	
	function addCardSubDiv( cardID ){
		cardSub = objGame.getCard( cardID );
		
		jv_img = '';
		if (cardSub.getImageHorizontal()) {
			jv_img = '<span name="sp_img_sub" id="sp_img_sub" class="card_hor_sub" onClick="';
		} else {
			jv_img = '<span name="sp_img_sub" id="sp_img_sub" class="card_sub" onClick="';
		}
		jv_img += "objGame.getControls().changePosition( 'opp', 'hand' );objGame.getControls().changePositionAnimate( 'objGame.getControls().cardDetailsSubDiv()' );";
		jv_img += '">';
		if( cardSub.getImageHorizontal() ){
			jv_img += '	' + cardSub.getImage('img_sub', 'card_hor_greyed_out');
			jv_img += '	<img name="imgb_sub" id="imgb_sub" class="card_hor_greyed_out_back" src="' + pathImages() + '/blank-horizontal.png" />';						
		} else {
			jv_img += '	' + cardSub.getImage('img_sub', 'card_greyed_out');
			jv_img += '	<img name="imgb_sub" id="imgb_sub" class="card_greyed_out_back" src="' + pathImages() + '/blank.png" />';
		}
		jv_img += '</span>';
		
		appendSubText( jv_img );
		
		$('#img_sub').css({
			'z-index': 50
		});
		$('#imgb_sub').css({
			'z-index': 49
		});
	}
	this.addCardSubDiv = addCardSubDiv;
	
	function cardDetailsSubDiv(){
		var spName = 'sp_img_sub';
		var imgName = 'img_sub';
		var imgBlank = 'imgb_sub';
		
		var position = $('#' + spName).position();
		
		var p = activeDiv.substr( 4, 2 );
		
		var img = '<img class="card" src="' + $('#' + imgName).attr( 'src' ) + '"';
		img += ' alt="' + $('#' + imgName).attr( 'alt' ) + '" onClick="';
		img += "objGame.getControls().changePosition( 'return' );objGame.getControls().changePositionAnimate('');";
		img += '" />';
		
		$('#bt_' + p + '_commit').hide();
		$('#bt_' + p + '_cancel').attr( "onClick", "objGame.getControls().changePosition( 'return' );objGame.getControls().changePositionAnimate('');" );
		
		$('#sp_img_' + p).html( img );
		$('#p_' + p + '_second_type').html( cardSub.getSecondTypeImages() );
		$('#p_' + p + '_name').html( cardSub.getName() );
		
		$('#sp_' + p + '_cost').html( cardSub.getCost() + cardSub.getCostImg() );
		
		$('#sp_' + p + '_damage').html( cardSub.getDamage() );
		$('#sp_' + p + '_effect').html( cardSub.getEffectText() );
		
		$('#' + objGame.getControls().detailsDiv()).css( 'z-index', '250' );
		$('#' + objGame.getControls().detailsDiv()).show();
	} 
	this.cardDetailsSubDiv = cardDetailsSubDiv;
	
	//Gets details on the selected card
	function cardDetails( spID ){
		if( animating ) return;
		animating = true;
		
		var spName = 'sp_' + activeDiv + '_' + spID;
		var imgName = 'img_' + activeDiv + '_' + spID;
		var imgBlank = 'imgb_' + activeDiv + '_' + spID;
		
		var position = $('#' + spName).position();
		
		hideDetailID = spID;
		hideDetailTop = position.top;
		hideDetailLeft = position.left;
		
		var p = activeDiv.substr( 4, 2 );
		
		var card = cards[spID][0];
		
		var img = '<img class="card" src="' + $('#' + imgName).attr( 'src' ) + '"'
		img += ' alt="' + $('#' + imgName).attr( 'alt' ) + '"'
		if( cards[spID][1] == '' || cards[spID][1] == undefined || cardsSelect ){
			img += ' onClick="objGame.getControls().hideCardDetails()" />';
			$('#bt_' + p + '_commit').hide();
		} else {
			img += ' onClick="' + cards[spID][1] + '" />';
			$('#bt_' + p + '_commit').attr( "onClick", cards[spID][1] );
			$('#bt_' + p + '_commit').show();
		}
		$('#bt_' + p + '_cancel').attr( "onClick", "objGame.getControls().hideCardDetails()" );
		
		$('#sp_img_' + p).html( img );
		$('#p_' + p + '_second_type').html( card.getSecondTypeImages() );
		$('#p_' + p + '_name').html( card.getName() );
		
		$('#sp_' + p + '_cost').html( card.getCost() + card.getCostImg() );
		
		$('#sp_' + p + '_damage').html( card.getDamage() );
		$('#sp_' + p + '_effect').html( card.getEffectText() );
		
		$('#' + spName).animate( {top: '2px', left: '2px' }
			, 500
			, function(){
				$('#' + objGame.getControls().detailsDiv()).css( 'z-index', '250' );
				$('#' + objGame.getControls().detailsDiv()).show();
				objGame.getControls().removeAnimating();
			}
		)
	}
	this.cardDetails = cardDetails;
	
	//returns a card to its former state after calling card Details
	function hideCardDetails( quick ){
		if( animating ) return;
		animating = true;
		
		if( ( hideDetailID == '' && hideDetailID != 0 ) || hideDetailID == undefined ){
			this.removeAnimating();
			return;
		} 
		if( quick == undefined ) quick = false;
		
		var spName = 'sp_' + activeDiv + '_' + hideDetailID;
		
		var topPx = hideDetailTop;
		var leftPx = hideDetailLeft;  
		
		hideDetailID = '';
		hideDetailTop = 0;
		hideDetailLeft = 0;
		
		$('#' + detailsDiv()).css( 'z-index', '-10' );
		$('#' + detailsDiv()).hide();
		
		if( quick ){
			$('#' + spName).css({top:  topPx + 'px', left: leftPx + 'px' });
			this.removeAnimating();
		} else {
			$('#' + spName).animate( {top:  topPx + 'px', left: leftPx + 'px' }
				, 500
				, function(){ 
					objGame.getControls().removeAnimating(); 
				}
			)	
		}
	}
	this.hideCardDetails = hideCardDetails;
	
	/* Sets up for users to select the provided quantity of cards */ 
	function selectCards( nextMethod, quantity, manditory ){
		if( animating ) return;
		animating = true;
		
		if( manditory == undefined )
			manditory = false;
		
		selectMandatory = manditory;
		selectQuantity = quantity;
		
		var cardTemp = [];
		
		for( var i = 0; i < cards.length; i++ ){
			var found = false;
			
			for( var j = 0; j < cardTemp.length; j++ ){
				if( cards[i][0].getID() == cardTemp[j][0].getID() ){
					found = true;
					break;
				}
			}
				
			if( !found ){
				cardTemp[cardTemp.length] = [ cards[i][0], 1 ];
			
				for( var j = i+1; j < cards.length; j++ ){
					if( cards[j][0].getID() == cards[i][0].getID() )
						cardTemp[ cardTemp.length-1 ][1]++;
				}
			}
		}
		
		cards.length = 0;
		cards = cardTemp;
		cardsSelect = true;
		
		for( var i = 0; i < cardTemp.length; i++ ){
			jv_img = '<span name="sp_' + activeDiv + '_' + i + '" id="sp_' + activeDiv + '_' + i + '" class="card_select">';
			jv_img += '	' + cardTemp[i][0].getImage( 'img_' + activeDiv + '_' + i, '',  'objGame.getControls().incrementSelect( \'sel_' + activeDiv + '_' + i + '\' )' );
			jv_img += '<br />';
			jv_img += '<span onClick="objGame.getControls().cardDetails( ' + i + ' );" class="select_details">details</span> '
			jv_img += '<select name="sel_' + activeDiv + '_' + i + '" id="sel_' + activeDiv + '_' + i + '" onChange="objGame.getControls().changeSelectCount()">';
			for( var j = 0; j <= cardTemp[i][1]; j++ ){
				jv_img += '	<option value="' + j + '">' + j + '</option>';	
			}
			jv_img += '</select>';
			jv_img += '</span>';
			
			$('#' + activeDiv + '_cards').append( jv_img );
			
			$('#sp_' + activeDiv + '_' + i).css({
				position: 'absolute',
				top: '5px',
				left: '450px'
			});
		}
		
		var jvTop = 0; 
		var jvLeft = 0;
		var jvRow = 0;
		var jvCol = 0;
		var jvCardCount = 1;
		
		var text = 'You ';
		if( manditory ){
			text += ' must select ';
		} else {
			text += ' may select up to ';
		}
		text += quantity + ' card'; 
		if( quantity > 1 )
			text += 's'
		text += ' from the card'; 
		if( cards.length > 1 )
			text += 's'
		text += ' below. You have selected <span name="sp_sel_total" id="sp_sel_total">0</span> card(s).';
		
		prependText( text );
		
		for( var i = 0; i < cardTemp.length; i++ ){
			if( jvCardCount % 12 == 0 ){
				jvRow++;
				jvCol = 0;
				jvCardCount = 1;
			}
			jvTop = ( 150 * jvRow ) + 5;
			jvLeft = ( jvCol * 80 ) + 5;
			jvCol++;
			
			$('#sp_' + activeDiv + '_' + i).animate( 
				{ position: 'relative'
					, top: jvTop + 'px'
					, left: jvLeft + 'px'
				}
				, 500
				, function(){ objGame.getControls().removeAnimating(); }
						 
			);
			
			jvCardCount++;
		}
		
		jvTop = ( 150 * ( jvRow + 1 ) ) + 5;
		
		var commitButton = '<button name="bt_select_commit" id="bt_select_commit" onClick="' + nextMethod + '">Select Cards</button>'
		$('#' + activeDiv + '_cards').append( commitButton );
		
		$('#bt_select_commit').css({
			position: 'relative'
			, top: jvTop + 'px'
			, left: '5px'
		})
		if( selectMandatory ){
			$('#bt_select_commit').attr({ 'disabled': 'true' })
		}
		
	}
	this.selectCards = selectCards;
	
	function incrementSelect( id ){
		var nextIndex = $('#' + id).prop( 'selectedIndex' ) + 1;
		
		if( nextIndex >= $('#' + id + ' option').length )
			nextIndex = 0;
			
		$('#' + id).prop( 'selectedIndex', nextIndex );
		
		changeSelectCount();
	}
	this.incrementSelect = incrementSelect;
	
	function changeSelectCount(){
		setSelectCount( 0 );
		selected.length = 0;
		
		$('select[name^="sel_' + activeDiv + '_"]').each(function(){
			objGame.getControls().addSelectCount( $(this).val() );
			
			var name = $(this).attr( 'name' );
			var nameStart = 'sel_' + activeDiv + '_';
			var cardIndex = name.substr( nameStart.length );
			
			if( parseInt( $(this).val() ) != 0 ){
				selected = [ cards[cardIndex][0], parseInt( $(this).val() ) ]
			}
		});
		
		$('#sp_sel_total').html( selectCount );
		
		if( selectMandatory && selectCount != selectQuantity ){
			$('#bt_select_commit').attr({ 'disabled': 'true' });
		} else if( !selectMandatory && selectCount > selectQuantity ) {
			$('#bt_select_commit').attr({ 'disabled': 'true' });
		} else {
			$('#bt_select_commit').removeAttr( 'disabled' );
		}
	}
	this.changeSelectCount = changeSelectCount;
	
	function setSelectCount( value ){
		selectCount = parseInt( value );
	}
	
	function addSelectCount( value ){
		selectCount += parseInt( value );
	}
	this.addSelectCount = addSelectCount;
	
	function resetCardArray(){
		cards.length = 0;
		selected.length = 0;
		cardsSelect = false;
		selectCount = 0;
		selectMandatory = false;
		selectQuantity = 0
			
		cardSub = undefined; 
	}
	this.resetCardArray = resetCardArray;
	
	function addCardToArray( card, nextMethod ){
		cards[cards.length] = [card, nextMethod];
	}
	this.addCardToArray = addCardToArray;
	
	function appendText( inText ){
		var temp = $('#' + activeDiv + '_text').html();
		
		$('#' + activeDiv + '_text').html( temp + inText );
	}
	this.appendText = appendText;
	
	function prependText( inText ){
		var temp = $('#' + activeDiv + '_text').html();
		
		$('#' + activeDiv + '_text').html( inText + temp );
	}
	this.prependText = prependText;
	
	function appendSubText( inText ){
		var temp = $('#' + subDiv).html();
		
		$('#' + subDiv).html( temp + inText );
	}
	this.appendSubText = appendSubText;
	
	function prependSubText( inText ){
		var temp = $('#' + subDiv).html();
		
		$('#' + subDiv).html( inText + temp );
	}
	this.prependSubText = prependSubText;
	
	function expandCostBox( boxID ){
		if( animating ) return;
		
		var toggle = true;
		var expandUp = false;
		
		//Opp Containers
		if( boxID == 'sp_opp_momentum_container' ){
			toggle = oppMomentumToggle
			oppMomentumToggle = !oppMomentumToggle;
		}
		
		if( boxID == 'sp_opp_mp_container' ){
			toggle = oppMPToggle
			oppMPToggle = !oppMPToggle;
		}
		
		if( boxID == 'sp_opp_gold_container' ){
			toggle = oppGoldToggle
			oppGoldToggle = !oppGoldToggle;
		}
		
		if( boxID == 'sp_opp_gods_container' ){
			toggle = oppGodsToggle
			oppGodsToggle = !oppGodsToggle;
		}
		
		//Player Containers
		if( boxID == 'sp_player_momentum_container' ){
			toggle = playerMomentumToggle
			playerMomentumToggle = !playerMomentumToggle;
			
			if( position == 'opp' || this.playerMomentumExpandUp ){
				expandUp = true;
				if( toggle ) this.playerMomentumExpandUp = false;
			}
		}
		
		if( boxID == 'sp_player_mp_container' ){
			toggle = playerMPToggle
			playerMPToggle = !playerMPToggle;
			if( position == 'opp' ) expandUp = true;
			
			if( position == 'opp' || this.playerMPExpandUp ){
				expandUp = true;
				if( toggle ) this.playerMPExpandUp = false;
			}
		}
		
		if( boxID == 'sp_player_gold_container' ){
			toggle = playerGoldToggle
			playerGoldToggle = !playerGoldToggle;
			if( position == 'opp' ) expandUp = true;
			
			if( position == 'opp' || this.playerGoldExpandUp ){
				expandUp = true;
				if( toggle ) this.playerGoldExpandUp = false;
			}
		}
		
		if( boxID == 'sp_player_gods_container' ){
			toggle = playerGodsToggle
			playerGodsToggle = !playerGodsToggle;
			if( position == 'opp' ) expandUp = true;
			
			if( position == 'opp' || this.playerGodsExpandUp ){
				expandUp = true;
				if( toggle ) this.playerGodsExpandUp = false;
			}
		}
		
		animating = true;
		
		if( toggle ){
			if (!expandUp) {
				$('#' + boxID).animate({
					width: '40px',
					height: '20px'
				}, 500
				, function(){
					$('#' + boxID).css('z-index', 0);
					objGame.getControls().removeAnimating();
				})
			} else {
				var position = $('#' + boxID).position();
				
				$('#' + boxID).animate({
					top: position.top + 120 + 'px',
					left: position.left + 100 + 'px',
					width: '40px',
					height: '20px'
				}, 500
				, function(){
					$('#' + boxID).css('z-index', 0);
					objGame.getControls().removeAnimating();
				}) 	
			}
		} else {
			if (!expandUp) {
				$('#' + boxID).css({
					'z-index': '550'
				});
				$('#' + boxID).animate({
					width: '140px',
					height: '140px'
				}, 500
				, function(){
					objGame.getControls().removeAnimating();
				})
			} else {
				var position = $('#' + boxID).position();
				
				$('#' + boxID).css({
					'z-index': '550'
				});
				$('#' + boxID).animate({
					top: position.top - 120 + 'px',
					left: position.left - 100 + 'px',
					width: '140px',
					height: '140px'
				}
				, 500
				, function(){
					objGame.getControls().removeAnimating();
				})
			}
		}
	}
	this.expandCostBox = expandCostBox;
	
	function toggleIcons( newPosition, showLocation ){
		//Opp Icons
		if( newPosition == 'opp' && showLocation == 'field' ){
			$('#img_opp_field').toggle();
			$('#div_opp_field').toggle();
			$('#img_opp_field_return').toggle();
		} else {
			$('#img_opp_field').show();
			$('#div_opp_field').show();
			$('#img_opp_field_return').hide();
		}
		
		if( newPosition == 'opp' && showLocation == 'discard' ){
			$('#img_opp_discard').toggle();
			$('#div_opp_discard').toggle();
			$('#img_opp_discard_return').toggle();
		} else {
			$('#img_opp_discard').show();
			$('#div_opp_discard').show();
			$('#img_opp_discard_return').hide();
		}
		
		if( newPosition == 'opp' && showLocation == 'removed' ){
			$('#img_opp_removed').toggle();
			$('#div_opp_removed').toggle();
			$('#img_opp_removed_return').toggle();
		} else {
			$('#img_opp_removed').show();
			$('#div_opp_removed').show();
			$('#img_opp_removed_return').hide();
		}
		
		//Player Icons
		if( newPosition == 'player' && showLocation == 'hand' ){
			$('#img_player_hand').toggle();
			$('#div_player_hand').toggle();
			$('#img_player_hand_return').toggle();
		} else {
			$('#img_player_hand').show();
			$('#div_player_hand').show();
			$('#img_player_hand_return').hide();
		}
		
		if( newPosition == 'player' && showLocation == 'field' ){
			$('#img_player_field').toggle();
			$('#div_player_field').toggle();
			$('#img_player_field_return').toggle();
		} else {
			$('#img_player_field').show();
			$('#div_player_field').show();
			$('#img_player_field_return').hide();
		}
		
		if( newPosition == 'player' && showLocation == 'discard' ){
			$('#img_player_discard').toggle();
			$('#div_player_discard').toggle();
			$('#img_player_discard_return').toggle();
		} else {
			$('#img_player_discard').show();
			$('#div_player_discard').show();
			$('#img_player_discard_return').hide();
		}
		
		if( newPosition == 'player' && showLocation == 'removed' ){
			$('#img_player_removed').toggle();
			$('#div_player_removed').toggle();
			$('#img_player_removed_return').toggle();
		} else {
			$('#img_player_removed').show();
			$('#div_player_removed').show();
			$('#img_player_removed_return').hide();
		}
	}
	this.toggleIcons = toggleIcons;
	
	function clearDivs( div ){
		if(div != undefined && ( div == 'div_p1' || div == 'div_p2'
		|| div == 'div_p2_sub' || div == 'div_p3' 
		|| div == 'div_p1_non_game' || div == 'div_p3_non_game' )) {
			$('#' + div + '_text').html('');
			$('#' + div + '_cards').html('');
		} else {
			$('#div_p1_text').html('');
			$('#div_p1_cards').html('');
			
			$('#div_p1_non_game_text').html('');
			$('#div_p1_non_game_cards').html('');
			
			$('#div_p2_text').html('');
			$('#div_p2_cards').html('');
			
			$('#div_p2_sub').html('');
			
			$('#div_p3_text').html('');
			$('#div_p3_cards').html('');
			
			$('#div_p3_non_game_text').html('');
			$('#div_p3_non_game_cards').html('');
		}
	}
	this.clearDivs = clearDivs;
	
	function hideDivs(){
		$('#div_p1').css({ 'z-index': -10 });
		$('#div_p2').css({ 'z-index': -10 });
		$('#div_p2_sub').css({ 'z-index': -10 });
		$('#div_p3').css({ 'z-index': -10 });
		$('#div_p1_non_game').css({
			'z-index': -10,
			'background-color': blank,
			'color': defaultFont
		});
		$('#div_p3_non_game').css({
			'z-index': -10,
			'background-color': blank,
			'color': defaultFont
		});
		$('#div_p1_card_details').css({
			'z-index': -10,
			'background-color': blank,
			'color': defaultFont
		});
		$('#div_p1_card_details').hide();
		this.hideCardDetails( true );
		$('#div_p2_card_details').css({ 'z-index': -10 });
		$('#div_p2_card_details').hide();
		this.hideCardDetails( true );
		$('#div_p3_card_details').css({
			'z-index': -10,
			'background-color': blank,
			'color': defaultFont
		});
		$('#div_p3_card_details').hide();
		this.hideCardDetails( true );
	}
	this.hideDivs = hideDivs;
}