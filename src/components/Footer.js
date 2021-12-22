import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

function Footer() {
  return (
    <>
      <div className="footer">
        <div>Created with ❤ by Vineet</div>
        <div>
          <a
            className="github"
            href="https://github.com/vrx29/"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub />
          </a>

          <a
            className="linkedin"
            href="https://www.linkedin.com/in/vrx29/"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin />
          </a>

          <a
            className="twitter"
            href="https://twitter.com/vrx29"
            target="_blank"
            rel="noreferrer"
          >
            <BsTwitter />
          </a>

          <a
            className="instagram"
            href="https://www.instagram.com/vrx29/"
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram />
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
