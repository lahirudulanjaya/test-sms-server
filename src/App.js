import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { withSnackbar } from "notistack";
import { IconButton, Input, Link } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import * as XLSX from "xlsx";
import companyLogo from "./companyLogo.png";
// import Tooltip from "@material-ui/core/Tooltip";
import FileUpload from "@mui/icons-material/FileUpload";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senders: "",
      message: "",
      apiKey: "",
      loading: false,
      open: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    e.preventDefault();
    const files = e.target.files,
      file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      let readData = XLSX.read(data, { type: "binary" });
      const sheetName = readData.SheetNames[0];
      const sheet = readData.Sheets[sheetName];
      const dataParse = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      this.setState({ senders: dataParse.toString() });
    };
    reader.readAsBinaryString(file);
  };

  openDialog = () => {
    this.setState({ open: true });
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

  closeInformationDialog = () => {
    this.setState({ open: false });
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
        <Grid container spacing={2}>
          <Grid item md={4} lg={4} xs={12} />
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
                Meghadhutha SMS Server Testing
              </Typography>
              <Typography
                component="h6"
                variant="body1"
                style={{
                  textAlign: "left",
                  fontStyle: "italic",
                  fontSize: 15,
                  marginTop: 15,
                  marginBottom: 20,
                }}
              >
                NOTE: Make sure your{" "}
                <Link
                  target="_blank"
                  href={
                    "https://play.google.com/store/apps/details?id=com.dhahas.smsserver"
                  }
                >
                  Meghadhutha Mobile SMS Server
                </Link>{" "}
                is running and{" "}
                <Link
                  target="_blank"
                  href={
                    "https://github.com/lahirudulanjaya/SendSMS/releases/tag/0.0.1"
                  }
                >
                  Meghadhutha SMS Tool
                </Link>{" "}
                is installed.
              </Typography>
              <div>
                <form noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    placeholder="Ex: +442071838750,+442071838780,+442071838758"
                    required
                    fullWidth
                    id="senders"
                    label="Type senders or Upload using file"
                    name="senders"
                    InputProps={{
                      endAdornment: (
                        <div
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <label
                            htmlFor="icon-button-file"
                            style={{ margin: 0, padding: 0 }}
                          >
                            <Input
                              style={{ display: "none" }}
                              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                              id="icon-button-file"
                              type="file"
                              onChange={this.handleFileChange}
                            />
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <FileUpload />
                            </IconButton>
                          </label>
                        </div>
                      ),
                    }}
                    autoComplete={false}
                    value={this.state.senders}
                    onChange={(e) => this.onChange(e)}
                  />
                  <Typography
                    component="h6"
                    variant="body1"
                    style={{
                      textAlign: "left",
                      fontStyle: "italic",
                      fontSize: 15,
                      marginBottom: 5,
                    }}
                  >
                    (NOTE:You can add senders using a excel file. Check
                    this sample excel file{" "}
                    <Link
                      target="_blank"
                      href={
                        "https://docs.google.com/spreadsheets/d/10ETqIFjXyDrjjhLpRGwqih7Eg7AidiyZzV00q1s6KyI/edit?usp=sharing"
                      }
                    >
                      link
                    </Link>
                    )
                  </Typography>
                  {/* <div>
                    <label htmlFor="icon-button-file">
                      <Input
                        style={{ display: "none" }}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        id="icon-button-file"
                        type="file"
                        onChange={this.handleFileChange}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <FileUpload />
                      </IconButton>
                    </label>
                    <Button variant="contained" component="label">
                          Upload File
                          <input
                            type="file"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            hidden
                            onChange={this.handleFileChange}
                          />
                        </Button>
                    <i
                      className="material-icons"
                      style={{ color: "blue", bottom: 0 }}
                      onMouseEnter={() => this.openDialog()}
                    >
                      info
                    </i>
                  </div> */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    id="apiKey"
                    placeholder="Ex: 123456789abcdefghijklmno"
                    label="Type API Key"
                    name="apiKey"
                    autoComplete={false}
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
                    label="Type broadcasting message"
                    id="message"
                    autoComplete={false}
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
