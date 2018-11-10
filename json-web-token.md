## JSON Web Token

- taking the Json Web token returned from server, save it in localStorage and we included in every Ajax request.
- then we install store authenticated user details in Redux store so we can use it later.

  • saving it in local storage:

```
	// Saving it to local Storage
	ex:
		import widgetApp from 'someWidget app';
		import setAuthorizationToken from '...';

		// action
		export function login(data) {
			return dispatch => {
				return widgetApp.post('/api/auth', data).then(res => {
					const token = res.data.token;
					localStorage.setItem('jwToken', token);
					setAuthorizationToken(token);
				});
			}
		}


		// Next need to include token with each Ajax request as Authorization header


		// function takes token, and needs to provide headers with every request.
		// if have token, then we set default header to equal Bearer plus token
		// if no token (false) then we want to delete this access defaults headers common authorization


		import widgetApp;

		export default function setAuthorizationToken(token) {
		    if(token) {
			 // if token, access default headers common and specify authorization header
			 	//standard
				widgetApp.defaults.headers.common['Authorization'] = `Bearer ${token}`;  
			    }
			    else {
				 delete widgetApp.defaults.headers.common['Authorization'];
			    }
		    }






	// newtwork tab
	=> auth in Headers => you should have:

			....
			Accept-Encoding: gzip, deflate
			Accept-Language: en-UK, en; q=0.8
			..
			Authorization: Bearer eyJhbGci0iJUzINizsR5C16IpXVCJ9sls...
			...
			Connection: keep-alive
			Content-Length: 87
			....



		// index file js

		const store = createStore(
			...
			....
		);

		if(localStorage.jwtToken) {
			setAuthorizationToken(localStorage.jwToken);
			store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
		}

		

		render(
			<Provider store={store}>
				<Router history={browserHistory} routes={routes} />

			</Provider>, document.getElementById('app');	
		);




```


- So that sets token and includes it with each request, but now to store current user info in store
  and check whether user is signed on client and in order to have basic info about user like:
  userid, username etc
- we need to dispatch another action that will set current user after login action. 

- to do that: need to decode token

```
	import widgetApp from 'someWidget app';
	import setAuthorizationToken from '...';

	// action
	export function login(data) {
		return dispatch => {
		    return widgetApp.post('/api/auth', data).then(res => {
			const token = res.data.token;
			    localStorage.setItem('jwToken', token);
			    setAuthorizationToken(token);
			    // console.log(jwt.decode(token));  // error cannot resolve module 'net' 'dns'
			    dispatch(setCurrentUser(jwt.decode(token)));
		    });
		 }
	};



	// error about dns, net handle from webpack.config

	...
	   resolve: {
		   extensions: ['', '.js']
	   },
	   node: {
		   net: 'empty',
		   dns: 'dns'
	   }


	   now in console yo can see Object

	   {id: 1, username: 'someuser', iat: 134i5055}  // token decoded and ready to story in Redux store


```


Now we have this information and need to store it -  with a new Reducer



```
		export default(state= initial, action = {}) => {
			switch(action.type) {
				default: return state;
			}

		}



```




```
	let response = await fetch('https://xxxxxxxxx.auth0.com/userinfo', {
		method: 'GET',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  Authorization: 'Bearer ' + this.state.token.accessToken,
		},
	      });
	      let responseJson = await response.json();
	      if(response !== null) {
	      ...

	  ------------------------------------------------------------------------------------


	  async getUserinfo() {
	    console.log('getting user info in getUserInfo()');
	    try {
	      let response = await fetch('https://xxxxx.auth0.com/userinfo', {
		method: 'GET',
		headers: {
		  Authorization: 'Bearer ${this.state.token.accessToken}',
		},
	      });
	      let responseJson = await response.json();
	      if(responseJson !== null) {
		console.log('Got user info: ' + responseJson.email);
		this.setState({ component: Temp, isLoading: false, profile: responseJson});
	      }
	    } catch (error) {
	      console.log('Error in retrieving userinfo from Auth0: ' + error.message);
	      this.setState({ component: Login, isLoading: false});
	    }
	  }



```



# CORS - Cross-Origin Resource Sharing (CORS)

- a mechanism that uses additional HTTP headers to tell a browser to let a web application running at one origin
  (domain) have permissions to access selected resources from  a server at a different origin.
- An app makes a CORS request/ cross-origin http request when it requests a resource that has a different origin 
  (domain, protocol or port) than its own origin.

  example:

```  
  	 //the front-end javascript code served at: 
  																				http://domainA.com 
  	 

  	 //uses XMLHttpRequest to make a request for:
  	  																	http://api.domainB.com/data.json

```

- browsers, for security reasons, restrict Cross-origin HTTP requests, initiated from scripts.
- so the web application requesting the api data must make sure the response include the right CORS headers.
- modern browsers use CORS in an API container such as XMLHttpRequest

## CORS standars

- works by adding HTTP headers that allow servers to describe the set of origins that are permitted to read the 
  information using a web browser.

- cors works by adding a special header to responses from a server to the client. If a response contains the 
  `Access-Control-Allow-Origin header`, and browser supports Cors, then it is possible to load resources directly
  with Ajax - no need for a proxy or jsonp hacks

  ex:
  		Access-Control-Allow-Origin: http://ukrightmove.co.uk
  		So only scripts that originate from ukrightmove are allowed to load resources from x server.

  		Access-Control-Allow-Origin: *	(anybody any site can access resources directly with ajax)


### token based authorization

- token based authorization is stateless. It does not store anything in the server, but creates a unique encoded
  token that gets check everytime a request is made.
