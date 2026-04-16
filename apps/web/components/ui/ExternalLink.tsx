import { AnchorHTMLAttributes } from "react";

export type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function ExternalLink({ target = "_blank", rel = "noopener noreferrer", ...rest }: ExternalLinkProps) {
  return <a target={target} rel={rel} {...rest} />;
}
