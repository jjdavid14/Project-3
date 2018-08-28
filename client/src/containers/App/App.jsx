import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { auth } from './../../firebase.js';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import { withStyles, Hidden } from 'material-ui';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew';
import { Dashboard, Person } from 'material-ui-icons';

import { Header, Sidebar } from './../../components';

import appRoutes from './../../routes/app.jsx';

import appStyle from './../../variables/styles/appStyle.jsx';
import API from "./../../api/API";

import logo from './../../assets/img/reactlogo.png';

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(sessionStorage.getItem('user')),
      mobileOpen: false,
      open: false,
      hidden: false
    };
    this.logout = this.logout.bind(this);
    this.profile = this.profile.bind(this);
    this.reports = this.reports.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  componentDidMount() {
    if (!this.state.user) {
      this.props.history.push('/landing');
    } else {
      API.getAllEmployeeFromUser(this.state.user.id).then(res => {
        this.setState({
          employees: res.data
        });
      });
    }
    if (navigator.platform.indexOf('Win') > -1) {
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }

  profile() {
    this.props.history.push('/profile');
  }

  reports() {
    this.props.history.push('/select-report', {employees: this.state.employees});
  }

  logout() {
    auth.signOut().then(() => {
      sessionStorage.clear();
      this.setState({
        user: null
      });
      this.props.history.push('/signup');
    });
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { classes, ...rest } = this.props;
    const { hidden, open } = this.state;

    let isTouch;
    if (typeof document !== 'undefined') {
      isTouch = 'ontouchstart' in document.documentElement;
    }
    return (
      <div className={classes.wrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={isTouch ? undefined : this.handleOpen}
          onMouseEnter={isTouch ? undefined : this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
        >
          <SpeedDialAction
            key={'Logout'}
            icon={<PowerSettingsNew />}
            tooltipTitle={'Logout'}
            onClick={this.logout}
          />
          <SpeedDialAction
            key={'Profile'}
            icon={<Person />}
            tooltipTitle={'Profile'}
            onClick={this.profile}
          />
          <SpeedDialAction
            key={'Reports'}
            icon={<Dashboard />}
            tooltipTitle={'Reports'}
            onClick={this.reports}
          />
        </SpeedDial>

        <Hidden mdUp>
          <Sidebar
            routes={appRoutes}
            logoText={'Peak Performance'}
            logo={logo}
            // Can pass an image as prop to display it as a background image for Sidebar
            // image={}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="blue"
            {...rest}
          />
        </Hidden>
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={appRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default withStyles(appStyle)(App);
