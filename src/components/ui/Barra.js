import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { FirebaseContext } from "../../firebase/Auth";
import usuarioPerfil from '../../img/usuarioPerfil.svg';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Ssidebar} from '../../helper';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#1f2937',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
  


const Barra = () => {

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const history = useHistory();

  const {currentUser, firebase} = useContext(FirebaseContext);

  let imagenPerfil = usuarioPerfil;


  if(currentUser.photoURL === null){
    imagenPerfil = usuarioPerfil;
  }else{
    imagenPerfil= currentUser.photoURL;
  }

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const cerrarSesion = () => {
    firebase.cerrarSesion();
    history.push("/");
  }

  const drawer = ( 
    <Ssidebar
      imagenPerfil = {imagenPerfil}
    />
  );

  return ( 

    <div className="bg-white h-12 flex justify-items-center items-center">
      <CssBaseline />
      
      <div className="ml-6 lg:hidden">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className="flex lg:hidden focus:outline-none"
        >
          <MenuIcon />
        </IconButton>
      </div>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
            
      <ClickAwayListener onClickAway={handleClickAway}>

        <div className="w-11/12 mr-10">
                        
          <div className="flex justify-end items-center">

            <div className="flex mr-4">
              <p className="font-source font-bold text-xs">{currentUser.displayName}</p>
            </div>
                        
            <div className="cursor-pointer" id="menu-btn" onClick={handleClick}><img src={imagenPerfil} width="30" alt="Imagen de perfil"/></div>
                    
            {open ? (

              <div id="dropdown" className="flex bg-white flex-col absolute rounded mt-20 p-2 text-sm w-32 border-black border-2">
                <a href="/" className="px-2 py-1 hover:bg-segundoColor rounded" onClick={()=> cerrarSesion()}>Cerrar Sesión</a>
              </div>

            ) : null}
            </div>
          </div>
        </ClickAwayListener>
      </div>
     );
}
export default Barra;