import MapView, { Marker } from 'react-native-maps';

import { IMarker } from '../interfaces/IMarker';

import { markers } from '../store/markers';

export default function MapsScreen() {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 55.99443196222763,
        longitude: 92.79739827481632,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {markers.map((marker: IMarker) => {
        return (
          <Marker
            key={marker.latitude + marker.longitude}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        );
      })}
    </MapView>
  );
}
