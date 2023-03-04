// Import Dependencies
import { View } from 'react-native';
import { Svg, Image as SvgImage } from 'react-native-svg';

// Image Component to SVG Component due to compatibility issues in MapView
export const SvgImageComponent = ({ uri, size, round }) => {
    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: round ? size : 0,
                overflow: 'hidden',
            }}>
            <Svg height={size} width={size}>
                <SvgImage
                    preserveAspectRatio="xMidYMid slice"
                    height={size}
                    width={size}
                    href={{ uri: uri }}
                />
            </Svg>
        </View>
    );
};
