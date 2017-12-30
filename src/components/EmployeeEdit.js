import React, { Component } from "react";
import { connect } from "react-redux";
import { employeeUpdate, employeeSave } from "../actions";
import { Card, Button } from "./common";
import each from "lodash/each";
import EmployeeForm from "./EmployeeForm";

class EmployeeEdit extends Component {
    componentWillMount() {
        each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }

    onButtonPress = () => {
        const { name, phone, shift } = this.props;
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    };

    render() {
        return (
            <Card>
                <EmployeeForm {...this.props} />
                <Button onPress={this.onButtonPress}>Save Changes</Button>
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

export default connect(mapStateToProps, { employeeUpdate, employeeSave })(EmployeeEdit);
