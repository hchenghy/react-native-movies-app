
import {Button, View, Image, Text} from 'react-native';

const ItemCard = (props) => {
    return (<View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Image source={{ uri: props.path }} style={{ width: 100, height: 150, marginRight: 10 }} />
        <View>
            <Text style={{ fontWeight: 'bold' }}>{props.title}</Text>
            <Text>Popularity: {props.popularity}</Text>
            <Text>Release Date: {props.releaseDate}</Text>
        </View>
        <Button
            title="More Details"
            onPress={() => props.onPress(props.id)}
        />
    </View>);
}

export default ItemCard;