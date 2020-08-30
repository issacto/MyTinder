import { StyleSheet } from 'react-native';


// color constants
export const accent = '#ED6640';
export const bgColor = '#E0E0E0';
export const bgRootcolor='#1a1a2e';
export const black = '#131313';
export const white = '#F7F7FF';

// size constants
export const fontSize = 16;

// component styles
export const defaultStyles = {};

// general component / layout / screen styles
export const styles = StyleSheet.create({
    centerText: {
        textAlign: 'center'
    },
    defaultBtn: {
        backgroundColor: white,
        borderRadius: 30,
        elevation: 10,
        height: 35,
        justifyContent: 'center',
        margin: 10,
        width: 200,
    },  
    screen: {
        alignItems: 'center',
        backgroundColor: bgRootcolor,
        flex: 1,
        justifyContent: 'center',
    },
    
});

// screen styles
export const chatScreenStyles = StyleSheet.create({

});

export const contactScreenStyles = StyleSheet.create({
    
});

export const homeScreenStyles = StyleSheet.create({
    
});

export const loginScreenStyles = StyleSheet.create({
    
});

export const profileScreenStyles = StyleSheet.create({
    
});

export const registerScreenStyles = StyleSheet.create({
    
});

export const settingsScreenStyles = StyleSheet.create({
    
});

export const swipeScreenStyles = StyleSheet.create({
    
});