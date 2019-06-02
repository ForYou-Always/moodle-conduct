import React from 'react';
 
class RouteHandler extends React.Component {
  constructor(props) {
    super(props);
 
    this.userRoles = Cookies.get('user').roles;
    this.notAuthorizedPath = '/not-found';
  }
 
  render() {
    return (
      <div>
        <RouteHandler {...this.props} />
      </div>
    );
  }
}
 
export default RouteHandler;