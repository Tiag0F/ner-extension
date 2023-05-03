const cat_images = [
    "https://s2.glbimg.com/HjK83wKaNITt6pgwARtSR790uYw=/0x0:640x640/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/3/g/t0TTBRRBiYTbHv0NRFHg/whatsapp-image-2021-08-12-at-15.33.06.jpeg",
    "https://blog-static.petlove.com.br/wp-content/uploads/2020/11/gato-preto-2.jpg",
    "https://static.wixstatic.com/media/1cbe41_1db56ff59200428f99b87077f3b9f8dc~mv2_d_2304_1728_s_2.jpg/v1/fill/w_640,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1cbe41_1db56ff59200428f99b87077f3b9f8dc~mv2_d_2304_1728_s_2.jpg",
    "https://blog.cobasi.com.br/wp-content/uploads/2023/01/gato-preto-branco-capa.png",
    "https://static.greatbigcanvas.com/images/singlecanvas_thick_none/getty-images/three-grey-tabby-kittens,1132160.jpg",
    "https://kittenrescue.org/wp-content/uploads/2023/01/KittenRescue_NICK1.jpg"    
];

const siteImages = document.getElementsByTagName("img");

for(let i = 0; i < siteImages.length; i++){
    const randImg = Math.floor(Math.random() * cat_images.length);
    siteImages[i].src = cat_images[randImg];
}



console.log("Ola mundo");