import React, { Component } from "react";
import { connect } from "react-redux";
import { Picker, Text } from "react-native";
import { employeeUpdate, employeeCreate } from "../actions";
import { Card, CardSection, Input, Button } from "./common";

const DaysOfTheWeek = [
    "Monday",
    "Thursday",
    "Wednesday",
    "Tuesday",
    "Friday",
    "Saturday",
    "Sunday"
];
class EmployeeCreate extends Component {
    onButtonPress = () => {
        const { name, phone, shift } = this.props;
        this.props.employeeCreate({ name, phone, shift });
    };

    renderPicker() {
        return DaysOfTheWeek.map(day => {
            return <Picker.Item key={day} label={day} value={day} />;
        });
    }

    render() {
        return (
            <Card>
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
                <Button onPress={this.onButtonPress}>Create</Button>
            </Card>
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
    const { name, phone, shift } = state.employeeForm;
    console.log(state);
    return {
        name,
        phone,
        shift
    };
};

export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);
