console.log('higher order components');
// a component that renders another component (HOC)

import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
	<div>
		<h1>Info</h1>
		<p>The info is: {props.info}</p>
	</div>
);

const Warning = WrappedComponent => {
	return props => (
		<div>
			<p>This is private info. Please don't share.</p>
			<WrappedComponent />
		</div>
	);
}; //warning fn

const AdminInfo = Warning(Info);

ReactDOM.render(
   <AdminInfo info="These are details" />,
   document.getElementById('app')
);
