import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const BRAND_GREEN = "#6BAA62";
const VEIN_LENGTH = 140;
const HIDDEN_SCALE = 0.01;

const TIME_SCALE = 1.25;
const scaled = (value) => Math.round(value * TIME_SCALE);
const SPLASH_DURATION = scaled(3000);

const easeOut = Easing.out(Easing.cubic);
const easeSoft = Easing.out(Easing.quad);
const easeInOut = Easing.inOut(Easing.quad);

const PIN_PATH =
  "M150 35 C105 35 75 68 75 110 C75 155 150 220 150 220 C150 220 225 155 225 110 C225 68 195 35 150 35Z";
const LEAF_LEFT_PATH =
  "M140 235 C85 230 45 195 40 145 C90 145 130 165 140 235Z";
const LEAF_RIGHT_PATH =
  "M160 235 C215 230 255 195 260 145 C210 145 170 165 160 235Z";
const VEIN_LEFT_PATH = "M65 165 C100 180 125 205 140 235";
const VEIN_RIGHT_PATH = "M235 165 C200 180 175 205 160 235";

const PIN_ORIGIN = { originX: 150, originY: 127.5 };
const HOLE_ORIGIN = { originX: 150, originY: 105 };
const LEAF_LEFT_ORIGIN = { originX: 90, originY: 235 };
const LEAF_RIGHT_ORIGIN = { originX: 210, originY: 235 };

