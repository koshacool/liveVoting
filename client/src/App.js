import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';
import { post, APIAddresses } from './utils/api';
import { setAuthUser, getAuthUser, unSetAuthUser } from './utils/api/authorization';


class App extends Component {
    constructor() {
        super();
        const userEmail = getAuthUser(); 

        this.state = userEmail ? { isAuthenticated: true, email: userEmail } : { isAuthenticated: false, email: '' };
    }

    onLogout = async () => {
     try {
        post(APIAddresses.SIGN_OUT, {});
        unSetAuthUser();
    } catch (error) {
        console.log('error', error)
        throw error;
    }
    };

    onFailure = (error) => {
      console.log(error)
        alert(error);
    };

    googleResponse = async (response) => {
       try {
        const { data } = await post(APIAddresses.SIGN_IN, {access_token: response.accessToken});
        const { user, token } = data;
        console.log(data)
        setAuthUser(user.email, token)
        this.setState({isAuthenticated: true, email: user.email })
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    render() {
    let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.email}
                    </div>
                    <div>
                        <button onClick={this.onLogout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div>
                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={this.onLogout}
                        onFailure={this.onFailure}
                    />
                </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default App;