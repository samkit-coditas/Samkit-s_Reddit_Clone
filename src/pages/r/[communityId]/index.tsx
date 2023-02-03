import { Community, communityState } from "@/src/atoms/communitiesAtom";
import About from "@/src/components/community/about";
import CreatePostLink from "@/src/components/community/createPostLink";
import Header from "@/src/components/community/header";
import NotFound from "@/src/components/community/notFound";
import PageContent from "@/src/components/layout/pageContent";
import Posts from "@/src/components/posts/posts";
import { firestore } from "@/src/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
type communityPageProps = {
  communityId: string;
};
type communityDataType = Community | "";
const CommunityPage: React.FC<communityPageProps> = ({ communityId }) => {
  const [communityData, setCommunityData] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getCommunityData = async () => {
    setLoading(true);
    const communityDocRef = doc(
      firestore,
      "communities",
      communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    if (!communityDoc.exists()) {
      setCommunityData("");
      setLoading(false);
      return;
    }
    setCommunityData({ id: communityDoc.id, ...communityDoc.data() });
    setLoading(false);
  };
  const setCommunityStateValue = useSetRecoilState(communityState);
  useEffect(() => {
    getCommunityData();
  }, []);

  useEffect(() => {
    if (communityData) {
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: communityData,
      }));
    }
  }, [communityData]);
  return (
    <>
      {!loading &&
        (communityData ? (
          <div>
            <Header communityData={communityData} />
            <PageContent>
              <>
                <CreatePostLink />
                <Posts communityData={communityData} />
              </>
              <>
                <About communityData={communityData} />
              </>
            </PageContent>
          </div>
        ) : (
          <NotFound communityId={communityId} />
        ))}
    </>
  );
};

export default CommunityPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      communityId: context.query.communityId,
    },
  };
}
