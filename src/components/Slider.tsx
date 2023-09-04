import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { A11y, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import classes from '../css/ui.module.css';
import { Image } from '../interfaces/product.interface';

export const Slider = ({
  images,
  openModal,
}: {
  images: Image[];
  openModal: (content: string) => void;
}) => {
  const handleClick = () => {
    openModal('modalSlider');
  };
  return (
    <Swiper
      modules={[FreeMode, Navigation, Pagination, A11y, Thumbs]}
      navigation={true}
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
    >
      {images.map((item: Image, index) => (
        <SwiperSlide key={index}>
          <img className={classes.swiperimage} src={item.url} alt="" onClick={handleClick} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
