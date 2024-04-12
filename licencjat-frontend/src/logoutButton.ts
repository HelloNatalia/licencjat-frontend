// import React from "react";
// import { removeAuthTokenCookie } from "./cookies/auth-cookies";
// import { redirect } from "react-router-dom";

// export class LogoutButton extends React.Component {
//   handleLogout = () => {
//     removeAuthTokenCookie();
//     this.setState({ loggedOut: true });
//   };

//   render() {
//     if (this.state && this.state.loggedOut) {
//       return redirect("/");
//     }

//     return <button className="btn-signup">Wyloguj</button>;
//   }
// }
