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
					widgetApp.defaults.headers.common['Authorization'] = `Bearer ${token}`;  //standard
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
