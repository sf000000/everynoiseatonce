import { TopArtist } from "@/interfaces";
import { cn } from "@/lib/utils";

import { ImageWithCaption } from "./image-with-caption";

const TopArtists = ({
  artists,
  className,
}: {
  artists: TopArtist[];
  className?: string;
}) => {
  return (
    <div
      className={cn("w-full grid grid-cols-1 sm:grid-cols-2 gap-4", className)}
    >
      <div className="p-4 rounded-lg border grid gap-4 grid-cols-2">
        {artists.map((artist) => (
          <ImageWithCaption
            key={artist.mbid}
            image={artist.artwork}
            caption={`${artist.name} (${artist.playcount} plays ✨)`}
          />
        ))}
      </div>
      <div className="h-[465px] rounded-lg border flex items-center justify-center">
        I will add something here later
      </div>
    </div>
  );
};

export default TopArtists;
