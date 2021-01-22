import axios from 'axios'

export default {
    getData: (token) =>
    axios({
        'method':'GET',
        'url':'https://dev2smartanpr.servizilocalispa.it/AuthenticationManager/api/account/getprofile',
        'headers': {
            'content-type':'application/octet-stream',
            'x-rapidapi-host':'example.com',
            'Authorization': 'Bearer ' + token,
        },
        'params': {
            'search':'parameter',
        },
    })
}