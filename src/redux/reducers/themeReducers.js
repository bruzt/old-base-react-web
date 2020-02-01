import lightTheme from '../../themes/light';
import darkTheme from '../../themes/dark';


export default (state = lightTheme, action) => {

    switch(action.type){

        case 'SWITCH_THEME':

            const theme = (state.title === 'light') ? darkTheme : lightTheme;

            return {
                ...state,
                ...theme
            }

        default:
            return state;
    }
}