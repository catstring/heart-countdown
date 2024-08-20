import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface HeartProps {
  isEmpty: boolean;
}

const Heart: React.FC<HeartProps> = ({ isEmpty }) => {
  return isEmpty ? <FavoriteBorderIcon color="error" /> : <FavoriteIcon color="error" />;
};

export default Heart;
