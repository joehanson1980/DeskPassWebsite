jQuery(document).ready(function($) {
	var lastEleOnRow;

//--------------------- FUNCTION DECLARATIONS ---------------------------------

	function isPicExpanded(picSelector, elementWidth) {
		var otherEleWidths = [];

		$(picSelector).each(function(index) { //run through each div.hovereffect1 (i.e. each picture)
			if (($(this).width()) > elementWidth) {//check if one has a width greater than the width of the clicked div(thisEle)
				otherEleWidths = [index, $(this).width()];//if it has then store its index no along with its width
				$('#he' + index + ' i.inner-i').click();//create its div id and trigger a click on its i.inner-i (the 'X') element
			}
		});
	}
//-----------------------------------------------------------------

	function isPicLastOnRow(containerId, element, elementWidth) {
		var windowMargin = ($(window).width() - $(containerId).width())/2;
		var thisElePosition = element.position();
		var thisElePositionLeft = thisElePosition.left - windowMargin;
		

		if (($(containerId).width()-thisElePositionLeft) < (elementWidth + 3)) {
			lastEleOnRow = true;
			return lastEleOnRow;
		} else {
			lastEleOnRow = false;
			return lastEleOnRow;
		}
	}
//-------------------------------------------------------------------

	function newFlexGrowValue(multiplyOperand, element) {

		//read the value of clicked div's css flex property
		var flexGrow = element.css('flex').split(" ")[2];
		var num = parseFloat(flexGrow);
		var newFlexGrow = num*multiplyOperand + '%';
		return newFlexGrow;
	}
//--------------------------------------------------------------------

	function slideOut(element) {

	}
//---------------------------------------------------------------------

	function slideReturn(element) {
		var elementPP = element.parent().parent();

		//hide div.inner (text & sub text)
		element
			.parent()
				.css('display', 'none')
		//return expanded div to previous state i.e. half of current width
			.parent()
				.css('flex', '1 0 ' + newFlexGrowValue(0.5, elementPP));
		// check to see if clicked div is right most div on the row
		if (lastEleOnRow) {
			// if it is then return its left sibling to previous state i.e. same width as elementPP
			elementPP.prev().css('flex', '1 0 ' + newFlexGrowValue(0.5, elementPP));
		} else {
			// if it isnt then return its right sibling to previous state i.e. same width as elementPP
			elementPP.next().css('flex', '1 0 ' + newFlexGrowValue(0.5, elementPP));
		}
		//display previously hidden <a> tag
		element
			.parent()
				.siblings('a')
					.removeClass('hidden')
	}
//---------------------------------------------------------------------

//---------------------- END OF FUNCTION DECLARATIONS -----------------------------------------------


	//--------------------SLIDE OUT------------------------------------

	// check to see if viewport is less than 820px if so then 
		// proceed with default behaviour
		if (window.matchMedia('(max-width: 819px)').matches){	

		} else {
	
			// watch out for any clicks on .hovereffect1(pictures) class divs
			// if clicked, do the following..   
			$('.pics-cont').on('click.slideout', '.hovereffect1', function(event) {				

					// if viewport is greater than 819px then proceed with the following...
					event.preventDefault();
					var thisEle = $(this);
					var thisEleWidth = thisEle.width();

					//check to see if any div(picture) is already in expanded state
					// if so then trigger click event to close it 
					isPicExpanded('.hovereffect1', thisEleWidth);

					// if the div being clicked is already open then disable mouse 
					// clicks on all elements in the opened div other than the <i> tag.
					if (thisEle.children('a').hasClass('hidden')) {
						event.preventDefault();
						event.stopPropagation();
						
					} else {

					// if the div being clicked is not already open then proceed to open it
					thisEle
					// hide the <a> tags contents
					.children('a')
						.addClass('hidden')
					.end()
					//call function to double the size of the clicked div (picture)
						.css('flex', '1 0 ' + newFlexGrowValue(2, thisEle))
					
					// call function to see if clicked div is right most div on the row
					if (isPicLastOnRow('.pics-cont', thisEle, thisEleWidth)) {
						//if it is then shrink the clicked divs left sibling
						thisEle.prev().css('flex', '1 0 0%')
					} else {
						// if it isnt then shrink the clicked divs right sibling
						thisEle.next().css('flex', '1 0 0%')
					}

					thisEle
						.find('div.inner')
							.css({display: 'block', opacity: 0}) //display the contents of div.inner
							.fadeTo(1000, 1);// fade them in
				}
					
			});
		}

    //----------------------------- END OF SLIDE OUT -------------------------------
    
    //----------------------------- SLIDE RETURN ---------------------------------

	// function to return the expanded div to its previous(unexpanded) state
	$('.pics-cont').on('click', 'i.inner-i', function(event) {
		var thisElem = $(this)
		event.preventDefault();
		event.stopPropagation();
		slideReturn(thisElem);
	});
});