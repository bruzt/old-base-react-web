import lightTheme from '../../themes/light';
import darkTheme from '../../themes/dark';

function getTheme(){

    const theme = JSON.parse(localStorage.getItem('theme'));

    if(theme){

        return theme;

    } else {

        return lightTheme;
    }
}


export default (state = getTheme(), action) => {

    switch(action.type){

        case 'SWITCH_THEME': {

            const theme = (state.title === 'light') ? darkTheme : lightTheme;

            localStorage.setItem('theme', JSON.stringify(theme));
    
            return {
                ...state,
                ...theme
            }
        }

        default:
            return state;
    }
}