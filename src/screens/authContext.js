import React from "react";

const authContext = React.createContext({
    authenticated: false,
    setAuthenticated: (auth) => {}
}
);

export default authContext;