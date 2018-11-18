document.addEventListener('DOMContentLoaded', function(e) {

	const customEvents = {
		docClas(clas,handle) {
			return document.querySelector(clas).innerHTML = `<span>${handle}</span>`;
		},
		init: function() {
			this.domContentLoaded();
			this.host();

		},
		domContentLoaded() {
			this.docClas('.state.domContentLoaded','true');
		},
		host() {
			let cid = document.location.host;
			if(cid == "") {
				cid = 'extension not running';
				return this.docClas('.state.localhost', cid);
			} else {
				cid = cid;
				this.docClas('.state.host', cid);
			}
			
		}
		




	};

	
	customEvents.init();


// chrome.storage.sync.get('total', function)
// chrome.storage.sync.set({'total': newTotal});

	// let notifOptions = {
	// 	type: 'basic',
	// 	iconUrl: 'icon48.png',
	// 	title: 'Limit reached!',
	// 	message: 'You reached your limit'
	// },

	// limitNotice = notifOptions.message;


	//chrome.notifications.create('limitNotice',notifOptions);
	//document.getElementById('results').innerHTML += limitNotice;
	

},false);