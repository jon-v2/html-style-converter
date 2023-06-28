import { load } from "cheerio";
import _ from "lodash";

export const inline2Class = (html) => {
  const $ = load(html);

  const styleMap = new Map();

  $("*").each((i, val) => {
    const inlineStyle = $(val).attr("style");
    if (inlineStyle) {
      const existingClassName = styleMap.get(inlineStyle);
      if (existingClassName) {
        $(val).addClass(existingClassName);
      } else {
        const className = `class-${Date.now()}-${Math.floor(
          Math.random() * 10000
        )}`;
        styleMap.set(inlineStyle, className);
        $(val).addClass(className);
      }
      $(val).removeAttr("style");
    }
  });

  const styleRules = Array.from(styleMap.entries()).map(
    ([style, className]) => `.${className} { ${style} }`
  );
  const deduplicatedStyleRules = _.uniq(styleRules);

  const styleTag = `<style>${deduplicatedStyleRules.join("\n")}</style>`;
  $("body").append(styleTag);

  return $.html();
};

export const class2Inline = (html) => {
  const $ = load(html);

  const styleMap = new Map();

  // Process existing <style> tag
  $("style").each((i, val) => {
    if (!$(val).html()) return;
    //@ts-ignore
    const styleRules = $(val).html().split("}");
    styleRules.forEach((rule) => {
      const [selector, style] = rule.split("{");
      const classNames = selector.trim().slice(1).split(".");
      classNames.forEach((className) => {
        if (className) {
          styleMap.set(className, style);
        }
      });
    });
    $(val).remove();
  });

  // Process elements with class attributes
  $("[class]").each((i, val) => {
    if (!$(val).attr("class")) return;
    //@ts-ignore
    const classNames = $(val).attr("class").split(" ");
    const inlineStyles = classNames
      .map((className) => styleMap.get(className))
      .filter(Boolean);
    if (inlineStyles.length > 0) {
      const mergedStyles = _.uniq(inlineStyles).join("; ");
      $(val).attr("style", mergedStyles);
    }
    $(val).removeAttr("class");
  });

  return $.html();
};
