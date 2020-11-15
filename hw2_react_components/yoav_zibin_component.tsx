import React from 'react';
import {View} from 'react-native';
import {Avatar, Badge, Button, Icon, Rating, Slider} from 'react-native-elements';

export function MyComponent(props: {title: string}) {
  return (
    <View>
      <Button title={props.title} onPress={() => console.log('pressed')} />
      <Rating type="heart" ratingCount={3} imageSize={60} showRating />
      <Slider
        value={42}
        maximumValue={50}
        minimumValue={20}
        step={1}
        trackStyle={{height: 10, backgroundColor: 'transparent'}}
        thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
        thumbProps={{
          children: (
            <Icon
              name="heartbeat"
              type="font-awesome"
              size={20}
              reverse
              containerStyle={{bottom: 20, right: 20}}
              color="#f50"
            />
          ),
        }}
      />
      <Badge status="success" />
      <Avatar
        rounded
        source={{
          uri: 'https://randomuser.me/api/portraits/men/41.jpg',
        }}
        size="large"
      />
    </View>
  );
}
