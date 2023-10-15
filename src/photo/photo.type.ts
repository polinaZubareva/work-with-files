import { Photo } from 'src/entity';

export type TPhoto = {
  status: boolean;
  photo?: Photo;
  error?: string;
};
