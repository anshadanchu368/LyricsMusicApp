import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetSearchResultsQuery } from "../redux/MusicApi";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';


const TopChartCard = ({ song, i }) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] p-4 rounded-lg cursor-pointer mb-2">
      {song.album.title}
    </div>
  );
};

const TopPlay = () => {
  const dispatch=useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data } = useGetSearchResultsQuery({ q: "eminem" });

  const topPlays = data?.data?.slice(0, 5);
  console.log(data);

  const divRef = useRef();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  },[]);
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer"> See More</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard key={song.id} song={song} i={i} />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
      <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer"> See More</p>
          </Link>
        </div>

<Swiper  
slidesPerView={"auto"}
spaceBetween={15}
freeMode={true}
centeredSlides={true}
centeredSlidesBounds={true}
modules={[FreeMode]}
className="mt-4"

>
  {topPlays?.map((song,i)=>{
    return(
       <SwiperSlide key={song?.id} style={{width:'25%',height:'auto'}} className="shadow-lg rounded-full animate-slideright">
       <Link to ={`/artists/${song?.artist.id}`}>
         <img src={song?.artist.picture} alt="artist img"/>
       </Link>
       </SwiperSlide>
    )
  })}

</Swiper>
      </div>


    </div>
  );
};

export default TopPlay;
