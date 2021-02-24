export interface DecodedToken {
  user_id: string;
  token_type: 'access' | 'refresh';
  exp: number;
}
