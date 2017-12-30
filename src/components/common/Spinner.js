import React from "react";
import { CardSection } from "./";
import { View, ActivityIndicator } from "react-native";
const Spinner = ({ size = "large" }) => {
    return (
        <CardSection>
            <View style={styles.spinnerStyle}>
                <ActivityIndicator size={size} />
            </View>
        </CardSection>
    );
};

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
};

export { Spinner };
