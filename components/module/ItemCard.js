import React, { useState } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const ItemCard = (props) => {
    const [buttonColor, setButtonColor] = useState("#09AECF");

    const onPressInButton = () => {
        setButtonColor("#076985");
    };

    const onPressOutButton = () => {
        setButtonColor("#09AECF");
        props.onPress(props.id);
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: props.path }}
                style={styles.image}
            />
            <View style={styles.detailContainer}>
                <Text style={styles.titleText}>{props.title}</Text>
                <Text style={styles.contentText}>Popularity: {props.popularity}</Text>
                <Text style={styles.contentText}>Release Date: {props.releaseDate}</Text>
                <TouchableOpacity
                    style={[styles.detailBtn, { backgroundColor: buttonColor }]}
                    onPressIn={onPressInButton}
                    onPressOut={onPressOutButton}
                    activeOpacity={1}
                >
                    <Text style={styles.btnText}>More Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    image: {
        width: 110,
        height: 110,
        marginRight: 10,
        // resizeMode: 'contain',
    },

    detailContainer: {
        marginBottom: 5,
        backgroundColor: 'transparent',
    },

    titleText: {
        fontWeight: 'bold',
        marginBottom: 2,
        width: 230,
    },

    contentText: {
        marginBottom: 5,
    },

    detailBtn: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 5,
    },

    btnText: {
        color: 'white',
    },
});

export default ItemCard;
