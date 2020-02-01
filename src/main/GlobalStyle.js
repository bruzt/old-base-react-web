import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        background: ${(props) => props.theme.background};
        font-size: 14px;
        color: ${(props) => props.theme.text};
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font-family: Arial, Helvetica, sans-serif;
    }

    ul {
        list-style: none;
    }
`;