- Unlike sessions, it does not associate a user with login information but with a unique token
- It's used by Facebook, Github and Google.
- Cookies and Cors dont mix well across different domains. A token aproach allows u to make ajax calls to any server,
  on any domain because u use an Http header to pass data to user.
- No need for sessions
- App no longer relies in cookes so is invulnerable to cross-site request attacks.

### token flow

- User enters his credentials and sends request to server. If credentials are correct,
  the server creates a unique HMACSHA256 encoded token (JWT -Json web token).
- The client stores JWT and makes all subsequent requests to the server with the token attached.
- The server authenticates the user by comparing the JWT sent with the request to the one it has stored in the
  database.


## Possible solution:

- Adding the `AccessTokenType = AccessTokenType.Reference` to the Client in the Identity Server.
- ...This reduced the size of the access token to 32 characters

- By default the MW looks for the token on the authorization header - 
  you need to add a "provider" to check the query string. It's on the options.

```
	public class URLTokenProvider : IOAuthBearerAuthenticationProvider {
	    public Task RequestToken(OAuthRequestTokenContext context)  {
	        if (String.IsNullOrWhiteSpace(context.Token) && context.Request.QueryString.HasValue) {
		     NameValueCollection parsedQuery = HttpUtility.ParseQueryString(context.Request.QueryString.Value);
		     context.Token = parsedQuery["access_token"];
	        }
	       	     return Task.FromResult(0);
	    }

	     public Task ApplyChallenge(OAuthChallengeContext context) {
	         return Task.FromResult(0);
	     }

	     public Task ValidateIdentity(OAuthValidateIdentityContext context)  {
	         return Task.FromResult(0);
	     }
       }



    Use an Authorization header to work with your own data:

	fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

	The following endpoints are available:

	GET /status
	GET /books
	GET /books/:id
	PUT /books/:id { shelf }
	POST /search { query, maxResults }
	whenever i am trying to use this API:"https://reactnd-books-api.udacity.com/" and hit the server the above 
	message is being displayed. i just want o view the data in json form
	how is that possible


```

		var frisby = require('frisby');

		var server = 'http://localhost:';
		var port = '8080';
		var authEndpoint = '/xx/authenticate';
		var endpoint = '/xx/terms?term=';
		var searchTerm = 'Google';

		frisby.create('Authenticate user')
		    .post(server + port + authEndpoint, {
		        username: 'user',
		        password: 'password'
		    }, {
		        json: true,
		        headers: { 'X-Auth-Token': 'fa8426a0-8eaf-4d22-8e13-7c1b16a9370c' }
		    })
		    .expectStatus(200)
		    .expectJSON({
		        status: 'success'
		    })
		    .afterJSON(function(json) {
		        frisby.create('Search')
		            .get(server + port + endpoint + searchTerm)
		        How to add token header here ?
		            .expectStatus(200)
		            .expectHeaderContains('content-type', 'application/json')
		            .expectJSON('terms', {
		                queryTerm: 'Google'
		            })
		            .toss();

		    })
		    .toss();


		    In your example, you can also do:

				frisby.create('Search')
				.get(server + port+ endpoint+searchTerm)

				// This is the function you were looking for
				.addHeader('X-Auth-Token', 'fa8426a0-8eaf-4d22-8e13-7c1b16a9370c')

				.expectStatus(200)
				.expectHeaderContains('content-type','application/json')
				.expectJSON('terms',{
				queryTerm:'Google'
				})
				.toss();



## React: Passing Token Through the Header

- in the UI /API



```

when the header is getting constructed below, we need to make sure the local storage token is being passed.
Because there is already a token in local storage
So that the server is aware of which user is actually making the request, and therefore give us the current user
contacts.

		// second ex code
			jwt = require('jsonwebtoken'); //authorization

			let secret = "RrrR";

		h.append('Content-Type', 'application/json');

			//new code
			const session = {
				email: localstorage.getItem('email');
				token: localStorage.getItem('token');
			};

			if(session.email && session.token) {
				h.append('X-User-Email', session.email);
				h.append('X-User-Token', session.token);
			}

			//endcode



			return h;
		);

		const request = (method, path, body) => {
			const url = `${endpoint}${path}`;
			const options = { method, header: headers() };

			if(body) {
				options.body = JSON.stringify(body);

			}

			//or in body
				if(body) {

					if (body.username === 'james' && body.password === 123456) {

						claim = {
							userid: 1
						};
						this.body = {
							token: jwt.sign(claim, secret);
						}

					}//if

					else {
						this.throw(401, 'Wrong username or password');
					}


				}//if


			//endcode

			return fetch(new Request(url, options));

		};


		const Api = {

			get(path) {
				return request('GET', path);
			},
			post(path, data = {}) {
				return request('POST', paht, data);
			},
			delete(path) {
				return request('DELETE', path);
			},


		};

		export default Api;





https://www.youtube.com/watch?v=X7t2pdJYHNI
https://www.youtube.com/watch?v=uO8OreL0Ml4






```

```

		// fetch expects two parameters:
		
		• an endpoint to the API, and an     
		• optional object which can contain body and headers.



			fetch('API_ENDPOINT', OBJECT)  
			  .then(function(res) {
			    return res.json();
			   })
			  .then(function(resJson) {
			    return resJson;
			   })
			   
			   
			// object
			var obj = {  
			  method: 'POST',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			    'Origin': '',
			    'Host': 'api.producthunt.com'
			  },
			  body: JSON.stringify({
			    'client_id': '(API KEY)',
			    'client_secret': '(API SECRET)',
			    'grant_type': 'client_credentials'
			});




```





































