// Import Dependencies
import { PureComponent } from 'react';
import { MapPolyline } from 'react-native-maps';

class PolylineComponent extends PureComponent {
    render() {
        const { coords } = this.props;
        return coords?.map((value, index) => {
            if (coords[index + 1] != undefined) {
                return (
                    <MapPolyline
                        key={index}
                        coordinates={[value, coords[index + 1]]}
                        lineJoin="miter"
                        strokeWidth={5}
                        lineCap={'round'}
                        strokeColor="#27dd93"
                    />
                );
            }
        });
    }
}

export default PolylineComponent;
