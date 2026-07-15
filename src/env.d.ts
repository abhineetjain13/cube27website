declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "@fontsource-variable/inter";
declare module "@fontsource/ibm-plex-mono/*";
