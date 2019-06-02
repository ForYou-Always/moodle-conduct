import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import App from './app';
import LoginForm from './components/form/loginForm';
import UserDetailFrom from './components/form/userDetailFrom';
import AssetDetailForm from './components/form/assetDetailForm';
import AdminDashBoard from './admin/adminDashBoard';
import HumanResourceForm from './admin/components/form/humanResourceForm';
import AdminRestriction from './admin/adminRestriction';
import Authentication from './rest/authentication';
import { ROLE, ROLES_LIST } from './rest/permission/userRoles';
import CloudDataForm from './components/form/cloudDataForm';

const mainPath = "/manage/";

class Navigator extends Component {
  render() {    
    return(
        <Router history={hashHistory}>
          <Route path="/" component={Authentication}>
             {false && <IndexRoute authorize={[ROLE.ADMIN, ROLE.SYSTEM_ADMIN]} component={AdminRestriction}/>}
             <IndexRedirect to={mainPath+"admin/user_info"} />
             <Route path={mainPath+"admin"} authorize={[ROLE.ADMIN, ROLE.SYSTEM_ADMIN]} component={AdminRestriction}>
                <Route path={mainPath+"admin/user_info"} component={HumanResourceForm}/>
                <Route path={mainPath+"admin/assets/"} component={AssetDetailForm}/>
             </Route>
                
                
                
                
                
                
                
             <Route path={mainPath} component={App}>
                <Route path={mainPath+"user/detail"} component={UserDetailFrom}/>
                <Route path={mainPath+"asset/detail"} component={AssetDetailForm}/>
                <Route path={mainPath+"cloudcontrol/detail"} component={CloudDataForm}/>
             </Route>
          </Route>
        </Router>
    );
  }
}

export default Navigator;

//authorize={[ROLE.ADMIN, ROLE.SYSTEM_ADMIN]} 

//<IndexRedirect to={mainPath+"admin"} />

//<Route path={mainPath+"admin"} component={AdminMainPage}>
//</Route>



/*import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import App from './app';
import LoginForm from './components/form/loginForm';
import UserDetailFrom from './components/form/userDetailFrom';
import AssetDetailForm from './components/form/assetDetailForm';

const mainPath = "/manage/";

class Navigator extends Component {
  render() {    
    return(
        <Router history={hashHistory}>
        <Route path="/">
        <IndexRedirect to={mainPath+"user/detail"} />
        <Route path={mainPath} component={App}>
        <Route path={mainPath+"user/detail"} component={UserDetailFrom}/>
        <Route path={mainPath+"asset/detail"} component={AssetDetailForm}/>
            </Route>
            </Route>
            </Router>
    );
        }
  }
  
  export default Navigator;*/