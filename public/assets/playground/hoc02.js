console.log('higher order components');

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
   <div>
      <p>This is a regular ... {props.message}</p>
   </div>
);// Info

const warning = (PassInfo) => {
   return (props) => (
      <div>
      { props.isAdmin &&   // lets say i'm in admin page then show this message
         <p>This is a warning message from your local admin ...</p> }
         <PassInfo {...props}/>
      </div>
   );

};// Warning

const AdminInfo = warning(Info);

const Message = (props) => (
   <div>
      <h1>Messages</h1>
      <p>Hi {props.name}</p>
      { props.isAuthenticated && <p>this is your admin dashboard</p> ||
        <p>Would you like to signin ?</p> }
   </div>
);


const adminCheck = (PassMessageComp) => {
   return (props) => (
      <div>
         <PassMessageComp {...props} />
      </div>
   );
};// AdminCheck


const Admin = adminCheck(Message);



// ReactDOM.render(
//    <AdminInfo isAdmin={true} message="info message" />,
//    document.getElementById('app')
// );

ReactDOM.render(
   <Admin
      isAuthenticated={true}
      name="Paul"
      />,
   document.getElementById('app')
);
