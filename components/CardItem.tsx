import {
  useRenderCount,
  useWhyDidYouUpdate,
} from "@/services/performance/PerformanceMetrics";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import React from "react";

const CARD_PADDING_VERTICAL = 20;
const CARD_TITLE_LINE_HEIGHT = 20;
const CARD_TITLE_MARGIN_BOTTOM = 8;
const CARD_IMAGE_HEIGHT = 200;
const CARD_BORDER_WIDTH = 1;

export const CARD_ITEM_HEIGHT =
  CARD_PADDING_VERTICAL * 2 +
  CARD_TITLE_LINE_HEIGHT +
  CARD_TITLE_MARGIN_BOTTOM +
  CARD_IMAGE_HEIGHT +
  CARD_BORDER_WIDTH;

const CardItem = ({ index }: { index: number }) => {
  // Track renders - you'll see this logs EVERY time any item renders
  useRenderCount(`HeavyComponent-${index}`);
  useWhyDidYouUpdate(`HeavyComponent-${index}`, { index });

  const start = performance.now();

  while (performance.now() - start < 10) {}

  const imageSource = React.useMemo(
    () => ({
      uri: `https://picsum.photos/200/200?random=${index}`,
      cacheKey: `card-item-${index}`,
    }),
    [index],
  );

  // ANTI-PATTERN 5: Inline styles (new object every render) : : FIXED

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>Item #{index} (Heavy)</Text>

      {/* ANTI-PATTERN 6: Unoptimized images : FIXED */}

      <Image
        source={imageSource}
        style={styles.imageStyle}
        contentFit="cover"
        cachePolicy="memory-disk"
        recyclingKey={`card-item-${index}`}
        transition={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: CARD_PADDING_VERTICAL,
    paddingHorizontal: 20,
    borderBottomWidth: CARD_BORDER_WIDTH,
    borderBottomColor: "#ccc",
  },
  title: {
    lineHeight: CARD_TITLE_LINE_HEIGHT,
    marginBottom: CARD_TITLE_MARGIN_BOTTOM,
  },
  imageStyle: { width: 200, height: CARD_IMAGE_HEIGHT },
});

export const MemoizedCardItem = React.memo(CardItem);
