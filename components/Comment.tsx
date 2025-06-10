import { View, Text, Image } from "react-native";
import { styles } from "@/styles/feed.styles";
import { formatDistanceToNow } from "date-fns";
import { Id } from "@/convex/_generated/dataModel";

interface CommentProps {
  _id: Id<"comments">;
  userId: Id<"users">;
  postId: Id<"posts">;
  content: string;
  _creationTime: number;
  user: {
    fullname?: string;
    image: string;
  };
}

export default function Comment({ comment }: { comment: CommentProps }) {
  return (
    <View style={styles.commentContainer}>
      <Image
        source={{ uri: comment.user.image }}
        style={styles.commentAvatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.commentUsername}>{comment.user.fullname || 'Anonymous'}</Text>
        <Text style={styles.commentText}> {comment.content}</Text>
        <Text style={styles.commentTime}>
          {formatDistanceToNow(comment._creationTime, { addSuffix: true })}
        </Text>
      </View>
    </View>
  );
}
