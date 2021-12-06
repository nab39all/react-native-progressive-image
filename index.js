import React, { useEffect, useState } from 'react';
import { View, Animated, ActivityIndicator, StyleSheet } from 'react-native';
import { images } from '../../constants';

import styles from './styles';

const ProgressiveImage = ({
	onLoad,
	withIndicator = true,
	thumbnailSource,
	source,
	style = {},
	...props
}) => {
	const [imgAnim] = useState(new Animated.Value(0));
	const [thumbnailAnim] = useState(new Animated.Value(0));
	const [loading, setLoading] = useState(true);

	const [helper, setHelper] = useState(false);

	useEffect(() => {
		if (thumbnailSource) setHelper(true);
		const timer = setTimeout(() => setLoading(false), 20000); // fetch image timeout 20s
		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, []);

	const handleThumbnailLoad = () => {
		setLoading(false);
		Animated.spring(thumbnailAnim, {
			toValue: 1,
			useNativeDriver: false,
		}).start();
	};
	const onImageLoad = () => {
		setLoading(false);
		if (helper) setHelper(false);
		Animated.spring(imgAnim, {
			toValue: 1,
			useNativeDriver: false,
		}).start();
		if (onLoad) onLoad();
	};

	const styleBorder = {
		borderBottomLeftRadius: style?.borderBottomLeftRadius || undefined,
		borderBottomRightRadius: style?.borderBottomRightRadius || undefined,
		borderColor: style?.borderColor || undefined,
		borderWidth: style?.borderWidth || undefined,
		borderRadius: style?.borderRadius || undefined,
		borderTopLeftRadius: style?.borderTopLeftRadius || undefined,
		borderTopRightRadius: style?.borderTopRightRadius || undefined,
	};
	const sizeLoading = {
		width: style?.width || undefined,
		height: style?.height || undefined,
	};

	if (style.length) {
		//
		for (let i = 0; i < style.length; i += 1) {
			// find width & height for loading frame indicators
			if (style[i].width !== undefined)
				sizeLoading.width = style[i].width;
			if (style[i].height !== undefined)
				sizeLoading.height = style[i].height;
			// find border radius for loading frame indicators
			if (style[i].borderBottomLeftRadius !== undefined)
				styleBorder.borderBottomLeftRadius =
					style[i].borderBottomLeftRadius;
			if (style[i].borderBottomRightRadius !== undefined)
				styleBorder.borderBottomRightRadius =
					style[i].borderBottomRightRadius;
			if (style[i].borderColor !== undefined)
				styleBorder.borderColor = style[i].borderColor;
			if (style[i].borderWidth !== undefined)
				styleBorder.borderWidth = style[i].borderWidth;
			if (style[i].borderRadius !== undefined)
				styleBorder.borderRadius = style[i].borderRadius;
			if (style[i].borderTopLeftRadius !== undefined)
				styleBorder.borderTopLeftRadius = style[i].borderTopLeftRadius;
			if (style[i].borderTopRightRadius !== undefined)
				styleBorder.borderTopRightRadius =
					style[i].borderTopRightRadius;
		}
	}

	return (
		<>
			{thumbnailSource && helper && (
				<Animated.Image
					{...props}
					source={images.skeletonImage}
					// source={{ uri: 'https://picsum.photos/id/1/50/50' }}
					style={[
						style,
						{ opacity: thumbnailAnim },
						{ ...StyleSheet.absoluteFillObject },
					]}
					onLoad={handleThumbnailLoad}
				/>
			)}

			<Animated.Image
				{...props}
				source={source}
				style={[style, { opacity: imgAnim }]}
				onLoad={onImageLoad}
			/>

			{withIndicator && loading && (
				<View
					style={[
						styles.imageOverlay,
						styles.centerSection,
						styleBorder,
						sizeLoading,
					]}
				>
					<ActivityIndicator />
				</View>
			)}
		</>
	);
};

export default ProgressiveImage;
