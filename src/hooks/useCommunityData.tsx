import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import { communitySnippet, communityState } from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const onJoinOrLeaveCommunity = (communityData: any, isJoined: boolean) => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    setLoading(true);
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };
  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as Array<communitySnippet>,
      }));
    } catch (error) {
      console.log("Get My Snippets Error:-", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!user) {
      return;
    }
    getMySnippets();
  }, [user]);

  const joinCommunity = async (communityData: any) => {
    try {
      const batch = writeBatch(firestore);
      const newSnippet: communitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      batch.update(doc(firestore, `communities`, communityData.id), {
        numberOfMembers: increment(1),
      });
      await batch.commit();
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };
  const leaveCommunity = async (id: string) => {
    try {
      const batch = writeBatch(firestore);
      batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, id));
      batch.update(doc(firestore, `communities`, id), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter((item) => item.communityId !== id),
      }));
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };
  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;
