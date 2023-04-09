import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import tailwindConfig from '../../tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig';
import Link from 'next/link';
import router from 'next/router';
import Image from 'next/image';

export default function ProductCard(product: any) {
  // const { data: category } = api.categories.getById.useQuery({ id: product.categoryId });

  const config = (resolveConfig(tailwindConfig) as any);
  const primary = config.theme.colors.primary;
  const secondary = config.theme.colors.secondary;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, path: string) => {
    e.preventDefault()

    const splitArray = path.split('/').filter(item => item != "");

    if (splitArray.length === 2 && splitArray[0] === "products") {    
      router.push(path);
    }
  };

  return (
    <Card className='p-4' variant='outlined'
      onClick={(e) => handleClick(e, `/products/${product.idProduct}`)}
      sx={{
        maxWidth: 345,
        backgroundColor: primary,
        borderRadius: "15px",
        color: secondary,
        "&:hover": {
          backgroundColor: "#171717",
          cursor: "pointer"
        },
        transition: "0.3s"
      }}>
      <CardHeader
        title={product.productName}
        // subheader={<div className='text-slate-100'>{category?.categoryName || "Error"}</div>}
        className='text-slate-100'
      />
      <div className="flex justify-center">
        <Image width={200} height={300} src={product.productImg} alt=""></Image>
      </div>
      <CardContent>
        <Typography variant="body2" className='text-slate-100'>          
          {product.description}
          <div className='text-secondary font-titillium-web text-lg pt-2'>{product.price} РУБ.</div>
        </Typography>
      </CardContent>
    </Card>
  );
}
