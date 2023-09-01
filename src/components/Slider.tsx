import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { A11y, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import classes from '../css/ui.module.css';

export const Slider = ({ images }: { images: string[] }) => {
  return (
    <Swiper
      modules={[FreeMode, Navigation, Pagination, A11y, Thumbs]}
      navigation={true}
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
    >
      {images.map((item: string, index) => (
        <SwiperSlide key={index}>
          <img className={classes.swiperimage} src={item} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
