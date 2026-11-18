export const SOURCE: "signup_page";
export const TITLE: string;
export const META_DESCRIPTION: string;
export const SKILLS_LINK: string;
export const SECTIONS: ReadonlyArray<{
  heading: string;
  lines: readonly string[];
  link: { text: string; href: string; external: boolean };
}>;
export const CHOICES: ReadonlyArray<{
  key: "wantsApiAccess" | "wantsCaseStudies";
  before: string;
  link: string;
}>;
export const BUTTON: string;
export const NONE_CHECKED: string;
export const NOTE: string;
export const SENT: string;
