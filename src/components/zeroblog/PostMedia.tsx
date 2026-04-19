type Item = { url: string; type: "photo" | "video" | "animation" | "document" };

const PostMedia = ({ media }: { media: Item[] }) => {
  if (!media?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
      {media.map((m, i) => {
        if (m.type === "video") {
          return (
            <video
              key={i}
              src={m.url}
              controls
              className="w-full bevel bg-black"
            />
          );
        }
        return (
          <img
            key={i}
            src={m.url}
            alt=""
            loading="lazy"
            className="w-full bevel bg-black object-cover"
          />
        );
      })}
    </div>
  );
};

export default PostMedia;
