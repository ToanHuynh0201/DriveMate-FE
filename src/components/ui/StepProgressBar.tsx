import { StyleSheet, View } from "react-native";

import { AUTH_UI } from "@/constants/auth-ui";

type Props = { currentStep: number; totalSteps?: number };

export function StepProgressBar({ currentStep, totalSteps = 3 }: Props) {
	return (
		<View style={styles.container}>
			{Array.from({ length: totalSteps }).map((_, i) => (
				<View
					key={i}
					style={[
						styles.bar,
						{
							backgroundColor:
								i < currentStep
									? AUTH_UI.colors.accent
									: AUTH_UI.colors.border,
						},
					]}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 20,
	},
	bar: {
		flex: 1,
		height: 4,
		borderRadius: 999,
	},
});
