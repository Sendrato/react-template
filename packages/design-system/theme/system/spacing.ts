export type StyleFunction<Props> = (props: Props) => any;

export type SimpleStyleFunction<PropKey extends keyof any> = StyleFunction<
  Partial<Record<PropKey, any>>
> & { filterProps: string[] };

export const spacing: any = {
  /**
   * 1440px grid (considering 20px left and right margin on desktop).
   */
  maxHeroContainerWidth: `
    max-width: 1480px;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;

    @media (min-width: 960px) {
      padding-left: 40px;
      padding-right: 40px;
    }

    @media (min-width: 1280px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  `,
  /**
   * 1260px grid (considering 20px left and right margin on desktop).
   */
  maxContainerWidth: `
    max-width: 1300px;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;

    @media (min-width: 960px) {
      padding-left: 40px;
      padding-right: 40px;
    }

    @media (min-width: 1280px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  `,
};

export let spacingInterface: SimpleStyleFunction<
  | 'm'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'mx'
  | 'my'
  | 'p'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'px'
  | 'py'
  | 'margin'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginX'
  | 'marginY'
  | 'padding'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingX'
  | 'paddingY'
>;
