import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "private" | "restricted";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface communitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

export interface CommunityState {
  mySnippets: communitySnippet[];
  // visitedCommunities
}
const defaultCommunityState: CommunityState = {
  mySnippets: [],
};

export const communityState = atom<CommunityState>({
  key: "communityState",
  default: defaultCommunityState,
});
