import { VoiceConnection } from "@discordjs/voice";
//@ts-ignore
import { Tracks } from "spotify-url-info";
import
  {
    NewsChannel,
    TextChannel,
    ThreadChannel,
    VoiceChannel,
} from "discord.js";
import { CacheType, LoopMode, PlayerEvents } from "./constants";
import * as internal from "stream";
import { ReadStream } from "fs";
import { TrackInfo } from "soundcloud-downloader/src/info";
import Manager from "../structures/Manager";
import { YoutubeVideo, YoutubeVideoDetails } from "youtube-scrapper";
import Track from "../structures/Track";
import { Spotify } from "./source/Search";
export type PossibleStream =
  | internal.Readable
  | internal.PassThrough
  | ReadStream;
export type RawTrackTypes = TrackInfo | LocalResponse;

export interface LocalResponse
{
  url: string;
  is_m3u8: boolean;
  content_length: number;
}

export interface TwitchOptions
{
  clientId: string;
}

export interface SoundcloudOptions
{
  clientId: string;
}

export interface CacheOptions
{
  enabled: boolean;
  cacheType: CacheType;
  limit?: number;
  directory?: string;
}

export interface SoundcloudOptions
{
  clientId: string;
  likeTrackLimit?: number;
}

export interface ManagerConfig
{
  cache?: CacheOptions;
  soundcloud?: SoundcloudOptions;
  youtube?: YoutubeOptions;
  playerOptions?: PlayerOpts;
}
export interface PlayerOpts
{
  trackInfoInterval: number;
}
export interface voiceState
{
  text: TextChannel;
  channel: VoiceChannel;
  connection: VoiceConnection;
}

export interface ManagerEvents
{
  [ PlayerEvents.TRACK_START ] (
    Track: Track,
    textChannel: TextChannel | NewsChannel | ThreadChannel,
  ): this;
  [ PlayerEvents.TRACK_END ] (
    track: Track,
    textChannel: TextChannel | NewsChannel | ThreadChannel,
  ): this;
  [ PlayerEvents.QUEUE_START ] (
    urls: unknown[],
    textChannel: TextChannel | NewsChannel | ThreadChannel,
  ): this;
  [ PlayerEvents.QUEUE_END ] (
    textChannel: TextChannel | NewsChannel | ThreadChannel,
  ): this;
  [ PlayerEvents.AUDIO_ERROR ] (
    error: any,
    textChannel: TextChannel | NewsChannel | ThreadChannel,
  ): this;
  [ PlayerEvents.TRACK_RESUME ] (
    textChannel: TextChannel | NewsChannel | ThreadChannel,
  ): this;
  [ PlayerEvents.TRACK_PAUSE ] (
    textChannel: TextChannel | NewsChannel | ThreadChannel,
  ): this;
}

export type LocalStreamType = Promise<ReadStream>;

export type LocalInfoType = {
  title?: string;
  description?: "A Local File";
  path?: string;
  dir: string;
  createdTimestamp: number;
  [ keys: string ]: any;
};

export type AttachmentInfoType = {
  title: string;
  description: string;
  url: string;
  [ keys: string ]: any;
};

export type AttachmentStreamType = Promise<ReadStream>;

export type PlayerOptions = {
  voiceChannel: VoiceChannel;
  textChannel: TextChannel;
  connection: VoiceConnection;
  manager: Manager;
  debug: boolean;
};

export type TrackInfoType = {
  title?: string;
  description?: string;
  url?: string;
  identifier?: string;
  raw_duration?: number;
  duration?: number;
  thumbnail?: string;
  author?: string;
  authorURL?: string;
  authorAvatar?: string;
  likes?: number;
  views?: number;
  path?: string;
  dir?: string;
  createdTimestamp?: number;
};

export interface SCTrackInfo extends TrackInfo
{
  [ key: string ]: any;
}
export interface YTRawInfo extends YoutubeVideo
{
  [ key: string ]: any;
}
export interface SpotifyInfo extends Tracks
{
  [ key: string ]: any;
}
export type TrackRawInfo =
  | SCTrackInfo
  | LocalInfoType
  | AttachmentInfoType
  | YTRawInfo
  | SpotifyInfo;


export type PlayerOptionsData = {
  paused: boolean;
  shuffled: boolean;
  mode: LoopMode.None | LoopMode.Queue | LoopMode.Track;
  volume: number;
  leaveAfter: { enabled: boolean; time: number; };
  leaveWhenVcEmpty: boolean;
  autoPlay?: AutoPlayType;
  seekWhenFilter?: boolean;
};
export type AutoPlayType = "relative" | "youtube" | "soundcloud";

export interface YoutubeOptions
{
  fetchAuthor?: boolean;
}

export interface rawYoutubeMixData
{
  contents: {
    twoColumnWatchNextResults: {
      results: Record<string, unknown>;
      secondaryResults: Record<string, unknown>;
      playlist: { playlist: YoutubeMixPlaylistData; };
    };
  };
}
export interface YoutubeMixPlaylistData
{
  title: string;
  contents: Record<
    "playlistPanelVideoRenderer",
    YoutubeMixPLaylistPanelVideoRenderData
  >[];
  playlistId: string;
  isInfinite: boolean;
  playlistShareUrl: string;
  ownerName: { simpleText: string; };
}

export interface YoutubeMixPLaylistPanelVideoRenderData
{
  videoId: any;
  title: {
    accessibility: {
      accessibilityData: {
        label: string;
      };
    };
    simpleText: string;
  };
  longBylineText: {
    runs: Record<string, unknown>[];
  };
  thumbnail: {
    thumbnails: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  lengthText: {
    simpleText: string;
    accessibility: {
      a: any;
      accessibilityData: {
        label: string;
      };
    };
  };
  indexText: { simpleText: string; };
  navigationEndpoint: {
    watchEndpoint: {
      videoId: string;
      playlistId: string;
      index: number;
    };
  };
}

export interface YoutubeRelatedData
{
  playerOverlays: {
    playerOverlayRenderer: {
      endScreen: {
        watchNextEndScreenRenderer: {
          results: { endScreenVideoRenderer: EndScreenVideoRenderer; }[];
        };
      };
    };
  };
}
export interface EndScreenVideoRenderer
{
  videoId: string;
  thumbnail: {
    thumbnails: { url: string; height: number; width: number; }[];
    title: {
      accessibility: {
        accessibilityData: {
          label: string;
        };
      };
      simpleText: string;
    };
    lengthText: {
      simpleText: string;
      accessibility: {
        accessibilityData: {
          label: string;
        };
      };
    };
    lengthInSeconds: number;
  };
}
