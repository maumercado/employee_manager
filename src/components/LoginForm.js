import React, { Component } from "react";
import { Card, CardSection, Input, Button } from "./common";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser } from "../actions";

class LoginForm extends Component {
    onEmailChange = email => {
        this.props.emailChanged(email);
    };

    onPasswordChange = password => {
        this.props.passwordChanged(password);
    };

    onButtonPress = () => {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    };

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: "white" }}>
                    <Text style={styles.errorTextStyle}>{this.props.error}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="user@example.com"
                        onChangeText={this.onEmailChange}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange}
                        value={this.props.password}
                    />
                </CardSection>
                {this.renderError()}
                <Button onPress={this.onButtonPress}>Login</Button>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: "center",
        color: "red"
    }
};

const mapStateToProps = state => {
    const { email, password, error } = state.auth;
    return {
        error,
        email,
        password
    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
