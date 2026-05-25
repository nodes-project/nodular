type TabInfo = {
  id: number;
  index: number;
  title: string;
  url: string;
  active: boolean;
  pinned: boolean;
};

export type TabsByWindow = Record<string, TabInfo[]>;
