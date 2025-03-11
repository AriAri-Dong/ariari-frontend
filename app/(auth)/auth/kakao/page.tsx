import SignInPageContent from "@/(auth)/auth/kakao/content/pageContent";
import { Suspense } from "react";
import LoginLoading from "./content/loginLoading";

const SignIn = () => {
  return (
    <Suspense fallback={<LoginLoading />}>
      <SignInPageContent />
    </Suspense>
  );
};

export default SignIn;
