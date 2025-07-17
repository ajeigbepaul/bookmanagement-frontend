interface Comment {
  id: number;
  content: string;
  user: { username: string };
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-2">
      {comments.map((comment) => (
        <div key={comment.id} className="border rounded p-2 bg-gray-50">
          <p className="text-gray-800">{comment.content}</p>
          <span className="text-xs text-gray-500">
            by {comment.user.username} •{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
