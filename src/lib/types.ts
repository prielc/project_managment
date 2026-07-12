export type Lookup = {
  id: string;
  name: string;
};

export type ProjectWithRelations = {
  id: string;
  name: string;
  contentDomainId: string;
  weaponSystemId: string;
  analystId: string;
  contentDomain: Lookup;
  weaponSystem: Lookup;
  analyst: Lookup;
  createdAt: Date;
  updatedAt: Date;
};

export type Lookups = {
  contentDomains: Lookup[];
  weaponSystems: Lookup[];
  analysts: Lookup[];
};
