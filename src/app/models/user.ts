export interface UserCustom {
  id?: string;
  uid?: string;
  email: string;
  // emailVerified: boolean;
  createdAt: Date;
  favoritesId?: string[];
}
