import React, { useState } from 'react';
import BtgDropdown from './BtgDropdown'
import SideMenu from './SideMenu'


import Link from 'next/link'
import styles from './Navbar.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons"; // import the icons you need


import { FaBars, FaRegUser } from 'react-icons/fa'
import { FiShoppingBag } from 'react-icons/fi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { GrSearch } from 'react-icons/gr'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { height } from 'dom-helpers';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
  
const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',
        zIndex: '900 !important'
    },
    paper: {
        boxShadow: 'none',
        padding: '5px 0px',
        borderRadius: '0px 0px 5px 5px',
    },
    list: {
        width: 250,
    },
        fullList: {
        width: 'auto',
    },
}));

export default function Navbar() {  
    const rtgSubMenus = ['Kit Festivo', 'Wine Lovers Kit', 'Bride To Be Kit', 'Beer Kit']
    const btgSubMenus = ['Todas las Boxes', 'Día del padre', 'Anillos y Compromisos', 'Aniversario', 'Cumpleaños', 'Condolencias', 'For Her', 'For Him', 'Just Because']
    const ootbOptions = ['Todo', 'Globos', 'Flores', 'Pasteles y Velas']

    const [activeSubmenu, setActiveSubmenu] = useState('rtg');
    const [subMenuOptions, setSubMenuOptions] = useState(rtgSubMenus)
    
    // DRAWER COMPONENTS
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };
    
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
          </List>
        </div>
    );
    // ENDS DRAWERS COMPONENTS

    const handleRTG = (event) => {
        setActiveSubmenu('rtg')
        setSubMenuOptions(rtgSubMenus)
    };
    
    const handleBTG = (event) => {
        setActiveSubmenu('btg')
        setSubMenuOptions(btgSubMenus)
    };

    const handleBalloons = (event) => {
        setActiveSubmenu('balloons')
        setSubMenuOptions(rtgSubMenus)
    };


    const btgMenu = () => (
        <div className={styles.menuContainer}>
            <div className={styles.menuCol}>
                <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
                    <li onMouseEnter={handleRTG}>
                        <div className={ activeSubmenu === 'rtg' ? `${styles.menuOption} ${styles.menuOptionActive}` : styles.menuOption}>
                            <span>Ready To Go</span> <MdKeyboardArrowDown className={styles.ArrowRight}/>
                        </div>
                    </li>
                    <li onMouseEnter={handleBTG}>
                        <div className={ activeSubmenu === 'btg' ? `${styles.menuOption} ${styles.menuOptionActive}` : styles.menuOption}>
                            <span>Box Armadas</span> <MdKeyboardArrowDown className={styles.ArrowRight}/>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={styles.menuCol}>
                <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
                    {subMenuOptions.map(option => (
                        <li onClick={handleClick1}>
                            <Link href='/box-to-go'>
                                <div className={styles.menuOption}>
                                    {option}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    const ootbMenu = () => (
        <div className={styles.ootbContainer}>
            <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
                {ootbOptions.map(option => (
                    <li onClick={handleClick2}>
                        <Link href='/out-of-the-box'>
                            <div className={styles.menuOption}>
                                {option}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );

    const classes = useStyles();
    
    const [anchorEl1, setAnchorEl1] = React.useState(null);

    const handleClick1 = (event) => {
        if (anchorEl1 === null) {
            setAnchorEl1(event.currentTarget);
        }else{
            setAnchorEl1(null)
        }
        setAnchorEl2(null)
    };
    
    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'menu-popover' : undefined;

    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick2 = (event) => {
        if (anchorEl2 === null) {
            setAnchorEl2(event.currentTarget);
        }else{
            setAnchorEl2(null)
        }
        setAnchorEl1(null);
    };
    
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const closeAllPopovers = (event) => {
        setAnchorEl1(null);
        setAnchorEl2(null);
    };

    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'menu-popover' : undefined;

    const [click, setClick] = useState(false);  

    return(
        <>
            <nav className={styles.Nav}>
                <div className={styles.LogoContainer}>
                    <div className={styles.NavLink}>
                        <Link href='/'>
                            <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_editable-17.png?v=1614310399" className={styles.Logo}/>
                        </Link> 
                    </div>
                </div>
                <div className={styles.NavBurger} onClick={toggleDrawer('right', true)}>
                    <FontAwesomeIcon icon={ click ? faTimes : faBars} className={styles.Menu}/>
                </div>
                <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                    {list('right')}
                </Drawer>
                <nav className={styles.NavMenu}>
                    <ul className={styles.SiteNav} >
                        <li className={`${styles.NavLink} ${styles.Item}`} aria-describedby={id1} onClick={handleClick1}>
                            {/* <Link href='/box-to-go'> */}
                                <div className={styles.AlignedContainer}>
                                    To Go <MdKeyboardArrowDown className={styles.Arrow}/>                                  
                                </div>   
                            {/* </Link>   */}       
                        </li>
                        <Popover
                            id={id1}
                            open={open1}
                            anchorEl={anchorEl1}
                            onClose={handleClose1}
                            classes={{
                                root: classes.root,
                                paper: classes.paper, 
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {btgMenu()}
                        </Popover>
                        <li className={`${styles.NavLink} ${styles.Item}`}>
                            <Link href='/box-builder'>
                                <div className={styles.AlignedContainer}>
                                    Make your Box
                                </div>
                            </Link>
                        </li>
                        <li className={`${styles.NavLink} ${styles.Item}`} aria-describedby={id2} onClick={handleClick2}>
                            {/* <Link href='/out-of-the-box'> */}
                                <div className={styles.AlignedContainer}>
                                    Out of the Box <MdKeyboardArrowDown className={styles.Arrow}/>
                                </div>
                            {/* </Link> */}
                        </li>
                        <Popover
                            id={id2}
                            open={open2}
                            anchorEl={anchorEl2}
                            onClose={handleClose2}
                            classes={{
                                root: classes.root,
                                paper: classes.paper, 
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {ootbMenu()}
                        </Popover>
                        <li className={`${styles.NavLink} ${styles.Item}`}>
                            <Link href='/corporate'>
                                <div className={styles.AlignedContainer}>
                                    Sharebox Corporate
                                </div>
                            </Link>
                        </li> 
                    </ul>       
                </nav>
                <nav className={styles.NavIcon}>
                    <GrSearch className={styles.SearchIcon} />
                    <FaRegUser className={styles.UserIcon}/>
                    <Link href='/cart'>
                        <FiShoppingBag className={styles.CartIcon}/>
                    </Link>   
                </nav>
            </nav>
        </> 
    )
}