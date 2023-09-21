import { experimental_useOptimistic as useOptimistic } from 'react';
// import tweetLike from "../actions/tweetLike";

export default function LikeButton({
    likes,
    tweet_id,
}: {
    likes: number | null;
    tweet_id: any;
}) {
    const [optimisticLikes, addOptimisticLikes] = useOptimistic(
        likes || 0, // Default to 0 likes if null
        (state, l) => state + 1
    );

    return (
        <div className="flex items-end space-x-3">
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="#f43f5e"
                onClick={async () => {
                    addOptimisticLikes(1); // Optimistically increment the like count
                    await tweetLike(tweet_id, optimisticLikes); // Call the server action
                }}
                className="r-1gfgf0w r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03 text-blue-500 fill-blue-500 w-6 h-6 cursor-pointer"
            >
                {/* SVG code for Like button */}
            </svg>
            <span className="text-sm opacity-60">
                {Number(optimisticLikes)}
            </span>
        </div>
    );
}
