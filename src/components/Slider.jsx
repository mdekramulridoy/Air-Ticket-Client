import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="lg:h-[700px] md:h-[500px]">
          <img
            src="https://i.ibb.co/7yJ27wx/Leonardo-Phoenix-A-stunning-cover-photo-featuring-a-sleek-silv-2.jpg"
            alt=""
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="lg:h-[700px] md:h-[500px]">
          <img
            src="https://i.ibb.co/5cbYXBJ/Leonardo-Phoenix-A-sleek-commercial-airliner-soaring-through-a-1.jpg"
            alt=""
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="lg:h-[700px] md:h-[500px]">
          <img
            src="https://i.ibb.co/7RHyrcb/Leonardo-Phoenix-A-stunning-cover-photo-featuring-a-sleek-silv-1.jpg"
            alt=""
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
