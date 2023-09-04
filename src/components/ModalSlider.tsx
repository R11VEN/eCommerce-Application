import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { A11y, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import classes from '../css/ui.module.css';
import { Image } from '../interfaces/product.interface';
export const ModalSlider = ({ images }: { images: Image[] }) => {
  return (
    <Swiper
      className={classes.modalSlider}
      modules={[FreeMode, Navigation, Pagination, A11y, Thumbs]}
      navigation={true}
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
    >
      {images.map((item: Image, index) => (
        <SwiperSlide key={index}>
          <img className={classes.swiperimage} src={item.url} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
