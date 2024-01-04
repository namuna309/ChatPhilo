// CSS
import { useEffect, useState } from 'react';
import '../../CSS/main.css';

// Image
import banner_img_1 from '../../Img/banner/main_banner_1.png';
import banner_img_2 from '../../Img/banner/main_banner_2.png';
import banner_img_3 from '../../Img/banner/main_banner_3.png';

function Banner() {
    const [banner_img] = useState([banner_img_1, banner_img_2, banner_img_3]);
    let [bn_idx, setIdx] = useState(0);
    const [box, setBox] = useState(['show', 'hide', 'hide'])

    // 배너 이미지 전환 인터벌
    useEffect(() => {
        let bn_interval = setInterval(() => {

            if (bn_idx + 1 >= 3) setIdx(0);
            else setIdx(bn_idx + 1);

        }, 4000);

        return () => {
            clearInterval(bn_interval);
        }
    }, [box]);

    // 배너 이미지 전환
    useEffect(() => {
        setBox(changeBox(bn_idx));

    }, [bn_idx])

    function changeBox(idx) {
        let copy = ['hide', 'hide', 'hide'];
        copy[idx] = 'show'
        return copy;
    }

    return (
        <>
            {
                banner_img.map((bn, idx) => {
                    return (
                        <div className={`banner-box ${box[idx]}`}><img src={bn} /></div>
                    )
                })
            }
        </>
    )
}

export default Banner;