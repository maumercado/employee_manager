import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Picker, Text } from "react-native";

import { employeeUpdate } from "../actions";
import { CardSection, Input } from "./common";

const DaysOfTheWeek = [
    "Monday",
    "Thursday",
    "Wednesday",
    "Tuesday",
    "Friday",
    "Saturday",
    "Sunday"
];

class EmployeeForm extends Component {
    renderPicker() {
        return DaysOfTheWeek.map(day => {
            return <Picker.Item key={day} label={day} value={day} />;
        });
    }

    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Jane"
                        value={this.props.name}
                        onChangeText={value => this.props.employeeUpdate({ prop: "name", value })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-5555"
                        value={this.props.phone}
                        onChangeText={value => this.props.employeeUpdate({ prop: "phone", value })}
                    />
                </CardSection>

                <CardSection style={{ flexDirection: "column" }}>
                    <Text style={styles.pickerTextStyle}>Shift</Text>
                    <Picker
                        selectedValue={this.props.shift}
                        onValueChange={value => this.props.employeeUpdate({ prop: "shift", value })}
                    >
                        {this.renderPicker()}
                    </Picker>
                </CardSection>
            </View>
        );
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
};

const mapStateToProps = state => {
    const { name, form, shift } = state.employeeForm;
    return {
        name,
        form,
        shift
    };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
