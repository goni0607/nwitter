import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { authUserWithSocial } from "fbase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04aaff"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns mt-3">
        <button
          type="button"
          onClick={onSocialClick}
          name="google"
          className="authBtn"
        >
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button
          type="button"
          onClick={onSocialClick}
          name="github"
          className="authBtn"
        >
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
}
