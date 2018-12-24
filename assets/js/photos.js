jQuery($ => {
		let json = 'https://dtdsh.com/wp-json/wp/v2/media?per_page=100&order=asc';
		let restJSON;
		for (let i = 1; i < 4; i++) {
				let pJson = json + '&page=' + i;
				restJSON = $.getJSON(pJson, results => {
						let showImage, linkImage, item;
						$.each(results, (i, obj) => {
								if (obj['mime_type'] === 'application/pdf') {
										return true;
								} else {
										showImage = obj['source_url'].replace('https://', 'https://i1.wp.com/') + "?resize=300,300";
										linkImage = obj['source_url'].replace('https://', 'https://i0.wp.com/') + "?fit=1777,1000";
										item = `<div class="column"><a class="js--zoom" href="${linkImage}"><img data-src="${showImage}" class="lazyload"></a></div>`;
										$('#macy--wrap').append(item);
								}
						});
						if (i === 1) {
								$('#js--loading').removeClass('is--loading');
						} else if (i === 3) {
								$.getScript('../assets/js/luminous.js');
						}
				});
		}
});