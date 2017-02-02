jQuery(document).ready(function($) {
	var lastEleOnRow;
	var thisEle;
	var thisEleWidth;

		//$.fn.isPicExpanded = function() {
		//	return this.each(function() {
		//		$(this).hide();
		//	});
		//}

		function isPicExpanded(picSelector) {
			var otherEleWidths = [];

			$(picSelector).each(function(index) { //run through each div.hovereffect1 (i.e. each picture)
				if (($(this).width()) > thisEleWidth) {//check if one has a width greater than the width of the clicked div(thisEle)
					otherEleWidths = [index, $(this).width()];//if it has then store its index no along with its width
					$('#he' + index + ' i.inner-i').click();//create its div id and trigger a click on its i.inner-i (the 'X') element
				}
			});
		}

		function isPicLastOnRow(containerId) {
			var windowMargin = ($(window).width() - $(containerId).width())/2;
			var thisElePositionLeft = (thisEle.position().left) - windowMargin;

			if (($(containerId).width()-thisElePositionLeft) < (thisEleWidth + 3)) {
				lastEleOnRow = true;
			} else {
				lastEleOnRow = false;
			}
		}

		// if user resizes window close all open(expanded) pictures.
		//if (window.matchMedia('(max-width: 819px)').matches){
		//	$('#he0 i.inner-i').click();
		//	$('#he3 i.inner-i').click();
		//	$('#he5 i.inner-i').click();
		//}
		    
	$('.pics-cont').on('click.slideout', '.hovereffect1', function(event) {

		if (window.matchMedia('(max-width: 819px)').matches){

		} else {

			event.preventDefault();
			thisEle = $(this);
			thisEleWidth = thisEle.width();
			//var otherEleWidths = [];
			//var thisElePosition = thisEle.position();
			//var windowWidth = $(window).width(); 
			//var contWidth = $('.pics-cont').width();
			//var windowMargin = ($(window).width() - $('.pics-cont').width())/2;
			//var thisElePositionLeft = (thisEle.position().left) - windowMargin;
			//console.log(thisElePositionLeft)

			// check to see if any div (picture) is already open (in expanded state)
			//$('.hovereffect1').each(function(index) { //run through each div.hovereffect1 (i.e. each picture)
			//	if (($(this).width()) > thisEleWidth) {//check if one has a width greater than the width of the clicked div(thisEle)
			//		otherEleWidths = [index, $(this).width()];//if it has then store its index no along with its width
			//		$('#he' + index + ' i.inner-i').click();//create its div id and trigger a click on its i.inner-i (the 'X') element
			//	}
			//});

			// check to see if any div (picture) is already open (in expanded state)
			//$('.hovereffect1').each(function() { //run through each div.hovereffect1 (i.e. each picture)
			//	if ($(this).hasClass('open')) {//check if one has a class of open
			//		$(this).children('div').children('i.inner-i').click();//if it does then trigger a click on its i.inner-i (the 'X') element
			//	}
			//});

			isPicExpanded('.hovereffect1');

			if (thisEle.hasClass('open')) {
				event.preventDefault();
				event.stopPropagation();
				return;
				
			} else {
				thisEle.addClass('open')	
				thisEle.children('a').addClass('hidden');// hide the <a> tags contents

				//read the value of clicked div's css flex property
				var flexGrow = thisEle.css('flex').split(" ")[2];
				var num = parseFloat(flexGrow);
				var newFlexGrow = num*2 +'%';

				//double the size of the clicked div (picture)
				thisEle.css({ 
					flex: '1 0 ' + newFlexGrow
				}); 

				// call function to see if clicked div is right most div on the row
				isPicLastOnRow('.pics-cont');

				if (lastEleOnRow) {
					//if it is then shrink the clicked divs left sibling
					thisEle.prev().css('flex', '1 0 0%');
				} else {
					// if it isnt then shrink the clicked divs right sibling
					thisEle.next().css('flex', '1 0 0%'); 
				}

				thisEle.children('div.inner').css({display: 'block', opacity: 0}); //display the contents of div.inner
				thisEle.children('div.inner').fadeTo(1000, 1);// fade them in
			}
		}
	});


	// function to return the expanded div to its previous(unexpanded) state
	$('.pics-cont').on('click.slidereturn','i.inner-i', function(event){
		event.preventDefault();
		event.stopPropagation();
		var thisElem = $(this);
		//hide div.inner (text & sub text)
		thisElem.parent().css('display', 'none');

		//read the value of clicked div's css flex property
		var flexGrow = thisElem.parent().parent().css('flex').split(" ")[2];
		var num = parseFloat(flexGrow);
		var newFlexGrow = num/2 +'%';

		//return expanded div to previous state i.e. 25% width
		thisElem.parent().parent().css({
			flex: '1 0 ' + newFlexGrow
		});
		// check to see if clicked div is right most div on the row
		if (lastEleOnRow) {
			// if it is then return its left sibling to previous state i.e. 25% width
			thisElem.parent().parent().prev().css({
				flex: '1 0 ' + newFlexGrow
			});
		} else {
			// if it isnt then return its right sibling to previous state i.e. 25% width
			thisElem.parent().parent().next().css({
				flex: '1 0 ' + newFlexGrow
			});
		}
		//display previously hidden <a> tag
		thisElem.parent().siblings('a').removeClass('hidden');
		thisElem.parent().parent().removeClass('open');
	});
	
});