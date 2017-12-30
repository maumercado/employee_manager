import React, { Component } from "react";
import { connect } from "react-redux";
import { employeeUpdate, employeeSave, employeeDelete } from "../actions";
import each from "lodash/each";
import Communications from "react-native-communications";
import { Card, Button, Confirm, CardSection } from "./common";
import EmployeeForm from "./EmployeeForm";

class EmployeeEdit extends Component {
    state = {
        showModal: false
    };
    componentWillMount() {
        each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }

    onButtonPress = () => {
        const { name, phone, shift } = this.props;
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    };

    onTextPress = () => {
        const { phone, shift } = this.props;
        // Will not work on ios simulator
        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    };

    onAccept = () => {
        const { uid } = this.props.employee;
        this.props.employeeDelete({ uid });
    };

    onDecline = () => {
        this.setState({ showModal: false });
    };

    render() {
        return (
            <Card>
                <EmployeeForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress}>Save Changes</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onTextPress}>Text Schedule</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        Delete Employee
                    </Button>
                </CardSection>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept}
                    onDecline={this.onDecline}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const { name, phone, shift } = state.employeeForm;
    return {
        name,
        phone,
        shift
    };
};

export default connect(mapStateToProps, {
    employeeUpdate,
    employeeSave,
    employeeDelete
})(EmployeeEdit);
