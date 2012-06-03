/**
 * Photo Feed
 * http://osscafe.github.com/photofeed/
 *
 * The MIT License
 * Copyright © 2012, CogniTom Academic Design & Tsutomu Kawamura.
 */

$(function(){
	var client_id = '1be464ede1924f269f02bf25a6ad0e0e'; //必ず自分のクライアントIDに変更すること
	var location_id = '2399024';
	$.getJSON('https://api.instagram.com/v1/locations/'+location_id+'/media/recent?client_id='+client_id+'&callback=?')
	.success(function(feed){
		$ul = $('<ul>');
		$(feed.data).each(function(index){
			$ul.append(
				$('<li />').append(
					$('<a />', {href: this.link}).append(
						$('<img />', {src: this.images.thumbnail.url}),
						$('<span />', {html: this.caption ? this.caption.text : ''})
					),
					$('<span />').append(
						$('<img />', {src: this.user.profile_picture}),
						$('<span />', {html: this.user.username})
					)
				)
			);
		});
		$photos = $('div#instagram-photos');
		$photos.append($ul);
		$photos.imagesLoaded(function(){
			$photos.masonry({
				itemSelector: 'li',
				columnWidth: 180
			});
		});
	})
	.error(function(){
		if (console) console.log('Instagramとの通信に失敗しました。');
	});
});