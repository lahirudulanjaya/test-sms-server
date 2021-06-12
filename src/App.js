import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { withSnackbar } from "notistack";
import { Link } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import companyLogo from "./companyLogo.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senders: "",
      message: "",
      apiKey: "",
      loading: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendSMS = (e) => {
    this.setState({
      loading: true,
    });
    e.preventDefault();
    if (
      this.state.senders === "" ||
      this.state.message === "" ||
      this.state.apiKey === ""
    ) {
      this.setState({
        loading: false,
      });
      this.props.enqueueSnackbar("Invalid data", { variant: "error" });
      return;
    }
    const senders = this.state.senders.split(",");
    fetch("https://meghaduta.dhahas.com/sms/sendSMS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senders: senders,
        message: this.state.message,
        apiKey: this.state.apiKey,
      }),
    })
      .then((response) => {
        if (response.ok) {
          this.props.enqueueSnackbar("SMS sent successfully", {
            variant: "success",
          });
          this.setState({
            loading: false,
          });
        } else {
          this.props.enqueueSnackbar("Invalid API key", { variant: "error" });
          this.setState({
            loading: false,
          });
        }
      })
      .catch((err) => {
        this.props.enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <Container
        component="main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "99vh",
          width: "100%",
        }}
      >
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item md={4} lg={4} xs={12}></Grid>
          <Grid item md={4} lg={4} xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Avatar
                alt="Remy Sharp"
                style={{ width: 100, height: 100 }}
                src={companyLogo}
              />
            </div>
            <div>
              <Typography
                component="h1"
                variant="h5"
                style={{ textAlign: "center" }}
              >
                Meghadutha SMS Server Testing
              </Typography>
              <Typography
                component="h6"
                variant="body1"
                style={{
                  textAlign: "left",
                  fontStyle: "italic",
                  fontSize: 15,
                  marginTop: 15,
                }}
              >
                NOTE: Make sure your{" "}
                <Link
                  target="_blank"
                  href={
                    "https://play.google.com/store/apps/details?id=com.dhahas.smsserver"
                  }
                >
                  Meghadutha Mobile SMS Server
                </Link>{" "}
                is running and{" "}
                <Link
                  target="_blank"
                  href={
                    "https://github.com/lahirudulanjaya/SendSMS/releases/tag/0.0.1"
                  }
                >
                  Meghadutha SMS Tool
                </Link>{" "}
                is installed.
              </Typography>
              <div>
                <form noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="senders"
                    label="Senders"
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
                    label="Message"
                    id="message"
                    autoComplete="message"
                    value={this.state.message}
                    onChange={(e) => this.onChange(e)}
                  />
                  <div style={{ flexDirection: "row-reverse" }}>
                    <Button
                      disabled={this.state.loading}
                      variant="contained"
                      color="primary"
                      endIcon={<Icon>send</Icon>}
                      onClick={(e) => this.sendSMS(e)}
                    >
                      send
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid item md={4} lg={4} xs={12}></Grid>
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(App);
