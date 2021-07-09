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
import CloseIcon from '@material-ui/icons/Close';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
  
const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',
        zIndex: '900 !important'
    },
    paper: {
        boxShadow: '0px 0px 1px 1px rgb(0 0 0 / 8%)',
        padding: '5px 0px',
        borderRadius: '0px 0px 5px 5px',
    },
    list: {
        width: 250,
    },
        fullList: {
        width: 'auto',
    },
    heading: {
        fontSize: '1.1rem',
        fontWeight: '600',
    }
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
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div style={{
                minHeight: '9vh', 
                width: '250px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'flex-end',
                paddingRight: '16px'
            }}>
                <CloseIcon style={{fontSize: '2.2rem', color: '#003360'}}/>
            </div>
            <List>
                <Link href='/box-to-go'>
                    <ListItem button key='Box To Go!' style={{padding: '0'}}>
                        <Accordion style={{width: '100%', boxShadow: 'none'}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{
                                minHeight: 'auto'
                            }}
                            >
                                <Typography className={classes.heading}>Box To Go!</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{paddingTop: '0', paddingBottom: '0'}}>
                                <div style={{width: '100%', display: 'flex', flexDirection:'column'}}>
                                    <Accordion style={{width: '100%', boxShadow: 'none'}}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        style={{
                                            padding: '0',
                                            minHeight: '48px !important'
                                        }}
                                        >
                                            <Typography>Ready To Go</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>Opciones Ready To Go</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion style={{width: '100%', boxShadow: 'none'}}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        style={{
                                            padding: '0'
                                        }}
                                        >
                                            <Typography>Box Armadas</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>Opciones Box Armadas</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                </Link>
            </List>
            <List>
                <Link href='/box-builder'>
                    <ListItem button key='Make your Box' style={{paddingTop: '0', paddingBottom: '0'}} onClick={toggleDrawer(anchor, false)}>
                        <Typography className={classes.heading}>Make Your Box</Typography>
                    </ListItem>
                </Link>
            </List>
            <List>
                <Link href='/box-to-go'>
                    <ListItem button key='Out of The Box' style={{padding: '0'}}>
                    <Accordion style={{width: '100%', boxShadow: 'none'}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{
                                minHeight: 'auto'
                            }}
                            >
                                <Typography className={classes.heading}>Out of the Box</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{paddingTop: '0', paddingBottom: '0'}}>
                                <List>
                                    <ListItem>
                                        Globos
                                    </ListItem>
                                    <ListItem>
                                        Flores
                                    </ListItem>
                                    <ListItem>
                                        Pasteles
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                </Link>
            </List>
            <List>
                <Link href='/corporate'>
                    <ListItem button key='Sharebox Corporate' style={{paddingTop: '0', paddingBottom: '0'}} onClick={toggleDrawer(anchor, false)}>
                        <Typography className={classes.heading}>Sharebox Corporate</Typography>
                    </ListItem>
                </Link>
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
                    <FontAwesomeIcon icon={ click ? faTimes : faBars} className={styles.MenuIcon}/>
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