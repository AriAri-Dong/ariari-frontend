import SignInPageContent from "@/(auth)/auth/kakao/content/pageContent";
import { Suspense } from "react";

const SignIn = () => {
  return (
    <Suspense fallback={<h4>loading...</h4>}>
      <SignInPageContent />
    </Suspense>
  );
};

export default SignIn;