export default function SplashScreen({ onFinish }) {
  const pinScale = useSharedValue(0.2);
  const pinBounce = useSharedValue(1);
  const pinOpacity = useSharedValue(0);

  const holeScale = useSharedValue(HIDDEN_SCALE);
  const holeOpacity = useSharedValue(0);

  const leafLeftScale = useSharedValue(HIDDEN_SCALE);
  const leafLeftRotate = useSharedValue(-15);
  const leafLeftOpacity = useSharedValue(0);

  const leafRightScale = useSharedValue(HIDDEN_SCALE);
  const leafRightRotate = useSharedValue(15);
  const leafRightOpacity = useSharedValue(0);

  const veinOpacity = useSharedValue(0);
  const veinOffset = useSharedValue(VEIN_LENGTH);

  const logoScale = useSharedValue(1);
  const logoShift = useSharedValue(0);

  const textOpacity = useSharedValue(0);
  const textShift = useSharedValue(15);
  const textScale = useSharedValue(0.95);

  const drivers = [
    pinScale,
    pinBounce,
    pinOpacity,
    holeScale,
    holeOpacity,
    leafLeftScale,
    leafLeftRotate,
    leafLeftOpacity,
    leafRightScale,
    leafRightRotate,
    leafRightOpacity,
    veinOpacity,
    veinOffset,
    logoScale,
    logoShift,
    textOpacity,
    textShift,
    textScale,
  ];

  useEffect(() => {
    pinOpacity.value = withDelay(scaled(350), withTiming(1, { duration: scaled(490), easing: easeSoft }));
    pinScale.value = withDelay(
      scaled(350),
      withSequence(
        withTiming(1.08, { duration: scaled(490), easing: easeOut }),
        withTiming(1, { duration: scaled(210), easing: easeInOut })
      )
    );

    holeOpacity.value = withDelay(scaled(650), withTiming(1, { duration: scaled(400), easing: easeSoft }));
    holeScale.value = withDelay(scaled(650), withTiming(1, { duration: scaled(400), easing: easeOut }));

    leafLeftOpacity.value = withDelay(scaled(1000), withTiming(1, { duration: scaled(420), easing: easeSoft }));
    leafLeftScale.value = withDelay(
      scaled(1000),
      withSequence(
        withTiming(1.08, { duration: scaled(420), easing: easeOut }),
        withTiming(1, { duration: scaled(180), easing: easeInOut })
      )
    );
    leafLeftRotate.value = withDelay(
      scaled(1000),
      withSequence(
        withTiming(3, { duration: scaled(420), easing: easeOut }),
        withTiming(0, { duration: scaled(180), easing: easeInOut })
      )
    );

    leafRightOpacity.value = withDelay(scaled(1100), withTiming(1, { duration: scaled(420), easing: easeSoft }));
    leafRightScale.value = withDelay(
      scaled(1100),
      withSequence(
        withTiming(1.08, { duration: scaled(420), easing: easeOut }),
        withTiming(1, { duration: scaled(180), easing: easeInOut })
      )
    );
    leafRightRotate.value = withDelay(
      scaled(1100),
      withSequence(
        withTiming(-3, { duration: scaled(420), easing: easeOut }),
        withTiming(0, { duration: scaled(180), easing: easeInOut })
      )
    );

    veinOpacity.value = withDelay(scaled(1500), withTiming(1, { duration: scaled(500), easing: easeSoft }));
    veinOffset.value = withDelay(scaled(1500), withTiming(0, { duration: scaled(500), easing: easeSoft }));

    pinBounce.value = withDelay(
      scaled(1700),
      withSequence(
        withTiming(1.06, { duration: scaled(250), easing: easeSoft }),
        withTiming(1, { duration: scaled(250), easing: easeInOut })
      )
    );
    logoShift.value = withDelay(
      scaled(1700),
      withSequence(
        withTiming(-8, { duration: scaled(420), easing: easeOut }),
        withTiming(0, { duration: scaled(280), easing: easeInOut })
      )
    );
    logoScale.value = withDelay(
      scaled(1700),
      withSequence(
        withTiming(1.04, { duration: scaled(420), easing: easeOut }),
        withTiming(1, { duration: scaled(280), easing: easeInOut })
      )
    );

    textOpacity.value = withDelay(scaled(1900), withTiming(1, { duration: scaled(490), easing: easeSoft }));
    textShift.value = withDelay(
      scaled(1900),
      withSequence(
        withTiming(-3, { duration: scaled(490), easing: easeOut }),
        withTiming(0, { duration: scaled(210), easing: easeInOut })
      )
    );
    textScale.value = withDelay(
      scaled(1900),
      withSequence(
        withTiming(1.02, { duration: scaled(490), easing: easeOut }),
        withTiming(1, { duration: scaled(210), easing: easeInOut })
      )
    );

    const timer = setTimeout(() => onFinish?.(), SPLASH_DURATION);

    return () => {
      clearTimeout(timer);
      drivers.forEach((value) => cancelAnimation(value));
    };
  }, []);

  const pinProps = useAnimatedProps(() => ({
    ...PIN_ORIGIN,
    opacity: pinOpacity.value,
    scaleX: pinScale.value * pinBounce.value,
    scaleY: pinScale.value * pinBounce.value,
  }));

  const holeProps = useAnimatedProps(() => ({
    ...HOLE_ORIGIN,
    opacity: holeOpacity.value,
    scaleX: holeScale.value,
    scaleY: holeScale.value,
  }));

  const leafLeftProps = useAnimatedProps(() => ({
    ...LEAF_LEFT_ORIGIN,
    opacity: leafLeftOpacity.value,
    rotation: leafLeftRotate.value,
    scaleX: leafLeftScale.value,
    scaleY: leafLeftScale.value,
  }));

  const leafRightProps = useAnimatedProps(() => ({
    ...LEAF_RIGHT_ORIGIN,
    opacity: leafRightOpacity.value,
    rotation: leafRightRotate.value,
    scaleX: leafRightScale.value,
    scaleY: leafRightScale.value,
  }));

  const veinProps = useAnimatedProps(() => ({
    opacity: veinOpacity.value,
    strokeDashoffset: veinOffset.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoShift.value }, { scale: logoScale.value }],
  }));

  const wordmarkStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textShift.value }, { scale: textScale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Animated.View style={[styles.logo, logoStyle]}>
          <Svg width={210} height={210} viewBox="0 0 300 300">
            <AnimatedPath animatedProps={pinProps} fill={BRAND_GREEN} d={PIN_PATH} />
            <AnimatedCircle animatedProps={holeProps} fill="#FFFFFF" cx={150} cy={105} r={28} />
            <AnimatedPath animatedProps={leafLeftProps} fill={BRAND_GREEN} d={LEAF_LEFT_PATH} />
            <AnimatedPath animatedProps={leafRightProps} fill={BRAND_GREEN} d={LEAF_RIGHT_PATH} />
            <AnimatedPath
              animatedProps={veinProps}
              d={VEIN_LEFT_PATH}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={VEIN_LENGTH}
            />
            <AnimatedPath
              animatedProps={veinProps}
              d={VEIN_RIGHT_PATH}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={VEIN_LENGTH}
            />
          </Svg>
        </Animated.View>

        <Animated.Text style={[styles.wordmark, wordmarkStyle]}>
          <Text>Hana</Text>
          <Text>Pin</Text>
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  block: {
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -20 }],
  },
  logo: {
    width: 210,
    height: 210,
  },
  wordmark: {
    marginTop: -5,
    fontSize: 48,
    fontWeight: "700",
    letterSpacing: -2,
    color: BRAND_GREEN,
  },
});
