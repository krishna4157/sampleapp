import { Svg, Image as SvgImage } from 'react-native-svg';

export const SvgImageComponent = ({ uri, size }) => {
    return (
        <Svg height={size} width={size}>
            <SvgImage
                preserveAspectRatio="xMidYMid slice"
                height={size}
                width={size}
                href={{ uri: uri }}
            />
        </Svg>
    );
};
