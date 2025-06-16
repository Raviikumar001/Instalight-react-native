import { STORIES } from "@/constants/mock-data";
import { ScrollView } from "react-native";
import { styles } from "@/styles/feed.styles";
import Story from "./Story";

const StoriesSection = () => {
  return (
    <ScrollView
      horizontal
      style={styles.storiesContainer}
      showsVerticalScrollIndicator={false}
    >
      {STORIES.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </ScrollView>
  );
};
export default StoriesSection;
