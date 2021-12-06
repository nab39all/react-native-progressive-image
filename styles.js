import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
	imageOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: COLORS.dark,
	},
	centerSection: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default styles;
