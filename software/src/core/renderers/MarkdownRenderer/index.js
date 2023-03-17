import React from "react";
import { Renderer } from "core/renderers";
import styles from "./MarkdownRenderer.module.scss";
import ReactMarkdown from "react-markdown";

class MarkdownRenderer extends Renderer {
  renderData() {
    const { markdown } = this.props.data;

    const heading = ({ level, children, ...rest }) => {
      const HeadingComponent = [
        (props) => <h1 {...props}>1</h1>,
        (props) => <h2 {...props}>2</h2>,
        (props) => <h3 {...props}>3</h3>,
        (props) => <h4 {...props}>4</h4>,
        (props) => <h5 {...props}>5</h5>,
        (props) => <h6 {...props}>6</h6>,
      ][level - 1];

      const idfy = (text) =>
        text
          .toLowerCase()
          .trim()
          .replace(/[^\w \-]/g, "")
          .replace(/ /g, "-");

      const getText = (children) => {
        return React.Children.map(children, (child) => {
          if (!child) return "";
          if (typeof child === "string") return child;
          if ("props" in child) return getText(child.props.children);
          return "";
        }).join("");
      };

      const id = idfy(getText(children));

      return (
        <HeadingComponent id={id} {...rest}>
          {children}
        </HeadingComponent>
      );
    };

    const link = ({ href, ...rest }) => {
      return /^#/.test(href) ? (
        <a href={href} {...rest}>
          {href}{" "}
        </a>
      ) : (
        <a href={href} rel="noopener" {...rest}>
          {href}{" "}
        </a>
      );
    };

    const image = ({ src, ...rest }) => {
      let newSrc = src;
      let style = { maxWidth: "100%" };
      const CODECOGS = "https://latex.codecogs.com/svg.latex?";
      const WIKIMEDIA_IMAGE = "https://upload.wikimedia.org/wikipedia/";
      const WIKIMEDIA_MATH =
        "https://wikimedia.org/api/rest_v1/media/math/render/svg/";
      if (src.startsWith(CODECOGS)) {
        const latex = src.substring(CODECOGS.length);
        newSrc = `${CODECOGS}\\color{White}${latex}`;
      } else if (src.startsWith(WIKIMEDIA_IMAGE)) {
        style.backgroundColor = "white";
      } else if (src.startsWith(WIKIMEDIA_MATH)) {
        style.filter = "invert(100%)";
      }
      return <img src={newSrc} style={style} {...rest} />;
    };

    return (
      <div className={styles.markdown}>
        <ReactMarkdown
          className={styles.content}
          source={markdown}
          renderers={{ heading, link, image }}
          escapeHtml={false}
        />
      </div>
    );
  }
}

export default MarkdownRenderer;
