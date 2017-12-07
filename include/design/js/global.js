$(document).ready(function (){
	$("img.lazy").lazyload();
	
	var counter = 0;
	$("#games-arrow-left").click(function () {
		if(counter > 0) {
			$("#container").animate({marginLeft: '+=920px'}, 1000);
			counter--;						
		}
	});
	
	$("#games-arrow-right").click(function () {
		if(counter < 4) {
			$("#container").animate({marginLeft: '-=920px'}, 1000);
			counter++;
		}
	});
	
	$("#eu_button").click(function () {
        var date = new Date();
        date.setTime(date.getTime()+(365*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
		
		document.cookie = "eu_cookie=true; expires="+expires+"; path=/";
		location.reload();
	});
	
	$('.chosen-select').chosen({
		search_contains: true
	});
	
	$('.blvl').click(function() {
		if($(this).attr('lvl') == 0) {
			if($(this).attr('state') == 'hide') {
				$(this).text('Show');
				$(this).attr('state', 'show');
				hideZero(allappids, badgelist);
			}
			else {
				$(this).text('Hide');
				$(this).attr('state', 'hide');
				showZero(allappids, badgelist);
			}
		}
		else {
			if($(this).attr('state') == 'hide') {
				$(this).text('Show');
				$(this).attr('state', 'show');
				hidelvl($(this).attr('lvl'), badgelist);
			}
			else {
				$(this).text('Hide');
				$(this).attr('state', 'hide');
				showlvl($(this).attr('lvl'), badgelist);
			}
		}
	});
	
	$('.bcolor').click(function() {
		if($(this).attr('state') == 'hide') {
			$(this).text('Show');
			$(this).attr('state', 'show');
			hideColorBadgeList(badgelist);
		}
		else {
			$(this).text('Hide');
			$(this).attr('state', 'hide');
			colorBadgeList(badgelist);
		}
	});
	
	$('.bfoil').click(function() {
		if($(this).attr('state') == 'hide') {
			$(this).text('Show');
			$(this).attr('state', 'show');
			hideFoil(badgelist);
		}
		else {
			$(this).text('Hide');
			$(this).attr('state', 'hide');
			showFoil(badgelist);
		}
	});
	
	$('.bfcolor').click(function() {
		if($(this).attr('state') == 'hide') {
			$(this).text('Show');
			$(this).attr('state', 'show');
			hideColorFoilBadgeList(badgelist);
		}
		else {
			$(this).text('Hide');
			$(this).attr('state', 'hide');
			colorFoilBadgeList(badgelist);
		}
	});
	
	$('#randombg').click(function() {
		randomBackground(backgroundlist);
	});
	
	$('#randombg2').click(function() {
		randomBackground2();
	});
	
	$('#backgroundslider').on('click', '.bgbutton', function() {
		changeBackground($(this).attr('bg-hash'), $(this).attr('bg-id'));
	});
	
	$('#ddlink').change(function() {
		window.location = this.value;
	});
	
	$('#close-note').click(function() {
		$('#notification').hide();
        var date = new Date();
        date.setTime(date.getTime()+(365*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
		document.cookie = "note="+$(this).data('id')+"; expires="+expires+"; path=/";
	});
	
	$('#nocards').click(function() {
		if($('#nocards').data('set') == 1) {
			$('#nocards').removeClass('underline').data('set', 0);
			$('#inventorylist > tbody > tr').each(function() {
				$(this).show();
			});
		}
		else {
			$('#nocards').addClass('underline').data('set', 1);
			$('#lastcards').removeClass('underline').data('set', 0);
			$('#normalcards').removeClass('underline').data('set', 0);
					
			
			$('#inventorylist > tbody > tr').each(function() {
				if($(this).data('stock') == 0) {
					$(this).show();
				}
				else {
					$(this).hide();
				}
			});
		}
		
		$('#inventorylist').trigger('update', [ true ]);
		updateHeight();
	});
	
	$('#lastcards').click(function() {
		if($('#lastcards').data('set') == 1) {
			$('#lastcards').removeClass('underline').data('set', 0);
			$('#inventorylist > tbody > tr').each(function() {
				$(this).show();
			});
		}
		else {
			$('#nocards').removeClass('underline').data('set', 0);
			$('#lastcards').addClass('underline').data('set', 1);
			$('#normalcards').removeClass('underline').data('set', 0);
			
			$('#inventorylist > tbody > tr').each(function() {
				if($(this).data('fee') == 1) {
					$(this).show();
				}
				else {
					$(this).hide();
				}
			});
		}
		$('#inventorylist').trigger('update', [ true ]);
		updateHeight();
	});
	
	$('#normalcards').click(function() {
		if($('#normalcards').data('set') == 1) {
			$('#normalcards').removeClass('underline').data('set', 0);
			$('#inventorylist > tbody > tr').each(function() {
				$(this).show();
			});
		}
		else {
			$('#nocards').removeClass('underline').data('set', 0);
			$('#lastcards').removeClass('underline').data('set', 0);
			$('#normalcards').addClass('underline').data('set', 1);
			
			$('#inventorylist > tbody > tr').each(function() {
				if($(this).data('fee') > 1) {
					$(this).show();
				}
				else {
					$(this).hide();
				}
			});
		}
		$('#inventorylist').trigger('update', [ true ]);
		updateHeight();
	});
	
	
	$('#nocardsUser').click(function() {
		if($('#nocardsUser').data('set') == 1) {
			$('#nocardsUser').removeClass('underline').data('set', 0);
			$('#inventorylist > tbody > tr').each(function() {
				if($(this).data('user') == 1) {
					$(this).show();
				}
			});
		}
		else {
			$('#nocardsUser').addClass('underline').data('set', 1);
			$('#lastcardsUser').removeClass('underline').data('set', 0);
			$('#normalcardsUser').removeClass('underline').data('set', 0);
					
			
			$('#inventorylist > tbody > tr').each(function() {
				if($(this).data('stock') == 0) {
					if($(this).data('user') == 1) {
						$(this).show();
					}
				}
				else {
					$(this).hide();
				}
			});
		}
		
		$('#inventorylist').trigger('update', [ true ]);
		updateHeight();
	});
	
	$('#lastcardsUser').click(function() {
		if($('#lastcardsUser').data('set') == 1) {
			$('#lastcardsUser').removeClass('underline').data('set', 0);
			$('#inventorylist > tbody > tr').each(function() {
				if($(this).data('user') == 1) {
					$(this).show();
				}
			});
		}
		else {
			$('#nocardsUser').removeClass('underline').data('set', 0);
			$('#lastcardsUser').addClass('underline').data('set', 1);
			$('#normalcardsUser').removeClass('underline').data('set', 0);
			
			$('#inventorylist > tbody > tr').each(function() {
				if($(this).data('fee') == 1) {
					if($(this).data('user') == 1) {
						$(this).show();
					}
				}
				else {
					$(this).hide();
				}
			});
		}
		$('#inventorylist').trigger('update', [ true ]);
		updateHeight();
	});
	
	$('#normalcardsUser').click(function() {
		if($('#normalcardsUser').data('set') == 1) {
			$('#normalcardsUser').removeClass('underline').data('set', 0);
			$('#inventorylist > tbody > tr').each(function() {
				if($(this).data('user') == 1) {
					$(this).show();
				}
			});
		}
		else {
			$('#nocardsUser').removeClass('underline').data('set', 0);
			$('#lastcardsUser').removeClass('underline').data('set', 0);
			$('#normalcardsUser').addClass('underline').data('set', 1);
			
			$('#inventorylist > tbody > tr').each(function() {
				if($(this).data('fee') > 1) {
					if($(this).data('user') == 1) {
						$(this).show();
					}
				}
				else {
					$(this).hide();
				}
			});
		}
		$('#inventorylist').trigger('update', [ true ]);
		updateHeight();
	});
	
	$('#filter_games_ownership').click(function() {
		if($(this).text() == 'Show my games') {
			$(this).text('Show all games');
			$('.gameRow').each(function() {
				if(!$(this).hasClass('uncommon')) {
					$(this).hide();
				}
			});
			$('#missingcontent').trigger('update', [ true ]);
		}
		else {
			$(this).text('Show my games');
			$('.gameRow').each(function() {
				if(!$(this).hasClass('uncommon')) {
					$(this).show();
				}
			});
			$('#missingcontent').trigger('update', [ true ]);

		}
	});
	
	$('#filter_games_f2p').click(function() {
		if($(this).text() == 'Hide F2P games') {
			$(this).text('Show F2P games');
			$('.free2play').each(function() {
				$(this).hide();
			});
			$('#missingcontent').trigger('update', [ true ]);
		}
		else {
			$(this).text('Hide F2P games');
			$('.free2play').each(function() {
				$(this).show();
			});
			$('#missingcontent').trigger('update', [ true ]);
		}
	});
	
	initAdvertWhitelist();
});

function readTableFilter(subsite) {
	$('input[type=checkbox]').each(function () {
		if(localStorage[subsite + '_' + $(this).attr('id')] != undefined) {
			$(this).prop('checked', JSON.parse(localStorage[subsite + '_' + $(this).attr('id')]));
		}
	});	
}

function writeTableFilter(subsite) {
	$('input[type=checkbox]').each(function () {
		localStorage[subsite + '_' + $(this).attr('id')] = $(this).is(':checked');
	});
}

function changeBackground(image, bgid) {
	$('#wallpaper').removeClass('hidden');
	$('#back_'+curretbgid).removeClass('active');
	curretbgid = parseInt(bgid);
	$('#back_'+curretbgid).addClass('active');
	$('#wallpaper').attr('href','http://steamcommunity-a.akamaihd.net/economy/image/'+image);
	$('#steambackground').css("background-image", "url('http://steamcommunity-a.akamaihd.net/economy/image/"+image+"')");
	$('#steambackground2').css("background-image", "url('http://steamcommunity-a.akamaihd.net/economy/image/"+image+"')");
	updateURL('Background', 'backgroundviewer-'+curretbgid);
}

function changeBackgroundSlider(appid, data) {
	$('#gotosc').removeClass('hidden');
	$('#gotosc').attr('href','index.php?gamepage-appid-'+appid);
	$('#backgroundslider').html('');
	$.each(data[appid], function(backgroundid, backgrounddata) {
		$.each(backgrounddata, function(name, image) {
			$('#backgroundslider').append('<div id="back'+backgroundid+'" class="background-element bgbutton" bg-id="'+backgroundid.substr(1)+'" bg-hash="'+image+'"><img src="http://steamcommunity-a.akamaihd.net/economy/image/'+image+'/160x100f"><span class="name">'+name+'</span></div>');
		});
	});
}

function changeBackgroundSlider2(appid) {
	$('#gotosc').removeClass('hidden');
	$('#gotosc').attr('href','index.php?gamepage-appid-'+appid);
	$('#backgroundslider').load('/include/pages/cache/backgroundviewer/'+appid+'.html', function(response, status, xhr) {
        if(status == "error") {
            $('#backgroundslider').html('<div class="center">Error loading backgrounds.</div>')
        }
		else if(curretbgid != 0) {
			$('#back_'+curretbgid).trigger("click");
		}
    });
}

function randomBackground(data) {
	var options = $("#selectBackgroundViewer").find('option');
	var random = options[Math.floor(Math.random() * options.length)].value;
	$("#selectBackgroundViewer").val(random).trigger("chosen:updated");
	$('#backgrounds-content').html('');	
	$('#gotosc').removeClass('hidden');
	$('#gotosc').attr('href','index.php?gamepage-appid-'+random);
	var bgCount = 0;
	$('#backgroundslider').html('');
	$.each(data[random], function(backgroundid, backgrounddata) {
		$.each(backgrounddata, function(name, image) {
			bgCount++;
			$('#backgroundslider').append('<div id="back'+backgroundid+'" class="background-element bgbutton" bg-id="'+backgroundid.substr(1)+'" bg-hash="'+image+'"><img src="http://steamcommunity-a.akamaihd.net/economy/image/'+image+'/160x100f"><span class="name">'+name+'</span></div>');
		});
	});
	var random2 = Math.floor(Math.random() * bgCount);
	$.each(data[random], function(backgroundid, backgrounddata) {
		if(backgroundid == Object.keys(data[random])[random2]) {
			$.each(backgrounddata, function(name, image) {
				changeBackground(image, backgroundid.substr(1));
			});
		}
	});
}

function randomBackground2() {
	var options = $("#selectBackgroundViewer").find('option');
	var random = options[Math.floor(Math.random() * options.length)].value;
	$('#gotosc').removeClass('hidden');
	$('#gotosc').attr('href','index.php?gamepage-appid-'+random);
	$("#selectBackgroundViewer").val(random).trigger("chosen:updated");
	$('#backgroundslider').load('/include/pages/cache/backgroundviewer/'+random+'.html', function(response, status, xhr) {
        if(status == "error") {
            $('#backgroundslider').html('<div class="center">Error loading backgrounds.</div>')
        }
		else {
			$(".background-element:eq("+Math.floor(Math.random() * $('.background-element').length)+")").trigger("click");
		}
    });
}

function setHomeBackgroundArtwork(url, appid) {
	$('#home-artwork').attr('href', 'index.php?gamepage-appid-'+appid);
	$('body').attr('id', 'home');
	$('body').css("background-image", "url('./include/design/img/site_bg.png'), url('"+url+"')");
}

function setHomeBackgroundArtwork2(url) {
	$('body').attr('id', 'home');
	$('body').css("background-image", "url('http://www.steamcardexchange.net/include/design/img/site_bg.png'), url('"+url+"')");
}

function updateURL(name, url) {
	document.title = 'Steam Card Exchange :: '+name;
	window.history.replaceState(null, 'Steam Card Exchange :: '+name, '/index.php?'+url);
}

function setName(name) {
	document.title = 'Steam Card Exchange :: '+name;
}

function setName(name) {
	document.title = 'Steam Card Exchange :: '+name;
}

function loadPrices(gameprices) {
	$.each(gameprices, function(appid, price) {
		if(price > 50) {
			$('#price-'+appid).html('50c');
		}
		else {
			$('#price-'+appid).html(price + 'c');
		}
	});
}

function loadPrices2(gameprices, stocklist, user) {
	$.each(gameprices, function(appid, price) {
		if(user) {
			$('#appid-'+appid).data('user', '1');
			$('#appid-'+appid).show();
		}
		if(price > 50) {
			$('#price-'+appid).html('50c');
		}
		else {
			$('#price-'+appid).html(price + 'c');
		}
	});
	
	$.each(stocklist, function(appid, data) {
		$('#appid-'+appid).data('fee',data[4]);
		$('#appid-'+appid).data('stock',data[1]);
		$('#stock-'+appid).html(data[1]);
		if(data[4] == 1) {
			$('#status-'+appid).addClass('red');
		}
		else {
			$('#status-'+appid).addClass('green');
		}
		if(data[0] == data[2]) {
			$('#set-'+appid).html(data[3]+'x ('+data[2]+' of '+data[0]+' Cards)');
		}
		else {
			$('#set-'+appid).html('0x ('+data[2]+' of '+data[0]+' Cards)');
		}
	});
}

function loadPricesPublicWatchlist(gameprices) {
	$.each(gameprices, function(appid, price) {
		$('#appid-'+appid).data('user', '1');
		$('#appid-'+appid).show();
		$('#price-'+appid).html('$'+price);
	});
}

function BadgeListLVL(badgelist) {
	var worth = 0;
	$.each(badgelist, function(appid, level) {
		$('#lvl_'+appid).text(level);
		if(!isNaN(parseFloat($('#price_'+appid).text().substr(1)))) {
			worth = worth + parseFloat($('#price_'+appid).text().substr(1))*level;
		}
	});
	
	$('#bworth').text('Worth: $'+parseFloat(worth).toFixed(2));
}

function colorBadgeList(badgelist) {
	$.each(badgelist, function(appid, level) {
		switch(level) {
			case '1':
				$('#badge_'+appid).addClass('uncommon');
				break;
			case '2':
				$('#badge_'+appid).addClass('rare');
				break;
			case '3':
				$('#badge_'+appid).addClass('extraordinary');
				break;
			case '4':
				$('#badge_'+appid).addClass('precious');
				break;
			case '5':
				$('#badge_'+appid).addClass('unparalleled');
				break;
		}
	});
}

function hideColorBadgeList(badgelist) {
	$.each(badgelist, function(appid, level) {
		switch(level) {
			case '1':
				$('#badge_'+appid).removeClass('uncommon');
				break;
			case '2':
				$('#badge_'+appid).removeClass('rare');
				break;
			case '3':
				$('#badge_'+appid).removeClass('extraordinary');
				break;
			case '4':
				$('#badge_'+appid).removeClass('precious');
				break;
			case '5':
				$('#badge_'+appid).removeClass('unparalleled');
				break;
		}
	});
}

function showlvl(lvl, badgelist) {
	$.each(badgelist, function(appid, level) {
		if(level == lvl) {
			$('#badge_'+appid).show();
		}
	});
	$('#badgepricelist').trigger('update', [ true ]);
	updateHeight();
}

function hidelvl(lvl, badgelist) {
	$.each(badgelist, function(appid, level) {
		if(level == lvl) {
			$('#badge_'+appid).hide();
		}
	});
	$('#badgepricelist').trigger('update', [ true ]);
	updateHeight();
}

function hideZero(allappids, badgelist) {
	$.each(allappids, function(appid) {
		if(typeof badgelist[appid] == 'undefined') {
			$('#badge_'+appid).hide();
		}
	});
	$('#badgepricelist').trigger('update', [ true ]);
	updateHeight();
}

function showZero(allappids, badgelist) {
	$.each(allappids, function(appid) {
		if(typeof badgelist[appid] == 'undefined') {
			$('#badge_'+appid).show();
		}
	});
	$('#badgepricelist').trigger('update', [ true ]);
	updateHeight();
}

function showFoil(badgelist) {
	$.each(badgelist, function(appid, level) {
		if(level == 1) {
			$('#badge_'+appid).show();
		}
	});
	$('#badgepricelist').trigger('update', [ true ]);
	updateHeight();
}

function hideFoil(badgelist) {
	$.each(badgelist, function(appid, level) {
		if(level == 1) {
			$('#badge_'+appid).hide();
		}
	});
	$('#badgepricelist').trigger('update', [ true ]);
	updateHeight();
}

function FoilBadgeListLVL(badgelist) {
	var worth = 0;
	$.each(badgelist, function(appid, level) {
		$('#lvl_'+appid).text(level);
		if(!isNaN(parseFloat($('#price_'+appid).text().substr(1)))) {
			worth = worth + parseFloat($('#price_'+appid).text().substr(1));
		}
	});
	
	$('#bworth').text('Worth: $'+parseFloat(worth).toFixed(2));
}

function colorFoilBadgeList(badgelist) {
	$.each(badgelist, function(appid, level) {
		$('#badge_'+appid).addClass('unparalleled');
	});
}

function hideColorFoilBadgeList(badgelist) {
	$.each(badgelist, function(appid, level) {
		$('#badge_'+appid).removeClass('unparalleled');
	});
}

function updateTime() {
	var timenow = Math.round(new Date().getTime() / 1000);
	$('.time').each(function() {
		var minutes = Math.ceil((timenow-$(this).attr('timestamp'))/60);
		if(minutes < 0) {
			$(this).text('0min ago');
		}
		else {
			$(this).text(minutes+'min ago');
		}
	});
	$('#badgepricelist').trigger('update', [ true ]);
}

function setAdvertTop() {
	var pcads = document.createElement('script');
	pcads.type = 'text/javascript';
	pcads.async = true;
	pcads.src = '//delivery.e.switchadhub.com/adserver/sat.js';
	$("head").append(pcads);

	$('.advertisement-top').html('<div id="switch_placeholder_a472bb4174303e9d95285bc1d999f58f" class="switch_placeholder"></div>');

	(__scads = window.__scads || []).push({"z":7025,"targetId":"switch_placeholder_a472bb4174303e9d95285bc1d999f58f","domain":"delivery.e.switchadhub.com","width":"0","height":"0"});
}

function setAdvert() {
	if(window.useDefaultAds === undefined) {
		var gads = document.createElement('script');
		gads.type = 'text/javascript';
		gads.async = true;
		gads.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
		$("head").append(gads);
		$('.advertisement-bottom').html('<!-- Werbung Text --><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2329620510869459" data-ad-slot="1308704722" data-ad-format="auto"></ins>');

		(adsbygoogle = window.adsbygoogle || []).push({});
	}
	else {
		var pcads = document.createElement('script');
		pcads.type = 'text/javascript';
		pcads.async = true;
		pcads.src = '//delivery.e.switchadhub.com/adserver/sat.js';
		$("head").append(pcads);
		$('.advertisement-bottom').html('<div id="switch_placeholder_89de5186705e53daa87fd6f4516e5c5e" class="switch_placeholder"></div>');

		(__scads = window.__scads || []).push({"z":6121,"targetId":"switch_placeholder_89de5186705e53daa87fd6f4516e5c5e","domain":"delivery.e.switchadhub.com","width":"0","height":"0"});
	}
}

function initAdvert() {
	var ads = document.createElement('script');
	ads.type = 'text/javascript';
	ads.async = true;
	if(window.useDefaultAds === undefined) {
		ads.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
	}
	else {
		ads.src = '//delivery.e.switchadhub.com/adserver/sat.js';
	}
	$('head').append(ads);

	if($('.advertisement-top').length) {
		$('.advertisement-top').html('<div id="switch_placeholder_a472bb4174303e9d95285bc1d999f58f" class="switch_placeholder"></div>');
		(__scads = window.__scads || []).push({"z":7025,"targetId":"switch_placeholder_a472bb4174303e9d95285bc1d999f58f","domain":"delivery.e.switchadhub.com","width":"0","height":"0"});
	}

	if($('#content-advert').find('.advertisement-big-fallback').length) {
		if(window.useDefaultAds === undefined) {
			$('#content-advert').find('.advertisement-big-fallback').html('<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2329620510869459" data-ad-slot="1308704722" data-ad-format="auto"></ins>');
			$('#content-advert').find('.advertisement-big-fallback').addClass('advertisement-big-google');
			(adsbygoogle = window.adsbygoogle || []).push({});
		}
		else {
			$('#content-advert').find('.advertisement-big-fallback').html('<div id="switch_placeholder_89de5186705e53daa87fd6f4516e5c5e" class="switch_placeholder"></div>');
			(__scads = window.__scads || []).push({"z":6121,"targetId":"switch_placeholder_89de5186705e53daa87fd6f4516e5c5e","domain":"delivery.e.switchadhub.com","width":"0","height":"0"});
		}
	}
}

function initAdvertWhitelist() {
	if(window.useDefaultAds === undefined) {
		var ads = document.createElement('script');
		ads.type = 'text/javascript';
		ads.async = true;
		ads.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
		$('head').append(ads);

		$('#content-advert').find('#nn_billboard').html('<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2329620510869459" data-ad-slot="1308704722" data-ad-format="auto"></ins>');
		$('#content-advert').find('#nn_billboard').addClass('advertisement-big-fallback').addClass('advertisement-big-google').removeAttr('id');
		(adsbygoogle = window.adsbygoogle || []).push({});
	}
}