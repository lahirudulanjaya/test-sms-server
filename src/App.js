import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            senders: '',
            message: '',
            apiKey: ''
        }
    }
    componentDidMount() {

    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    sendSMS(e) {
        e.preventDefault();
        const senders = this.state.senders.split(',')
        fetch(
            'https://sms-server0.herokuapp.com/sms/sendSMS',
            {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senders: senders,
                    message: this.state.message,
                    apiKey:this.state.apiKey
                }),
            },
        ).then(response => {
            if(response.ok){
                alert('Successfully send the messages')
            }
            else{
                if(response.status===403)
                {
                    alert('You do not have have permission')
                }
            }
        })
    }

    render() {
        return (
            <Container component="main"  style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width:'100%'

            }}>
                <CssBaseline/>
                <div  >
                    <Typography component="h1" variant="h5" style={{textAlign:'center'}}>
                        Testing Send SMS. Make sure your sms server is running.
                    </Typography>
                    <div>
                        <form noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="senders"
                                label="senders"
                                name="senders"
                                autoComplete="senders"
                                autoFocus
                                value={this.state.senders}
                                onChange={(e) => this.onChange(e)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="apiKey"
                                label="API Key"
                                name="apiKey"
                                autoComplete="senders"
                                autoFocus
                                value={this.state.apiKey}
                                onChange={(e) => this.onChange(e)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={4}
                                rowsMax={10}
                                required
                                fullWidth
                                name="message"
                                label="message"
                                id="message"
                                autoComplete="message"
                                value={this.state.message}
                                onChange={(e) => this.onChange(e)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<Icon>send</Icon>}
                                onClick={(e) => this.sendSMS(e)}
                            >send</Button>
                        </form>
                    </div>
                </div>
            </Container>
        );
    }
}


export default App;
