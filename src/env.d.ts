declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "@fontsource-variable/archivo";
declare module "@fontsource-variable/roboto";
declare module "*.woff2?url";
