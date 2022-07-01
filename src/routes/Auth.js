import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { authUserWithSocial } from "fbase";
import AuthForm from "components/AuthForm";

export default function Auth() {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = GoogleAuthProvider;
    } else if (name === "github") {
      provider = GithubAuthProvider;
    }
    const result = await authUserWithSocial(provider);
    console.log(result);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button type="button" onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button type="button" onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
}
